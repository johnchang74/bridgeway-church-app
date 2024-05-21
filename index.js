// eslint-disable-next-line import/no-unresolved
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
// import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
// import {
//   getFirestore,
//   Timestamp,
//   FieldValue,
//   Filter,
// } from "firebase-admin/firestore";
// import serviceAccount from "./serviceAccountKey.json";

// initializeApp({
//   credential: cert(serviceAccount),
// });
// const app = initializeApp(serviceAccount);
// const database = getFirestore(app);

AppRegistry.registerComponent(appName, () => App);
