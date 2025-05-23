import { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorRegister, setErrorRegister] = useState({
    state: false,
    reason: "",
  });
  const navigation = useNavigation();

  const handleSignUp = () => {
    setErrorRegister({
      state: false,
      reason: "",
    });
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        await setDoc(doc(db, "users", email), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          extraInfo: {
            admin: false,
            daily: false,
            weekly: false,
            dailyDate: null,
            weeklyDate: null,
          },
        });

        const user = userCredentials.user;
        navigation.navigate("Login");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        setErrorRegister({
          state: true,
          reason: `${error.message.replace("Firebase: ", "")}`,
        });
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/bridgeway.png")}
        />
        <Text style={styles.greeting}>Get Started Below</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
          clearButtonMode="while-editing"
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
          clearButtonMode="while-editing"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          style={styles.input}
          clearButtonMode="while-editing"
        />
        <Text style={styles.label}>Password</Text>
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
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <View>
        {errorRegister.state ? (
          <Text style={styles.errorRegister}>{errorRegister.reason}</Text>
        ) : null}
      </View>
      <View style={styles.signUpContainer}>
        <Text>
          Already have an account?
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate("Login")}
          >
            {" "}
            Login
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
    marginBottom: 35,
  },
  inputContainer: {
    width: "80%",
  },
  label: {
    marginTop: 10,
    marginBottom: -20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 25,
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
    backgroundColor: "white",
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
  errorRegister: {
    marginTop: 20,
    color: "red",
    fontWeight: "500",
    fontSize: 15,
  },
});
