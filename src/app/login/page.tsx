"use client";

import { signIn } from 'next-auth/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
          });

          setSubmitting(false);

          if (res?.error) {
            setError('Invalid email or password');
          } else {
            router.push('/'); // Redirect to home on successful login
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-sm p-8 bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-2xl text-white mb-6">Login</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-1">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-white mb-1">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
