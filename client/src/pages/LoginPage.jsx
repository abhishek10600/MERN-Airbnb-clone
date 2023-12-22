import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const res = await axios.post(
        "/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        setUser(res.data.user);
        setIsLoggedIn(true);
        alert(res.data.message);
        navigate("/");
      }
    } catch (error) {
      alert("Login failed!");
    }
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account?
            <Link to="/register" className="text-blue-500">
              {" "}
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
