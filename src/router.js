import React from "react";
import Dashboard from './dashboard/Dashboard';
import LandingPage from './landing/LandingPage';
import Login from './login/Login';
import SignUp from "./login/SignUp";
import SignUpSetup from "./login/SignUpSetup";

// https://blog.logrocket.com/how-react-hooks-can-replace-react-router/

const routes = {
    "/": () => <LandingPage />,
    "/login": () => <Login />,
    "/signup": () => <SignUp />,
    "/signup/setup": () => <SignUpSetup />,
    "/app": () => <Dashboard />,
};

export default routes;
