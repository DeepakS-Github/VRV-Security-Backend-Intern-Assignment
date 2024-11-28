import React, { useEffect, useState } from 'react'
import { getJwtDecodedTokenCookie, removeJwtTokenCookie } from '../utils/jwtTokenCookie';
import useHttpClient from '../hooks/useHttpCall';
import { decodeJwt } from '../utils/decodeJwt';
import { convertToIST } from '../utils/utcToISTTime';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/toast';

const subHead = {
    "Admin": "All Users (with delete and role change option)",
    "Moderator": "All Users (Read only)",
    "User": "Your Details"
}

const Main = () => {

    const { sendRequest } = useHttpClient();
    const [deletingId, setDeletingId] = useState("");
    const [roleUpdateId, setRoleUpdateId] = useState("");

    const token = getJwtDecodedTokenCookie();

    const navigate = useNavigate();

    let role = "Unknown";
    if (token) {
        role = decodeJwt(token).role;
        console.log(role);
    }


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
        try {
            setDeletingId(userId);
            const response = await sendRequest({
                url: `/user/profile/${userId}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const newUsers = users.filter(user => user._id !== userId);
            setUsers(newUsers);
        } catch (error) {
            console.log(error);
        } finally {
            setDeletingId("");
        }
    }


    const updateRole = async (e, userId) => {
        if (confirm("Do you want to change the role of this user?")) {
            try {
                setRoleUpdateId(userId);
                const response = await sendRequest({
                    url: `/user/profile-role/${userId}`,
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                console.log(response);
                const newUsers = users.map(user => {
                    if (user._id === userId) {
                        user.role = response.data.new_role;
                    }
                    return user;
                })
                setUsers(newUsers);
            } catch (error) {
                console.log(error);
            } finally {
                setRoleUpdateId("");
            }
        }
        else {
            e.target.value = users.find(user => user._id === userId).role;
        }
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
        <section className='w-10/12 mx-auto my-6 md:my-12 lg:my-24'>
            <div className="mb-4 md:mb-6 lg:mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Hello {role}!</h1>
                <button className="flex flex-row justify-center items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center" onClick={() => {
                    removeJwtTokenCookie();
                    navigate('/login');
                }}>Logout</button>
            </div>

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
                                Role{role === "Admin" && "/Change Role"}
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
                                {role === "Admin" ? roleUpdateId === user._id ? <td className="px-6 py-4">
                                    <Spinner width={"w-5"} color={"#2563eb"} />
                                </td> : <select className="px-6 py-4 outline-none cursor-pointer bg-transparent" onChange={(e) => {
                                    updateRole(e, user._id);
                                }}>
                                    <option value={user?.role} selected >{user?.role}</option>
                                    <option value={user?.role === "User" ? "Moderator" : "User"}>{user?.role === "User" ? "Moderator" : "User"}</option>
                                </select> : <td className="px-6 py-4">{user?.role}</td>}



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