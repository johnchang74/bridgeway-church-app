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
  const currentDate = new Date();
  const month = getMonthDesc(currentDate.getMonth() + 1);
  const day = currentDate.getDate();
  const dayOfDate = getDayDesc(currentDate.getDay());
  const greeting = getGreetingDesc(currentDate.getHours());
  const formatToday = getCurrentDate();
  const navigation = useNavigation();

  const checkDaily = () => {
    if (extraInfo.dailyDate !== "") {
      const todayDate = new Date(formatToday + "T00:00:00");
      const dailyDate = new Date(extraInfo.dailyDate + "T00:00:00");
      if (dailyDate < todayDate) {
        updateDailyRead(false, "", email);
      }
    }
    return extraInfo.daily;
  };

  const checkWeekly = () => {
    if (extraInfo.weeklyDate !== "") {
      const todayDate = new Date(formatToday + "T00:00:00");
      const closestSundayDate = new Date(
        getClosestSunday(extraInfo.weeklyDate) + "T00:00:00"
      );
      if (closestSundayDate < todayDate) {
        updateWeeklyRead(false, "", email);
      }
    }
    return extraInfo.weekly;
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
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
        <Pressable
          onPress={() =>
            navigation.navigate("ContactUs", {
              firstName,
              lastName,
              email,
              extraInfo,
            })
          }
        >
          <Image
            style={styles.contactUs}
            source={require("../assets/church.png")}
          />
        </Pressable>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.date}>{day}</Text>
        <Text style={styles.dayOfDate}>{dayOfDate}</Text>
        <Text style={styles.greeting}>
          {greeting}, {firstName}!
        </Text>
        <Text style={styles.daily}>
          {/* Daily {extraInfo && checkDaily() ? 1 : 0}/1 */}
          Daily {extraInfo && extraInfo.daily ? 1 : 0}/1
        </Text>
        <Text style={styles.weekly}>
          {/* Weekly {extraInfo && checkWeekly() ? 1 : 0}/1 */}
          Weekly {extraInfo && extraInfo.weekly ? 1 : 0}/1
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {extraInfo && extraInfo.admin && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HolyBible", {
                firstName,
                lastName,
                email,
                extraInfo,
              })
            }
            style={styles.button}
          >
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
      <View style={{ marginTop: -40 }}>
        <Text
          style={{
            fontSize: 12,
            textAlign: "center",
            color: "white",
            fontWeight: 500,
          }}
        >
          © 2024 Bridgeway Church
        </Text>
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
    maxHeight: "65%",
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
    marginTop: 30,
  },
  daily: {
    fontWeight: "800",
    fontSize: 18,
    color: "white",
    marginTop: 70,
  },
  weekly: {
    fontWeight: "800",
    fontSize: 18,
    color: "white",
  },
  setting: {
    marginTop: "35%",
    marginLeft: "20%",
    height: "20%",
    width: "45%",
  },
  contactUs: {
    marginTop: 30,
    marginLeft: -20,
    height: 35,
    width: 65,
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
