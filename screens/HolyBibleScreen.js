import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  Pressable,
  Button,
  SafeAreaView,
  ScrollView,
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
    console.log(`select: `, selectedBook);
    setSelectedBook(bookName);
  };

  const chooseChapter = (chapter) => {
    console.log(`selcet chapter: `, chapter);
    setSelectedChapter(chapter);
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
      <SafeAreaView style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
          {bible.map((book) => {
            // console.log(`cur: ${book.title} - select: ${selectedBook}`);
            return (
              <Expander
                buttonText={book.title}
                key={book.title.trim().toLowerCase()}
                collapsedStyle={styles.collapsedBooks}
                expandedStyle={styles.expandedBooks}
                selectedBook={selectedBook}
                expand={book.title === selectedBook}
                selectBook={() => chooseBook(book.title)}
                children={
                  <View style={styles.chapters(getChapterHeight(book.title))}>
                    {book.content.map((chapter) => {
                      return (
                        <View
                          style={
                            selectedChapter === chapter.chapter
                              ? styles.chapter("black")
                              : styles.chapter("grey")
                          }
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
                            color="white"
                          />
                        </View>
                      );
                    })}
                  </View>
                }
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default HolyBibleScreen;

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
  scrollContainer: {
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    maxHeight: 700,
  },
  contentContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: -120,
  },
  collapsedBooks: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  expandedBooks: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    color: "white",
  },
  chapters: (chapterHeight) => ({
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
    width: 340,
    height: chapterHeight,
    marginLeft: 20,
    gap: 5,
  }),
  chapter: (selectedColor) => ({
    fontSize: 17,
    fontWeight: "800",
    color: "white",
    width: 45,
    height: 45,
    backgroundColor: selectedColor,
    justifyContent: "center",
  }),
});
