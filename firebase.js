import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCG-x6kiZT243_XVb0fNilT-8FvAmpUiXU",
  authDomain: "g-chatapp.firebaseapp.com",
  projectId: "g-chatapp",
  storageBucket: "g-chatapp.appspot.com",
  messagingSenderId: "647620653324",
  appId: "1:647620653324:web:e883e9ca3e637de9919929",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
