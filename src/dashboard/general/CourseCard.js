// import React from 'react';

// /**
//  * @param {string} keyword 
//  */
// function stoplightColor(keyword) {

//     var color = "text-gray-800 bg-gray-300";

//     switch (keyword) {
//         case "Enrolled":
//             color = "text-yellow-800 bg-yellow-200 ";
//             break;
//         case "Taken":
//             color = "text-green-800 bg-green-200 ";
//             break;
//         default:
//             color = "text-green-800 bg-green-200 ";
//             break;
//     }
//     console.log("Color: " + color)
//     return color;
// }


// export default function CourseCard(props) {
//     return (
//         <div className="w-full md:w-1/3 xl:w-1/5 px-4">
//             <div className="relative flex flex-col min-w-0 break-words  bg-white mb-6 shadow-lg border border-gray-400 rounded-lg hover:shadow-lg hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
//                 <div className="flex-auto p-4">
//                     <div><span className="font-bold text-lg text-gray-900">{props.classData.name}: </span>
//                         <span className="line-clamp-2 text-lg text-gray-700">{props.classData.shortDescription}</span>
//                     </div>

//                     <div>
//                         <span className={stoplightColor(props.classData.taken) + "inline-block rounded-full font-mono px-2 py-1 text-xs"}>{props.classData.taken}</span>
//                         <span className="inline-block rounded-full text-purple-800 font-mono bg-purple-100 px-2 py-1 text-xs">Units: {props.classData.units}</span>

//                     </div>
//                     {/* <p className="line-clamp-3 mb-2 font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">{props.classData.fullDescription}</p> */}

//                     {
//                         props.classData.ways[0] ? // if the ways list isn't empty
//                             <div className="text-left">
//                                 <span className="text-blue-800 bg-blue-200 inline-block rounded-full font-mono px-2 py-1 text-xs mr-3 hover:scale-110 transition-all duration-200">{props.classData.ways[0]}</span>
//                                 <span className="text-red-800 bg-red-300 inline-block rounded-full font-mono px-2 py-1 text-xs mr-3 hover:scale-110 transition-all duration-200">{props.classData.ways[1]}</span>
//                             </div>
//                             : null
//                     }
//                 </div>
//             </div>
//         </div>

//     )
// }


// export const currentClassData = [
//     {
//         classNum: 8491,
//         name: "CS 221",
//         shortDescription: "Artificial Intelligence: Principles and Techniques",
//         fullDescription: "Artificial intelligence (AI) has had a huge impact in many areas, including medical diagnosis, speech recognition, robotics, web search, advertising, and scheduling. This course focuses on the foundational concepts that drive these applications. In short, AI is the mathematics of making good decisions given incomplete information (hence the need for probability) and limited computation (hence the need for algorithms). Specific topics include search, constraint satisfaction, game playing,n Markov decision processes, graphical models, machine learning, and logic. Prerequisites: CS 103 or CS 103B/X, CS 106B or CS 106X, CS 109, and CS 161 (algorithms, probability, and object-oriented programming in Python). We highly recommend comfort with these concepts before taking the course, as we will be building on them with little review.",
//         taken: "Enrolled",
//         units: 4,
//         ways: [],
//     },
//     {
//         classNum: 29369,
//         name: "German 101",
//         shortDescription: "Germany in 5 Words",
//         fullDescription: "This course explores German history, culture and politics by tracing five (largely untranslatable) words and exploring the debates they have engendered in Germany over the past 200 years. This course is intended as preparation for students wishing to spend a quarter at the Bing Overseas Studies campus in Berlin, but is open to everyone. Taught in English.",
//         taken: "Enrolled",
//         units: 3,
//         ways: ["WAYS-AQII", "WAY-EDP"],
//     },
//     {
//         classNum: 3553,
//         name: "CS 194",
//         shortDescription: "Software Project",
//         fullDescription: "Design, specification, coding, and testing of a significant team programming project under faculty supervision. Documentation includes capture of project rationale, design and discussion of key performance indicators, a weekly progress log and a software architecture diagram. Public demonstration of the project at the end of the quarter. Preference given to seniors. May be repeated for credit. Prerequisites: CS109 and CS161.",
//         taken: "Taken ✅",
//         units: 3,
//         ways: [],
//     }

// ];