import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {

    return (
        <header className="fixed top-0 w-full bg-primary-600" >
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div>
                    <a className="lg:pr-40 sm:pr-20 text-lg font-bold text-white" href="#">Logo</a>
                </div>
                <div>
                    <div className="md:space-x-20 sm:space-x-10 flex items-center justify-center">
                        <a className="text-lg font-bold text-white hover:text-primary-200" href="/dashboard">Dashboard</a>
                        <a className="text-lg font-bold text-white hover:text-primary-200" href="/courses">Courses</a>
                        <a className="text-lg font-bold text-white hover:text-primary-200" href="/assignments">Assignments</a>
                    </div>
                </div>

                <Profile />
            </nav>
        </header>
    )
}

const Profile = () => {
    const [user, loading, error] = useAuthState(auth);
    return (
        loading ?
        <div>
            <a className="text-lg font-bold text-white hover:text-primary-200">...</a>
        </div>
        :
        user ? 
        <Logout />
        :
        <div>
            <button className='px-3 py-1 rounded-md border-white border-2 border-solid text-lg font-bold text-white hover:text-primary-600 hover:bg-white inline'> 
                <a href='/auth'> Login </a>
            </button>
            <p className='px-2 text-lg font-bold text-white inline'> or </p>
            <button className='px-3 py-1 rounded-md border-white border-2 border-solid bg-white text-lg font-bold text-primary-600 hover:text-white hover:bg-primary-600 inline'> 
                <a href='/signup'> Sign Up </a>
            </button>
        </div>
    );
}
const Logout = () => {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()} className='px-3 py-1 rounded-md border-white border-2 border-solid text-lg font-bold text-white hover:text-primary-600 hover:bg-white inline'> 
            <a > Sign Out </a>
        </button>
    );
}
export default Header
