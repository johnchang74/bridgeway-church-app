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
} from "../utils/utility";

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
  const navigation = useNavigation();

  useEffect(() => {
    if (completeCount === 0) {
      setCompleteCount((checkDaily ? 1 : 0) + (checkWeekly ? 1 : 0));
    }
  }, [checkDaily, checkWeekly]);

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
            containerStyle={styles.dailyCheckbox}
            onPress={() => {
              if (!checkDaily) {
                setCheckDaily(!checkDaily ? !checkDaily : checkDaily);
                updateDailyRead(true, getCurrentDate(), email);
              }
            }}
          />
        </View>
        <Divider bold={true} style={styles.divider} />
        <View style={styles.bibleVerses}>
          <ScrollView style={styles.scrollView}>
            <Text>
              In the second year of Darius the king, in the sixth month, on the
              first day of the month, the word of the Lord came by the hand of
              Haggai the prophet to Zerubbabel the son of Shealtiel, governor of
              Judah, and to Joshua the son of Jehozadak, the high priest: 2
              “Thus says the Lord of hosts: These people say the time has not
              yet come to rebuild the house of the Lord.” 3 Then the word of the
              Lord came by the hand of Haggai the prophet, 4 “Is it a time for
              you yourselves to dwell in your paneled houses, while this house
              lies in ruins? 5 Now, therefore, thus says the Lord of hosts:
              Consider your ways. 6 You have sown much, and harvested little.
              You eat, but you never have enough; you drink, but you never have
              your fill. You clothe yourselves, but no one is warm. And he who
              earns wages does so to put them into a bag with holes. In the
              second year of Darius the king, in the sixth month, on the first
              day of the month, the word of the Lord came by the hand of Haggai
              the prophet to Zerubbabel the son of Shealtiel, governor of Judah,
              and to Joshua the son of Jehozadak, the high priest: 2 “Thus says
              the Lord of hosts: These people say the time has not yet come to
              rebuild the house of the Lord.” 3 Then the word of the Lord came
              by the hand of Haggai the prophet, 4 “Is it a time for you
              yourselves to dwell in your paneled houses, while this house lies
              in ruins? 5 Now, therefore, thus says the Lord of hosts: Consider
              your ways. 6 You have sown much, and harvested little. You eat,
              but you never have enough; you drink, but you never have your
              fill. You clothe yourselves, but no one is warm. And he who earns
              wages does so to put them into a bag with holes. In the second
              year of Darius the king, in the sixth month, on the first day of
              the month, the word of the Lord came by the hand of Haggai the
              prophet to Zerubbabel the son of Shealtiel, governor of Judah, and
              to Joshua the son of Jehozadak, the high priest: 2 “Thus says the
              Lord of hosts: These people say the time has not yet come to
              rebuild the house of the Lord.” 3 Then the word of the Lord came
              by the hand of Haggai the prophet, 4 “Is it a time for you
              yourselves to dwell in your paneled houses, while this house lies
              in ruins? 5 Now, therefore, thus says the Lord of hosts: Consider
              your ways. 6 You have sown much, and harvested little. You eat,
              but you never have enough; you drink, but you never have your
              fill.
            </Text>
          </ScrollView>
        </View>
        <View style={styles.videoContainer}>
          <View>
            <Text style={styles.title}>Weekly - Latest Sermon</Text>
          </View>
          <CheckBox
            center
            checked={checkWeekly}
            checkedColor="#09DEC5"
            title="Complete"
            size={35}
            containerStyle={styles.weeklyCheckbox}
            onPress={() => {
              if (!checkWeekly) {
                setCheckWeekly(!checkWeekly ? !checkWeekly : checkWeekly);
                updateWeeklyRead(true, getCurrentDate(), email);
              }
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
          onPress={() =>
            navigation.navigate("Home", {
              firstName,
              lastName,
              email,
              extraInfo,
            })
          }
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
  divider: {
    backgroundColor: "#09DEC5",
    marginRight: 20,
    marginTop: -7,
  },
  bibleVerses: {
    marginTop: 10,
    marginRight: 20,
  },
  scrollView: {
    maxHeight: 350,
  },
  videoContainer: {
    marginTop: 35,
    flexDirection: "row",
  },
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
  dailyCheckbox: {
    width: "10%",
    height: "93%",
    backgroundColor: "white",
    marginLeft: "45%",
    marginTop: -6,
    alignItems: "center",
  },
  weeklyCheckbox: {
    width: "10%",
    height: 50,
    backgroundColor: "white",
    marginLeft: "29%",
    marginTop: -15,
    alignItems: "center",
  },
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
