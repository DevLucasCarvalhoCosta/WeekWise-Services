import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Formik } from "formik";
import { sendPasswordResetEmail } from "firebase/auth";

import { passwordResetSchema } from "../utils";
import { Colors, auth } from "../config";
import { View, TextInput, Button, FormErrorMessage } from "../components";

export const ForgotPasswordScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");

  const handleSendPasswordResetEmail = (values) => {
    const { email } = values;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Sucesso: Email de Reset de Senha enviado.");
        navigation.navigate("Login");
      })
      .catch((error) => setErrorState(error.message));
  };

  return (
    <View isSafe style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.screenTitle}>Resetar sua Senha</Text>
      </View>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={passwordResetSchema}
        onSubmit={(values) => handleSendPasswordResetEmail(values)}
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
            {/* Campo de entrada para Email */}
            <TextInput
              name="email"
              leftIconName="email"
              placeholder="Digite seu email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            <FormErrorMessage error={errors.email} visible={touched.email} />
            {/* Exibir mensagens de erro na tela */}
            {errorState !== "" ? (
              <FormErrorMessage error={errorState} visible={true} />
            ) : null}
            {/* Botão para enviar email de reset de senha */}
            <Button style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar Email de Reset</Text>
            </Button>
          </>
        )}
      </Formik>
      {/* Botão para navegar para a tela de Login */}
      <Button
        style={styles.borderlessButtonContainer}
        borderless
        title={"Voltar para Login"}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  innerContainer: {
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
    backgroundColor: Colors.orange,
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
