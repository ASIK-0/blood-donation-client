import { use, useEffect, useState } from "react";
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const { createUser, setUser, updateInfo } = use(AuthContext)
    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')

    useEffect(() => {
        axios.get('./upazilas.json')
            .then(res => {
                setUpazilas(res.data.upazilas);
            })
    }, [])
    useEffect(() => {
        axios.get('./districts.json')
            .then(res => {
                setDistricts(res.data.districts);
            })
    }, [])

    console.log(upazilas)

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const form = e.target;
        const photo = form.photo;
        const file = photo.files[0];
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const blood = e.target.blood.value

        const lengthPattern = /.{6,}/;
        const uppercasePattern = /[A-Z]/;
        const lowercasePattern = /[a-z]/;

        if (!uppercasePattern.test(password)) {
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }

        if (!lowercasePattern.test(password)) {
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }

        if (!lengthPattern.test(password)) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (!file) {
            toast.error("Please select a profile photo");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await axios.post(
                "https://api.imgbb.com/1/upload?key=15a57436b87be24a9b9f54e5ab9a5b84",
                formData
            );

            const mainPhotoUrl = res.data.data.display_url;

            const userData = {
                name,
                email,
                password,
                mainPhotoUrl,
                blood,
                district,
                upazila
            }
            console.log(userData)

            const result = await createUser(email, password);
            await updateInfo({
                displayName: name,
                photoURL: mainPhotoUrl,
            });

            setUser({
                ...result.user,
                displayName: name,
                photoURL: mainPhotoUrl
            });

            await axios.post('http://localhost:5000/users', userData);
            toast.success("Account created successfully!");
            navigate("/");

        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className=" flex items-center justify-center px-4 py-12">
            <div className="mb-10 mt-25 md:my-40 rounded-xl max-w-2xl shadow-2xl bg-white/95 backdrop-blur-md border border-red-100">
                <div className="px-10 py-10">
                    <div>
                        <Link onClick={() => navigate(-1)} className=" text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 text-lg">
                            ← Go Back
                        </Link>
                    </div>
                    <div className="text-center mb-4">
                        <div className="flex justify-center mb-6">
                        </div>
                        <h1 className="text-xl md:text-5xl font-bold text-gray-900 mb-3">
                            Create an Account
                        </h1>
                        <p className="text-sm md:text-lg text-gray-600">
                            Register to become a lifesaver in our blood donation community
                        </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="flex flex-col items-center">
                            <label className="text-lg font-semibold text-gray-800 mb-6">
                                Upload Profile Photo <span className="text-red-500 text-sm">*</span>
                            </label>

                            <div className="relative group">
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                    id="profile-photo"
                                />
                                <div className="w-30 h-30  rounded-full bg-gray-100 border-4 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-lg transition-all group-hover:border-gray-400">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Profile preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <label
                                    htmlFor="profile-photo"
                                    className="absolute -bottom-3 -right-3 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 z-30"
                                >
                                    <FaCamera className="text-xl" />
                                </label>
                            </div>

                            <p className="text-sm text-gray-500 mt-5">
                                Click to upload profile photo
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                JPG, PNG • Max 5MB
                            </p>
                        </div>
                        {/*  */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-base font-medium text-gray-700">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Your full name"
                                    className="input input-bordered w-full text-base focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-base font-medium text-gray-700">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="your@email.com"
                                    className="input input-bordered w-full text-base focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                                />
                            </div>
                        </div>

                        {/*  */}
                        <div>
                            <label className="label">
                                <span className="label-text text-base font-medium text-gray-700">Blood Group</span>
                            </label>
                            <select name="blood" className="select select-bordered w-full" required>
                                <option value="">Select blood group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-base font-medium text-gray-700">District</span>
                                </label>
                                <select value={district} onChange={(e) => setDistrict(e.target.value)} name="district" className="select select-bordered w-full" required>
                                    <option value="">Select Your District</option>
                                    {
                                        districts.map(d => <option value={d.name} key={d.id} >{d.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-base font-medium text-gray-700">Upazila</span>
                                </label>
                                <select value={upazila} onChange={(e) => setUpazila(e.target.value)} name="upazila" className="select select-bordered w-full" required>
                                    <option value="">Select Your Upazila</option>
                                    {
                                        upazilas.map(upazila => <option value={upazila.name} key={upazila.id} >{upazila.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="label"><span className="label-text text-base font-medium text-gray-700">Password</span></label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                placeholder="••••••••••"
                                className="input input-bordered w-full text-base focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 cursor-pointer text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="relative">
                            <label className="label"><span className="label-text text-base font-medium text-gray-700">Confirm Password</span></label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                required
                                placeholder="••••••••••"
                                className="input input-bordered w-full text-base focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                            />
                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-9 cursor-pointer text-gray-600"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg w-full bg-red-600 hover:bg-red-700 text-white border-none rounded-full shadow-lg hover:shadow-red-600/40 transition-all duration-300 text-lg font-semibold"
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="divider text-gray-500">OR</div>
                    <div className="text-center">
                        <p className="text-gray-600 text-base">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-bold text-red-600 hover:text-red-700 underline underline-offset-4 transition"
                            >
                                Login Here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;