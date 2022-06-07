import { React } from 'react';
import { navigate } from "hookrouter";
import Dropdown from './Dropdown';
import LogoFull from '../../assets/LogoFull';

export function Navbar({ setProfileModalOpen, setTranscriptModalOpen }) {
    const handleBackToLanding = (event) => {
        console.log("Going back to Landing Page!");
        navigate("/");
    };
    return (
        <nav className="fixed top-0 left-0 h-16 z-30 w-screen bg-gray-600">
            <div className="flex h-16 w-screen items-center pl-4 pr-6 justify-between">
                <button className="flex" type="button"
                    onClick={handleBackToLanding}>
                    {/* <img className="h-10 mr-1" alt="" src={require("../assets/salvis-full.svg")} /> */}
                    <LogoFull height={45}/>

                    {/* <h1 className="font-extrabold text-white text-3xl"> SALVIS</h1> */}
                </button>
                <Dropdown setProfileOpen={setProfileModalOpen} setTranscriptOpen={setTranscriptModalOpen}/>
            </div>


        </nav>
    );
}
