import Background from './Background';
import { navigate } from "hookrouter";

export default function NoPageFound() {

    const handleReturnToHome = () => {
        navigate("/");
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
                                    <h1 className=" text-black-600 text-5xl"> No Page Found.</h1>

                                </div>
                                <button
                                    className="w-full  mt-4 bg-green-300 text-black-400 active:bg-green-400 font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    style={{ transition: "all .15s ease" }}
                                    onClick={handleReturnToHome}
                                >
                                    Return Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}