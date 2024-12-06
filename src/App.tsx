import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/Protected"; // Import the ProtectedRoute component
import Register from "./pages/Register";
import Details from "./pages/Details";

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
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
