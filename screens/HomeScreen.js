import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { signOut } from "firebase/auth";

import { auth } from "../config";

export const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
    
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CreateService')}
      >
        <Text style={styles.cardText}>Criar Serviço</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ExecuteService')}
      >
        <Text style={styles.cardText}>Executar Serviço</Text>
      </TouchableOpacity>
      <Button title="Sair" onPress={handleLogout} />
    </View>
    

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '80%',
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
