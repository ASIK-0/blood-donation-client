import { Link } from "react-router";
import logo from "../../assets/images/logo.png";
import logoImg from "../../assets/icons/logo.png";
import { use, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import MyLink from "./MyLink";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
    const { user, logOut, role } = use(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const handleThemeChange = () => {
        setIsChecked((prev) => {
            const newState = !prev;
            const theme = newState ? "dark" : "light";
            localStorage.setItem("theme", theme);
            document.documentElement.setAttribute("data-theme", theme);
            return newState;
        });
    };

    const handleLogOut = () => {
        logOut()
            .then(() => toast.success("Logout Successfully"))
            .catch(() => { });
    };
    const closeMenu = () => setMenuOpen(false);


    const links = (
        <>
            <li onClick={closeMenu}>
                <MyLink to="/">Home</MyLink>
            </li>
            <li onClick={closeMenu}>
                <MyLink to="/donation-requests">Donation Requests</MyLink>
            </li>
            <li onClick={closeMenu}>
                <MyLink to="/search">Search donors</MyLink>
            </li>
            {user && (
                <li onClick={closeMenu}>
                    <MyLink to="/funding">Funding</MyLink>
                </li>
            )}
        </>
    );

    return (
        <div className="w-full fixed top-0 z-50">
            <div className="w-11/12 mx-auto py-6">
                <div className="flex items-center justify-between py-2 px-3 md:px-5 bg-gradient-to-br from-red-200 to-red-200 backdrop-blur-xl rounded-3xl shadow-xl border border-red-700">

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden text-red-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        <Link to="/" onClick={closeMenu} className="flex items-center">
                            <img className="w-12 hidden md:block" src={logoImg} alt="" />
                            <img className="h-9 md:h-12" src={logo} alt="Blood Care Logo" />
                        </Link>
                    </div>

                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal gap-5 text-lg font-medium">
                            {links}
                        </ul>
                    </div>
                    <div className="flex items-center gap-3">

                        <label className="swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input onClick={handleThemeChange} type="checkbox" className="theme-controller" value="synthwave" />

                            {/* sun icon */}
                            <svg
                                className="swap-off h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-on h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>

                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="flex items-center gap-3 cursor-pointer border border-red-200 rounded-full px-3 py-2 shadow-lg hover:shadow-xl transition"
                                >
                                    <div className="avatar">
                                        <div className="w-9 rounded-full ring-2 ring-red-400">
                                            <img
                                                src={
                                                    user.photoURL ||
                                                    "https://img.icons8.com/color/96/000000/circled-user-male-skin-type-4.png"
                                                }
                                                alt={user.displayName}
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-800 max-w-32 truncate">
                                            {user.displayName || "User"}
                                        </span>
                                        <span className="text-xs text-red-600 font-medium">
                                            {role}
                                        </span>
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-3 shadow-2xl bg-red-50 rounded-2xl w-56 md:w-64 border border-red-100 mt-2 z-50"
                                >
                                    <li>
                                        <Link to="/dashboard"><MdOutlineDashboardCustomize />Dashboard</Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogOut}
                                            className="text-red-600 font-bold"
                                        >
                                            <FiLogOut className="inline mr-2" />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="btn bg-red-600 hover:bg-red-700 text-white border-none rounded-full px-5 md:px-8 text-sm md:text-base"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
                {menuOpen && (
                    <div className="lg:hidden mt-3 bg-gradient-to-br from-red-100 to-red-300 rounded-2xl shadow-lg border border-red-200">
                        <ul className="menu menu-sm p-4 gap-2 font-semibold text-base">
                            {links}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
