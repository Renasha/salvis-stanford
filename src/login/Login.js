import React, { useState, useEffect } from "react";
import { navigate } from "hookrouter";
import Background from "../generalComponents/Background.js";
import instance from "../api/config";
// import token from "../index.js";

export default function Login() {
    const [inputs, setInputs] = useState({});
    // const [error, setError] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        /**
         * TODO - Renasha
         * Need to add a fix here checking for a valid token
         * Getting an error thrown with the token and therefore 
         * should not go to app and instea prompt the login page
         * to get a new token.
         */
        if (token) {
            /**
             * Check if token is valid,
             * if valid, continiue to /app
             * else, go to the login page
             */

            navigate('/app');
            return;
        }
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        localStorage.removeItem('token');
        event.preventDefault();
        var output = {
            "username": inputs.username?.toLowerCase(),
            "password": inputs.password
        }
        instance.request({ url: 'dj-rest-auth/login/', method: 'post', data: output })
            .then((response) => {
                localStorage.setItem('token', response.data.key);
                navigate('/app');
            })
            .catch(error => {
                console.error(error.response);
            });

    }
    return (
        <>
            <main>
                <section className="absolute w-full h-full">
                    <div className="absolute top-0 w-full h-full">
                        <Background />
                    </div>
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4 ">
                                <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-200 border-gray-400 border-2">
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-10">
                                        <div className="flex justify-center mb-2">
                                            <img className="h-12" src={require("../assets/salvis-logo.png")} alt="" />
                                            <h1 className="font-extrabold text-black-600 text-5xl"> SALVIS</h1>
                                        </div>
                                        <form>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="username"
                                                    value={inputs.username || ""}
                                                    onChange={handleChange}
                                                    className="login-signup-input"
                                                    placeholder="Email"
                                                    style={{ transition: "all .15s ease" }}
                                                />
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={inputs.password || ""}
                                                    onChange={handleChange}
                                                    className="login-signup-input"
                                                    placeholder="Password"
                                                    style={{ transition: "all .15s ease" }}
                                                />
                                            </div>
                                            <div>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        id="customCheckLogin"
                                                        type="checkbox"
                                                        className="focus:ring-green-300 form-checkbox border-0 rounded-lg text-gray-800 ml-1 w-5 h-5"
                                                        style={{ transition: "all .15s ease" }}
                                                    />
                                                    <span className="ml-2 text-sm font-semibold text-gray-700">
                                                        Remember me
                                                    </span>
                                                </label>
                                            </div>

                                            <div className="text-center">
                                                <button
                                                    className="w-full  mt-4 bg-green-300 text-black-400 active:bg-green-400 font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    style={{ transition: "all .15s ease" }}
                                                    onClick={handleSubmit}
                                                >
                                                    Sign In
                                                </button>
                                            </div>
                                        </form>
                                        <div className="flex flex-wrap mt-8 ">
                                            <div className="w-1/2">
                                                <a
                                                    onClick={e => e.preventDefault()}
                                                    className="text-black"
                                                >
                                                    <small>Forgot password?</small>
                                                </a>
                                            </div>
                                            <div className="w-1/2 text-right">
                                                <a
                                                    href="/signup"
                                                    className="text-black"
                                                >
                                                    <small>Create new account</small>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}