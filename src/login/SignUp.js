import React, { useState, useEffect, Fragment } from "react";
import Background from "../generalComponents/Background";
import ClosingAlert from "../generalComponents/Alert";
import { navigate } from "hookrouter";
import instance from "../api/config";
import { Transition } from '@headlessui/react';

export default function SignUp() {
    const [displayAlert, setDisplayAlert] = useState("");
    const [inputs, setInputs] = useState({});
    var errorText = "";

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
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
        event.preventDefault();

        var output = {
            username: inputs.email.toLowerCase(),
            email: inputs.email.toLowerCase(),
            password1: inputs.password,
            password2: inputs.passwordConfirmed
        }

        instance.request({ url: 'dj-rest-auth/registration/', method: 'post', data: output })
            .then((response) => {
                localStorage.setItem('token', response.data.key);
                localStorage.setItem('firstName', inputs.firstName);
                localStorage.setItem('lastName', inputs.lastName);
                navigate("/signup/setup");
            })
            .catch(error => {
                console.log(error.response.data);
                var errorText;
                if ("email" in error.response.data) {
                    errorText = error.response.data?.email[0]
                }
                else if ("password1" in error.response.data) {
                    errorText = error.response.data?.password1[0]
                }
                else if ("non_field_errors" in error.response.data) {
                    errorText = error.response.data?.non_field_errors[0]
                }
                setDisplayAlert(errorText);

            });


        /**
         * TODO for Renasha
         * Attempt to sign up for an account
         * If signup is successful continue to next signup page
         * Else, we want to throw an error
         */
        //Renasha has DONE stuff lol
    }

    return (
        <>

            <main>
                <Transition
                    show={displayAlert != ""}
                    enter="transition-opacity duration-250"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-250"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className={
                            `z-50 text-danger px-6 py-4 border-0 rounded-lg bg-${"red"}-500 absolute left-1/2 -translate-x-1/2 top-10 scale-100`
                        }
                    >
                        <span className="inline-block align-middle mr-8">
                            <b className="capitalize">{"Error"}!</b> {displayAlert}
                        </span>
                        <button
                            className="absolute text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                            onClick={() => setDisplayAlert("")}
                        >
                            <span>×</span>
                        </button>
                    </div>
                </Transition>


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
                                            <img className="h-12" src={require("../assets/salvis-logo.png")} />
                                            <h1 className="font-extrabold text-black-600 text-5xl"> SALVIS</h1>
                                        </div>
                                        <form>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={inputs.firstName || ""}
                                                    onChange={handleChange}
                                                    className="login-signup-input"
                                                    placeholder="First Name"
                                                    style={{ transition: "all .15s ease" }}
                                                />
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={inputs.lastName || ""}
                                                    onChange={handleChange}
                                                    className="login-signup-input"
                                                    placeholder="First Name"
                                                    style={{ transition: "all .15s ease" }}
                                                />
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={inputs.email || ""}
                                                    onChange={handleChange}
                                                    className="login-signup-input"
                                                    placeholder="sunet@stanford.edu"
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
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="passwordConfirmed"
                                                    value={inputs.passwordConfirmed || ""}
                                                    onChange={handleChange}
                                                    className="login-signup-input"
                                                    placeholder="Confirm Password"
                                                    style={{ transition: "all .15s ease" }}
                                                />
                                            </div>


                                            <div className="text-center">
                                                <button
                                                    className="w-full  mt-4 bg-green-300 text-black-400 active:bg-green-400 font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    style={{ transition: "all .15s ease" }}
                                                    onClick={handleSubmit}
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                        </form>
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