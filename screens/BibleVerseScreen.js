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
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { getCurrentDate, getCurrentEpochTime } from "../utils/utility";
import { Platform } from "react-native";

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
  const [selectedVerses, setSelectedVerses] = useState([]);

  const addVerse = (verse) => {
    if (!selectedVerses.includes(verse)) {
      setSelectedVerses([...selectedVerses, verse]);
    } else {
      const newVerses = selectedVerses.filter((item) => item !== verse);
      setSelectedVerses(newVerses);
    }
  };

  const saveVerse = async (chapter) => {
    await setDoc(doc(db, "daily", chapter), {
      book: bookName,
      chapter: chapter,
      createdDate: getCurrentDate(),
      createdTime: getCurrentEpochTime(),
      verses: selectedVerses,
    });
    setSelectedVerses([]);
    navigation.navigate("Home", {
      firstName,
      lastName,
      email,
      extraInfo,
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable
        onPress={() => {
          setSelectedVerses([]);
          navigation.navigate("HolyBible", {
            firstName,
            lastName,
            email,
            extraInfo,
          });
        }}
      >
        <Image style={styles.arrow} source={require("../assets/arrow.png")} />
      </Pressable>
      <SafeAreaView style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.verses}>
            {content.verses
              ? content.verses.map((verse) => {
                  return (
                    <View
                      style={
                        selectedVerses.includes(verse)
                          ? styles.verse("black")
                          : styles.verse("gray")
                      }
                      key={`${bookName.trim().toLowerCase()}-${
                        content.chapter
                      }-${verse}`}
                    >
                      <Button
                        key={`${bookName.trim().toLowerCase()}-${
                          content.chapter
                        }-${verse}`}
                        title={verse}
                        onPress={() => addVerse(verse)}
                        color={Platform.OS === "ios" ? "white" : "gray"}
                      />
                    </View>
                  );
                })
              : ""}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={
                selectedVerses.length === 0
                  ? [styles.saveButton, styles.disabled]
                  : styles.saveButton
              }
              onPress={() => saveVerse(content.chapter)}
              disabled={selectedVerses.length === 0}
            >
              <Text style={styles.saveButtonText} allowFontScaling={false}>
                Save Verses
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontSize: 12, textAlign: "center", color: "white" }}>
            © 2024 Bridgeway Church
          </Text>
        </View>
      </SafeAreaView>
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
    width: 350,
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
    marginTop: 50,
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
  disabled: {
    opacity: 0.3,
    cursor: "not-allowed",
  },
  saveButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
