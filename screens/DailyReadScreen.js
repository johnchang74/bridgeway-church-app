import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-paper";
import YoutubePlayer from "react-native-youtube-iframe";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import {
  getDateRank,
  getCurrentDate,
  updateDailyRead,
  updateWeeklyRead,
  findAllDocs,
  getVerses,
} from "../utils/utility";
import { Platform, ActivityIndicator } from "react-native";
import { useFetchBibleBookChapterVerse } from "../utils/hooks";
import { removeNewlines } from "../utils/utility";

const DailyReadScreen = (props) => {
  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
    extraInfo: extraInfo,
    month: month,
    day: day,
    dayOfDate: dayOfDate,
  } = props.route.params;
  const theme = {
    colors: {
      primary: "#09DEC5",
    },
  };
  const [checkDaily, setCheckDaily] = useState(extraInfo.daily || false);
  const [checkWeekly, setCheckWeekly] = useState(extraInfo.weekly || false);
  const [completeCount, setCompleteCount] = useState(
    (checkDaily ? 1 : 0) + (checkWeekly ? 1 : 0) || 0
  );
  const [dailyRead, setDailyRead] = useState({
    book: "",
    chapter: "",
    verse: "",
  });
  const navigation = useNavigation();
  const { data, isLoading } = useFetchBibleBookChapterVerse(
    dailyRead.book,
    dailyRead.chapter,
    dailyRead.verse.split(",")
  );

  useEffect(() => {
    setCompleteCount((checkDaily ? 1 : 0) + (checkWeekly ? 1 : 0));
    getDailyVerses();
  }, [checkDaily, checkWeekly]);

  const getDailyVerses = async () => {
    const dailyDocs = await findAllDocs("daily");
    let createdAt = 0;
    let bookName = "";
    let chapter = "";
    let verseNumbers = "";
    dailyDocs?.forEach((item) => {
      if (createdAt < item.createdTime) {
        createdAt = item.createdTime;
        bookName = item.book;
        chapter = item.chapter;
        verseNumbers = getVerses(item.verses);
      }
    });
    setDailyRead({
      book: bookName,
      chapter: chapter,
      verse: verseNumbers,
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
      <View style={styles.contentContainer}>
        <View style={styles.checkboxContainer}>
          <View>
            <Text style={styles.title}>Daily - Life Devos</Text>
            <Text style={styles.date}>
              {dayOfDate} - {month} {day}
              {getDateRank(day)}
            </Text>
          </View>
          <CheckBox
            center
            checked={checkDaily}
            checkedColor="#09DEC5"
            title="Complete"
            size={35}
            containerStyle={styles.dailyCheckbox(
              Platform.OS === "ios" ? -6 : -30
            )}
            onPress={() => {
              setCheckDaily(!checkDaily);
              updateDailyRead(checkDaily, getCurrentDate(), email);
            }}
          />
        </View>
        <Divider
          bold={true}
          style={styles.divider(Platform.OS === "ios" ? -7 : -75)}
        />
        <View style={styles.bibleVerses}>
          <ScrollView style={styles.scrollView}>
            <>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                {dailyRead.book}:{dailyRead.chapter}-{dailyRead.verse}
              </Text>
              <Text style={{ marginTop: 10 }}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  removeNewlines(data.verses)
                )}
              </Text>
            </>
          </ScrollView>
        </View>
        <View style={styles.videoContainer(Platform.OS === "ios" ? 35 : 15)}>
          <View>
            <Text style={styles.title}>Weekly - Latest Sermon</Text>
          </View>
          <CheckBox
            center
            checked={checkWeekly}
            checkedColor="#09DEC5"
            title="Complete"
            size={35}
            containerStyle={styles.weeklyCheckbox(
              Platform.OS === "ios" ? "29%" : "31%"
            )}
            onPress={() => {
              setCheckWeekly(!checkWeekly);
              updateWeeklyRead(checkWeekly, getCurrentDate(), email);
            }}
          />
        </View>
        <Divider bold={true} style={styles.divider} />
        <View style={styles.youtube}>
          <YoutubePlayer
            height={200}
            play={false}
            videoId={"IbsWk3g8N5k?si=SIsmYSdEJz28M-_u"}
          />
        </View>
      </View>
      <View style={styles.instructionContainer}>
        <TouchableOpacity
          style={styles.instruction}
          onPress={() => {
            extraInfo.daily = checkDaily;
            extraInfo.weekly = checkWeekly;
            navigation.navigate("Home", {
              firstName,
              lastName,
              email,
              extraInfo,
            });
          }}
        >
          <Text style={styles.instructionText}>
            {completeCount}/2 Completed
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default DailyReadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    marginTop: -110,
    marginLeft: 20,
  },
  title: {
    fontWeight: "800",
    fontSize: 18,
    color: "#09DEC5",
  },
  date: {
    marginTop: 5,
    fontWeight: "800",
    fontSize: 14,
    color: "#09DEC5",
  },
  divider: (marginTopValue) => ({
    backgroundColor: "#09DEC5",
    marginRight: 20,
    marginTop: marginTopValue,
  }),
  bibleVerses: {
    marginTop: 10,
    marginRight: 20,
  },
  scrollView: {
    maxHeight: 350,
  },
  videoContainer: (marginTopValue) => ({
    marginTop: marginTopValue,
    flexDirection: "row",
  }),
  youtube: {
    marginTop: 12,
    marginRight: 20,
  },
  arrow: {
    marginTop: "10%",
    marginLeft: "3%",
    height: "18%",
    width: "10%",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  dailyCheckbox: (marginTopValue) => ({
    width: "10%",
    height: "93%",
    backgroundColor: "white",
    marginLeft: "45%",
    marginTop: marginTopValue,
    alignItems: "center",
  }),
  weeklyCheckbox: (marginLeft) => ({
    width: "10%",
    height: 50,
    backgroundColor: "white",
    marginLeft: marginLeft,
    marginTop: -15,
    alignItems: "center",
  }),
  instructionContainer: {
    marginTop: 12,
    marginLeft: 115,
    width: "40%",
  },
  instruction: {
    backgroundColor: "#09DEC5",
    width: "100%",
    fontWeight: "700",
    fontSize: 15,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
  },
  instructionText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
