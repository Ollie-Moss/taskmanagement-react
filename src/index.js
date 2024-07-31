import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import ErrorPage from './error-page'
import Dashboard from './dashboard'
import Login from './login'
import Signup from './signup'

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import DataDisplay from './data-display'
import AssignmentDisplay from './assignment-display'
import CourseDisplay from './course-display'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
        errorElement: <ErrorPage />,
    },
    {
        path: 'auth',
        element: <Login />,
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
    },
    {
        path: 'courses',
        element: <DataDisplay display={CourseDisplay} />,
    },
    {
        path: 'assignments',
        element: <DataDisplay display={AssignmentDisplay} />,
    },
    {
        path: 'signup',
        element: <Signup />,
    },
])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
