import React from "react";

export default function ClosingAlert({ boldText, text, color }) {
    return (
            <div
                className={
                    `z-50 text-white px-6 py-4 border-0 rounded-lg bg-${color}-500 absolute left-1/2 -translate-x-1/2 top-10 scale-100`
                }
            >
                <span className="inline-block align-middle mr-8">
                    <b className="capitalize">{boldText}!</b> {text}
                </span>
                <button
                    className="absolute text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                    // onClick={() => setShowAlert(false)}
                >
                    <span>×</span>
                </button>
            </div>
    );
};