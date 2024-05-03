import { Formik, Form, Field, ErrorMessage } from "formik";
import Logo from "../assets/baketomo-logo.svg";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

import { Link } from "react-router-dom";

const Login = () => {
  // Initial form values
  const initialValues = {
    username: "",
    password: "",
  };

  // Use the LOGIN_USER mutation
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  // Form submission handler
  const onSubmit = async (values, actions) => {
    try {
      // Attempt to login user with provided credentials
      const { data } = await loginUser({ variables: { ...values } });

      // If login is successful, authenticate user and redirect to home page
      Auth.login(data.login.token);
      window.location.assign("/Home");

      // Reset form fields after successful login
      actions.resetForm();
    } catch (error) {
      // If login fails, log the error to console
      console.error("Login unsuccessful", error);
    } finally {
      // Set submitting state to false regardless of success or failure
      actions.setSubmitting(false);
    }
  };

  // Form validation
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Required"; // Check for empty field
    }

    if (!values.password) {
      errors.password = "Required"; // Check for empty field
    }

    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        <Form className="flex flex-col my-10 mx-auto w-80 items-center justify-center">
          <img src={Logo} alt="Baketomo Logo" className="my-2" />
          <div className="flex justify-center w-[325px] h-[525px] shrink-0 [background:linear-gradient(0deg,rgba(255,183,3,0.75)_0%,rgba(255,183,3,0.75)_100%),#FB8500] rounded-[25px] shadow-[0px_4px_11.2px_3px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col mt-[40px] w-[300px] h-[475px] shrink-0 [background:#023047] rounded-[20px] space-y-6">
              <div className="mx-auto mt-8 space-y-4">
                <div className="flex mx-auto justify-center">
                  <h1 className="text-white font-bold text-3xl">
                    Welcome Back!
                  </h1>
                </div>
                <div className="space-y-2">
                  <h2 className="text-white font-bold text-lg">Username</h2>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter Your Username"
                    className="pl-2 w-[225px] h-[35px] rounded-md"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-white font-bold mt-6 text-lg">
                    Password
                  </h2>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    className="pl-2 w-[225px] h-[35px] rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-0"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white [background:#8ECAE6] w-[150px] h-[40px] mx-auto rounded-md"
              >
                Login
              </button>
              <div className="flex flex-col mx-auto items-center justify-center">
                <p className="text-white">
                  ------------------- or -------------------
                </p>
                <p className="text-white">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="text-cyan-300">Sign up here</Link>
                </p>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
