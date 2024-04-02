import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

const SettingScreen = (props) => {
  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
    extraInfo: extraInfo,
  } = props.route.params;
  console.log(`firstName: ${firstName} lastName: ${lastName}`);
  const navigation = useNavigation();
  const auth = getAuth();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        navigation.navigate("Login", {
          firstName,
          lastName,
          email,
          extraInfo,
        });
      })
      .catch((error) => {
        throw error;
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={logOut} style={styles.button}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
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
    height: "10%",
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
    marginTop: 60,
    marginLeft: 230,
    height: 30,
  },
  edit: {
    height: 20,
    width: 50,
    backgroundColor: "#09DEC5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "700",
  },
  userContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
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
    fontWeight: "700",
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
  },
  button: {
    backgroundColor: "#09DEC5",
    width: "30%",
    height: "20%",
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
    marginTop: "10%",
    marginLeft: "5%",
    height: "18%",
    width: "10%",
  },
});
