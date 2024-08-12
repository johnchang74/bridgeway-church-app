import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ContactUsScreen = (props) => {
  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
    extraInfo: extraInfo,
  } = props.route.params;
  const navigation = useNavigation();

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
        <Text style={styles.title}>Join our service!</Text>
        <Text style={{ marginTop: 10, padding: 5, fontWeight: 500 }}>
          We are located at 411 Gordon Baker Rd, 2nd floor in Toronto Ontario
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 500,
            padding: 5,
            color: "#09DEC5",
          }}
        >
          In Person
        </Text>
        <Text style={{ padding: 5, marginLeft: 20, marginRight: 20 }}>
          We have our Sunday service @ 10:30am in our main chapel on the second
          floor. We are an intergenerational church where all ages come together
          for one worship service. Join us as we worship as one family!
        </Text>
        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: 500, color: "#09DEC5" }}>
            Online Worship
          </Text>
          <Text style={{ padding: 5, marginLeft: 20, marginRight: 20 }}>
            If you are unable to visit in person, we also provide a Zoom meeting
            link every Sunday
          </Text>
          <Text style={{ padding: 5 }}>
            For a zoom link, please contact
            <Text
              style={{ color: "#09DEC5", fontWeight: 500 }}
              onPress={() =>
                Linking.openURL("mailto:bridgewaychurchzoom@gmail.com")
              }
            >
              {" "}
              bridgewaychurchzoom@gmail.com
            </Text>
          </Text>
          <Text style={{ padding: 5, marginLeft: 20, marginRight: 20 }}>
            Our service is delivered online through the Zoom app, with an order
            of worship that accommodates families. Invite links are sent by
            e-mail. Please use the contact form to get a free invite!
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            marginTop: 20,
            fontSize: 12,
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          © 2024 Bridgeway Church
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    height: 45,
    width: 45,
    marginTop: 10,
    marginLeft: 10,
  },
  title: {
    fontWeight: "800",
    fontSize: 25,
    color: "#09DEC5",
  },
});
