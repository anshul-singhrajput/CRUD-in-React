import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import Navbar from './components/Navbar'
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Edit from './components/Edit.jsx';
import Details from './components/Details.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <><Navbar/><Home /></>, 
        children: [
          {
            path: "view/:id",
            element: <Details/>
          },
          {
            path: "edit/:id",
            element: <Edit/>
          } ,

        ],
      },
      {
        path: "/register",
        element: <Register />
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
