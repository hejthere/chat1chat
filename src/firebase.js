import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA7kiInHaotH5E1EXqmaA-j3Z4HzZJon_g",
    authDomain: "hejthere-signup.firebaseapp.com",
    databaseURL: "https://hejthere-signup-default-rtdb.firebaseio.com",
    projectId: "hejthere-signup",
    storageBucket: "hejthere-signup.appspot.com",
    messagingSenderId: "1051870581008",
    appId: "1:1051870581008:web:26cc00ff51ea98f5525595"
})

export const auth = firebaseApp.auth();
export const database = firebaseApp.database();

export default firebaseApp; 

