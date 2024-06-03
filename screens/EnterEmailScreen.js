import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const EnterEmailScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  const resetPassword = async () => {
    if (email && email !== "") {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Reset password sent to your email!");
          setEmail("");
          navigation.navigate("Login");
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Image style={styles.arrow} source={require("../assets/arrow.png")} />
      </Pressable>
      <View style={styles.changePasswordContainer}>
        <Image source={require("../assets/bridgeway.png")} />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())}
            style={styles.input}
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={resetPassword} style={styles.button}>
            <Text style={styles.buttonText}>Reset password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EnterEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  changePasswordContainer: {
    alignItems: "center",
    justifyContent: "center",
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
  errorInput: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 25,
    borderColor: "red",
    borderWidth: 2,
  },
  buttonContainer: {
    width: "80%",
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
  buttonText: {
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
  arrow: {
    marginTop: "10%",
    marginLeft: "5%",
    height: "18%",
    width: "10%",
  },
});
