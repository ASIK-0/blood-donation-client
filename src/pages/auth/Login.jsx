
import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { singInUser } = use(AuthContext)

    const handleSignin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        singInUser(email, password)
            .then(() => {
                // const user = result.user;
                // console.log(user)
                toast.success("Login Successfull")
                navigate(`${location.state ? location.state : "/"}`)
            })
            .catch((error) => {
                // console.log(error.message);
                toast.error(error.message)
            });
    };

    return (
        <div className="flex items-center justify-center px-4 py-12">
            <div className="card w-full my-30 max-w-md shadow-2xl bg-white/95 backdrop-blur-md border border-red-100">
                <div className="card-body p-10">
                    <div>
                        <Link onClick={() => navigate(-1)} className=" text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 text-lg">
                            ← Go Back
                        </Link>
                    </div>
                    <div className="text-center mb-3">
                        <h1 className="text-xl md:text-5xl font-bold text-gray-900 mb-3">
                            Welcome Back
                        </h1>
                        <p className="text-lg text-gray-600">
                            Log in to continue saving lives
                        </p>
                    </div>
                    <form onSubmit={handleSignin} className="space-y-3">
                        <div>
                            <label className="label">
                                <span className="label-text text-base font-medium text-gray-700">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                className="input input-bordered w-full h-12 text-base focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                            />
                        </div>
                        <div className="relative">
                            <label className="label">
                                <span className="label-text text-base font-medium text-gray-700">Password</span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••••"
                                className="input input-bordered w-full h-12 text-base focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg w-full bg-red-600 hover:bg-red-700 text-white border-none rounded-full shadow-lg hover:shadow-red-600/40 transition-all duration-300 text-lg font-semibold"
                        >
                            Login
                        </button>
                    </form>

                    <div className="divider text-gray-500">OR</div>
                    <div className="text-center">
                        <p className="text-gray-600 text-base">
                            New to Blood Care?
                            <Link
                                to="/register"
                                className="font-bold text-red-600 hover:text-red-700 underline underline-offset-4 transition"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;