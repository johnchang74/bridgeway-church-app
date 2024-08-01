import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorLoginReason, setErrorLoginReason] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    setErrorLogin(false);
    setErrorLoginReason("");
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const user = userCredentials.user;
          console.log(`userCredentials: `, userCredentials);
          console.log(`user: `, user);
          navigation.navigate("Home", docSnap.data());
        } else {
          setErrorLogin(true);
          setErrorLoginReason("No such email account exists!");
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        setErrorLogin(true);
        setErrorLoginReason("Invalid email/password!");
      });
    setEmail("");
    setPassword("");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/bridgeway.png")}
        />
        <Text style={styles.greeting}>Welcome Back!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          style={styles.input}
          clearButtonMode="while-editing"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
          clearButtonMode="while-editing"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        {errorLogin ? (
          <Text style={styles.noAccount}>{errorLoginReason}</Text>
        ) : null}
      </View>
      <View style={styles.signUpContainer}>
        <Text>
          Don't have an account yet?
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}
            Sign Up
          </Text>
        </Text>
        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("EnterEmail")}
        >
          Forgot password?
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  greeting: {
    justifyContent: "center",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 30,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 35,
    borderColor: "#A9A9A9",
    borderWidth: 2,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#09DEC5",
    width: "100%",
    padding: 11,
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
  },
  buttonOutline: {
    backgroundColor: "#FFFFFF",
    marginTop: 5,
    borderColor: "#09DEC5",
    borderWidth: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#09DEC5",
    fontWeight: "700",
    fontSize: 16,
  },
  signUpContainer: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "blue",
  },
  forgotPassword: {
    marginTop: 15,
    color: "blue",
  },
  noAccount: {
    marginTop: 20,
    color: "red",
    fontWeight: "500",
    fontSize: 15,
  },
});
