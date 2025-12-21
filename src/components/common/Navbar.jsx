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
            <div className="w-11/12 mx-auto py-3">
                <div className="flex items-center justify-between px-3 md:px-5 bg-gradient-to-br from-red-200 to-red-200 backdrop-blur-xl rounded-3xl shadow-xl border border-red-700">

                    {/* Left */}
                    <div className="flex items-center gap-3">
                        {/* Hamburger */}
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

                        {/* Logo */}
                        <Link to="/" onClick={closeMenu} className="flex items-center">
                            <img className="w-12 hidden md:block" src={logoImg} alt="" />
                            <img className="h-9 md:h-12" src={logo} alt="Blood Care Logo" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal gap-5 text-lg font-medium">
                            {links}
                        </ul>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
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

                                    <div className="hidden md:flex flex-col">
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
                                    className="dropdown-content menu p-3 shadow-2xl bg-red-100 rounded-2xl w-56 md:w-64 border border-red-100 mt-2 z-50"
                                >
                                    <li>
                                        <Link to="/dashboard/my-profile"> <CgProfile /> My Profile</Link>
                                    </li>
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

                {/* Mobile Menu */}
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
