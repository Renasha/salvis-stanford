import React from 'react';

function stoplightColor(keyword) {
    var color = "text-gray-800 bg-gray-300";
    switch (keyword) {
        case "Enrolled":
            color = "text-yellow-800 bg-yellow-200 ";
            break;
        case "Taken":
            color = "text-green-800 bg-green-200 ";
            break;
        default:
            color = "text-green-800 bg-green-200 ";
            break;
    }
    return color;
}
export default function CSReqs() {

    return (
        <div className="rounded-lg border border-gray-200 md:w-1/2 lg:w-1/3 shadow-lg">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className=" sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-lg">
                            <div className="py-3 px-4 text-center text-lg font-semibold">
                                CS Core Requirements
                            </div>
                            <div className="relative pt-1">
                                <div className="overflow-hidden h-[1px] flex bg-gray-200">
                                </div>
                            </div>

                            <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Course
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Status
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Units
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            CS 107 or 107E
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <span className={stoplightColor("Taken") + "inline-block rounded-full font-mono px-2 py-1 text-xs"}>{"Taken"}</span>
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            5
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            CS 110 or 111
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <span className={stoplightColor("Taken") + "inline-block rounded-full font-mono px-2 py-1 text-xs"}>{"Taken"}</span>
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            5
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            CS 161
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <span className={stoplightColor("Taken") + "inline-block rounded-full font-mono px-2 py-1 text-xs"}>{"Taken"}</span>
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            5
                                        </td>
                                    </tr>
                                    <tr className="bg-green-200 border-t">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Total
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            Completed
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            15
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>)
}
