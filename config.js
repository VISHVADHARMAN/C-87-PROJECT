import * as firebase from 'firebase'
require ('@firebase/firestore')
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCkNCfK-B3VR6eOzJnvmNmQLGyje5Prfpc",
  authDomain: "barter-6da44.firebaseapp.com",
  databaseURL: "https://barter-6da44.firebaseio.com",
  projectId: "barter-6da44",
  storageBucket: "barter-6da44.appspot.com",
  messagingSenderId: "579512968596",
  appId: "1:579512968596:web:09c6104f3ca61a7ac8db81"
};
// Initialize Firebase
if(!firebase.apps.length){ firebase.initializeApp(firebaseConfig); }
export default firebase.firestore();