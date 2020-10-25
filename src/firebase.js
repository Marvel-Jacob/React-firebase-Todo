import firebase from "firebase";

// assign firebaseConfig var here

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
