import { auth } from './firebase-config';

import { Navigate } from 'react-router-dom';

import { useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { updateProfile } from 'firebase/auth';
import Header from './header';

function Signup() {
    const [user, loading] = useAuthState(auth);
    
    if(loading){
        return (
            <>
            <Header />
            <div className="bg-primary-600 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> 
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
            <div className="bg-primary-600 flex flex-col items-center justify-start px-6 mx-auto md:h-screen lg:py-0"> 
                <SignupForm />
            </div>
        </>
    );
    
}

function SignupForm(){
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const signupWithEmailAndPass = () => {
        if(password !== passwordConfirm){
            setError("Passwords must match!");
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: `${firstName} ${lastName}`
                })
            })
            .catch((error) => {
            var errorCode = error.code;
            console.log(error);
            console.log(error.cause);

            switch(errorCode){
                case "auth/weak-password":
                    let msg = error.message.split('Firebase: ')[1];
                    msg = msg.split(' (')[0];
                    
                    setError(msg);
                    break;
                case "auth/email-already-in-use":
                    setError("Email is already in use!");
                    break;
                case "auth/invalid-email":
                case "auth/operation-not-allowed":
                    setError("Invalid email address!");
                    break
                default:
                    
            }
        });
    };
    return (
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
            <h1 className="text-3xl mt-4 block text-center font-bold text-black">Sign Up</h1>
            <div className='space-y-1'>
                <div className="py-2 pb-5 space-y-4 md:space-y-6 px-8">
                    <p className='text-center text-red-600'>{error}</p>
                        <label className="block mb-2 text-sm font-medium text-black">
                            First Name: <input 
                                    className="backdrop-blur-md backdrop-saturate-200 bg-white/10 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="John"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    />
                        </label>
                        <label className="block mb-2 text-sm font-medium text-black">
                            Last Name: <input 
                                    className="backdrop-blur-md backdrop-saturate-200 bg-white/10 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Smith"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    />
                        </label>
                        <label className="block mb-2 text-sm font-medium text-black">
                            Email: <input 
                                    className="backdrop-blur-md backdrop-saturate-200 bg-white/10 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="example@gmail.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    />
                        </label>
                        <label className="block mb-2 text-sm font-medium text-black dark:text-black">
                            Password: <input 
                                        className="backdrop-blur-md backdrop-saturate-200 bg-white/10 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        type='password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        />
                        </label>
                        <label className="block mb-2 text-sm font-medium text-black dark:text-black">
                            Re-enter Password: <input 
                                        className="backdrop-blur-md backdrop-saturate-200 bg-white/10 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        type='password'
                                        onChange={e => setPasswordConfirm(e.target.value)}
                                        />
                        </label>
                        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" 
                        onClick={signupWithEmailAndPass}>Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
