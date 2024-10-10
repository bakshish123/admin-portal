"use client";
import { signIn } from "next-auth/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
      style={{ backgroundImage: 'url(/background-image.jpg)' }}
    >
      <div className="bg-black/70 p-8 rounded-lg shadow-lg max-w-2xl w-full mt-20">
        <h1 className="text-3xl font-bold text-lilac-500 mb-8 text-center">Login</h1>
        
        <div className="bg-white/20 p-6 rounded-lg backdrop-filter backdrop-blur-md">
          {/* Provider Buttons */}
          <div className="flex flex-col space-y-4 mb-4">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Sign in with GitHub
            </button>
          </div>

          {/* Credential-based Login Form */}
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
              setError(null);

              const result = await signIn("credentials", {
                redirect: false,
                rollNumber: values.rollNumber,
                password: values.password,
                callbackUrl: "/",
              });

              setSubmitting(false);

              if (result?.error) {
                setError(result.error);
              } else {
                try {
                  const userResponse = await fetch(
                    `/api/check-alumni?rollNumber=${values.rollNumber}`
                  );
                  const userData = await userResponse.json();

                  if (userData.isAlumni && userData.alumniExists) {
                    router.push("/"); // Redirect to home if alumni is found
                  } else if (userData.isAlumni && !userData.alumniExists) {
                    router.push("/createAlumni"); // Redirect to 'Create Alumni' if alumni not found
                  } else {
                    router.push("/"); // Redirect to home for non-alumni
                  }
                } catch (error) {
                  setError("Failed to verify alumni status. Please try again.");
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="mb-4">
                  <label htmlFor="rollNumber" className="block text-sm font-medium text-white">
                    Roll Number
                  </label>
                  <Field
                    name="rollNumber"
                    type="text"
                    className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
                  />
                  <ErrorMessage
                    name="rollNumber"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="mt-1 block w-full p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
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
                  className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-lilac-600 transition duration-300"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
