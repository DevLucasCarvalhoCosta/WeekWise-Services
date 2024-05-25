import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList, StyleSheet, Alert, Dimensions } from 'react-native';
import { IconButton, Card, Title, Paragraph } from 'react-native-paper';
import { firestore, collection, getDocs, deleteDoc, updateDoc, doc } from '../config/firebase';

const ListServicesScreen = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const servicesData = [];
            const querySnapshot = await getDocs(collection(firestore, 'services'));
            querySnapshot.forEach(serviceDoc => {
                servicesData.push({ id: serviceDoc.id, ...serviceDoc.data() });
            });
            setServices(servicesData);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
            Alert.alert('Erro ao buscar serviços. Tente novamente mais tarde.');
        }
    };

    const handleDeleteService = async (id) => {
        try {
            await deleteDoc(doc(firestore, 'services', id));
            setServices(services.filter(service => service.id !== id));
            Alert.alert('Serviço excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir serviço:', error);
            Alert.alert('Erro ao excluir serviço. Tente novamente mais tarde.');
        }
    };

    const handleChangeStatus = async (id, newStatus) => {
        try {
            await updateDoc(doc(firestore, 'services', id), { status: newStatus });
            setServices(services.map(service =>
                service.id === id ? { ...service, status: newStatus } : service
            ));
            Alert.alert('Status do serviço alterado com sucesso!');
        } catch (error) {
            console.error('Erro ao alterar status do serviço:', error);
            Alert.alert('Erro ao alterar status do serviço. Tente novamente mais tarde.');
        }
    };

    const renderService = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph style={styles.details}>Descrição: {item.description}</Paragraph>
                <Paragraph style={styles.details}>Prioridade: {item.priority}</Paragraph>
                <Paragraph style={styles.details}>Status: {item.status}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.actions}>
                <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => handleDeleteService(item.id)}
                />
                <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => handleChangeStatus(item.id, 'pendente')}
                    color={item.status === 'pendente' ? 'blue' : 'gray'}
                />
                <IconButton
                    icon="progress-clock"
                    size={20}
                    onPress={() => handleChangeStatus(item.id, 'em andamento')}
                    color={item.status === 'em andamento' ? 'blue' : 'gray'}
                />
                <IconButton
                    icon="check"
                    size={20}
                    onPress={() => handleChangeStatus(item.id, 'executado')}
                    color={item.status === 'executado' ? 'blue' : 'gray'}
                />
            </Card.Actions>
        </Card>
    );

    const screenHeight = Dimensions.get('window').height;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
                <FlatList
                    data={services}
                    renderItem={renderService}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    style={{ height: screenHeight - 100 }} // ajuste conforme necessário
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    scrollView: {
        flex: 1,
    },
    card: {
        marginBottom: 8,
    },
    details: {
        marginBottom: 5,
    },
    actions: {
        justifyContent: 'flex-end',
    },
});

export default ListServicesScreen;
