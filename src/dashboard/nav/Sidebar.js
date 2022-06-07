import { FaHome } from 'react-icons/fa';
import { CgTranscript, CgBrowse } from 'react-icons/cg';
import { BiBrain } from 'react-icons/bi';
import { selectClasses } from '@mui/material';

function Sidebar({ curWindow, onWindowChange }) {
    const handleClickHome = () => {
        onWindowChange(0);
    }
    const handleClickProgress = () => {
        onWindowChange(1);
    }
    const handleClickWays = () => {
        onWindowChange(2);
    }
    const handleClickCoursePlanner = () => {
        onWindowChange(3);
    }

    return (
        <nav className="z-30 fixed top-16 left-0 h-screen w-16 bg-white shadow-xl">
            <div className="flex flex-col place-content-center">
                <button onClick={handleClickHome}>
                    <SidebarIcon icon={<FaHome size="28" />} text="Home" windowIndex={0} curWindow={curWindow} />
                </button>

                <Divider />
                <button onClick={handleClickProgress}>
                    <SidebarIcon icon={<CgTranscript size="32" />} text="Progress" windowIndex={1} curWindow={curWindow} />
                </button>

                <button onClick={handleClickWays}>
                    <SidebarIcon icon={<BiBrain size="32" />} text="WAYS" windowIndex={2} curWindow={curWindow} />
                </button>
                <button onClick={handleClickCoursePlanner}>
                    <SidebarIcon icon={<CgBrowse size="28" />} text="Course Planner" windowIndex={3} curWindow={curWindow} />
                </button>
                <Divider />

                {/*
                TODO: Another page for Planning courses
                */}
            </div>
        </nav >
    );
};

function SidebarIcon({ icon, text = 'Popup!', windowIndex, curWindow }) {
    var selected = windowIndex == curWindow ? true : false;

    sidebarIconColor(text, selected);
    return (
        <div className={sidebarIconColor(text, selected)}>
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span >
        </div >
    );


}

function sidebarIconColor(text, selected) {
    var iconText = text.toLowerCase().split(" ");
    iconText = iconText[0];

    switch (iconText) {
        case "home":
            return selected ? "sidebar-icon bg-green-400 text-green-800" : "sidebar-icon bg-gray-300 text-gray-900 hover:bg-green-400 hover:text-green-800"
        case "progress":
            return selected ? "sidebar-icon bg-blue-400 text-blue-800" : "sidebar-icon bg-gray-300 text-gray-900 hover:bg-blue-400 hover:text-blue-800"
        case "ways":
            return selected ? "sidebar-icon bg-yellow-400 text-yellow-800" : "sidebar-icon bg-gray-300 text-gray-900 hover:bg-yellow-400 hover:text-yellow-800"
        case "course":
            return selected ? "sidebar-icon bg-red-400 text-red-900" : "sidebar-icon bg-gray-300 text-gray-900 hover:bg-red-400 hover:text-red-800"
        default:
            return selected ? "sidebar-icon bg-green-400 text-green-800" : "sidebar-icon bg-gray-300 text-gray-900 hover:bg-green-400 hover:text-green-800"
    }
}


const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar;