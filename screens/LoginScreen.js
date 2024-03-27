import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home", {});
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const user = userCredentials.user;
          console.log(`Logged in with `, user.email);
          navigation.navigate("Home", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error.message);
        alert(`Invalid email/password for ${email}`);
      });
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
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
          onPress={() => navigation.navigate("changePassword")}
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
    alignItems: "center",
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
});
