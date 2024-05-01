import Logo from "../assets/baketomo-logo.svg";

const Login = () => {
  return (
    <div>
      <form className="flex flex-col my-20 mx-auto w-80 items-center justify-center">
        <img src={Logo} alt="Baketomo Logo" className="my-2" />
        <div className="flex justify-center w-[325px] h-[500px] shrink-0 [background:linear-gradient(0deg,rgba(255,183,3,0.75)_0%,rgba(255,183,3,0.75)_100%),#FB8500] rounded-[25px] shadow-[0px_4px_11.2px_3px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col mt-[40px] w-[300px] h-[450px] shrink-0 [background:#023047] rounded-[20px] space-y-6">
            <div className="mx-auto mt-8 space-y-4">
              <div className="flex mx-auto justify-center">
                <h1 className="text-white font-bold text-3xl">Welcome Back!</h1>
              </div>
              <div className="space-y-2">
                <h2 className="text-white font-bold text-lg">Username</h2>
                <input
                  type="text"
                  placeholder="Enter Your Username"
                  className="pl-2 w-[225px] h-[35px] rounded-md"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-white font-bold mt-6 text-lg">Password</h2>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="pl-2 w-[225px] h-[35px] rounded-md"
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
                Don't have an account?{" "}
                <span className="text-cyan-300">Sign up here</span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
