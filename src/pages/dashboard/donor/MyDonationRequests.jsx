import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";
import Loading from "../../../components/common/Loading";

const MyDonationRequests = () => {
    const [totalRequest, setTotalRequest] = useState(0);
    const [myRequest, setMyRequest] = useState([]);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const axiosSecure = useAxiosSecure();
    const {loading} = use(AuthContext)

    useEffect(() => {
        axiosSecure
            .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
            .then((res) => {
                setMyRequest(res.data.request);
                setTotalRequest(res.data.totalReqest);
            })
            .catch(err => console.log(err));
    }, [axiosSecure, currentPage, itemsPerPage]);

    const numberOfPage = Math.ceil(totalRequest / itemsPerPage);
    const pages = [...Array(numberOfPage).keys()].map((e) => e + 1);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    }
    if(loading){
       return <Loading/>
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Requester Email</th>
                            <th>Recipient Name</th>
                            <th>Hospital</th>
                            <th>Blood Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myRequest.map((req, ind) => (
                            <tr key={ind}>
                                <td>{ind + 1}</td>
                                <td>{req.requester_email}</td>
                                <td>{req.recipient_name}</td>
                                <td>{req.hospital_name}</td>
                                <td>{req.blood_group}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>#</th>
                            <th>Requester Email</th>
                            <th>Recipient Name</th>
                            <th>Hospital</th>
                            <th>Blood Group</th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="mt-4 flex gap-2">
                <button onClick={handlePrev} className="btn">Prev</button>
                {pages.map(page => (
                    <button
                        key={page}
                        className={`btn ${page === currentPage ? 'bg-green-800 text-white' : ''}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={handleNext} className="btn">Next</button>
            </div>
        </div>
    );
};

export default MyDonationRequests;
