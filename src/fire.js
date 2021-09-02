import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIcLrBkPAd1Jb3EX82hRb2_hkrgP9Zgic",
  authDomain: "react-blogapp-4c21a.firebaseapp.com",
  databaseURL:
    "https://react-blogapp-4c21a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-blogapp-4c21a",
  storageBucket: "react-blogapp-4c21a.appspot.com",
  messagingSenderId: "599656751034",
  appId: "1:599656751034:web:3f7427dd11d06162464783",
  measurementId: "G-BTYPWXMKBN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const Glogin = () => {
  console.log(" brilliant");
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      console.log("success fully signed");

      localStorage.setItem("config", "/home");
      window.location.reload();
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("failed to sign in");
     
    });
};

//sign in with google

export const db = getFirestore();

// saveData()

function saveData(){

const citiesRef = collection(db, "titles");
console.log(citiesRef);

const docRef = addDoc(collection(db, "titles"), {
  name:"parthhhha",
  class:"21"
});
console.log(docRef);

setDoc(doc(db, "titles", "new-city-id"), {name: "the newyourk city"}); // for specified id 

}

// getDatas()

function getDatas(){

const querySnapshot = getDocs(collection(db, "titles"));

querySnapshot.then((res) => {
  console.log(res.docs);
  res.docs.forEach((data) => {
    let docum= data.id
    console.log(data.id);

    const docRef = doc(db, "titles", docum);  // for specified id

    getDoc(docRef).then((res) => {
      console.log(res.data());
    });
  });
});
}

function deleteData(){

deleteDoc(doc(db, "cities", "new-city-id"));
}

console.log("done its lel");
