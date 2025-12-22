import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const [users, setusers] = useState([]);
    const axiosSecure = useAxiosSecure();

    const fetchUser = () => {
         axiosSecure.get("/users")
            .then((res) => {
                setusers(res.data);
            });
    }

    useEffect(() => {
        fetchUser()
    }, [axiosSecure]);

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(() => {
                // console.log(res.data);
                fetchUser()
            });
    };

    
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user?.mainPhotoUrl}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user?.email}</div>
                                            <div className="text-sm opacity-50">{user?.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user?.role}
                                    <br />
                                </td>
                                <td>{user?.status}</td>
                                <th>
                                    {user?.status == "active" ? (
                                        <button
                                            onClick={() => handleStatusChange(user?.email, "blocked")}
                                            className="btn "
                                        >
                                            Block
                                        </button>
                                    ) : (
                                        <button
                                            className="btn"
                                            onClick={() => handleStatusChange(user?.email, "active")}
                                        >
                                            active
                                        </button>
                                    )}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;