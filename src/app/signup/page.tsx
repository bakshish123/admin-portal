// src/app/signup/page.tsx
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
    <div className="flex items-center justify-center min-h-screen">
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
            const response = await fetch('/api/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });

            const data = await response.json();
            if (response.ok) {
              // Check if the user is signing up as an alumni
              if (values.isAlumni) {
                router.push('/createAlumni'); // Redirect to create alumni page
              } else {
                router.push('/'); // Redirect to home page for non-alumni users
              }
            } else {
              console.error(data.error);
              // Handle any signup error (e.g., display error message to user)
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="max-w-lg mx-auto p-8 bg-[#1f2937] rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2 text-white">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-bold mb-2 text-white">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block text-sm font-bold mb-2 text-white">Date of Birth</label>
              <Field
                type="date"
                id="dob"
                name="dob"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dob && touched.dob ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="dob" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4">
              <label htmlFor="rollNumber" className="block text-sm font-bold mb-2 text-white">Roll Number</label>
              <Field
                type="text"
                id="rollNumber"
                name="rollNumber"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.rollNumber && touched.rollNumber ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="rollNumber" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4 flex items-center">
              <Field
                type="checkbox"
                id="isAlumni"
                name="isAlumni"
                className="mr-2"
              />
              <label htmlFor="isAlumni" className="text-sm font-bold text-white">Are you an alumni?</label>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
