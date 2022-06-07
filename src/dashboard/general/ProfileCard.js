import { useState, useEffect } from "react";

export default function ProfileCard() {

    const [waysProgress, setWaysProgress] = useState("0%")
    const [overallProgress, setOverallProgress] = useState("0%")

    useEffect(() => {
        setWaysProgress("65%");
        setOverallProgress("85%")
    });

    return (
        <div className="w-full md:w-1/3 xl:w-1/5 px-4 min-w-128">
            <div className="relative flex flex-col min-w-128 break-words bg-white mb-6 shadow-lg border border-gray-400 rounded-lg hover:shadow-lg hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
                <div className="h-72">
                    <div className="flex flex-col items-center pt-2">
                        <img src={require("../../assets/profile.jpeg")} alt="..." className="mb-3 w-24 h-24 object-cover  rounded-full shadow-lg" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900">{localStorage.getItem('firstName') + " " + localStorage.getItem('lastName')}</h5>
                        <span className="text-sm text-gray-500">{"CS: Artificial Intelligence"}</span>

                    </div>
                    <div className="px-3">
                        <div className="text-sm text-gray-500 text-left ">
                            Overall Progress
                        </div>
                        <div className="relative pt-1">
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                                <div style={{width: `${overallProgress}`}} className={"transition-all duration-800  bg-green-500"}></div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500 text-left ">
                            WAYS Progress
                        </div>
                        <div className="relative pt-1">
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200">
                                <div style={{width: `${waysProgress}`}} className={"transition-all duration-800  bg-yellow-400"}></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

// 
