import { Link } from "react-router-dom";

type Props = {
  // children: React.ReactNode;
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  maxAttendees: number;
};

function FitnessCard({
  title,
  description,
  date,
  time,
  maxAttendees,
  id,
}: Props) {
  return (
    <div
      className={`w-[350px] rounded-lg border border-gray-200 bg-white p-6 shadow ${maxAttendees === 0 ? "opacity-50" : ""}`}
    >
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {title}{" "}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700">{description}</p>
      <div className="mb-3 text-sm text-gray-600">
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <p>
          <strong>Spots Left:</strong>
          {maxAttendees}
        </p>
      </div>
      <Link
        to={`/details/${id}`}
        className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Reserve Spot
        <svg
          className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
}

export default FitnessCard;
