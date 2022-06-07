import { React, useEffect, useState } from 'react';
import Sidebar from "./nav/Sidebar";
import { navigate } from "hookrouter";
import ProfileModal from './nav/ProfileModal';
import instance from '../api/config';
import { aggregrateDataScript } from '../scripts/aggregateScript';
import { fulfillRequirements, fulfillRequirementsWays } from '../scripts/requirementChecker';

import { ProgressWindow } from './ProgressWindow';
import { CoursesWindow } from './CoursesWindow';
import { HomeWindow } from './HomeWindow';
import { Navbar } from './nav/Navbar';
import { WAYSWindow } from './WAYSWindow';
import TranscriptUploadModal from './nav/TranscriptUploadModal';

const aiTrackReqs = require('../testJsonFiles/AIRequirementsUC.json');
const waysReqs = require('../testJsonFiles/WAYSRequirementsUC.json')



export default function Dashboard() {

    const [curWindow, setCurWindow] = useState(0);
    const [loading, setLoading] = useState(true);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [transcriptModalOpen, setTranscriptModalOpen] = useState(false);

    const handleWindowChange = (windowNum) => {
        setCurWindow(windowNum);
    }

    const displayCurWindow = (curWindow) => {
        switch (curWindow) {
            case 1: return <ProgressWindow />;
            case 2: return <WAYSWindow />;
            case 3: return <CoursesWindow />;
            default: return <HomeWindow />;
        }
    }


    /**
     * Runs on the init load of the Dashboard
     * Fetchs data and controls the "loading" var 
     * for whether or not to render loading or actual page
     */
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        instance.request({ url: 'data/current-user/', method: 'get' }).then((response) => {
            localStorage.setItem('userStyle', JSON.stringify(response.data));
            localStorage.setItem('firstName', response.data.firstName);
            localStorage.setItem('lastName', response.data.lastName);
            localStorage.setItem('degreeProgress', response.data.degreeProgress);
            localStorage.setItem('track', response.data.track);
            localStorage.setItem('major', response.data.major);
            localStorage.setItem('consumerid', response.data.consumer_id);

            aggregrateDataScript(response.data.transcript_json);
            instance.request({ url: 'data/basic-current-user/', method: 'get' }).then((response) => {
                localStorage.setItem('email', response.data.email);
            }).catch((error) => {
                console.log(error.response.data);
            });

            try {
                let checkedReqs = JSON.stringify(fulfillRequirements(response.data.transcript_json, aiTrackReqs)); // needs more testing on various transcripts
                localStorage.setItem('checkedReqs', checkedReqs);
            } catch (error) {
                console.log(error);
            }

            try {
                let checkedWays = JSON.stringify(fulfillRequirementsWays(response.data.transcript_json, waysReqs));
                console.log(response.data.transcript_json);
                console.log(fulfillRequirementsWays(response.data.transcript_json, waysReqs));
                localStorage.setItem("checkedWays", checkedWays);
            } catch (error) {
                console.log(error);
            }

            setLoading(false);

        }).catch((error) => {
            console.log(error.response.data);
            console.log(error.response.data.detail);

            // if (error.response.data.detail == "Invalid token.") {
            //     console.log("User hasn't completed signup yet.");
            //     navigate("/signup/setup");
            //     return;
            // }

            localStorage.clear('token');
            navigate("/login");
        });



    }, []);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    else {
        return (
            <>
                <Navbar setProfileModalOpen={setProfileModalOpen} setTranscriptModalOpen={setTranscriptModalOpen} />
                <Sidebar curWindow={curWindow} onWindowChange={handleWindowChange} />
                {displayCurWindow(curWindow)}
                <ProfileModal isOpen={profileModalOpen} setIsOpen={setProfileModalOpen} />
                <TranscriptUploadModal isOpen={transcriptModalOpen} setIsOpen={setTranscriptModalOpen} />
            </>

        );
    }
}
