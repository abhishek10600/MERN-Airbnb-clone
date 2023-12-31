import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import AccoutPage from "./pages/AccoutPage";
import PlaceForm from "./components/PlaceForm";
import PlacePage from "./pages/PlacePage";

axios.defaults.baseURL = "http://localhost:4000/api/v1";

function App() {
  const { setUser, setIsLoggedIn } = useContext(UserContext);
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account/:subpage?" element={<AccoutPage />} />
        <Route path="/account/:subpage/:action" element={<AccoutPage />} />
        <Route path="/account/places/view/:id" element={<PlaceForm />} />
        <Route path="/place/:id" element={<PlacePage />} />
      </Route>
    </Routes>
  );
}

export default App;
