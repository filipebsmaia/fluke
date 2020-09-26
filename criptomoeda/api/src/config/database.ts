import * as firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  projectId: process.env.FIREBASE_PROJECT_ID,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
});

const firestore = app.firestore();

export default firestore;
