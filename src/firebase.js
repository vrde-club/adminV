
import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
    .initializeApp({
        apiKey: "AIzaSyCwgdBtHXEyUVLe9yP_la8IrN0qG2SYeFM",
        authDomain: "vrde-admin.firebaseapp.com",
        databaseURL: "https://vrde-admin.firebaseio.com",
        projectId: "vrde-admin",
        storageBucket: "",
        messagingSenderId: "549162612019",
        appId: "1:549162612019:web:8eaa67dae5a1304c43fa46"
    })
    .database()

