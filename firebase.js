import * as firebase from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { adminEmails, adminSessionDuration } from "./utils/constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQAzRBFLObqNRRUvJrOYNRXuDyI07etiU",
  authDomain: "bridgeway-544e1.firebaseapp.com",
  projectId: "bridgeway-544e1",
  storageBucket: "bridgeway-544e1.appspot.com",
  messagingSenderId: "45662878713",
  appId: "1:45662878713:web:91a0efae0f427dcf2d1b28",
  measurementId: "G-JSD2X0RZ6Q",
};

// Initialize Firebase
let app;
if (firebase.getApps().length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.getApp();
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

auth.onAuthStateChanged((user) => {
  let sessionTimeout = null;
  if (user === null) {
    // User is logged out.
    // Clear the session timeout.
    sessionTimeout && clearTimeout(sessionTimeout);
    sessionTimeout = null;
  } else {
    // User is logged in.
    // Fetch the decoded ID token and create a session timeout which signs the user out.
    if (adminEmails.includes(user.email)) {
      user.getIdTokenResult().then((idTokenResult) => {
        // Make sure all the times are in milliseconds!
        const authTime = idTokenResult.claims.auth_time * 1000;
        // special admin session duration
        const sessionDuration = adminSessionDuration;
        const millisecondsUntilExpiration =
          sessionDuration - (Date.now() - authTime);
        sessionTimeout = setTimeout(
          () => auth.signOut(),
          millisecondsUntilExpiration
        );
      });
    }
  }
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export { auth, db };
