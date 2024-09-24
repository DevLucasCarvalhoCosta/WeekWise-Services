import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { doc, setDoc } from "../config/firebase";

import { View, TextInput, Logo, Button, FormErrorMessage } from "../components";
import { Images, Colors } from "../config"; 
import { auth, firestore } from "../config/firebase"; 
import { useTogglePasswordVisibility } from "../hooks";
import { signupValidationSchema } from "../utils";

export const SignupScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");

  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon,
    confirmPasswordVisibility,
  } = useTogglePasswordVisibility();

  const handleSignup = async (values) => {
    const { nome, telefone, email, password } = values;

    try {
      // Criar o usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Salvar as informações adicionais do usuário no Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        id: user.uid,
        nome: nome,
        telefone: telefone,
        email: email,
        role: "client", // Role padrão definida como 'client'
      });

      console.log("Usuário cadastrado com sucesso!");
    } catch (error) {
      setErrorState(error.message);
      console.log("Erro ao criar usuário:", error.message);
    }
  };

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        {/* LogoContainer: consist app logo and screen title */}
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={styles.screenTitle}>Criar uma nova conta!</Text>
        </View>
        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            nome: "",
            telefone: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupValidationSchema}
          onSubmit={(values) => handleSignup(values)}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
          }) => (
            <>
              {/* Nome */}
              <TextInput
                name="nome"
                placeholder="Nome Completo"
                autoCapitalize="words"
                value={values.nome}
                onChangeText={handleChange("nome")}
                onBlur={handleBlur("nome")}
              />
              <FormErrorMessage error={errors.nome} visible={touched.nome} />

              {/* Telefone */}
              <TextInput
                name="telefone"
                placeholder="Telefone"
                keyboardType="phone-pad"
                value={values.telefone}
                onChangeText={handleChange("telefone")}
                onBlur={handleBlur("telefone")}
              />
              <FormErrorMessage
                error={errors.telefone}
                visible={touched.telefone}
              />

              {/* Email */}
              <TextInput
                name="email"
                leftIconName="email"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <FormErrorMessage error={errors.email} visible={touched.email} />

              {/* Senha */}
              <TextInput
                name="password"
                leftIconName="key-variant"
                placeholder="Senha"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType="newPassword"
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <FormErrorMessage
                error={errors.password}
                visible={touched.password}
              />

              {/* Confirmar Senha */}
              <TextInput
                name="confirmPassword"
                leftIconName="key-variant"
                placeholder="Confirme sua Senha"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={confirmPasswordVisibility}
                textContentType="password"
                rightIcon={confirmPasswordIcon}
                handlePasswordVisibility={handleConfirmPasswordVisibility}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
              />
              <FormErrorMessage
                error={errors.confirmPassword}
                visible={touched.confirmPassword}
              />

              {/* Exibir mensagem de erro geral */}
              {errorState !== "" ? (
                <FormErrorMessage error={errorState} visible={true} />
              ) : null}

              {/* Botão de criar conta */}
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Criar Conta</Text>
              </Button>
            </>
          )}
        </Formik>

        {/* Botão para navegar para a tela de Login */}
        <Button
          style={styles.borderlessButtonContainer}
          borderless
          title={"Já possui uma conta?"}
          onPress={() => navigation.navigate("Login")}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.black,
    paddingTop: 20,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: Colors.black,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "700",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
