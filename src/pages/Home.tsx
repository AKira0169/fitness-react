import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FitnessCard from "../features/fitnessclass/FitnessCard";
import { fetchClasses } from "../features/fitnessclass/fitnessSlice";
import { RootState, AppDispatch } from "../store";
import Loader from "../ui/Loader";

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { classes, status, error } = useSelector(
    (state: RootState) => state.fitness,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchClasses());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-x-6 md:flex-row">
      {classes.map((classItem) => (
        <FitnessCard
          key={classItem.id}
          title={classItem.title}
          description={classItem.description}
          date={classItem.date}
          time={classItem.time}
          maxAttendees={classItem.remainingSpots}
          id={classItem.id}
        />
      ))}
    </div>
  );
}

export default Home;
