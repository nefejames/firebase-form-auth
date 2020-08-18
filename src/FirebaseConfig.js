import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  return userRef;
};

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
