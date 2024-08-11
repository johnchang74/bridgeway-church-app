import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const SettingScreen = (props) => {
  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
    extraInfo: extraInfo,
  } = props.route.params;
  const [error, setError] = useState({
    state: false,
    reason: "",
  });
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const confirmDeleteMyAccount = () => {
    setError({
      state: false,
      reason: "",
    });
    Alert.alert(
      "You are about to delete your account",
      "Are you sure that you want to delete your account?",
      [
        {
          text: "Cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await user?.delete();
              await deleteDoc(doc(db, "users", email));
            } catch (err) {
              setError({
                state: true,
                reason: `${err.message}`,
              });
            }
            navigation.navigate("Login");
          },
        },
      ]
    );
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login", {
          firstName,
          lastName,
          email,
          extraInfo,
        });
      })
      .catch((err) => {
        setError({
          state: true,
          reason: `${err.message}`,
        });
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate("Home", {
            firstName,
            lastName,
            email,
            extraInfo,
          })
        }
      >
        <Image style={styles.arrow} source={require("../assets/arrow.png")} />
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Setting</Text>
        <Image style={styles.avatar} source={require("../assets/avatar.png")} />
      </View>
      <View style={styles.editContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.edit}>
          <Text style={styles.editButtonText}>edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userContainer}>
        <Text />
        <Text style={styles.name}>
          {firstName} {lastName}{" "}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ChangeName", {
                firstName,
                lastName,
                email,
                extraInfo,
              })
            }
            style={styles.edit}
          >
            <Text style={styles.editButtonText}>edit</Text>
          </TouchableOpacity>
        </Text>
        {extraInfo && extraInfo.admin && <Text>You are an administrator</Text>}
        <Text />
        <Text style={styles.email}>{email}</Text>
        <Text />
      </View>
      <Pressable
        onPress={() =>
          navigation.navigate("ChangePassword", {
            firstName,
            lastName,
            email,
            extraInfo,
          })
        }
        style={styles.changePasswordContainer}
      >
        <Text style={styles.changePassword}>Change password</Text>
      </Pressable>
      <Pressable
        onPress={() => confirmDeleteMyAccount()}
        style={styles.changePasswordContainer}
      >
        <Text style={styles.deleteMyAccount}>Delete my account</Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={logOut} style={styles.button}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View>
        {error.state ? <Text style={styles.error}>{error.reason}</Text> : null}
      </View>
    </KeyboardAvoidingView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 35,
    color: "#09DEC5",
  },
  avatar: {
    marginTop: 30,
    height: 120,
    width: 120,
  },
  editContainer: {
    marginLeft: 230,
    height: 30,
  },
  edit: {
    height: 27,
    width: 50,
    backgroundColor: "#09DEC5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 13,
    color: "white",
    fontWeight: "700",
  },
  userContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 110,
    marginTop: 20,
  },
  name: {
    fontWeight: "800",
    fontSize: 20,
    marginTop: 20,
  },
  email: {
    fontWeight: "700",
    color: "grey",
    fontSize: 15,
  },
  changePasswordContainer: {
    alignItems: "center",
  },
  changePassword: {
    marginTop: 20,
    fontWeight: "700",
    fontSize: 19,
    color: "green",
  },
  deleteMyAccount: {
    marginTop: 20,
    fontWeight: "700",
    fontSize: 19,
    color: "red",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 110,
  },
  button: {
    backgroundColor: "#09DEC5",
    width: "30%",
    height: "23%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
  arrow: {
    height: 45,
    width: 45,
    marginTop: 25,
    marginLeft: 10,
  },
  error: {
    marginTop: 20,
    color: "red",
    fontWeight: "500",
    fontSize: 15,
  },
});
