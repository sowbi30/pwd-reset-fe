// RegisterForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(8, 'Password must be at least 8 characters').required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://pwdtask.onrender.com/api/user/signin', values);
        console.log(response.data);
        // Handle success
      } catch (error) {
        console.error('Error during registration:', error.message);
        // Handle error
      }
    },
  });

  return (
      <form onSubmit={formik.handleSubmit}>
          <div>
        <h1 style={{ color: "orange",textAlign:'center'}}>Funn</h1>
        <p>Welcome Back !!</p>
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
          placeholder='********'
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && <div className="error-message">{formik.errors.password}</div>}
      </div>

      
          <button type="submit">Login</button>
          
          <p>
        Forgot password? <Link to="/forget">click here</Link>
      </p>
    </form>
  );
};

export default Login;
