import React from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import { useState } from 'react'


const Register = () => {

  const [inputValue, setinputValue] = useState({
    name: "",
    email: "",
    phone_no: "",
  })

  const [userData, setUserData] = useState([])
  const navigate = useNavigate("");

  const handleChange = (e) => {
    // console.log(e.target.value);
    setinputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    });
  }

 // console.log(inputValue);

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("data", inputValue);

  try {
      const response = await fetch('http://localhost:3000/saveInfo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputValue)
      });

      const result = await response.json();
      if (result.status === '200') {
          alert('Data inserted successfully');
          setUserData([...userData, inputValue]);
          navigate("/home");
      } else {
         alert('Failed to insert data:', result.msg);
      }
  } catch (error) {
      console.error('Error:', error);
  }
};


 

  return (
    <div className='container'>
      <NavLink to="/home">HOME</NavLink>
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
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Register
