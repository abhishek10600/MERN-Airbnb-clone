const BookingWidget = ({ place }) => {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price:&#8377;{place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex justify-center items-center">
          <div className="py-3 px-4">
            <label>Check In:</label>
            <input type="date" />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check Out:</label>
            <input type="date" />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Guests:</label>
          <input type="number" value={1} />
        </div>
      </div>
      <button className="primary mt-4">Book this place</button>
    </div>
  );
};

export default BookingWidget;
