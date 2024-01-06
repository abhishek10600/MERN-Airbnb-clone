import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [places, setAllPlaces] = useState([]);
  const getAllPlaces = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/hotels/allHotels"
      );
      if (res.data.success === true) {
        setAllPlaces(res.data.hotels);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllPlaces();
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
      {places.length > 0 &&
        places.map((place) => (
          <Link href="" key={place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={`http://localhost:4000/uploads/${place.photos?.[0]}`}
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">&#8377;{place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Home;
