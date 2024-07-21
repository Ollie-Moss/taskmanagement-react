import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "***REMOVED***",
    authDomain: "***REMOVED***",
    projectId: "***REMOVED***",
    storageBucket: "***REMOVED***.appspot.com",
    messagingSenderId: "***REMOVED***",
    appId: "1:***REMOVED***:web:***REMOVED***",
    measurementId: "***REMOVED***"
};

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();
