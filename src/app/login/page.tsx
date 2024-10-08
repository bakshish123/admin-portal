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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {/* Provider Buttons */}
        <div className="flex flex-col space-y-4 mb-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
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
            setError(null); // Reset error before submission

            // Step 1: Sign in with credentials provider
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
              // Step 2: Check if the user is an alumni
              try {
                const userResponse = await fetch(
                  `/api/check-alumni?rollNumber=${values.rollNumber}`
                );
                const userData = await userResponse.json();

                // Step 3: Redirect based on the result of alumni check
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
