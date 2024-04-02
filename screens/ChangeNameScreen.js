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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ChangeNameScreen = (props) => {
  const navigation = useNavigation();
  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
    extraInfo: extraInfo,
  } = props.route.params;
  const [fName, setfName] = useState(firstName);
  const [lName, setlName] = useState(lastName);
  const [error, setError] = useState(false);

  const changeProfile = async () => {
    if (fName === "" && lName === "") {
      setfName("");
      setlName("");
      setError(true);
      alert("First name and/or last name is blank!");
    } else {
      const userRef = doc(db, "users", email);
      console.log(`userRef: `, userRef);
      await updateDoc(userRef, {
        firstName: fName,
        lastName: lName,
      })
        .then(() => {
          alert("Names updated succeessfully!");
          setfName("");
          setlName("");
          console.log(`fName: ${fName} lName: ${lName}`);
          navigation.navigate("Setting", {
            firstName: fName,
            lastName: lName,
            email,
            extraInfo,
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
            extraInfo,
          })
        }
      >
        <Image style={styles.arrow} source={require("../assets/arrow.png")} />
      </Pressable>
      <View style={styles.changeProfileContainer}>
        <Image source={require("../assets/bridgeway.png")} />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First name</Text>
          <TextInput
            placeholder="New first name"
            value={fName}
            onChangeText={(text) => setfName(text)}
            style={styles.input}
            clearButtonMode="while-editing"
          />
          <Text style={styles.label}>Last name</Text>
          <TextInput
            placeholder="New last name"
            value={lName}
            onChangeText={(text) => setlName(text)}
            style={styles.input}
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={changeProfile} style={styles.button}>
            <Text style={styles.buttonText}>Change name</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangeNameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  changeProfileContainer: {
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
