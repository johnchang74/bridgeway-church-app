import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../firebase";
import { bible } from "./constants";

const getTwoDigitNum = (dayNum) => {
  let dayString = dayNum.toString();
  if (dayString.length < 2) {
    return "0" + dayString;
  } else {
    return dayString;
  }
};

export const removeNewlines = (content) => {
  const verses = content?.map((verse) => {
    return `${verse.verse} ${verse.text.replace(/\n/g, " ")}`;
  });
  return verses;
};

export const getDailyRead = async (email) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);
};

export const updateDailyRead = async (dailyFlag, dailyReadDate, email) => {
  const docRef = doc(db, "users", email);
  await updateDoc(docRef, {
    "extraInfo.daily": dailyFlag,
    "extraInfo.dailyDate": dailyReadDate,
  });
};

export const getWeeklyRead = async (email) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);
};

export const updateWeeklyRead = async (weeklyFlag, weeklyReadDate, email) => {
  const docRef = doc(db, "users", email);
  await updateDoc(docRef, {
    "extraInfo.weekly": weeklyFlag,
    "extraInfo.weeklyDate": weeklyReadDate,
  });
};

export const getCurrentEpochTime = () => {
  return new Date();
};

export const getCurrentDate = () => {
  const currentDate = getCurrentEpochTime();
  return `${currentDate.getFullYear()}-${getTwoDigitNum(
    currentDate.getMonth() + 1
  )}-${getTwoDigitNum(currentDate.getDate())}`;
};

export const getGivenDate = (givenDate) => {
  const givenDateObj = new Date(givenDate);
  return `${givenDateObj.getFullYear()}-${getTwoDigitNum(
    givenDateObj.getMonth() + 1
  )}-${getTwoDigitNum(givenDateObj.getDate())}`;
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
  const nextClosestSunday = weeklyDateObj.setDate(
    weeklyDateObj.getDate() + addDaysForClosestSunday
  );
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

export const getChapterHeight = (bookName) => {
  if (bookName === "Psalm") {
    return 1160;
  } else if (bookName === "Isaiah") {
    return 530;
  } else if (bookName === "Genesis" || bookName === "Jeremiah") {
    return 420;
  } else if (bookName === "Ezekiel") {
    return 370;
  } else if (
    bookName === "Job" ||
    bookName === "Exodus" ||
    bookName === "Ezekiel"
  ) {
    return 320;
  } else if (bookName === "Numbers" || bookName === "2 Chronicles") {
    return 320;
  } else if (
    bookName === "Deuteronomy" ||
    bookName === "1 Samuel" ||
    bookName === "1 Chronicles" ||
    bookName === "Proverbs"
  ) {
    return 270;
  } else if (
    bookName === "Joshua" ||
    bookName === "Leviticus" ||
    bookName === "2 Kings" ||
    bookName === "Matthew" ||
    bookName === "2 Samuel" ||
    bookName === "1 Kings" ||
    bookName === "Luke" ||
    bookName === "Acts"
  ) {
    return 210;
  } else if (
    bookName === "Judges" ||
    bookName === "Mark" ||
    bookName === "John" ||
    bookName === "Romans" ||
    bookName === "1 Corinthians"
  ) {
    return 170;
  } else if (
    bookName === "Ezra" ||
    bookName === "Nehemiah" ||
    bookName === "Esther" ||
    bookName === "Ecclesiastes" ||
    bookName === "Song of Solomon" ||
    bookName === "Daniel" ||
    bookName === "Hosea" ||
    bookName === "Amos" ||
    bookName === "Zechariah" ||
    bookName === "2 Corinthians" ||
    bookName === "Hebrews"
  ) {
    return 120;
  } else if (
    bookName === "Galatians" ||
    bookName === "Ephesians" ||
    bookName === "Philippians" ||
    bookName === "Colossians" ||
    bookName === "1 Thessalonians" ||
    bookName === "2 Thessalonians" ||
    bookName === "1 Timothy" ||
    bookName === "2 Timothy" ||
    bookName === "Titus" ||
    bookName === "Philemon" ||
    bookName === "James" ||
    bookName === "1 Peter" ||
    bookName === "2 Peter" ||
    bookName === "1 John" ||
    bookName === "2 John" ||
    bookName === "3 John" ||
    bookName === "Jude"
  ) {
    return 50;
  } else if (
    bookName === "Ruth" ||
    bookName === "Lamentations" ||
    bookName === "Joel" ||
    bookName === "Obadiah" ||
    bookName === "Jonah" ||
    bookName === "Micah" ||
    bookName === "Nahum" ||
    bookName === "Habakkuk" ||
    bookName === "Zehpaniah" ||
    bookName === "Haggai" ||
    bookName === "Malachi"
  ) {
    return 50;
  } else {
    return 215;
  }
};

export const findAllDocs = async (collectionName) => {
  const docRefs = await getDocs(collection(db, collectionName));
  const res = [];
  docRefs.forEach((item) => {
    res.push(item.data());
  });
  return res;
};

export const getVerses = (verses) => {
  let verseList = "";
  verses.forEach((verse, index) => {
    verseList += verse;
    if (index < verses.length - 1) {
      verseList += ",";
    }
  });
  return verseList;
};

export const getBibleBookKey = (bookName) => {
  return bible.map((book) => {
    const title = book.title;
    if (title === bookName) {
      return book.key;
    }
  })[0];
};
