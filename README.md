# WeekWise Service

![Supports Expo Android](https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff)
[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

Este é um aplicativo mobile desenvolvido em React Native que permite a criação e gerenciamento de serviços utilizando o Firebase Firestore como backend. O app inclui autenticação de usuários com Firebase Authentication, permitindo login, cadastro e recuperação de senha.

## Funcionalidades

- **Autenticação com Firebase:** Login, Signup e Recuperação de Senha.
- **Criar Serviço:** Permite ao usuário criar um novo serviço com título, descrição, data de início e prioridade.
- **Listar Serviços:** Exibe uma lista de todos os serviços cadastrados no Firestore.
- **Atualizar Status:** Permite ao usuário alterar o status de um serviço para "pendente", "em andamento" ou "executado".
- **Excluir Serviço:** Permite ao usuário excluir um serviço existente.

## Tecnologias Utilizadas

- **React Native**
- **Firebase Firestore**
- **Firebase Authentication**
- **React Navigation**
- **React Native Paper**

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Lucaspk91/weekWise-service.git
   cd weekWise-service
   ```

2. **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

3. **Configuração do Firebase:**

    - **Crie um projeto no Firebase Console.**
    - **Adicione um app para WEB ao projeto e siga as instruções para obter os arquivos de configuração**
    - **Configure o Firebase Firestore e Authentication no projeto.**
    - **Atualize o arquivo src/config/firebase.js com suas credenciais do Firebase:**
  
    ```bash
   import { initializeApp } from 'firebase/app';
   import { getAuth, initializeAuth, browserLocalPersistence, getReactNativePersistence } from 'firebase/auth';
   import { getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
   import AsyncStorage from '@react-native-async-storage/async-storage';
   import { Platform } from 'react-native';
   
   // Configuração do Firebase
   const firebaseConfig = {
     apiKey: "sua-api-key",
     authDomain: "seu-projeto.firebaseapp.com",
     projectId: "seu-projeto",
     storageBucket: "seu-projeto.appspot.com",
     messagingSenderId: "seu-sender-id",
     appId: "seu-app-id",
     measurementId: "seu-measurement-id"
   };
   
   // Inicializar o Firebase
   const app = initializeApp(firebaseConfig);
   const firestore = getFirestore(app);
   
   // Inicializar auth para web ou React Native
   let auth;
   if (Platform.OS === 'web') {
     auth = getAuth(app);
     auth.setPersistence(browserLocalPersistence);
   } else {
     auth = initializeAuth(app, {
       persistence: getReactNativePersistence(AsyncStorage),
     });
   }
   
   export { auth, firestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, updateDoc, doc }; // Exporte todas as funções necessárias

    ```

  ## Inicie o aplicativo:
     
     npm expo start
     

   ## Uso

### Autenticação

**Login:**

- Na tela inicial, insira seu email e senha para fazer login.
- Se não tiver uma conta, clique em "Sign Up" para criar uma nova conta.

**Cadastro:**

- Preencha os campos de email, senha e confirme a senha.
- Clique em "Sign Up" para criar a conta.

**Recuperação de Senha:**

- Clique em "Forgot Password" na tela de login.
- Insira seu email para receber um link de redefinição de senha.

### Criar Novo Serviço

- Na tela inicial, clique no botão para adicionar um novo serviço.
- Preencha os campos "Título", "Descrição", "Data de Início" e "Prioridade".
- Clique em "Criar Serviço" para salvar o serviço no Firestore.

### Listar Serviços

- Na tela inicial, você verá uma lista dos serviços cadastrados.
- Cada serviço exibe o título, descrição, prioridade e status.

### Atualizar Status do Serviço

- Na lista de serviços, clique nos ícones correspondentes ao status desejado:
  - Ícone de lápis para "pendente".
  - Ícone de relógio para "em andamento".
  - Ícone de check para "executado".

### Excluir Serviço

- Na lista de serviços, clique no ícone de lixeira para excluir o serviço.

  ### Video Funcionamento

  


https://github.com/Lucaspk91/WeekWise-Services/assets/95451120/877d7497-f2ef-47ac-b2bb-d74f90811cd2


