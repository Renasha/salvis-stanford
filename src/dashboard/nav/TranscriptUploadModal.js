import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import instance from "../../api/config";
import { navigate } from "hookrouter";

export default function TranscriptUploadModal({ isOpen, setIsOpen }) {
    const [files, setFile] = useState({});
    const [uploading, setUploading] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    function handleReUpload() {
        setUploading(true);
        console.log("Handling ReUpload")
        console.log(files);

        if (!files.file) {
            console.log("No file attached");
            setUploading(false);
            return;
        }

        const url = '/data/new-transcript/';
        const formData = new FormData();
        console.log(files);
        formData.append('file', files.file[0]);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        instance.post(url, formData, config).then((response) => {
            console.log(response.data);
            //localStorage.setItem('userStyle', JSON.stringify(response.data));
            //console.log(localStorage.getItem('userStyle'));
            //Setting UserProfile
            var output = {
                transcript_json: response.data //JSON.parse(localStorage.getItem('userStyle'))
            }
            console.log(output);
            const url2 = 'data/update/' + localStorage.getItem('consumerid')
            instance.request({ url: url2, method: 'patch', data: output }).then((response) => {
                console.log(response.data);
                window.location.reload();
            }).catch((error) => {
                console.log(error.response.data);
            });
        }).catch((error) => {
            console.log(error.response.data);
        });
        
        
    }

    function handleFileChange(event) {
        const files = Array.from(event.target.files);
        setFile({ file: files });
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
                                        <span>Transcript Upload</span>
                                        <button
                                            onClick={closeModal}
                                        >
                                            <div className="hover-transition flex flex-col justify-center items-center h-8 w-8 rounded-lg hover:bg-gray-200">
                                                <IoClose size="24" />
                                            </div>
                                        </button>
                                    </Dialog.Title>

                                    <form>
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Upload Your Transcript
                                            </label>
                                            <input className="focus:ring-green-300 border-0 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none focus:ring w-full"
                                                type="file"
                                                name="transcript"
                                                accept=".pdf"
                                                onChange={handleFileChange} />
                                        </div>
                                    </ form>


                                    <button
                                        type="button"
                                        className=" hover-transition inline-flex justify-center rounded-lg bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-300"
                                        onClick={handleReUpload}
                                    >
                                        {uploading ? "Uploading" : "Re-Upload"}

                                        {uploading && <svg className="ml-2 animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>}
                                    </button>


                                    {/* <div>
                                        <button className="flex justify-center rounded-lg bg-green-200 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-300"
                                            onClick={() => { setSaving(!saving) }}
                                        >
                                            <span>Save</span>

                                            {saving && <svg className="ml-2 animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>}

                                        </button>
                                    </div> */}

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div >
                </Dialog >
            </Transition >
        </>
    )
}