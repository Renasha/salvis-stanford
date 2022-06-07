/*
import { React, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export function CoursesWindow() {
    const [inputs, setInputs] = useState({});

    //handlsearchinput will take user input (most likely class code) and store it for search
    let handleSearchInput = (event) => {
        // console.log("Input detected")
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };
    //TODO: handlesearchaction will use the user input and return classes from explorecourses or whatever
    //This function should also be called on the "enter" keypress
    let handleSearchAction = (e) => {
        // console.log("Trying to search?")
        // console.log(inputs)
        var output = {
            "keyword": inputs.keyword.toLowerCase(),
        };
    };
    return (
        <div className="relative ml-16 mt-16 p-4">
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-seagreen-500 mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
                        <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
                            Course Choices
                        </a>
                        <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
                            <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                        </button>
                    </div>
                    <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
                        <ul className="flex flex-col lg:flex-row list-none mr-auto">
                            <li className="nav-item">
                                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                                    <i className="fab fa-twitter text-lg leading-lg text-white opacity-75" /> <span className="ml-2">Explore Courses</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                                    <span className="ml-2">Carta</span>
                                </a>
                            </li>
                        </ul>
                        <div className="relative flex w-full sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto">
                            <div className="flex">
                                <span className="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-emerald-600 rounded-full text-sm bg-emerald-100 items-center rounded-r-none pl-2 py-1 text-emerald-800 border-r-0 placeholder-emerald-300">
                                    <button onClick={handleSearchAction}>{<AiOutlineSearch size="12" />}</button>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="keyword"
                                value={inputs.keyword || ""}
                                className="px-2 py-1 h-8 border border-solid  border-emerald-600 rounded-full text-sm leading-snug text-emerald-700 bg-emerald-100 shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-emerald-300"
                                placeholder="Search for Courses"
                                onChange={handleSearchInput} />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
*/

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//TODO Daulet:
//Class name gets cut off, implement text wrap
//Add total units for each quarter
//Add other visualizations per quarter
//Others feel free to add suggestions
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'course',
        headerName: 'Course Code',
        width: 120,
        editable: false,
    },
    {
        field: 'name',
        headerName: 'Class Name',
        width: 200,
        editable: false,
    },
    {
        field: 'units',
        headerName: 'Earned/Attempted',
        width: 150,
        editable: false,
    },
    {
        field: 'grade',
        headerName: 'Grade',
        width: 100,
        editable: false,
    },
];

//Fill this out with Course data
var rows = [];

export function CoursesWindow() {
    /*const [data, setData] = useState([]);

    useEffect(() => { // fetch the data stored in local storage
        const data = JSON.parse(localStorage.getItem("userStyle")).transcript_json.quarters;
        if (data) {
            setData(data);
        }
    }, []);*/
    
    const [quarter, setQuarter] = React.useState('');

    const handleQuarterChange = (event) => {
        setQuarter(event.target.value);
        updateRows(event.target.value);
    };

    //Set up menu list
    const data = JSON.parse(localStorage.getItem("userStyle")).transcript_json.quarters;
    var menu = [];
    for (let i = 0; i < data.length; i++){
        var item = data[i].quarter + ' ' + data[i].year;
        menu.push({
            "label": item,
            "value": i
        });
    }

    //Update the table after quarter is selected
    function updateRows(quarter){
        console.log(quarter)
        var courses = data[quarter].courses
        console.log(courses)
        rows = [];
        for (let i = 0; i < courses.length; i++){
            var c = courses[i];
            var course = c.course_code;
            var name = c.title;
            var units = c.units_earned + '/' + c.units_attempted;
            var grade = c.grade;
            rows.push({
                "id": i,
                "course": course,
                "name": name,
                "units": units,
                "grade": grade
            })
        }
    }

    return (
        <div className="relative ml-16 mt-16 p-4">
            <Box sx={{ minWidth: 120 }}>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="select-label">Quarter</InputLabel>
                    <Select
                        labelId="select-label"
                        id="demo-simple-select"
                        value={quarter}
                        label="Quarter"
                        onChange={handleQuarterChange}
                    >
                        {menu?.map(m => {
                            return (
                                <MenuItem key={m.value} value={m.value}>
                                    {m.label ?? m.value}
                                </MenuItem>
                            );
                    })}
                    </Select>
                </FormControl>
            </Box>

            <div style={{ height: 500, width: '50%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={7}
                    rowsPerPageOptions={[7]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </div>
    );
}
