const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit" className="text-cyan-300">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
