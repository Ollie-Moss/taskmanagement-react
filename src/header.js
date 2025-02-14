import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';

const Header = () => {
    const [dropDown, setDropDown] = useState(null);
    return (
        <>
        <header className="z-10 fixed top-0 w-full bg-primary-600" >
            <nav>
                <div className='hidden md:flex lg:flex mx-auto max-w-7xl items-center justify-between p-6 lg:px-8'>
                    <div>
                        <a className="lg:pr-40 sm:pr-20 text-lg font-bold text-accent-600" href="#">Logo</a>
                    </div>
                    <div className="left-1/4 w-1/2 fixed">
                        <div className="lg:space-x-16 md:space-x-5 flex items-center justify-center">
                            <a className="text-lg font-bold text-accent-600 hover:text-accent-700" href="/dashboard">Dashboard</a>
                            <a className="text-lg font-bold text-accent-600 hover:text-accent-700" href="/courses">Courses</a>
                            <a className="text-lg font-bold text-accent-600 hover:text-accent-700" href="/assignments">Assignments</a>
                        </div>
                    </div>

                    <Profile />
                </div>
                <div className='flex sm:flex md:hidden lg:hidden justify-between p-6'>
                    <button onClick={() => setDropDown(!dropDown)}>
                    <svg className="h-8 w-8 text-accent-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                    </svg>
                    </button>
                    <Profile />
                </div>
                <div className={`${dropDown == null ? "hidden" : dropDown ? 'animate-slidedown' : 'animate-slideup'} grid grid-cols-0`}>
                    <div className="overflow-hidden">
                        <div className='bg-primary-650 flex sm:flex md:hidden lg:hidden flex-col items-start'>
                            <a className="w-full hover:bg-primary-700 rounded p-4 block text-lg font-bold text-accent-600 hover:text-accent-700" href="/dashboard">Dashboard</a>
                            <a className="w-full hover:bg-primary-700 rounded p-4 block text-lg font-bold text-accent-600 hover:text-accent-700" href="/courses">Courses</a>
                            <a className="w-full hover:bg-primary-700 rounded p-4 block text-lg font-bold text-accent-600 hover:text-accent-700" href="/assignments">Assignments</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <div className='bg-primary-600 h-24 sm:h-20 md:h-28 lg:h-28'>
        </div>
        </>
    )
}

const Profile = () => {
    const [user, loading, error] = useAuthState(auth);
    return (
        loading ?
        <div>
            <a className="text-lg font-bold text-accent-600 hover:text-primary-200">...</a>
        </div>
        :
        user ? 
        <Logout />
        :
        <div className='relative z-20'>
            <button className='px-3 py-1 rounded-md border-gray-200 border-2 border-solid text-lg font-bold text-accent-600 hover:text-accent-700 hover:bg-gray-200 inline'> 
                <a href='/auth'> Login </a>
            </button>
            <p className='px-2 text-lg font-bold text-accent-600 inline'> or </p>
            <button className='px-3 py-1 rounded-md border-white border-2 border-solid bg-white text-lg font-bold text-accent-600 hover:text-accent-600 hover:bg-primary-600 inline'> 
                <a href='/signup'> Sign Up </a>
            </button>
        </div>
    );
}
const Logout = () => {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()} className='px-3 py-1 rounded-md border-gray-200 border-2 border-solid text-lg font-bold text-accent-600 hover:text-accent-700 hover:bg-gray-200 inline'> 
            <a > Sign Out </a>
        </button>
    );
}
export default Header
