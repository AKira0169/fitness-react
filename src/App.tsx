import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home, { loader as homeLoader } from "./pages/Home";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/Protected"; // Import the ProtectedRoute component
import Register from "./pages/Register";
import Details, { loader as detailsLoader } from "./pages/Details";

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,

        loader: homeLoader,
        errorElement: <div>No Class Found</div>,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        loader: dashboardLoader,
        errorElement: <div>404</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/details/:id",
        element: (
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        ),
        loader: detailsLoader,
        errorElement: <div>404</div>,
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
