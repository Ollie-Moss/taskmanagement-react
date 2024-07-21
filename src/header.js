import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {

    return (
        <header className="backdrop-blur-md backdrop-saturate-200 w-full bg-white/35" >
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div>
                    <a className="text-lg font-bold text-black" href="#">Logo</a>
                </div>
                <div>
                    <div className="space-x-20 flex items-center justify-center">
                        <a className="text-lg font-bold text-black hover:text-primary-600" href="/dashboard">Dashboard</a>
                        <a className="text-lg font-bold text-black hover:text-primary-600" href="/courses">Courses</a>
                        <a className="text-lg font-bold text-black hover:text-primary-600" href="/assignments">Assignments</a>
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
        user ? 
        <Logout />
        :
        <div>
            <a className="text-lg font-bold text-black hover:text-primary-600" href="/auth">Login</a>
        </div>
    );
}
const Logout = () => {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
    );
}
export default Header
