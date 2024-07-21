import { auth } from './firebase-config';
import background from './bg.png';

import { Navigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import { useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import Header from './header';

function Login() {
    const [user, loading, error] = useAuthState(auth);
    
    if(loading){
        return (
            <>
            <Header />
            <div style={{ backgroundImage: `url(${background})` }} className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> 
                <h1>Loading...</h1>
            </div>
            </>
        );
    }
    if(user){
        return <Navigate to="/dashboard" replace />;
    }
    return (
        <>
        <Header />
            <div style={{ backgroundImage: `url(${background})` }} className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> 
                <LogIn/>
            </div>
        </>
    );
    
}

function LoggedIn() {
    redirect("dashboard");
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
        <div className="backdrop-blur-md backdrop-saturate-200 w-full bg-white/35 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <h1 className="text-3xl mt-4 block mb-2 text-center font-bold text-white">Login</h1>
            <div className='space-y-1'>
            <div className="pl-6 pr-6 space-y-4 md:space-y-6 sm:pl-8 sm:pr-8">
            <p className='text-center text-red-600'>{error}</p>
                <label className="block mb-2 text-sm font-medium text-white">
                    Email: <input 
                            className="backdrop-blur-md backdrop-saturate-200 bg-white/10 border border-gray-300 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="example@gmail.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            />
                </label>
                <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                    Password: <input 
                                className="backdrop-blur-md backdrop-saturate-200 bg-white/10 border border-gray-300 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                </label>
                <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor='remember' className="text-white">Remember me</label>
                          </div>
                      </div>
                      <a className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
                <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={signInWithEmailAndPass}>Login In</button>
                </div>
                <p className="text-center block text-sm font-medium text-white mt-1 mb-1"> or </p> 
                <div className="pl-6 pr-6 pb-6 space-y-4 md:space-y-6 sm:pl-8 sm:pr-8 sm:pb-8">
                <button type="button" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2" onClick={signInWithGoogle}> <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"> <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Login with Google
                    <div></div>
                </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
