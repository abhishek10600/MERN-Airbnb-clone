import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";

const PlaceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [price, setPrice] = useState(100);

  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/hotels/upload-by-link",
        { link: photoLink }
      );
      setAddedPhotos((prev) => {
        return [...prev, res.data.image];
      });
      setPhotoLink("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadPhoto = async (ev) => {
    const files = ev.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    const res = await axios.post(
      "http://localhost:4000/api/v1/hotels/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const filenames = res.data;
    setAddedPhotos((prev) => {
      return [...prev, ...filenames];
    });
  };

  const removePhoto = (ev, filename) => {
    ev.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  const makeCoverImage = (ev, filename) => {
    ev.preventDefault();
    setAddedPhotos([
      filename,
      ...addedPhotos.filter((photo) => photo !== filename),
    ]);
  };

  const savePlace = async (ev) => {
    ev.preventDefault();
    try {
      if (id) {
        //update place
        const res = await axios.put(
          `http://localhost:4000/api/v1/hotels/update/${id}`,
          {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success === true) {
          alert("Place updated successfully.");
          navigate("/account/places");
        } else {
          alert("Some error");
        }
      } else {
        //add new place
        const res = await axios.post(
          "http://localhost:4000/api/v1/hotels/add",
          {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success === true) {
          alert("Place added successfully.");
          navigate("/account/places");
        } else {
          alert("Some error");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPlaceDetailsById = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/hotels/getHotelById/${id}`
      );
      if (res.data.success === true) {
        setTitle(res.data.hotel.title);
        setAddress(res.data.hotel.address);
        setAddedPhotos(res.data.hotel.photos);
        setDescription(res.data.hotel.description);
        setPerks(res.data.hotel.perks);
        setExtraInfo(res.data.hotel.extraInfo);
        setCheckIn(res.data.hotel.checkIn);
        setCheckOut(res.data.hotel.checkOut);
        setMaxGuests(res.data.hotel.maxGuests);
        setPrice(res.data.hotel.price);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getPlaceDetailsById(id);
  }, [id]);

  return (
    <div>
      <form onSubmit={savePlace}>
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
          <button
            onClick={addPhotoByLink}
            className="bg-gray-200 px-4 rounded-2xl"
          >
            Add&nbsp;photos
          </button>
        </div>
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className="h-32 flex relative" key={link}>
                <img
                  className="rounded-2xl w-full object-cover"
                  src={"http://localhost:4000/uploads/" + link}
                />
                <button
                  onClick={(ev) => removePhoto(ev, link)}
                  className="cursor-pointer absolute bottom-1 right-1 text-red-600 bg-opacity-50 rounded-2xl bg-black py-2 px-3"
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  onClick={(ev) => makeCoverImage(ev, link)}
                  className="cursor-pointer absolute bottom-1 left-1 text-white bg-opacity-50 rounded-2xl bg-black py-2 px-3"
                >
                  {link === addedPhotos[0] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {link !== addedPhotos[0] && (
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
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          <label className="h-32 flex items-center justify-center gap-1 border bg-transparent rounded-2xl text-2xl text-gray-600 cursor-pointer">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
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
          </label>
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
          Add checkin and checkout times. Remember to have some time window for
          cleaning the room between the guests.
        </p>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
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
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              placeholder="2"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="primary my-4">
          Save
        </button>
      </form>
    </div>
  );
};

export default PlaceForm;
