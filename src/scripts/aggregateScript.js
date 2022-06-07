function aggregateSubjectTotals(transcriptJson) {
    const { quarters } = transcriptJson;
    var totalCounts = {};
    quarters.forEach((quarter, index) => {
        const { courses } = quarter;
        courses.forEach((course, index2) => {
            const { subject, units_earned } = course;
            totalCounts[subject] = (totalCounts[subject] || 0) + parseInt(units_earned);
        })
    })

    var data = [];
    for (var key in totalCounts) {
        data.push({ name: key, value: totalCounts[key] })
    }

    var totalUnits = 0;
    for (var course in data) {
        totalUnits += data[course].value;
    }

    localStorage.setItem("totalUnits", totalUnits.toString())
    localStorage.setItem("aggregatedSubjectTotals", JSON.stringify([data, totalUnits]))
}


function aggregateQuarterTotals(transcriptJson) {
    const { quarters } = transcriptJson;
    var totalCounts = {};
    var classTypes = new Set();

    quarters.forEach((qtr, index) => {
        const { courses, quarter, year } = qtr;
        const slicedYear = (quarter == "Autumn") ? year.split('-')[0] : year.split('-')[1];
        const taken = quarter + " " + slicedYear;

        courses.forEach((course, index2) => {
            var { subject, units_earned, units_attempted } = course;
            classTypes.add(subject);

            units_earned = parseInt(units_earned) > parseInt(units_attempted) ? parseInt(units_earned) : parseInt(units_attempted);



            if (totalCounts[taken] != null) {
                totalCounts[taken][subject] = (totalCounts[taken][subject] || 0) + units_earned;
            }
            else {
                totalCounts[taken] = {};
                totalCounts[taken][subject] = (totalCounts[taken][subject] || 0) + units_earned;
            }
        })
    })

    var data = [];
    for (var key2 in totalCounts) {
        var subDict = totalCounts[key2];
        subDict["name"] = key2;
        data.push(subDict)
    }

    var classTypesArr = Array.from(classTypes);
    const output = [classTypesArr, data];

    localStorage.setItem("aggregatedQuarterTotals", JSON.stringify(output));
}

//TODO Make a script that returns a list of classes

export function aggregrateDataScript(transcriptJson) {
    aggregateSubjectTotals(transcriptJson);
    aggregateQuarterTotals(transcriptJson);
    return;
}