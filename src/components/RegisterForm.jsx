// RegisterForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';


const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(8, 'Password must be at least 8 characters').required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      confirmpassword: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://pwdtask.onrender.com/api/user/create', values);
        console.log(response.data);
        alert('Registration Success')
        
        // Handle success or redirect to another page
      } catch (error) {
        console.error('Error during registration:', error.message);
        // Handle error
      }
    },
  });;

  return (
    <form onSubmit={formik.handleSubmit}>

      <div>
        <h1 style={{ color: "orange",textAlign:'center'}}>Funn</h1>
        <p>Join with us! become a one in Million of our Users</p>
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder='Name'
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && <div className="error-message">{formik.errors.name}</div>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder='Email'
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder='*********'
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && <div className="error-message">{formik.errors.password}</div>}
      </div>

      <div>
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type="password"
          placeholder='*********'
          id="confirmpassword"
          name="confirmpassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmpassword}
        />
        {formik.touched.confirmpassword && formik.errors.confirmpassword && <div className="error-message">{formik.errors.confirmpassword}</div>}
      </div>

      <button type="submit">Register</button>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
