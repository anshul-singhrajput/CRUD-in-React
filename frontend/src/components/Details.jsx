import React from 'react'
import profileimg from '../assets/profile.png'
import { MdEmail } from "react-icons/md";
import { FaMobileScreen } from "react-icons/fa6";
import { FaSquarePen } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';

const Details = () => {

    const { id } = useParams("");
    const [userData, setUserData] = useState([]);

    const getUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/getUser/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (result.status === '200') {
                setUserData(result.data);
            } else {
                console.error('Failed to fetch user data:', result.msg);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);


    return (
        <div className='container mt-3'>
            <h1>Welcome Anshul </h1>
            <div className="card" style={{ width: "32rem" }}>
                <div className="img-btn">
                    <img src={profileimg} style={{ width: 50 }} className="card-img-top" alt="profile img" />
                    <button className="btn update btn-warning margin-btn"><FaSquarePen />Update</button>
                    <button className="btn btn-danger margin-btn"><RiDeleteBin5Fill />Delete</button>
                </div>

                <div className="center_view">
                    <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name : <span>{userData.name}</span></h3>
                    <h3><MdEmail />  Email : <span>{userData.email}</span></h3>
                    <h3><FaMobileScreen />  Mobile No. : <span>{userData.phone_no}</span></h3>
                </div>
            </div>
        </div>
    )
}

export default Details