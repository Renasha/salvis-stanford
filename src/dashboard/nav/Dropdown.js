import React, { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
import { IoSettingsOutline, IoPersonOutline, IoLogOutOutline } from 'react-icons/io5';
import { AiOutlineFileSync } from 'react-icons/ai';
import { navigate } from "hookrouter";
import instance from "../../api/config";


export default function Dropdown({setProfileOpen, setTranscriptOpen}) {

    const handleLogout = (event) => {
        console.log("Handling Logout!")
        instance.request({ url: 'dj-rest-auth/logout/', method: 'post'})
        .then((response) => {
            localStorage.clear('token');
            navigate('/login');
        })
        .catch(error => {
            console.error(error.response);
        });
    }

    const handleProfileModal = () => {
        console.log("handling profile modal");
        setProfileOpen(true);
    }

    const handleTranscriptModal = () => {
        console.log("handling transcript modal");
        setTranscriptOpen(true);
    }

    var fullName = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')

    return (
        <div className="">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        {fullName}
                        <HiChevronDown
                            className="ml-2 -mr-1 h-5 w-5 text-black-900"
                            aria-hidden="true"
                        />
                    </Menu.Button>

                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-400 border border-gray-400 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <div className="ounded-md px-2 py-2 text-sm">
                                        <p className="text-sm leading-5">{'Signed in as'}</p>
                                        {/* HARD CODED DATA */}
                                        <p className="text-sm leading-5 font-semibold">{localStorage.getItem('email')}</p>
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleProfileModal}
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <IoPersonOutline className="mr-2 h-5 w-5 stroke-[1px]" />
                                        Profile
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <IoSettingsOutline className="mr-2 h-5 w-5" />
                                        Settings
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={handleTranscriptModal}
                                    >
                                        <AiOutlineFileSync className="mr-2 h-5 w-5" />
                                        Upload Transcript
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleLogout}
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <IoLogOutOutline className="mr-2 h-5 w-5" />
                                        Logout
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu >
        </div >
    )
}