import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  Pressable,
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { bible } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const BibleVerseScreen = (props) => {
  const navigation = useNavigation();
  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
    extraInfo: extraInfo,
    bookName: bookName,
    content: content,
  } = props.route.params;
  const [selectedVerses, setSelectedBook] = useState([]);

  const addVerse = (verse) => {
    console.log(`Clicked verse: `, verse);
    if (!selectedVerses.includes(verse)) {
      setSelectedBook([...selectedVerses, verse]);
    }
  };

  console.log(`selected verses: `, selectedVerses);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate("HolyBible", {
            firstName,
            lastName,
            email,
            extraInfo,
          })
        }
      >
        <Image style={styles.arrow} source={require("../assets/arrow.png")} />
      </Pressable>
      <SafeAreaView style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.verses}>
            {content.verses
              ? content.verses.map((verse) => {
                  console.log(`verse: ${verse} - bookName: ${bookName}`);
                  return (
                    <View
                      style={
                        selectedVerses.includes(verse)
                          ? styles.verse("black")
                          : styles.verse("grey")
                      }
                    >
                      <Button
                        key={`${bookName.trim().toLowerCase()}-${
                          content.chapter
                        }-${verse}`}
                        title={verse}
                        onPress={() => addVerse(verse)}
                        color="white"
                      />
                    </View>
                  );
                })
              : ""}
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
          <Text style={styles.saveButtonText}>Save Verses</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BibleVerseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A19",
  },
  arrow: {
    marginTop: "10%",
    marginLeft: "3%",
    height: "18%",
    width: "10%",
  },
  scrollView: {
    maxHeight: 700,
  },
  contentContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: -120,
  },
  verses: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
    width: 340,
    marginLeft: 20,
    gap: 5,
  },
  verse: (bgColor) => ({
    fontSize: 17,
    fontWeight: "800",
    color: "white",
    width: 45,
    height: 45,
    backgroundColor: bgColor,
    justifyContent: "center",
  }),
  buttonContainer: {
    marginTop: 350,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#09DEC5",
    width: "40%",
    fontWeight: "700",
    fontSize: 15,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 20,
  },
});
