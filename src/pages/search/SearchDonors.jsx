import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

const SearchDonors = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchData, setSearchData] = useState({
        blood_group: "",
        district: "",
        upazila: ""
    });

    const axiosPublic = useAxios();

    useEffect(() => {
        axios.get("districts.json").then(res => setDistricts(res.data.districts || []));
        axios.get("upazilas.json").then(res => setUpazilas(res.data.upazilas || []));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);

        axiosPublic.get("/users/search", { params: searchData })
            .then(res => {
                console.log(res.data)
                setDonors(res.data);
                setLoading(false);
            })
            .catch(() => {
                setDonors([]);
                setLoading(false);
            });
    };

    return (
        <div className="container mx-auto py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12 text-red-600">Search Donors</h2>

                <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <select
                            value={searchData.blood_group}
                            required
                            onChange={(e) => setSearchData({ ...searchData, blood_group: e.target.value })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Blood Group</option>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>

                        <select
                            value={searchData.district}
                            onChange={(e) => setSearchData({ ...searchData, district: e.target.value })}
                            className="select select-bordered w-full"
                        >
                            <option value="">District</option>
                            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>

                        <select
                            value={searchData.upazila}
                            onChange={(e) => setSearchData({ ...searchData, upazila: e.target.value })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Upazila</option>
                            {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                        </select>
                    </div>

                    <div className="text-center mt-8">
                        <button type="submit" className="btn btn-lg bg-red-600 hover:bg-red-700 text-white rounded-full px-12">
                            Search Donors
                        </button>
                    </div>
                </form>

                {loading ? (
                    <Loading />
                ) : donors.length > 0 ? (
                    <div className="">
                        {donors.map(donor => (
                            <div
                                key={donor._id}
                                className="group relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100"
                            >
                                <div className="relative h-40 bg-gradient-to-br from-red-50 to-rose-50">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img
                                            src={donor.mainPhotoUrl || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                            alt={donor.name}
                                            className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col items-center p-6 text-center">
                                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-red-700 transition-colors">
                                        {donor.name}
                                    </h2>

                                    <div className="mt-3">
                                        <span className="inline-block rounded-full bg-red-600 px-5 py-2 text-lg font-bold text-white shadow-md">
                                            {donor.blood}
                                        </span>
                                    </div>

                                    <div className="mt-4 space-y-2 text-gray-600">
                                        <p className="text-base font-medium">
                                            {donor.district}, {donor.upazila}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {donor.email}
                                        </p>
                                    </div>
                                    <div className="mt-6 h-1 w-12 rounded-full bg-red-200 group-hover:bg-red-500 transition-colors duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-700 mb-4">No Donors Found</h3>
                        <p className="text-xl text-gray-600">Try different search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchDonors;