import { Formik, Form, Field, ErrorMessage } from "formik"; // Importing Formik components for form handling
import { useMutation } from "@apollo/client"; // Importing useMutation hook from Apollo Client for executing GraphQL mutations
import { ADD_USER } from "../utils/mutations"; // Importing GraphQL mutation for adding a new user
import Auth from "../utils/auth"; // Importing authentication utility
import Logo from "../assets/baketomo-logo.svg"; // Importing logo image
import { Link } from "react-router-dom"; // Importing Link component for navigation

const SignUp = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // useMutation hook for signupUser mutation
  const [signupUser, { error }] = useMutation(ADD_USER);

  // Function to handle form submission
  const onSubmit = async (values, actions) => {
    try {
      // Execute the addUser mutation with form values
      const { data } = await signupUser({
        variables: { ...values },
      });

      // If signup is successful, authenticate the user with token
      Auth.login(data.addUser.token);
      window.location.assign("/starter");
      // Reset form
      actions.resetForm();
    } catch (error) {
      if (error.message.includes("duplicate key error")) {
        actions.setErrors({ username: "Username or Email already exists." });
      } else {
        console.error("Signup failed:", error);
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  // Validation function for form fields
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.length > 20) {
      errors.username = "Must be 20 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  };

  // Render SignUp component
  return (
    <div className="flex flex-col my-10 mx-auto w-80 items-center justify-center">
      <img src={Logo} alt="Baketomo Logo" className="my-2" /> {/* Logo */}
      <div className="flex flex-col justify-center items-center w-[325px] h-[550px] [background:linear-gradient(0deg,rgba(255,183,3,0.75)_0%,rgba(255,183,3,0.75)_100%),#FB8500] rounded-[25px] shadow-[0px_4px_11.2px_3px_rgba(0,0,0,0.25)]">
        {/* SignUp Form */}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
        >
          <Form className="mx-24 item-center justify-center w-[300px] h-[475px] shrink-0 [background:#023047] rounded-[20px]">
            <div className="mx-6 my-6 justify-center">
              <h2 className="text-white font-bold text-3xl mx-auto my-4">
                Signup
              </h2>
              {/* Username Field */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="text-white font-bold text-lg"
                >
                  New Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="enter a new username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-600 focus:border-amber-600"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="text-white font-bold text-lg">
                  Enter your email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="enter a valid email address"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-600 focus:border-amber-600"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              {/* Password Field */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="text-white font-bold text-lg"
                >
                  Enter a new password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="enter a valid password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-600 focus:amber-indigo-600"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="mx-auto w-[200px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white [background:#8ECAE6] hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
              >
                Sign Up
              </button>
              {/* Link to Login Page */}
              <div className="mt-4 text-center">
                <p className="text-sm text-white">
                  Have an account?{" "}
                  <Link to="/" className="text-cyan-300  hover:text-indigo-500">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUp; // Exporting SignUp component
