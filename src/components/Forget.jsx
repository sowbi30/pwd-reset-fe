// Forget.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Forget = () => {
  const Navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://pwdtask.onrender.com/api/user/forgot-password', values);
        console.log(response.data);

        // Redirect to reset page upon successful validation
        Navigate.push('/reset');
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
        <p>Enter your register Mail!</p>
      </div>
      <div>
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
        
        {/* Disable the button if the email is invalid */}
        <button type="submit" disabled={formik.errors.email}>
          Recover
        </button>
      </div>

      {/* Render the link only if a valid email is provided */}
      {formik.values.email && !formik.errors.email && (
        <div>
          <Link to="/reset">To Reset</Link>
        </div>
      )}
    </form>
  );
};

export default Forget;
