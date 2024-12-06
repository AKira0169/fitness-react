import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust the path as needed
import { useState } from "react";
import { bookClass } from "../services/bookingAPI";
import { updateRemainingSpots } from "../features/fitnessclass/fitnessSlice";

function Details() {
  const { id } = useParams<{ id: string }>();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const dispatch = useDispatch();

  const classDetails = useSelector((state: RootState) =>
    state.fitness.classes.find(
      (fitnessClass) => fitnessClass.id === Number(id),
    ),
  );

  if (!classDetails) {
    return <p className="p-5 text-center text-red-500">Class not found!</p>;
  }

  const handleBookClick = async () => {
    if (isBooking) return;

    setIsBooking(true);

    try {
      const response = await bookClass(classDetails.id);

      if (response?.message) {
        setBookingStatus(response.message);
      } else {
        setBookingStatus("Booking successful!");
        dispatch(updateRemainingSpots({ id: classDetails.id, adjustment: -1 }));
      }
    } catch (error: any) {
      console.error("Booking failed:", error);
      setBookingStatus(error.message || "An unexpected error occurred.");
    } finally {
      setIsBooking(false); // Reset booking state
    }
  };

  return (
    <div className="p-5">
      <div className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-6 shadow">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          {classDetails.title}
        </h2>
        <p className="mb-4 text-gray-700">{classDetails.description}</p>
        <div className="mb-4 text-sm text-gray-600">
          <p>
            <strong>Date:</strong> {classDetails.date}
          </p>
          <p>
            <strong>Time:</strong> {classDetails.time}
          </p>
          <p>
            <strong>Spots Left:</strong> {classDetails.remainingSpots}
          </p>
        </div>

        <button
          onClick={handleBookClick}
          disabled={isBooking}
          className={`w-full rounded px-4 py-2 text-sm font-medium text-white ${
            isBooking
              ? "cursor-not-allowed bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isBooking ? "Booking..." : "Book Class"}
        </button>

        {bookingStatus && (
          <p
            className={`mt-4 text-center font-medium ${
              bookingStatus.includes("successful")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {bookingStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default Details;
