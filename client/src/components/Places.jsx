import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";

const Properties = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  return (
    <div>
      {action !== "new" && (
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
      )}
      {action === "new" && (
        <div>
          <form>
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-sm text-gray-500">
              Title for your place. Should be short as in advertisements.
            </p>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-sm text-gray-500">Address to your place.</p>
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />
            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-sm text-gray-500">
              More photos will make your place look more authentic.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add using a link ...jpg"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;photos
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
              <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </button>
            </div>
            <h2 className="text-2xl mt-4">Description</h2>
            <p className="text-sm text-gray-500">Description of the place.</p>
            <textarea
              className=""
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            <h2 className="text-2xl mt-4">Perks</h2>
            <p className="text-sm text-gray-500">select all the perks.</p>
            <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            <h2 className="text-2xl mt-4">Extra Information</h2>
            <p className="text-sm text-gray-500">
              Add extra information about your place(house rules, ets).
            </p>
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            <h2 className="text-2xl mt-4">Checkin and Check out times</h2>
            <p className="text-sm text-gray-500">
              Add checkin and checkout times. Remember to have some time window
              for cleaning the room between the guests.
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Checkin time</h3>
                <input
                  type="text"
                  placeholder="14"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Checkout time</h3>
                <input
                  type="text"
                  placeholder="11"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Maximum Guests</h3>
                <input
                  type="number"
                  placeholder="2"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Properties;
