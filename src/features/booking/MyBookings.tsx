import { Link, useNavigate } from "react-router-dom";
import { deleteBookClass } from "../../services/bookingAPI"; // Adjust the path if necessary
import { useState } from "react";

type Props = {
  id: number;
  name: string;
  date: string;
  time: string;
  maxAttendees: number;
  fitnessId: number;
  remainingSpots: number;
};

function MyBookings({
  name,
  date,
  time,
  maxAttendees,
  id,
  fitnessId,
  remainingSpots,
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // React Router hook for navigation

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setErrorMessage(null);

      await deleteBookClass(id); // Call the delete function

      // Navigate back to the dashboard or another page after successful deletion
      navigate("/dashboard"); // Adjust the path as necessary
    } catch (error: any) {
      console.error("Delete failed:", error);
      setErrorMessage(error.message || "Failed to delete booking.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow hover:shadow-lg">
      <h3 className="mb-2 text-lg font-bold text-gray-900">{name}</h3>
      <p className="mb-1 text-sm text-gray-700">
        <strong>Date:</strong> {date}
      </p>
      <p className="mb-1 text-sm text-gray-700">
        <strong>Time:</strong> {time}
      </p>
      <p className="mb-4 text-sm text-gray-700">
        <strong>Spots Left:</strong> {remainingSpots}
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          to={`/details/${fitnessId}`}
          className="w-full rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          View Details
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`w-full rounded px-4 py-2 text-sm font-medium text-white ${
            isDeleting
              ? "cursor-not-allowed bg-gray-400"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
      {errorMessage && (
        <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default MyBookings;
