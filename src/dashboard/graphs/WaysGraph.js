import React, { PureComponent } from 'react';
import { BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const testUser = require('../../testJsonFiles/TestStudent.json');

const WAYS = [
  {
    name: 'TM',
    Left: 0,
    Taken: 1,
  },
  {
    name: 'FR',
    Left: 0,
    Taken: 3,
  },
  {
    name: 'AQR',
    Left: 0,
    Taken: 3,
  },
  {
    name: 'ER',
    Left: 1,
    Taken: 2,
  },
  {
    name: 'SMA',
    Left: 3,
    Taken: 3,
  },
  {
    name: 'CE',
    Left: 2,
    Taken: 0,
  },
  {
    name: 'ED',
    Left: 3,
    Taken: 0,
  },
  {
    name: 'SI',
    Left: 2,
    Taken: 4,
  },
  {
    name: 'A-II',
    Left: 6,
    Taken: 0,
  },
];
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
      color = "text-gray-800 bg-gray-300 ";
      break;
  }
  return color;
}
export default function BarGraph() {
  return (
    <div className="w-full md:w-2/3 xl:w-3/5 px-4 ">
      <div className="relative flex flex-col min-w-128 break-words bg-white mb-6 shadow-lg border border-gray-400 rounded-lg hover:shadow-lg hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
        <div className="h-72 blur-sm hover:blur-none">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={WAYS}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis>
                <Label
                  style={{
                    textAnchor: "middle",
                    fontSize: "130%",
                  }}
                  angle={270}
                  value={"Units"} />
              </YAxis>
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="Taken" stackId="a" fill="#8884d8" />
              <Bar dataKey="Left" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg">
              <div className="py-3 px-4 text-center text-lg font-semibold">
                WAYS Requirements
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-[1px] flex bg-gray-200">
                </div>
              </div>

              <table className="min-w-full table-auto">
                <thead className="bg-seagreen-300 border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Course
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Classes Taken
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Status
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Units Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      TM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      THINK 3
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className={stoplightColor("Taken") + "inline-block rounded-full  px-2 py-1 text-xs"}>{"Completed"}</span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      3
                    </td>
                  </tr>
                  <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      FR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      CS 106B
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className={stoplightColor("Taken") + "inline-block rounded-full  px-2 py-1 text-xs"}>{"Completed"}</span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      3
                    </td>
                  </tr>
                  <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      AQR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      MSE 152
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className={stoplightColor("Taken") + "inline-block rounded-full  px-2 py-1 text-xs"}>{"Completed"}</span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      3
                    </td>
                  </tr>
                  <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ER
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      PHIL 174B
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className={stoplightColor("Enrolled") + "inline-block rounded-full  px-2 py-1 text-xs"}>{"1 Unit(s) Left"}</span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      3
                    </td>
                  </tr>
                  <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      SMA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      PHYSICS 41
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className={stoplightColor("Enrolled") + "inline-block rounded-full  px-2 py-1 text-xs"}>{"3 Unit(s) Left"}</span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      6
                    </td>
                  </tr>
                  <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      CE
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      N/A
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className={stoplightColor("Enrolled") + "inline-block rounded-full  px-2 py-1 text-xs"}>{"2 Unit(s) Left"}</span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      2
                    </td>
                  </tr>
                  <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ED
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      N/A
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className={stoplightColor("Enrolled") + "inline-block rounded-full  px-2 py-1 text-xs"}>{"3 Unit(s) Left"}</span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      3
                    </td>
                  </tr>
                  <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      SI
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      PSYCH 90
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className={stoplightColor("Enrolled") + "inline-block rounded-full  px-2 py-1 text-xs"}>{"2 Unit(s) Left"}</span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      6
                    </td>
                  </tr>
                  <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      A-II
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      N/A
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className={stoplightColor("Enrolled") + "inline-block rounded-full  px-2 py-1 text-xs"}>{"6 Unit(s) Left"}</span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      6
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}