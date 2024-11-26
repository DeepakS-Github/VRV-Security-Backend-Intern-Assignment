import React, { useEffect, useState } from 'react'
import { getJwtDecodedTokenCookie } from '../utils/jwtTokenCookie';
import useHttpClient from '../hooks/useHttpCall';
import { decodeJwt } from '../utils/decodeJWT';
import { convertToIST } from '../utils/utcToISTTime';
import Spinner from '../components/Spinner';

const subHead = {
    "Admin": "All Users (with delete option)",
    "Moderator": "All Users",
    "User": "Your Details"
}

const Main = () => {

    const { sendRequest } = useHttpClient();
    const [deletingId, setDeletingId] = useState("");

    const token = getJwtDecodedTokenCookie();
    const role = decodeJwt(token).role;

    console.log(role);

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const getUserDetails = async () => {
        setIsLoading(true);
        const response = await sendRequest({
            url: '/user/profile',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        setUsers([response.data.user]);
        console.log(response);
        setIsLoading(false);
    }

    const getAllUserDetails = async () => {
        setIsLoading(true);
        const response = await sendRequest({
            url: '/user/all-profile',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        setUsers(response.data.users);
        setIsLoading(false);
    }

    const deleteUser = async (userId) => {
        setDeletingId(userId);
        const response = await sendRequest({
            url: `/user/profile/${userId}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.status === 200) {
            console.log("entering");
            const newUsers = users.filter(user => user._id !== userId);
            setUsers(newUsers);
        }
        setDeletingId("");
    }


    useEffect(() => {
        if (role === "User") {
            getUserDetails();
        }
        else {
            getAllUserDetails();
        }
    }, [token])



    return (
        <section className='w-10/12 mx-auto my-24'>
            <h1 className="mb-8 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Hello {role}!</h1>

            <h2 className="mb-8 text-xl font-semibold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">{subHead[role]}</h2>

            {isLoading ? <Spinner width={"w-12"} color={"black"} /> : <div className="relative overflow-x-auto shadow-md sm:rounded-md">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Password
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Account Created At
                            </th>
                            {role === "Admin" && <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="odd:bg-white even:bg-gray-50">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user?.username}
                                </th>
                                <td className="px-6 py-4">
                                    {user?.email}
                                </td>
                                <td className="px-6 py-4">
                                    •••••••••
                                </td>
                                <td className="px-6 py-4">
                                    {user?.role}
                                </td>
                                <td className="px-6 py-4">
                                    {convertToIST(user?.createdAt)}
                                </td>
                                {role === "Admin" &&
                                    <td className="px-6 py-4">
                                        <button className="font-medium text-blue-600 hover:underline" onClick={(e) => {
                                            e.preventDefault();
                                            if (confirm("Do you want to delete this user?")) {
                                                deleteUser(user?._id)
                                            }
                                        }}>{deletingId == user._id ? <Spinner width={"w-5"} color={"#2563eb"} /> : "Delete"}</button>
                                    </td>
                                }

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>}



        </section>
    )
}

export default Main