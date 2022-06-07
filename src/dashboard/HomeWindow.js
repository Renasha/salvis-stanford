import { React } from 'react';
import UnitPieChart from "./graphs/UnitPieChart";
import QuarterOverviewGraph from "./graphs/QuarterOverviewGraph";
import ProfileCard from "./general/ProfileCard";

// //Extract data on the current quarter from the extracted transcript
// function getCurQuarterData(testTranscript, curQuarter) {
//     var rightYear = testTranscript.quarters.filter(
//         function (data) { return data.year == curQuarter[1] }
//     );
//     return rightYear.filter(
//         function (data) { return data.quarter == curQuarter[0] }
//     );
// }
export function HomeWindow() {
    const { transcript_json } = JSON.parse(localStorage.getItem('userStyle'));

    return (
        <div className="relative ml-16 mt-16">
            <div className="h-full w-full pt-4">
                <div className="flex flex-wrap">
                    {/*
            TODO: Current Quarter Classes
             */}
                    <ProfileCard />
                    <UnitPieChart />
                    <QuarterOverviewGraph />
                </div>
            </div>
        </div>
    );
}
