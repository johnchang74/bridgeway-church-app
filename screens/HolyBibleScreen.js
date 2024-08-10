import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  Pressable,
  Button,
  SafeAreaView,
  ScrollView,
  Platform,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { bible } from "../utils/constants";
import { Expander } from "../utils/expander";
import { useState } from "react";
import { getChapterHeight } from "../utils/utility";

const HolyBibleScreen = (props) => {
  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
    extraInfo: extraInfo,
  } = props.route.params;
  const navigation = useNavigation();
  const [selectedBook, setSelectedBook] = useState();
  const [selectedChapter, setSelectedChapter] = useState();

  const chooseBook = (bookName) => {
    setSelectedChapter();
    setSelectedBook(bookName);
  };

  const chooseChapter = (chapter) => {
    setSelectedChapter(chapter);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable
        onPress={() => {
          setSelectedBook();
          setSelectedChapter();
          navigation.navigate("Home", {
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
          {bible &&
            bible.map((book, index) => {
              return (
                <Expander
                  buttonText={book.title}
                  key={book.title.trim().toLowerCase()}
                  collapsedStyle={styles.collapsedBooks}
                  expandedStyle={styles.expandedBooks}
                  selectedBook={selectedBook}
                  expand={book.title === selectedBook}
                  selectBook={() => chooseBook(book.title)}
                  bookIndex={`${index + 1}-${book.title}`}
                  children={
                    <View
                      style={styles.chapters(getChapterHeight(book.title))}
                      id={`${index + 1}-${book.title}`}
                    >
                      {book.content.map((chapter) => {
                        return (
                          <Text
                            style={
                              selectedChapter === chapter.chapter
                                ? styles.selectedChapterStyle
                                : styles.chapter
                            }
                            key={`${book.title.trim().toLowerCase()}-${
                              chapter.chapter
                            }`}
                            allowFontScaling={false}
                          >
                            <Button
                              key={`${book.title.trim().toLowerCase()}-${
                                chapter.chapter
                              }`}
                              title={chapter.chapter}
                              onPress={() => {
                                chooseChapter(chapter.chapter);
                                navigation.navigate("BibleVerse", {
                                  firstName,
                                  lastName,
                                  email,
                                  extraInfo,
                                  bookName: book.title,
                                  content: chapter,
                                });
                              }}
                              color={
                                selectedChapter === chapter.chapter
                                  ? "#000000"
                                  : "#808080"
                              }
                            />
                          </Text>
                        );
                      })}
                    </View>
                  }
                />
              );
            })}
        </ScrollView>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 12, textAlign: "center", color: "white" }}>
            © 2024 Bridgeway Church
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default HolyBibleScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1A1A19",
  },
  arrow: {
    marginTop: "10%",
    marginLeft: "3%",
    height: "18%",
    width: "10%",
  },
  scrollContainer: {
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    maxHeight: 770,
  },
  contentContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: -120,
  },
  collapsedBooks: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  expandedBooks: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    color: "white",
  },
  chapters: (chapterHeight) => ({
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
    width: Platform.OS === "ios" ? 340 : 380,
    height: chapterHeight,
    maxHeight: chapterHeight + 30,
    marginLeft: 20,
    gap: 5,

    position: "absolute",
  }),
  chapter: {
    fontSize: 17,
    fontWeight: "800",
    color: "white",
    width: 48,
    height: 48,
    backgroundColor: "#808080",
    textAlign: "center",
  },
  selectedChapterStyle: {
    fontSize: 17,
    fontWeight: "800",
    color: "white",
    width: 48,
    height: 48,
    backgroundColor: "#000000",
    textAlign: "center",
  },
});
