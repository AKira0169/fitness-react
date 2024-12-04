import { bookClass } from "../services/bookingAPI";
import { getSingleClass } from "../services/fitnessAPI";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

function Details() {
  const classDetails = useLoaderData();
  const [isBooking, setIsBooking] = useState(false); // Tracks booking state
  const [bookingStatus, setBookingStatus] = useState<string | null>(null); // Tracks booking success/error

  // Trigger the booking API call when `isBooking` changes to `true`
  useEffect(() => {
    if (isBooking) {
      async function handleBooking() {
        try {
          const response = await bookClass(classDetails.id);

          if (response?.message) {
            setBookingStatus(response.message); // Display success message from API
          } else {
            setBookingStatus("Booking successful!");
          }
        } catch (error: any) {
          console.error("Booking failed:", error);
          setBookingStatus(error.message || "An unexpected error occurred.");
        } finally {
          setIsBooking(false); // Reset booking state
        }
      }

      handleBooking();
    }
  }, [isBooking, classDetails.id]);

  const handleBookClick = () => {
    setIsBooking(true); // Trigger the booking flow
    setBookingStatus(null); // Clear any previous status
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
            <strong>Spots Left:</strong>{" "}
            {classDetails.maxAttendees - classDetails.bookings.length}
          </p>
        </div>

        <button
          onClick={handleBookClick}
          disabled={isBooking}
          className={`w-full rounded px-4 py-2 text-sm font-medium text-white ${
            isBooking ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isBooking ? "Booking..." : "Book Class"}
        </button>

        {/* Show booking status */}
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
export async function loader({ params }: { params: any }) {
  try {
    const { id } = params;
    const classDetails = await getSingleClass(id);

    if (!classDetails) {
      throw new Error("Class not found");
    }

    return classDetails; // Return the class details for the component
  } catch (error) {
    throw new Response("Failed to load class details", { status: 500 });
  }
}

export default Details;
