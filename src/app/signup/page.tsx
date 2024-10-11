'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
  dob: Yup.date().required('Required'),
  rollNumber: Yup.string().required('Required'),
  isAlumni: Yup.boolean(),
});

const SignupForm = () => {
  const router = useRouter(); // Use useRouter for client-side redirection

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
      style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
    >
      <div className="bg-black/70 p-8 rounded-lg shadow-lg max-w-2xl w-full mt-20">
        <h1 className="text-3xl font-bold text-lilac-500 mb-8 text-center">Sign Up</h1>
        
        <div className="bg-white/20 p-6 rounded-lg backdrop-filter backdrop-blur-md">
          <Formik
            initialValues={{
              email: '',
              password: '',
              dob: '',
              rollNumber: '',
              isAlumni: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              try {
                // Step 1: Sign up the user
                const response = await fetch('/api/signup', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
                });

                const data = await response.json();
                if (response.ok) {
                  // Step 2: Redirect to login page
                  router.push('/login'); // Redirects to login page after signup
                } else {
                  console.error(data.error);
                  // Handle any signup error (e.g., display error message to user)
                }
              } catch (error) {
                console.error('An error occurred during signup:', error);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className={`mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500 ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="dob" className="block text-sm font-medium text-white">Date of Birth</label>
                  <Field
                    type="date"
                    id="dob"
                    name="dob"
                    className={`mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500 ${errors.dob && touched.dob ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <ErrorMessage name="dob" component="div" className="text-red-600 text-sm" />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="rollNumber" className="block text-sm font-medium text-white">Roll Number</label>
                  <Field
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    className={`mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500 ${errors.rollNumber && touched.rollNumber ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <ErrorMessage name="rollNumber" component="div" className="text-red-600 text-sm" />
                </div>
                
                <div className="mb-4 flex items-center">
                  <Field
                    type="checkbox"
                    id="isAlumni"
                    name="isAlumni"
                    className="mr-2"
                  />
                  <label htmlFor="isAlumni" className="text-sm font-medium text-white">Are you an alumni?</label>
                </div>
                
                <button type="submit" className="bg-blue-700 hover:bg-lilac-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-lilac-500">
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
