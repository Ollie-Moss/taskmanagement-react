import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import ErrorPage from './error-page';
import Dashboard from './dashboard';
import Courses from './courses';
import Assignments from './assignments';
import Login from './login';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Root</div>,
        errorElement: <ErrorPage />,
    },
    {
        path: "auth",
        element: <Login />,
    },
    {
        path: "dashboard",
        element: <Dashboard />,
    },
    {
        path: "courses",
        element: <Courses />, 
    },
    {
        path: "assignments",
        element: <Assignments />,
    },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
