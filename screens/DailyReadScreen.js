import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Linking,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-paper";
import YoutubePlayer from "react-native-youtube-iframe";

const DailyReadScreen = (props) => {
  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
    admin: admin,
    month: month,
    day: day,
    dayOfDate: dayOfDate,
  } = props.route.params;
  const theme = {
    colors: {
      primary: "#09DEC5",
    },
  };

  const getDateRank = (actualDay) => {
    if (actualDay === 1) {
      return "st";
    } else if (actualDay === 2) {
      return "nd";
    } else if (actualDay === 3) {
      return "rd";
    } else {
      return "th";
    }
  };

  const ExternalLink = (props) => {
    const { url, children, style = {} } = props;

    const onPress = () =>
      Linking.canOpenURL(url).then(() => {
        Linking.openURL(url);
      });

    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.text, style]}>{children}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Daily - Life Devos</Text>
        <Text style={styles.date}>
          {dayOfDate} - {month} {day}
          {getDateRank(day)}
        </Text>
      </View>
      <Divider bold={true} style={styles.divider} />
      <View style={styles.bibleVerses}>
        <ScrollView style={styles.scrollView}>
          <Text>
            In the second year of Darius the king, in the sixth month, on the
            first day of the month, the word of the Lord came by the hand of
            Haggai the prophet to Zerubbabel the son of Shealtiel, governor of
            Judah, and to Joshua the son of Jehozadak, the high priest: 2 “Thus
            says the Lord of hosts: These people say the time has not yet come
            to rebuild the house of the Lord.” 3 Then the word of the Lord came
            by the hand of Haggai the prophet, 4 “Is it a time for you
            yourselves to dwell in your paneled houses, while this house lies in
            ruins? 5 Now, therefore, thus says the Lord of hosts: Consider your
            ways. 6 You have sown much, and harvested little. You eat, but you
            never have enough; you drink, but you never have your fill. You
            clothe yourselves, but no one is warm. And he who earns wages does
            so to put them into a bag with holes. In the second year of Darius
            the king, in the sixth month, on the first day of the month, the
            word of the Lord came by the hand of Haggai the prophet to
            Zerubbabel the son of Shealtiel, governor of Judah, and to Joshua
            the son of Jehozadak, the high priest: 2 “Thus says the Lord of
            hosts: These people say the time has not yet come to rebuild the
            house of the Lord.” 3 Then the word of the Lord came by the hand of
            Haggai the prophet, 4 “Is it a time for you yourselves to dwell in
            your paneled houses, while this house lies in ruins? 5 Now,
            therefore, thus says the Lord of hosts: Consider your ways. 6 You
            have sown much, and harvested little. You eat, but you never have
            enough; you drink, but you never have your fill. You clothe
            yourselves, but no one is warm. And he who earns wages does so to
            put them into a bag with holes. In the second year of Darius the
            king, in the sixth month, on the first day of the month, the word of
            the Lord came by the hand of Haggai the prophet to Zerubbabel the
            son of Shealtiel, governor of Judah, and to Joshua the son of
            Jehozadak, the high priest: 2 “Thus says the Lord of hosts: These
            people say the time has not yet come to rebuild the house of the
            Lord.” 3 Then the word of the Lord came by the hand of Haggai the
            prophet, 4 “Is it a time for you yourselves to dwell in your paneled
            houses, while this house lies in ruins? 5 Now, therefore, thus says
            the Lord of hosts: Consider your ways. 6 You have sown much, and
            harvested little. You eat, but you never have enough; you drink, but
            you never have your fill.
          </Text>
        </ScrollView>
      </View>
      <View style={styles.videoContainer}>
        <Text style={styles.title}>Weekly - Latest Sermon</Text>
      </View>
      <Divider bold={true} style={styles.divider} />
      <View style={styles.youtube}>
        <YoutubePlayer
          height={200}
          play={false}
          videoId={"IbsWk3g8N5k?si=SIsmYSdEJz28M-_u"}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default DailyReadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
  },
  titleContainer: {
    marginTop: 70,
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
    marginTop: 5,
    backgroundColor: "#09DEC5",
    marginRight: 20,
  },
  bibleVerses: {
    marginTop: 10,
    marginRight: 20,
  },
  scrollView: {
    maxHeight: 350,
  },
  videoContainer: {
    marginTop: 40,
  },
  youtube: {
    marginTop: 20,
    marginRight: 20,
  },
});
