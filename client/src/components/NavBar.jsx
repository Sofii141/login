import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function NavBar() {

    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to={
                isAuthenticated ? '/tasks' : '/'
            }><h1 className="text-2xl font-bold">Tasks manager</h1></Link>
            <ul className="flex gap-x-2">
                {isAuthenticated ?
                    (<>
                        <li>
                            Welcome {user.username}
                        </li>
                        <li>
                            <Link to='/add-task'
                            className="bg-indigo-500 px-4 py-1 rounded-md mx-3">Add Task</Link>
                            <Link to='/' onClick={() => {
                                logout();
                            }} className="bg-indigo-500 px-4 py-1 rounded-md my-3">Logout</Link>
                        </li>

                    </>) :
                    (
                        <>
                            <li>
                                <Link to='/login'
                                    className="bg-indigo-500 px-4 py-1 rounded-sm">Login</Link>
                            </li>
                            <li>
                                <Link to='/register'
                                    className="bg-indigo-500 px-4 py-1 rounded-sm">Register</Link>
                            </li>
                        </>
                    )}

            </ul>
        </nav>
    )
}

export default NavBar; 