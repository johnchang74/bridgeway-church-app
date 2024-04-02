import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateDailyRead = async (dailyFlag, dailyReadDate) => {
  const docRef = doc(db, "users", email);
  console.log(`docRef for daily: `, docRef);
  await updateDoc(docRef, {
    "extraInfo.daily": dailyFlag,
    "extraInfo.dailyDate": dailyReadDate,
  });
};

export const updateWeeklyRead = async (weeklyFlag, weeklyReadDate) => {
  const docRef = doc(db, "users", email);
  console.log(`docRef for weekly: `, docRef);
  await updateDoc(docRef, {
    "extraInfo.weekly": weeklyFlag,
    "extraInfo.weeklyDate": weeklyReadDate,
  });
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  return `${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
};

export const getGivenDate = (givenDate) => {
  const givenDateObj = new Date(givenDate);
  return `${
    givenDateObj.getMonth() + 1
  }/${givenDateObj.getDate()}/${givenDateObj.getFullYear()}`;
};

export const getDateRank = (actualDay) => {
  if (actualDay % 10 === 1) {
    return "st";
  } else if (actualDay % 10 === 2) {
    return "nd";
  } else if (actualDay % 10 === 3) {
    return "rd";
  } else {
    return "th";
  }
};

export const getClosestSunday = (weeklyDate) => {
  const weeklyDateObj = new Date(weeklyDate);
  const addDaysForClosestSunday = 7 - weeklyDateObj.getDay();
  console.log(`addDaysForClosestSunday: `, addDaysForClosestSunday);
  const nextClosestSunday = weeklyDateObj.setDate(
    weeklyDateObj.getDate() + addDaysForClosestSunday
  );
  console.log(`nextClosestSunday: `, nextClosestSunday);
  return getGivenDate(nextClosestSunday);
};

export const getMonthDesc = (num) => {
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

export const getDayDesc = (num) => {
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

export const getGreetingDesc = (currentHour) => {
  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};
