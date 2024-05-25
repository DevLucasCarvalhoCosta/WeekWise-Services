import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore, collection, addDoc, serverTimestamp } from '../config/firebase';
import { TextInput, Button, Title } from 'react-native-paper';

const CreateServiceScreen = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [priority, setPriority] = useState('');

    const handleCreateService = async () => {
        try {
            if (!title || !description || !startDate || !priority) {
                Alert.alert('Por favor, preencha todos os campos.');
                return;
            }

            await addDoc(collection(firestore, 'services'), {
                title,
                description,
                startDate,
                priority,
                status: 'pendente',
                createdAt: serverTimestamp(),
            });

            Alert.alert('Serviço criado com sucesso!');
            // Limpa os campos após a criação do serviço
            setTitle('');
            setDescription('');
            setStartDate('');
            setPriority('');
        } catch (error) {
            console.error('Erro ao criar serviço:', error);
            Alert.alert('Erro ao criar serviço. Tente novamente mais tarde.');
        }
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Criar Novo Serviço</Title>
            <TextInput
                label="Título do serviço"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Descrição do serviço"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                mode="outlined"
                multiline
            />
            <TextInput
                label="Data de Início"
                value={startDate}
                onChangeText={setStartDate}
                style={styles.input}
                mode="outlined"
                placeholder="DD/MM/AAAA"
            />
            <TextInput
                label="Prioridade"
                value={priority}
                onChangeText={setPriority}
                style={styles.input}
                mode="outlined"
                placeholder="Baixa, Média, Alta"
            />
            <Button
                mode="contained"
                onPress={handleCreateService}
                style={styles.button}
            >
                Criar Serviço
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#080808'
    },
});

export default CreateServiceScreen;
