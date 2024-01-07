import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const PlacePage = () => {
  const [place, setPlace] = useState([]);
  const { id } = useParams();
  const getPlaceDetails = async (id) => {
    const res = await axios.get(
      `http://localhost:4000/api/v1/hotels/getHotelById/${id}`
    );
    if (res.data.success === true) {
      setPlace(res.data.hotel);
    }
  };
  useEffect(() => {
    getPlaceDetails(id);
  }, [id]);
  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        target="_blank"
        href={`https://maps.google.com/?q=${place.address}`}
        className="my-2 block font-semibold underline"
      >
        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr]">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  className="aspect-square object-cover"
                  src={`http://localhost:4000/uploads/${place.photos[0]}`}
                />
              </div>
            )}
          </div>
          <div className="">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={`http://localhost:4000/uploads/${place.photos[1]}`}
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  className="aspect-square object-cover relative top-4"
                  src={`http://localhost:4000/uploads/${place.photos[2]}`}
                />
              )}
            </div>
          </div>
        </div>
        <button className="flex items-center justify-center gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
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
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Show more photos
        </button>
      </div>
    </div>
  );
};

export default PlacePage;
