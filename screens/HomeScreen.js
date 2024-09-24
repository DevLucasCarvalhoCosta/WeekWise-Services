import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Button, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth, firestore } from "../config/firebase";  // Assume que já existe um firestore configurado
import { doc, getDoc, collection, getDocs } from "../config/firebase";  // Para buscar os dados do usuário e serviços

export const HomeScreen = () => {
  const [userType, setUserType] = useState(null);
  const [services, setServices] = useState([]);
  const navigation = useNavigation();
  const currentUser = auth.currentUser; // Pega o usuário atual logado

  useEffect(() => {
    const checkUserType = async () => {
      try {
        const userDoc = await getDoc(doc(firestore, "users", currentUser.uid)); // Assume que os usuários estão salvos no Firestore
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserType(userData.role);  // 'role' pode ser 'admin' ou 'client'
        }
      } catch (error) {
        console.log("Erro ao buscar o tipo de usuário: ", error);
      }
    };

    const fetchServices = async () => {
      try {
        // Referência para a coleção "services" no Firestore
        const servicesCollection = collection(firestore, "services");
        const servicesSnapshot = await getDocs(servicesCollection);
  
        // Mapeia os documentos do Firestore para o estado local
        const servicesData = servicesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Inclui os dados do documento
        }));
  
        setServices(servicesData); // Atualiza o estado com os serviços
      } catch (error) {
        console.error("Erro ao buscar serviços: ", error);
      }
    };
  
    if (currentUser) {
      checkUserType();
      fetchServices();
    }
  }, [currentUser]);

  // Redireciona conforme o tipo de usuário
  useEffect(() => {
    if (userType === 'admin') {
      navigation.navigate('AdminScreen');
    }
  }, [userType]);

  // Função para logout
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Erro ao fazer logout: ", error));
  };

  // Função para agendar um serviço
  const navigateToBooking = (service) => {
    navigation.navigate("BookService", { service });
  };

  // Renderiza cada serviço em uma lista
  const renderService = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigateToBooking(item)}>
      <Text style={styles.cardText}>{item.name}</Text>
      <Text style={styles.cardCategory}>Categoria: {item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Serviços Disponíveis</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderService}
      />
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    width: "90%",
    padding: 16,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardCategory: {
    fontSize: 14,
    color: "#666",
  },
});
