import { useCallback, useEffect } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";
import { navigate } from "hookrouter";

const LandingPage = () => {
    const particlesInit = useCallback(main => {
        loadFull(main);
    }, [])

    const handleSubmit = (event) => {
        console.log("Get Started!");
        navigate("/login");
    }
    return (
        <>
            <Particles options={particlesOptions} init={particlesInit} />
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="flex justify-center">
                    <img className="z-40 h-20 md:h-48" src={require("../assets/salvis-logo.png")} alt=""/>
                    <h1 className="font-bold text-8xl text-black-600 md:text-20xl"> SALVIS</h1>
                </div>

                <h3 className="text-2xl text-center md:text-4xl text-black-600 font-mono">Time to get rid of the excel sheet.</h3>
                <button className="font-mono mt-4 bg-green-300 text-black-400 active:bg-green-400 font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button" onClick={handleSubmit}>
                    Get Started
                </button>
            </div>
        </>
    )
}

export default LandingPage;