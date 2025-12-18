import { Link } from "react-router";
import logo from '../../assets/images/logo.png';
import logoImg from '../../assets/icons/logo.png'
import { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import MyLink from "../MyLink";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
    const { user, logOut } = use(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Logout Successfully')
            })
            .catch()
    }

    console.log(user)

    const links =
        <>
            <li><MyLink to="/">Home</MyLink></li>
            <li><MyLink to="/donation-requests">Donation Requests</MyLink></li>
            <li><MyLink to="/search">Search Donors</MyLink></li>
            {
                user && <li><MyLink to="/funding">Funding</MyLink></li>
            }
        </>

    return (
        <div className="w-full fixed top-0 z-50">
            <div className="navbar  w-11/12 mx-auto p-0 py-4">
                <div className="navbar px-5  bg-gradient-to-br from-red-200 to-red-200 backdrop-blur-xl rounded-3xl shadow-xl py-3 border border-red-700">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="lg:hidden text-red-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-md dropdown-content font-bold text-2xl mt-3 z-50 p-4 shadow-lg bg-gradient-to-br from-red-100 to-red-500 rounded-2xl w-52 border border-red-200 dark:border-red-800">
                                {links}
                            </ul>
                        </div>

                        <Link to="/" className="flex items-center">
                            <img className="w-16 hidden md:block" src={logoImg} alt="" />
                            <img className="h-12 mt-3 md:h-12" src={logo} alt="Blood Care Logo" />
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-lg font-medium">
                            {links}
                        </ul>
                    </div>

                    <div className="navbar-end">
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="flex items-center gap-3 cursor-pointer backdrop-blur-sm border border-red-200 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-300 group"
                                >
                                    <div className="avatar">
                                        <div className="w-10 rounded-full ring-2 ring-red-400  ring-offset-transparent">
                                            <img
                                                src={user.photoURL || "https://img.icons8.com/color/96/000000/circled-user-male-skin-type-4.png"}
                                                alt={user.displayName}
                                                referrerPolicy="no-referrer"
                                                className="rounded-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-800 truncate max-w-32">
                                            {user.displayName || "User"}
                                        </span>
                                        <span className="text-xs text-red-600 font-medium">Member</span>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-600 group-hover:text-red-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-3 shadow-2xl bg-red-200  rounded-2xl w-64 border border-red-100 mt-2 z-50"
                                >
                                    <div className="px-4 py-3 border-b border-red-100">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-12 rounded-full ring-2 ring-red-500">
                                                    <img src={user.photoURL} alt={user.displayName} referrerPolicy="no-referrer" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{user.displayName}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-2">
                                        <li>
                                            <Link
                                                to="/dashboard/my-profile"
                                                className="flex items-center gap-3 rounded-xl hover:bg-red-50 text-gray-700 font-medium py-3 px-4 transition"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                My Profile
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/dashboard"
                                                className="flex items-center gap-3 rounded-xl hover:bg-red-50 text-gray-700 font-medium py-3 px-4 transition"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18" />
                                                </svg>
                                                Dashboard
                                            </Link>
                                        </li>
                                    </div>

                                    <div className="border-t border-red-100 pt-2">
                                        <button
                                            onClick={handleLogOut}
                                            className="w-full flex items-center gap-3 rounded-xl hover:bg-red-50 text-red-600 font-bold py-3 px-4 transition"
                                        >
                                            <FiLogOut className="w-5 h-5" />
                                            Logout
                                        </button>
                                    </div>
                                </ul>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="btn bg-red-600 hover:bg-red-700 text-white border-none rounded-full px-8 shadow-lg hover:shadow-red-600/50 transition-all"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;