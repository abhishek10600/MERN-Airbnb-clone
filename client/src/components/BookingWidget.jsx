import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingWidget = ({ place, placeId }) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  const bookThisPlace = async (ev) => {
    ev.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/bookings/newBooking",
        {
          placeId,
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          numberOfGuests,
          name,
          mobile,
          price: numberOfNights * place.price,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        navigate("/account/bookings");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price:&#8377;{place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex justify-center items-center">
          <div className="py-3 px-4">
            <label>Check In:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check Out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <>
            <div className="py-3 px-4 border-t">
              <label>Your full name:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-t">
              <label>Phone number:</label>
              <input
                type="tel"
                value={mobile}
                onChange={(ev) => setMobile(ev.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && (
          <span> &#8377;{numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
