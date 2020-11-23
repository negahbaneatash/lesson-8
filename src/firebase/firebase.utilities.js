import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig ={    
    apiKey: "AIzaSyAQScBiZSipu_P2dabb2kebJnFWg-cdeGw",
    authDomain: "reacteshop-firebase.firebaseapp.com",
    databaseURL: "https://reacteshop-firebase.firebaseio.com",
    projectId: "reacteshop-firebase",
    storageBucket: "reacteshop-firebase.appspot.com",
    messagingSenderId: "220489842999",
    appId: "1:220489842999:web:6fc49d1e3b64a87c1a5ab2",
    measurementId: "G-S6ZSLK54CY"
}

firebase.initializeApp(firebaseConfig);

const gglProvider = new firebase.auth.GoogleAuthProvider();
// gglProvider.setCustomParameters({'prompt':'select_account'}); //optional 


const myGoogleSignIn = ()=>firebase.auth().signInWithPopup(gglProvider);

export const auth = firebase.auth();
export {myGoogleSignIn};
export default firebase;

