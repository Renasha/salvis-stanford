import React from 'react';
import './index.css';
import { useRoutes } from "hookrouter";
import routes from "./router";
import { createRoot } from 'react-dom/client';
import NoPageFound from './generalComponents/NoPageFound';


function App() {
  const routeResult = useRoutes(routes);

  return (
    <>
      {routeResult || <NoPageFound />}
    </>
  )
}



const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);