import { Formik, Form, Field, ErrorMessage } from "formik";
//TODO: add imports of useMutation and signup mutation 

const SignUp = () => {
  const initialValues = {
    username: "",
    email: "",
    password: ""
  };

//TODO: call the signup mutation 

  const onSubmit = (values, actions) => {
    // Handle form submission here
    console.log(values);
    actions.setSubmitting(false);
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
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
  
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  };

  //TODO: onSubmit, perform signup mutation 
  /* the onSubmit function will move here and perform signup mutation.
   Taking the username/email/password into {date}.
  mutation returns a token for Auth.login(data.signupUser.token).
  
  try {

  }
  catch (error) {

  lastly we use actions.setSubmitting(false) to reset form

*/


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-black">
                New Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="enter a new username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-600 focus:border-amber-600"
              />
              <ErrorMessage name="username" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Enter your email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="enter a valid email address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-600 focus:border-amber-600"
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Enter a new password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="enter a valid password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-600 focus:amber-indigo-600"
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
            >
              Sign Up
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm">
                Have an account? <a href="#" className="text-indigo-600 hover:text-indigo-500">Login here</a>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
