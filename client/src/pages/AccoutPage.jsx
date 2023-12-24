import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const AccoutPage = () => {
  const navigate = useNavigate();
  let { subpage } = useParams();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  if (subpage === undefined) {
    subpage = "profile";
  }

  const activeLinkClasses = (type = null) => {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes = classes + " bg-primary text-white rounded-full";
    }
    return classes;
  };

  const logoutButtonClick = async () => {
    const res = await axios.get("/users/logout", {
      withCredentials: true,
    });
    if (res.data.success === true) {
      alert(res.data.message);
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link className={activeLinkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link
          className={activeLinkClasses("bookings")}
          to={"/account/bookings"}
        >
          My Bookings
        </Link>
        <Link
          className={activeLinkClasses("myproperties")}
          to={"/account/myproperties"}
        >
          My Listed Properties
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <h1>
            Logged in as {user.name} ({user.email})<br />
            <button
              onClick={logoutButtonClick}
              className="primary max-w-sm mt-2"
            >
              Logout
            </button>
          </h1>
        </div>
      )}
      {subpage === "bookings" && (
        <div>
          <h1>This is bookings page</h1>
        </div>
      )}
      {subpage === "myproperties" && (
        <div>
          <h1>This is my properties page</h1>
        </div>
      )}
    </div>
  );
};

export default AccoutPage;
