import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAjVWRuVbVMFUETO6je-gblTSq24WYCA5M",
    authDomain: "crud-vueapp-58529.firebaseapp.com",
    projectId: "crud-vueapp-58529",
    storageBucket: "crud-vueapp-58529.appspot.com",
    messagingSenderId: "359548224100",
    appId: "1:359548224100:web:5d7c489da39e42e73a5571",
    measurementId: "G-HWLYSYYKBN"
};


firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
