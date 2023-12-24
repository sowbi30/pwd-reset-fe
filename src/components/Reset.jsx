import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
  const Navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmpassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://pwdtask.onrender.com/api/user/reset-password', values);
        console.log(response.data);
        // Redirect to login page upon successful password reset
          Navigate.push('/login');
          
      } catch (error) {
        console.error('Error during password reset:', error.message);
        // Handle error
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <h1 style={{ color: 'orange', textAlign: 'center' }}>Funn</h1>
        <p>Enter New Password!</p>
      </div>
      <div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="********"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </div>

        <div>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            placeholder="********"
            id="confirmpassword"
            name="confirmpassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmpassword}
          />
          {formik.touched.confirmpassword && formik.errors.confirmpassword && (
            <div className="error-message">{formik.errors.confirmpassword}</div>
          )}
        </div>
      </div>

          <button type="submit">Reset</button>
          
    </form>
  );
};

export default Reset;
