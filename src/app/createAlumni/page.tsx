"use client"
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in Next.js 13+

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  graduationYear: Yup.number()
    .required('Graduation year is required')
    .positive('Must be a positive number')
    .integer('Must be an integer'),
  degree: Yup.string().required('Degree is required'),
  major: Yup.string().required('Major is required'),
  currentCompany: Yup.string(),
  jobTitle: Yup.string(),
  location: Yup.string(),
  linkedInProfile: Yup.string().url('Invalid URL'),
  bio: Yup.string(),
});

const AlumniForm = () => {
  const router = useRouter(); // Initialize useRouter for navigation

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post('/api/create-alumni', values);
      alert('Alumni created successfully!');
      router.push('/'); // Redirect to the home page after successful form submission
    } catch (error) {
      console.error('Error creating alumni:', error);
      alert('Failed to create alumni.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
         style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
      <div className="bg-black/70 p-8 rounded-lg shadow-lg max-w-2xl w-full mt-20">
        <h1 className="text-3xl font-bold text-lilac-500 mb-8 text-center">Create Alumni Profile</h1>
        <div className="bg-white/20 p-6 rounded-lg backdrop-filter backdrop-blur-md"> {/* Transparent form */}
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              graduationYear: '',
              degree: '',
              major: '',
              rollNumber: '',
              currentCompany: '',
              jobTitle: '',
              location: '',
              linkedInProfile: '',
              bio: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white">First Name</label>
                    <Field
                      name="firstName"
                      type="text"
                      className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white">Last Name</label>
                    <Field
                      name="lastName"
                      type="text"
                      className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-600 text-sm" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="graduationYear" className="block text-sm font-medium text-white">Graduation Year</label>
                    <Field
                      name="graduationYear"
                      type="number"
                      className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                    />
                    <ErrorMessage name="graduationYear" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="degree" className="block text-sm font-medium text-white">Degree</label>
                    <Field
                      name="degree"
                      type="text"
                      className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                    />
                    <ErrorMessage name="degree" component="div" className="text-red-600 text-sm" />
                  </div>
                </div>
                <div>
                  <label htmlFor="major" className="block text-sm font-medium text-white">Major</label>
                  <Field
                    name="major"
                    type="text"
                    className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                  />
                  <ErrorMessage name="major" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label htmlFor="rollNumber" className="block text-sm font-medium text-white">Roll Number</label>
                  <Field
                    name="rollNumber"
                    type="text"
                    className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                  />
                  <ErrorMessage name="rollNumber" component="div" className="text-red-600 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="currentCompany" className="block text-sm font-medium text-white">Current Company</label>
                    <Field
                      name="currentCompany"
                      type="text"
                      className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                    />
                    <ErrorMessage name="currentCompany" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-white">Job Title</label>
                    <Field
                      name="jobTitle"
                      type="text"
                      className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                    />
                    <ErrorMessage name="jobTitle" component="div" className="text-red-600 text-sm" />
                  </div>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-white">Location</label>
                  <Field
                    name="location"
                    type="text"
                    className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                  />
                  <ErrorMessage name="location" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label htmlFor="linkedInProfile" className="block text-sm font-medium text-white">LinkedIn Profile</label>
                  <Field
                    name="linkedInProfile"
                    type="url"
                    className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                  />
                  <ErrorMessage name="linkedInProfile" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-white">Bio</label>
                  <Field
                    name="bio"
                    as="textarea"
                    rows="4"
                    className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                  />
                  <ErrorMessage name="bio" component="div" className="text-red-600 text-sm" />
                </div>
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-md">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
  );
};

export default AlumniForm;
