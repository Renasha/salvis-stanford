const testUser = require('../testJsonFiles/TestStudent.json');
const testTranscript = require('../testJsonFiles/extractedUser.json');
var aiRequirements = require('../testJsonFiles/AIRequirementsUC.json');
const curQuarter = ["Spring", "2021-2022"] // Might be hardcoded lol, don't forget to switch each quarter


/**
 * emptyStudentTrack
 * 
 * @returns an empty student track to be built out
 */
function emptyStudentTrack(requirementJson) {
	let emptyTrack = {
		...requirementJson
	};

	emptyTrack.requirements.forEach(req => {
		if (req.hasOwnProperty("possible-courses") || req.hasOwnProperty("required-courses")) {
			req["taken-courses"] = [];
			req["taken-units"] = "0";
			req["enrolled-courses"] = [];
		}

		if (req.hasOwnProperty("sub-requirements")) {
			req["sub-requirements"].forEach(subReq => {
				if (subReq.hasOwnProperty("possible-courses") || subReq.hasOwnProperty("required-courses")) {
					subReq["taken-courses"] = [];
					subReq["taken-units"] = "0";
					subReq["enrolled-courses"] = [];
				}
				if (subReq.hasOwnProperty("areas")) {
					subReq["taken-areas"] = "0";
					subReq["taken-courses"] = [];
					subReq["areas"].forEach(track_area => {
						track_area["taken-courses"] = [];
						track_area["taken-units"] = "0";
						track_area["enrolled-courses"] = [];
					});
				}
			});
		}

	});

	return emptyTrack;
}


function checkReqFulfilled(req) {
	if (req.hasOwnProperty("min-units")) {
		if (parseInt(req["taken-units"]) < parseInt(req["min-units"])) return false;
	}
	if (req.hasOwnProperty("min-courses")) {
		if (req["taken-courses"].length < parseInt(req["min-courses"])) return false;
	}
	if (req.hasOwnProperty("min-areas")) {
		if (parseInt(req["taken-areas"]) < parseInt(req["min-areas"])) return false;
	}
	if (req.hasOwnProperty("required-courses")) {
		if (req["required-courses"].length > 0) return false;
	}

	return true;
}


function assignClassToArea(req, course, i, j, transcriptJson) {
	req["areas"].forEach(track_area => {
		if (track_area["area-courses"].includes(course["course_code"].toLowerCase()) && track_area["taken-courses"].length == 0) {
			track_area["taken-courses"].push({ "course-code": course["course_code"], "units": course["units_earned"].trim() });
			req["taken-courses"].push({ "course-code": course["course_code"], "units": course["units_earned"].trim() });
			track_area["area-courses"].splice(track_area["area-courses"].indexOf(course["course_code"].toLowerCase()), 1);
			track_area["taken-units"] = (parseInt(track_area["taken-units"]) + parseInt(course["units_earned"])).toString();
			transcriptJson["quarters"][i]["courses"][j]["req-fulfilled"] = req["title"];
			req["taken-areas"] = (parseInt(req["taken-areas"]) + 1).toString();
		}
	});
	return req;
}

function assignClassToReq(req, course, i, j, transcriptJson) {
	let courses_str = req.hasOwnProperty("possible-courses") ? "possible-courses" : "required-courses";

	/**
	 * TODO - Yasmine
	 * Having some issues here potentially due to an outdated script being ran on the backend
	 * When comparing TestStudent.json (Which I believe you used when making these), the json
	 * returned from the transipt does not inlcude "course-code"
	 * 
	 * Currently this is being ran in Dashboard.js in lines 66/67 I just commented them out currently
	 */

	if (req[courses_str].includes(course["course_code"].toLowerCase())) {
		req["taken-courses"].push({ "course-code": course["course_code"], "units": course["units_earned"].trim() });
		// console.log(req["taken-courses"]);
		req[courses_str].splice(req[courses_str].indexOf(course["course_code"].toLowerCase()), 1);
		req["taken-units"] = (parseInt(req["taken-units"]) + parseInt(course["units_earned"])).toString();
		// transcriptJson.quarters[i]["courses"][j]["req-fulfilled"] = req["title"];
	}
	return req;
}

function searchTakenClasses(req, type, transcriptJson) {
	for (let i = 0; i < transcriptJson.quarters.length; i++) {
		for (let j = 0; j < transcriptJson["quarters"][i]["courses"].length; j++) {
			let current_course = transcriptJson["quarters"][i]["courses"][j];
			if (current_course.hasOwnProperty("req-fulfilled")) continue;
			if (type == "area")
				req = assignClassToArea(req, current_course, i, j);
			else
				console.log(req, current_course, i, j);
				
				req = assignClassToReq(req, current_course, i, j);
			if (checkReqFulfilled(req)) break;
		}
		if (checkReqFulfilled(req)) break;
	}

	return req;
}

export function fulfillRequirementsWays(transcriptJson, waysJson) {
	let waysProgress = emptyStudentTrack(waysJson);

	waysProgress.requirements.forEach(req => {

		// if (req.title == "aesthetic and interpretive inquiry") {
		// 	req = searchTakenClasses(req, "", transcriptJson);
		// }

		if (req.hasOwnProperty("taken-courses") && !checkReqFulfilled(req)) {
			req = searchTakenClasses(req, "", transcriptJson);
			// console.log(req);
		}
		if (req.hasOwnProperty("sub-requirements")) {
			req["sub-requirements"].forEach(subReq => {
				if (subReq.hasOwnProperty("areas") && !checkReqFulfilled(subReq)) {
					subReq = searchTakenClasses(subReq, "area", transcriptJson);
				}
				if (subReq.hasOwnProperty("taken-courses") && !subReq.hasOwnProperty("areas") && !checkReqFulfilled(subReq)) {
					subReq = searchTakenClasses(subReq, "subreq", transcriptJson);
				}

			});
		}
	});

	return waysJson;

}


export function fulfillRequirements(transcriptJson, trackJson) {
	let userProgress = emptyStudentTrack(trackJson);
	userProgress.requirements.forEach((req, index) => {
		if (req.hasOwnProperty("taken-courses") && !checkReqFulfilled(req)) {
			req = searchTakenClasses(req, "", transcriptJson);
		}
		if (req.hasOwnProperty("sub-requirements")) {
			req["sub-requirements"].forEach(subReq => {
				if (subReq.hasOwnProperty("areas") && !checkReqFulfilled(subReq)) {
					subReq = searchTakenClasses(subReq, "area", transcriptJson);
				}

				if (subReq.hasOwnProperty("taken-courses") && !subReq.hasOwnProperty("areas") && !checkReqFulfilled(subReq)) {
					subReq = searchTakenClasses(subReq, "subreq", transcriptJson);
				}
			});
		}
	});

	return userProgress;
}