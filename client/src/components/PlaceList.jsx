import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const getAllPlaces = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/hotels/allUserHotels",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        setPlaces(res.data.hotels);
      } else {
        console.log("Some Error!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllPlaces();
  }, []);
  return (
    <div className="">
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/view/${place._id}`}
              className="cursor-pointer flex gap-4 bg-gray-100 p-4 rounded-2xl"
              key={place._id}
            >
              <div className="w-80 bg-gray-300 grow shrink-0">
                {place.photos.length > 0 && (
                  <img
                    className=""
                    src={`http://localhost:4000/uploads/${place.photos[0]}`}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlaceList;
