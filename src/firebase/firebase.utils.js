import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBr-HD10HEtnyzzVU2_48fVj-4xCaRGjBA",
    authDomain: "crwn-db-993f4.firebaseapp.com",
    databaseURL: "https://crwn-db-993f4.firebaseio.com",
    projectId: "crwn-db-993f4",
    storageBucket: "crwn-db-993f4.appspot.com",
    messagingSenderId: "571956579643",
    appId: "1:571956579643:web:2af7445239a50ff0fa7b1e",
    measurementId: "G-M5MLQ6SR4H"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email, 
                createdAt,
                ...additionalData
            })
        } 
        
        catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}  

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;