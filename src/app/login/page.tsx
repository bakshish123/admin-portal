// pages/login.tsx
"use client"
import { signIn } from "next-auth/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <Formik
          initialValues={{
            rollNumber: "",
            password: "",
          }}
          validationSchema={Yup.object({
            rollNumber: Yup.string().required("Roll number is required"),
            password: Yup.string()
              .required("Password is required")
              .min(6, "Password must be at least 6 characters long"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);  // Reset error before submission
            const result = await signIn("credentials", {
              redirect: false,
              rollNumber: values.rollNumber,
              password: values.password,
            });

            setSubmitting(false);

            if (result?.error) {
              setError(result.error);
            } else {
              router.push("/");  // Redirect to homepage after successful login
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="rollNumber" className="block text-gray-700">
                  Roll Number
                </label>
                <Field
                  name="rollNumber"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
                <ErrorMessage
                  name="rollNumber"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              {error && <p className="text-red-600 mb-4">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

// "use client";

// import { signIn } from 'next-auth/react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });

// const Login = () => {
//   const router = useRouter();
//   const [error, setError] = useState('');

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900">
//       <Formik
//         initialValues={{ email: '', password: '' }}
//         validationSchema={LoginSchema}
//         onSubmit={async (values, { setSubmitting }) => {
//           const res = await signIn('credentials', {
//             redirect: false,
//             email: values.email,
//             password: values.password,
//           });

//           setSubmitting(false);

//           if (res?.error) {
//             setError('Invalid email or password');
//           } else {
//             router.push('/'); // Redirect to home on successful login
//           }
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form className="w-full max-w-sm p-8 bg-gray-800 shadow-md rounded-lg">
//             <h2 className="text-2xl text-white mb-6">Login</h2>
//             {error && <div className="text-red-500 mb-4">{error}</div>}

//             <div className="mb-4">
//               <label htmlFor="email" className="block text-white mb-1">Email</label>
//               <Field
//                 type="email"
//                 name="email"
//                 id="email"
//                 className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
//               />
//               <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="password" className="block text-white mb-1">Password</label>
//               <Field
//                 type="password"
//                 name="password"
//                 id="password"
//                 className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
//               />
//               <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Logging in...' : 'Login'}
//             </button>

//             <div className="mt-4 text-center">
//               <p className="text-white mb-4">Or sign in with:</p>
//               <button
//                 type="button"
//                 onClick={() => signIn('google')}
//                 className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//               >
//                 Sign in with Google
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Login;
