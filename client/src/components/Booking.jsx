import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const getBookings = async () => {
    const res = await axios.get("http://localhost:4000/api/v1/bookings/all", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (res.data.success === true) {
      setBookings(res.data.bookings);
    }
  };
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <div className="">
      <div className="mt-4 flex flex-col gap-4">
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl">Place: {booking.place.title}</h2>
                <p className="">CheckIn: {booking.checkIn}</p>
                <p className="">CheckOut: {booking.checkOut}</p>
                <p className="">Name: {booking.name}</p>
                <p className="">Phone: {booking.mobile}</p>
                <p className="">Price: &#8377;{booking.price}</p>
                <p className="">Number of Guests: {booking.numberOfGuests}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Booking;
