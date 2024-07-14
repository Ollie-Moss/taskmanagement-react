import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

firebase.initializeApp({
    apiKey: "***REMOVED***",
    authDomain: "***REMOVED***",
    projectId: "***REMOVED***",
    storageBucket: "***REMOVED***.appspot.com",
    messagingSenderId: "***REMOVED***",
    appId: "1:***REMOVED***:web:***REMOVED***",
    measurementId: "***REMOVED***"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function Login() {
    const [user] = useAuthState(auth);

    return (
        <div className='flex flex-col items-center'>
            <h1 className="text-3xl font-bold">Login</h1>

            <section>
                {user ? <LoggedIn /> : <LogIn />}
            </section>
        </div>
    );
}

function LoggedIn() {
    return (
        <div>
            <Logout/>
        </div>
    );
}

function LogIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signInWithEmailAndPass = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => {
            var errorCode = error.code;

            switch(errorCode){
                case "auth/user-disabled":
                    setError("This account has been disabled!");
                    break;
                case "auth/user-not-found":
                    setError("There is no account associated with this email!");
                    break;
                case "auth/invalid-email":
                case "auth/wrong-password":
                    setError("Email or password is incorrect please try again!");
                    break
                default:
                    
            }
        });
    };
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((result) => {
            var user = result.user;

            var credential = result.credential;
            
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className='flex flex-col items-start'>
        <p>{error}</p>
            <label>
                Email: <input 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
            </label>
            <label>
                Password: <input 
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            />
            </label>
            <div className='flex justify-items-center'>
                <button className='border-solid border-2' onClick={signInWithEmailAndPass}>Sign In</button>
                <button onClick={signInWithGoogle}>or Sign In with Google</button>
            </div>
        </div>
    );
}

function Logout(){
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
    );
}
export default Login;
