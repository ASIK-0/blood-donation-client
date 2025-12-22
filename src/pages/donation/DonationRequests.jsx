import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/common/Loading";

const DonationRequests = () => {
    const axiosPublic = useAxios();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get("/requests/pending")
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [axiosPublic]);

    return (
        <div className="container mx-auto py-20 mt-18 px-4 min-h-screen">
            {loading ? (
                <Loading />
            ) : requests.length === 0 ? (
                <div className="text-center py-20">
                    <div className="bg-gray-100 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-700 mb-4">No Donation Requests Found</h3>
                    <p className="text-xl text-gray-600 max-w-md mx-auto">
                        Currently, there are no urgent blood donation requests.
                        Please check back later or create one if needed.
                    </p>
                    <Link
                        to="/dashboard/create-donation-request"
                        className="mt-8 btn btn-md bg-red-400 text-black px-3 font-bold text-xl rounded-full shadow-xl"
                    >
                        Create New Request
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {requests.map(req => (
                        <div key={req._id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow">
                            <div className="bg-red-50 p-6 text-center">
                                <p className="text-4xl font-bold text-red-600">{req.blood_group}</p>
                                <p className="text-sm text-gray-600 mt-2">Blood Group Needed</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <h3 className="font-bold text-xl text-gray-800">{req.recipient_name}</h3>
                                <div className="text-gray-600 space-y-2">
                                    <p><strong>Location:</strong> {req.recipient_district}, {req.recipient_upazila}</p>
                                    <p><strong>Hospital:</strong> {req.hospital_name || "Not specified"}</p>
                                    <p><strong>Date:</strong> {req.donation_date}</p>
                                    <p><strong>Time:</strong> {req.donation_time}</p>
                                </div>
                                <Link
                                    to={`/donation-requests/${req._id}`}
                                    className="btn w-full bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg  font-semibold"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonationRequests;