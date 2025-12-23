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
            <div className="bg-red-700 text-white rounded-2xl p-10 text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold">Welcome back<span className="text-white font-extrabold text-4xl"> {user?.displayName}</span></h1>
                <p className="md:text-xl text-gray-200 mt-3">Thank you for being a lifesaver ❤️</p>
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
                    <Link to="/dashboard/create-donation-request" className="btn btn-lg font-bold rounded-xl text-white bg-red-500 mt-6">
                        Create Your First Request
                    </Link>
                </div>
            )}
        </div>
    );
};

export default DonorHome;