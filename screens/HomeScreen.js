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

const HomeScreen = (props) => {
  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
    admin: admin,
  } = props.route.params;
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [dayOfDate, setDayOfDate] = useState();
  const [greeting, setGreeting] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const currentDate = new Date();
    setMonth(getMonthDesc(currentDate.getMonth() + 1));
    setDay(currentDate.getDate());
    setDayOfDate(getDayDesc(currentDate.getDay()));
    setGreeting(getGreetingDesc(currentDate.getHours()));
  }, []);

  const getMonthDesc = (num) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[num - 1];
  };

  const getDayDesc = (num) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[num];
  };

  const getGreetingDesc = (currentHour) => {
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate("Setting", {
            firstName,
            lastName,
            email,
            admin,
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
        <Text style={styles.daily}>Daily 1/1</Text>
        <Text style={styles.weekly}>Weekly 1/1</Text>
      </View>
      <View style={styles.buttonContainer}>
        {admin && (
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
              admin,
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
