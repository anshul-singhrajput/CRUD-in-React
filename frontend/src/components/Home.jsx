import React, { useState, useEffect } from 'react'
import { IoReaderSharp } from "react-icons/io5";
import { FaSquarePen } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

const Home = () => {

    const [getuserData, setGetUserData] = useState([]);

    const getData = async (e) => {
        try {
            const response = await fetch('http://localhost:3000/getData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if (result.status === '200') {
                console.log(result.data);
                setGetUserData(result.data);
            } else {
                console.error('Failed to fetch data:', result.msg);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/deleteStudent/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if (result.status === '200') {
                // Refresh the data
                getData();
                alert('Data deleted successfully');
            } else {
                console.error('Failed to delete data:', result.msg);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        getData();
    }, []);


    return (
        <div className='mt-5'>
            <div className="container">
                <div className="add_btn mt-2">
                    <NavLink to="/register" className='btn btn-primary'>Add Data</NavLink>
                </div>
                <table className="table">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone No.</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {getuserData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">No data is available</td>
                            </tr>
                        ) : (
                            getuserData.map((element, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.phone_no}</td>
                                    <td className='d-flex justify-content-between'>
                                        <NavLink to={`view/${element.id}`}><button className="btn btn-success"><IoReaderSharp /> Read</button></NavLink>
                                        <NavLink to={`edit/${element.id}`}> <button className="btn btn-warning"><FaSquarePen /> Update</button></NavLink>
                                        <button className="btn btn-danger" onClick={() => handleDelete(element.id)}><RiDeleteBin5Fill /> Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}


                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Home
