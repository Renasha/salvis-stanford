import { unstable_isMuiElement } from '@mui/utils';
import { Title } from 'chart.js';
import { React } from 'react';
import CSReqs from "./tables/CSReqs";
import MathReqs from "./tables/MathReqs";

export function ProgressWindow() {
    return (
        <div className="relative ml-16 mt-16 p-4">
            <EngrFundamentalsTable />
            <CSReqs />
            <div>
                ---------------
            </div>
            <MathReqs />
        </div>
    );
}




function EngrFundamentalsTable() {
    let checkedReqs = JSON.parse(localStorage.getItem("checkedReqs"));
    let engrFundReqs = checkedReqs.requirements[3];

    const title = engrFundReqs["title"].toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    const minUnits = engrFundReqs["min-units"];
    const subReqs = engrFundReqs["sub-requirements"];

    var totalUnits = 0;

    const Row = (req) => {
        // console.log(req);

        req = req.req;
        const minCourses = parseInt(req["min-courses"]);
        const enrolledCourses = req["enrolled-courses"];
        const possibleCourses = req["possible-courses"];
        const takenCourses = req["taken-courses"];
        const takenUnits = req["taken-units"];

        totalUnits += takenUnits;


        const title = req["title"].toUpperCase();
        const takenCourse = takenCourses.length > 0 ? takenCourses[0]["course-code"] : "";

        const status = takenCourses.length >= minCourses ? "Completed" : "Incomplete"

        return (

            <tr className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {title}
                </th>
                <td className="px-6 py-4">
                    {takenCourse}
                </td>
                <td className="px-6 py-4">
                    <span className={stoplightColor(status) + "inline-block rounded-full px-2 py-1 text-xs"}>{status}</span>
                </td>
                <td className="px-6 py-4">
                    {takenUnits}
                </td>
            </tr>
        )
    }

    return (

        <div className="relative overflow-x-auto shadow-lg rounded-lg lg:w-1/2 border">
            <div className="py-3 px-4 text-center text-lg font-semibold bg-gray-50">
                {title}
            </div>
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="border-y text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Requirement
                        </th>
                        <th className="px-6 py-3">
                            Fulfilled With
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Units
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {subReqs.map((req, index) => {
                        return (
                            <Row req={req} key={index} />
                        )
                    })}

                    <tr className=" border-t">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Total
                        </td>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Requirement
                        </th>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            Completed
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {totalUnits}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


function stoplightColor(keyword) {
    var color = "text-gray-800 bg-gray-300";
    switch (keyword) {
        case "Enrolled":
            color = "text-yellow-800 bg-yellow-200 ";
            break;
        case "Taken" || "Completed":
            color = "text-green-800 bg-green-200 ";
            break;
        default:
            color = "text-green-800 bg-green-200 ";
            break;
    }
    return color;
}