import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import instance from '../../api/config';

export default function ProfileModal({ isOpen, setIsOpen }) {
    const [editMode, setEditMode] = useState(false);
    const [inputs, setInputs] = useState({});
    const [saving, setSaving] = useState(false);


    useEffect(() => {
        const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");
        const email = localStorage.getItem('email');
        // JSON.parse(localStorage.getItem("email"));
        setInputs({
            email: email,
            firstName: firstName,
            lastName: lastName
        })
    }, []);

    function closeModal() {
        setIsOpen(false);
        setEditMode(false);
    }

    function openModal() {
        setIsOpen(true);
        setEditMode(false);
    }

    function handleEdits() {
        console.log("Handle Edits")
        console.log(inputs);
        setEditMode(false);

        var output = {
            firstName: inputs.firstName,
            lastName: inputs.lastName
        }
        console.log(output);
        const url2 = 'data/update/' + localStorage.getItem('consumerid')
        instance.request({ url: url2, method: 'patch', data: output }).then((response) => {
            console.log(response.data);
            window.location.reload();
        }).catch((error) => {
            console.log(error.response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }



    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="absolute z-40" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-200"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-200"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-200 scale-200"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-200 scale-200"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-lg transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="flex h-6 justify-between text-lg font-medium leading-6 text-gray-900 items-center mb-3"
                                    >
                                        <span>Profile</span>
                                        {!editMode && <button
                                            onClick={closeModal}
                                        >
                                            <div className="hover-transition flex flex-col justify-center items-center h-8 w-8 rounded-lg hover:bg-gray-200">
                                                <IoClose size="24" />
                                            </div>
                                        </button>}
                                    </Dialog.Title>

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
                                                className="profile-modal-input"
                                                placeholder="First Name"
                                                style={{ transition: "all .15s ease" }}
                                                disabled={!editMode}
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
                                                className="profile-modal-input"
                                                placeholder="First Name"
                                                style={{ transition: "all .15s ease" }}
                                                disabled={!editMode}
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
                                                className="profile-modal-input"
                                                placeholder="sunet@stanford.edu"
                                                style={{ transition: "all .15s ease" }}
                                                disabled={!editMode}
                                            />
                                        </div>
                                    </form>


                                    <div className="">
                                        {!editMode && <button
                                            type="button"
                                            className="hover-transition inline-flex justify-center rounded-lg bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-300"
                                            onClick={() => { setEditMode(true) }}
                                        >
                                            Edit
                                        </button>}
                                        {editMode &&

                                            <div className="flex w-full justify-between place-items-center">
                                                <button
                                                    type="button"
                                                    className="hover-transition inline-flex justify-center rounded-lg bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-300"
                                                    onClick={() => { setEditMode(false) }}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    className="hover-transition inline-flex justify-center rounded-lg bg-green-200 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-300"
                                                    onClick={handleEdits}
                                                >
                                                    Save
                                                </button>
                                            </div>

                                        }
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div >
                </Dialog >
            </Transition >
        </>
    )
}