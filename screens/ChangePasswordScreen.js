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
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAuth, updatePassword } from "firebase/auth";

const ChangePasswordScreen = (props) => {
  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
  } = props.route.params;
  const [newPassword, setNewPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const changePassword = () => {
    if (
      newPassword !== "" &&
      retypedPassword !== "" &&
      newPassword !== retypedPassword
    ) {
      setNewPassword("");
      setRetypedPassword("");
      setError(true);
      alert("Your new password doesn't match!");
    } else {
      setError(false);
      updatePassword(user, newPassword)
        .then(() => {
          alert("Password updated succeessfully!");
          setNewPassword("");
          setRetypedPassword("");
          navigation.navigate("Setting", {
            firstName,
            lastName,
            email,
          });
        })
        .catch((error) => {
          setError(true);
          throw error;
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate("Setting", {
            firstName,
            lastName,
            email,
          })
        }
      >
        <Image style={styles.arrow} source={require("../assets/arrow.png")} />
      </Pressable>
      <View style={styles.changePasswordContainer}>
        <Image source={require("../assets/bridgeway.png")} />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New password</Text>
          <TextInput
            placeholder="New password"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            style={
              error && newPassword === "" ? styles.errorInput : styles.input
            }
            secureTextEntry
          />
          <Text style={styles.label}>Re-type password</Text>
          <TextInput
            placeholder="Re-type new password"
            value={retypedPassword}
            onChangeText={(text) => setRetypedPassword(text)}
            style={
              error && retypedPassword === "" ? styles.errorInput : styles.input
            }
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={changePassword} style={styles.button}>
            <Text style={styles.buttonText}>Change password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;

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
