import React from 'react'
import { NavLink , useNavigate  , useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


const Edit = () => {

  const { id } = useParams("");
  const navigate = useNavigate("");
  // const [getuserData, setGetUserData] = useState([]);

  const [inputValue, setinputValue] = useState({
    name: "",
    email: "",
    phone_no: "",
  })

  // const [userData, setUserData] = useState([])

  const handleChange = (e) => {
    // console.log(e.target.value);
    setinputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    });
  }

  // console.log(inputValue);

  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/updateStudent/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue),
      });
  
      const result = await response.json();
      if (response.status === 200) {
        alert("Data updated successfully");
        navigate("/home");
      } else if (response.status === 201) {
        alert("Data is empty or ID not found");
      } else {
        alert(`Failed to update data: ${result.msg}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating data');
    }
  };

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
        setinputValue(result.data);
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
    <div className='container'>
      <NavLink to="/home">HOME2</NavLink>
      <h1>Edit Student Information</h1>
      <form >
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" name='name' value={inputValue.name} placeholder='Username' onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Email address</label>
            <input type="email" name='email' onChange={handleChange} value={inputValue.email} placeholder='Email' className="form-control" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Phone No.</label>
            <input type="number" name='phone_no' value={inputValue.phone_no} placeholder='Phone No.' onChange={handleChange} className="form-control" />
          </div>
        </div>
        <button type="submit" onClick={updateStudent} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Edit