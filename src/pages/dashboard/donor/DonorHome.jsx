import { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DonorHome = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [recentRequests, setRecentRequests] = useState([]);

    useEffect(() => {
        axiosSecure.get("/my-request?size=3")
            .then(res => setRecentRequests(res.data.request || []));
    }, [axiosSecure]);

    return (
        <div className="p-6">
            <div className="bg-gradient-to-br from-red-900 to-red-300 text-white rounded-2xl p-10 text-center mb-10">

                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-10 left-69 text-red-900 text-9xl">🩸</div>
                    <div className="absolute bottom-140 right-20 text-red-500 text-8xl rotate-12">🩸</div>
                    <div className="absolute top-2/19 right-1/5 text-red-400 text-7xl -rotate-6">🩸</div>
                    <div className="absolute left-1/3 text-red-600 text-9xl rotate-45">🩸</div>
                </div>
                <h1 className="text-4xl text-gray-200 font-bold">Welcome back<span className="text-white font-extrabold text-4xl"> {user?.displayName}</span></h1>
                <p className="text-xl text-gray-200 mt-3">Thank you for being a lifesaver ❤️</p>
            </div>

            {recentRequests.length > 0 && (
                <div className="bg-white/80 border border-red-100 rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Your Recent Requests</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Recipient</th>
                                    <th>Location</th>
                                    <th>Date & Time</th>
                                    <th>Blood</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRequests.map(req => (
                                    <tr key={req._id}>
                                        <td>{req.recipient_name}</td>
                                        <td>{req.recipient_district}, {req.recipient_upazila}</td>
                                        <td>{req.donation_date}<br /><small>{req.donation_time}</small></td>
                                        <td><span className="badge badge-error text-white">{req.blood_group}</span></td>
                                        <td>
                                            <span className={`badge ${req.donation_status === "pending" ? "badge-warning" :
                                                req.donation_status === "inprogress" ? "badge-info" : "badge-success"}`}>
                                                {req.donation_status}
                                            </span>
                                        </td>
                                        <td>
                                            <Link to={`/donation-requests/${req._id}`} className="btn btn-sm btn-info">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center mt-8">
                        <Link to="/dashboard/my-donation-requests" className="btn btn-lg btn-primary">
                            View All My Requests →
                        </Link>
                    </div>
                </div>
            )}
            {recentRequests.length === 0 && (
                <div className="text-center py-20">
                    <h3 className="text-2xl font-bold text-gray-600">No donation requests yet</h3>
                    <Link to="/dashboard/create-donation-request" className="btn btn-lg btn-success mt-6">
                        Create Your First Request
                    </Link>
                </div>
            )}
        </div>
    );
};

export default DonorHome;