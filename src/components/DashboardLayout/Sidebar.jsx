import { Link, NavLink } from "react-router";
import logoImg from "../../assets/icons/logo.png";
import { use, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { AuthContext } from "../../contexts/AuthContext";
import {
    Users,
    FileText,
    UserCircle,
    LogOut,
    PlusCircle,
    ListOrdered,
    HandCoins,
    HomeIcon,
} from "lucide-react";

const Sidebar = () => {
    const { role } = use((AuthContext))
    const [open, setOpen] = useState(false);
    const navLinkStyles = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
            ? "bg-[#FF5C5C] text-white shadow-md"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        }`;

    const closeSidebar = () => setOpen(false);

    console.log(role)
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
            >
                <HiMenuAlt3 size={26} />
            </button>

            {open && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                />
            )}

            <div
                className={`h-screen w-64 bg-white border-r border-gray-200 flex flex-col p-4 fixed lg:static  top-0 left-0 z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-[#ea4c4a45] rounded-lg flex items-center justify-center">
                            <img src={logoImg} alt="" />
                        </div>
                        <Link to="/" className="text-2xl font-bold text-red-400">
                            RedPulse
                        </Link>
                    </div>

                    <button onClick={closeSidebar} className="lg:hidden">
                        <HiX size={24} />
                    </button>
                </div>
                <nav className="flex-1 space-y-2">
                    <NavLink to="/dashboard" end className={navLinkStyles} onClick={closeSidebar}>
                        <HomeIcon size={20} />
                        Dashboard
                    </NavLink>

                    {role === "Admin" && (
                        <NavLink
                            to="/dashboard/all-users"
                            className={navLinkStyles}
                            onClick={closeSidebar}
                        >
                            <Users size={20} />
                            All Users
                        </NavLink>
                    )}

                    {(role === "Admin" || role === "volunteer") && (
                        <NavLink
                            to="/dashboard/all-blood-donation-request"
                            className={navLinkStyles}
                            onClick={closeSidebar}
                        >
                            <FileText size={20} />
                            All Requests
                        </NavLink>
                    )}
                    
                    {role === "donor" && (
                        <>
                            <NavLink
                                to="/dashboard/my-donation-requests"
                                className={navLinkStyles}
                                onClick={closeSidebar}
                            >
                                <ListOrdered size={20} />
                                My Requests
                            </NavLink>

                            <NavLink
                                to="/dashboard/create-donation-request"
                                className={navLinkStyles}
                                onClick={closeSidebar}
                            >
                                <PlusCircle size={20} />
                                Create Request
                            </NavLink>
                        </>
                    )}

                    <NavLink
                        to="/dashboard/funding"
                        className={navLinkStyles}
                        onClick={closeSidebar}
                    >
                        <HandCoins size={20} />
                        Funding
                    </NavLink>
                </nav>
                <div className="pt-4 border-t border-gray-100 space-y-2">
                    <NavLink
                        to="/dashboard/profile"
                        className={navLinkStyles}
                        onClick={closeSidebar}
                    >
                        <UserCircle size={20} />
                        Profile
                    </NavLink>

                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
