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
gglProvider.setCustomParameters({'prompt':'select_account'}); //optional 

const myGoogleSignIn = ()=>firebase.auth().signInWithPopup(gglProvider);

const myFirestore = firebase.firestore();

const setUserIntoFirestore = async (authUser, otherInfo)=>{
    if (!authUser) return;       
    
    const myRefObj = myFirestore.doc(`users/${authUser.uid}`)
    const mySnapshotObj= await myRefObj.get();
    if(mySnapshotObj.exists){
        console.log('it exists')        
    }else{
        console.log('it doesnt exist')
        const {displayName, email} = authUser;
        const setDate = new Date();
        try {
            await myRefObj.set({
                displayName,
                email,
                setDate,
                ...otherInfo
            })
            console.log('it was added')    
        } catch (error) {
            console.log('error inserting date inot DB', error.message)
        }
    
    }    
    return myRefObj;         
}



export const auth = firebase.auth();
export {myGoogleSignIn};
export default firebase;
export {setUserIntoFirestore}

