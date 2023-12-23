import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";

axios.defaults.baseURL = "http://localhost:4000/api/v1";

function App() {
  const { user, setUser, setIsLoggedIn } = useContext(UserContext);
  const getUser = async () => {
    const res = await axios.get("/users/getLoggedInUserDetails", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (res.data.success === true) {
      setUser(res.data.user);
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
