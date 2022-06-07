import Background from "../generalComponents/Background"
import SimpleReactFileUpload from "../api/file";
import { useState } from 'react';
import instance from "../api/config";
import { navigate } from "hookrouter";

const CS_DEGREE_TRACKS = [
    "Artificial Intelligence",
    "Biocomputation",
    "Computer Engineering",
    "Graphics",
    "Human-Computer Interaction",
    "Information",
    "Systems",
    "Theory",
    "Unspecialized"]

export default function SignUpSetup() {
    const [inputs, setInputs] = useState({});
    const [files, setFile] = useState({});
    const [waitingForAPI, setWaitingForAPI] = useState(false);

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    function handleFileChange(event) {
        const files = Array.from(event.target.files);
        setFile({ file: files });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs)
        //Transcript Handler 
        const url = '/data/new-transcript/';
        const formData = new FormData();
        console.log(inputs);
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
                firstName: localStorage.getItem('firstName'),
                lastName: localStorage.getItem('lastName'),
                major: inputs.major,
                track: inputs.track,
                totalUnits: 180,
                degreeProgress: 0,
                transcript_json: response.data //JSON.parse(localStorage.getItem('userStyle'))
            }
            console.log(output);
            instance.request({ url: 'data/create/', method: 'post', data: output }).then((response) => {
                console.log(response.data);
                navigate('/app');
            }).catch((error) => {
                console.log(error.response.data);
            });
        }).catch((error) => {
            console.log(error.response.data);
        });
        /**
         * TODO - Renasha
         * Add the major/track to a person's profile
         * Handle the transcript upload/save to person's account
         * Return the json files of both the track selected and then also the transcript data
         * Write these to local storage under the User style json
         */
        //Renasha has done Stuff 
        //Need to Jsonparse transcript data from local storage, Need to set Degree Progress
    }


    return (
        <div className="absolute w-full h-full">
            <div className="absolute top-0 w-full h-full">
                <Background />
            </div>

            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-1/2 xl:w-1/3 px-4 ">
                        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-200 border-gray-400 border-2">
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-10">
                                <div className="flex justify-center mb-6">
                                    <img className="h-12" src={require("../assets/salvis-logo.png")} />
                                    <h1 className="font-extrabold text-black-600 text-5xl"> SALVIS</h1>
                                </div>
                                <form>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Major
                                        </label>
                                        <select
                                            className="focus:ring-green-300 border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            type="text"
                                            name="major"
                                            value={inputs.major || ""}
                                            onChange={handleChange}
                                            style={{ transition: "all .15s ease" }}
                                        >
                                            <option name="Computer Science">Computer Science</option>
                                            <option value="" disabled hidden>
                                                Choose Your Major
                                            </option>
                                        </select>
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Track
                                        </label>
                                        <select
                                            className="focus:ring-green-300 border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            type="text"
                                            name="track"
                                            value={inputs.track || ""}
                                            onChange={handleChange}
                                            placeholder="Track"
                                            style={{ transition: "all .15s ease" }}
                                        >
                                            <option value="" disabled hidden>
                                                Choose Your Track
                                            </option>
                                            {CS_DEGREE_TRACKS.map(track => <option key={track} name={track}>{track}</option>)}
                                        </select>
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Upload Your Transcript
                                        </label>
                                        <input className="focus:ring-green-300 border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            type="file"
                                            name="transcript"
                                            accept=".pdf"
                                            onChange={handleFileChange} />
                                    </div>

                                </ form>
                                <div className="text-center">
                                    <button
                                        className="w-full  mt-4 bg-green-300 text-black-400 active:bg-green-400 font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={handleSubmit}
                                    >
                                        Finish Sign Up
                                        {waitingForAPI &&
                                            <div>
                                                Finishing Signup
                                                <circle
                                                    class="ring-track"
                                                    fill="transparent"
                                                    stroke-width="6px"
                                                    stroke="#9c9c9c30"
                                                    cx="50" cy="50"
                                                    r="44"
                                                />
                                                <circle
                                                    class="loader-ring"
                                                    fill="transparent"
                                                    stroke-width="6px"
                                                    stroke="#ec5c0e"
                                                    stroke-dashoffset="276.460"
                                                    stroke-dasharray="276.460 276.460"
                                                    cx="50"
                                                    cy="50"
                                                    r="44"
                                                />
                                            </div>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}