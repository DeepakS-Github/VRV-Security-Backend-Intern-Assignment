import { useState } from "react";
import Spinner from "../components/Spinner";
import useHttpClient from "../hooks/useHttpCall";
import { setJwtTokenCookie } from "../utils/setJwtTokenCookie";



const Auth = () => {

    const [isCreateAccountForm, setIsCreateAccountForm] = useState(true);
    const [formDetails, setFormDetails] = useState({});
    const { isLoading, sendRequest } = useHttpClient();



    const handleAuth = async () => {
        if (isCreateAccountForm) {
            const response = await sendRequest({
                url: '/auth/signup',
                method: 'POST',
                body: formDetails,
            });
            console.log(response);
            setIsCreateAccountForm(false);
        }
        else {
            const response = await sendRequest({
                url: '/auth/login',
                method: 'POST',
                body: formDetails,
            });
            if (response.data.token) {
                // for 1 day
                setJwtTokenCookie(response.data.token, 1);
            }
            console.log(response);
        }
    }



    return (
        <section className="mx-auto my-24 w-1/3">
            <h1 className="mb-8 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">{isCreateAccountForm ? "Create Account" : "Login"}</h1>
            <form className="flex flex-col" onSubmit={(e) => {
                e.preventDefault();
                handleAuth()
            }}>
                <div className="grid gap-6 mb-2 md:grid-cols-1">
                    {isCreateAccountForm && <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Doe" required onChange={(e) => {
                            setFormDetails({
                                ...formDetails,
                                username: e.target.value
                            })
                        }} />
                    </div>}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="john.doe@company.com" required onChange={(e) => {
                            setFormDetails({
                                ...formDetails,
                                email: e.target.value
                            })
                        }} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="•••••••••" required onChange={(e) => {
                            setFormDetails({
                                ...formDetails,
                                password: e.target.value
                            })
                        }} />
                    </div>
                    {isCreateAccountForm && <div>
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                        <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="•••••••••" required onChange={(e) => {
                            setFormDetails({
                                ...formDetails,
                                confirmPassword: e.target.value
                            })
                        }} />
                    </div>}
                </div>
                <div className="mb-3">
                    <span className="text-sm font-semibold cursor-pointer text-blue-700 hover:underline" onClick={() => {
                        setIsCreateAccountForm((prev) => !prev);
                    }}>{isCreateAccountForm ? "Click here to login" : "Click here to create account"}</span>
                </div>
                <button type="submit" className="flex flex-row justify-center items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading && <Spinner width={"w-5"} color={"white"} />}{isCreateAccountForm ? "Create Account" : "Login"}</button>
            </form>
        </section>

    );
}


export default Auth;