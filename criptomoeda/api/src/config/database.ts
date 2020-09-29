import * as firebase from "firebase";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const firestore = app.firestore();

export default firestore;
