import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAX_1iZ6G4FE8ZYTpIpElcCWyui7Rk5lwE",
  authDomain: "contact-form-test-cd64a.firebaseapp.com",
  databaseURL: "https://contact-form-test-cd64a.firebaseio.com",
  projectId: "contact-form-test-cd64a",
  storageBucket: "contact-form-test-cd64a.appspot.com",
  messagingSenderId: "144443373833",
  appId: "1:144443373833:web:7620d8c038d41268b87bd8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
