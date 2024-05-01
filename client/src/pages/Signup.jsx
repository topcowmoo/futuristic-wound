import { Formik, Form, Field, ErrorMessage } from "formik";
// Import the useMutation, mutation and auth to connect to client side
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

import Logo from "../assets/baketomo-logo.svg";

const SignUp = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // use mutation signupUser
  const [signupUser, { error }] = useMutation(ADD_USER);

  // Define the onSubmit function to handle form submission
  const onSubmit = async (values, actions) => {
    try {
      // Execute the addUser mutation with form values
      const { data } = await signupUser({
        variables: { ...values },
      });

      //if signup is successful, with authenticate the user with token
      Auth.login(data.addUser.token);
      window.location.assign("/starter");
      // Reset form
      actions.resetForm();
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

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

  return (
    <div className="flex flex-col my-10 mx-auto w-80 items-center justify-center">
      <img src={Logo} alt="Baketomo Logo" className="my-2" />
      <div className="flex flex-col justify-center items-center w-[325px] h-[550px] [background:linear-gradient(0deg,rgba(255,183,3,0.75)_0%,rgba(255,183,3,0.75)_100%),#FB8500] rounded-[25px] shadow-[0px_4px_11.2px_3px_rgba(0,0,0,0.25)]">
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
              <button
                type="submit"
                className="mx-auto w-[200px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white [background:#8ECAE6] hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
              >
                Sign Up
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm text-white">
                  Have an account?{" "}
                  <a href="#" className="text-cyan-300 hover:text-indigo-500">
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
