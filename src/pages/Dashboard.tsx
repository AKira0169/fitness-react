import { useLoaderData } from "react-router-dom";
import MyBookings from "../features/booking/MyBookings";
import { getMyBookings } from "../services/bookingAPI";

function Dashboard() {
  const bookings = useLoaderData();

  return (
    <div className="p-5">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Your Fitness Classes
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((cls: any) => (
          <MyBookings
            key={cls.id}
            {...cls.fitnessClass}
            id={cls.id}
            fitnessId={cls.fitnessClass.id}
          />
        ))}
      </div>
    </div>
  );
}

export async function loader() {
  try {
    const bookings = await getMyBookings();

    console.log("bookings:", bookings);
    if (!bookings) {
      return [];
    }

    return bookings;
  } catch {
    return null;
  }
}

export default Dashboard;
