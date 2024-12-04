import { useLoaderData } from "react-router-dom";
import FitnessCard from "../features/fitnessclass/FitnessCard";
import { getAllClasses } from "../services/fitnessAPI";

function Home() {
  const classes = useLoaderData();
  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-x-6 md:flex-row">
      {classes.map((classItem: any) => (
        <FitnessCard
          key={classItem.id}
          title={classItem.title}
          description={classItem.description}
          date={classItem.date}
          time={classItem.time}
          maxAttendees={classItem.maxAttendees - classItem.bookings.length}
          id={classItem.id}
        />
      ))}
    </div>
  );
}

export async function loader() {
  const classes = await getAllClasses();
  return classes;
}

export default Home;
