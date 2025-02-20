import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Tasks from '../Pages/Tasks';

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                path:'/',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:'/tasks',
                element:<Tasks/>
            }

        ]
    }
])

export default router