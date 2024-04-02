import React, { useEffect, useState } from "react";
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
import {
  updateDailyRead,
  updateWeeklyRead,
  getClosestSunday,
  getMonthDesc,
  getDayDesc,
  getGreetingDesc,
  getCurrentDate,
} from "../utils/utility";

const HomeScreen = (props) => {
  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
    extraInfo: extraInfo,
  } = props.route.params;
  console.log(`props.route.params: `, props.route.params);
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [dayOfDate, setDayOfDate] = useState();
  const [greeting, setGreeting] = useState();
  const [formatToday, setFormatToday] = useState();
  const [checkDaily, setCheckDaily] = useState();
  const [checkWeekly, setCheckWeekly] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const currentDate = new Date();
    setMonth(getMonthDesc(currentDate.getMonth() + 1));
    setDay(currentDate.getDate());
    setDayOfDate(getDayDesc(currentDate.getDay()));
    setGreeting(getGreetingDesc(currentDate.getHours()));
    setFormatToday(getCurrentDate());
    console.log(`extraInfo: `, extraInfo);
    if (extraInfo) {
      console.log(`extraInfo: `, extraInfo);
      if (extraInfo.dailyDate !== "") {
        const todayDate = new Date(formatToday);
        const dailyDate = new Date(extraInfo.dailyDate);
        if (dailyDate < todayDate) {
          updateDailyRead(false, "");
        }
      }

      if (extraInfo.weeklyDate !== "") {
        console.log(`extraInfo.weeklyDate: `, extraInfo.weeklyDate);
        const todayDate = new Date(formatToday);
        console.log(
          `closestSundayDate: `,
          getClosestSunday(extraInfo.weeklyDate)
        );
        const closestSundayDate = new Date(
          getClosestSunday(extraInfo.weeklyDate)
        );
        if (closestSundayDate < todayDate) {
          updateWeeklyRead(false, "");
        }
      }
    }
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate("Setting", {
            firstName,
            lastName,
            email,
            extraInfo,
          })
        }
      >
        <Image
          style={styles.setting}
          source={require("../assets/setting.png")}
        />
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.date}>{day}</Text>
        <Text style={styles.dayOfDate}>{dayOfDate}</Text>
        <Text />
        <Text />
        <Text />
        <Text style={styles.greeting}>
          {greeting}, {firstName}!
        </Text>
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text style={styles.daily}>
          Daily {extraInfo && extraInfo.daily ? 1 : 0}/1
        </Text>
        <Text style={styles.weekly}>
          Weekly {extraInfo && extraInfo.weekly ? 1 : 0}/1
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {extraInfo && extraInfo.admin && (
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Text style={styles.buttonText}>Admin</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("DailyRead", {
              firstName,
              lastName,
              email,
              extraInfo,
              month,
              day,
              dayOfDate,
            })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09DEC5",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
  },
  month: {
    fontWeight: "800",
    fontSize: 40,
    color: "white",
  },
  date: {
    fontWeight: "800",
    fontSize: 55,
    color: "white",
  },
  dayOfDate: {
    fontWeight: "800",
    fontSize: 30,
    color: "white",
  },
  greeting: {
    fontWeight: "700",
    fontSize: 20,
    color: "white",
  },
  daily: {
    fontWeight: "800",
    fontSize: 18,
    color: "white",
  },
  weekly: {
    fontWeight: "800",
    fontSize: 18,
    color: "white",
  },
  setting: {
    marginTop: "10%",
    marginLeft: "5%",
    height: "18%",
    width: "10%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
  button: {
    backgroundColor: "white",
    width: "30%",
    height: "30%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 18,
  },
});
