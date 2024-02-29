import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login } from "./paginas/login";
import { ErrorPage } from "./paginas/errorpage";

import { Dashboard } from "./paginas/dashboard";
import { UsersTablas } from "./paginas/dashboard/userstablas";
// import {  } from "./";
// import {  } from "./";
// import {  } from "./";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  /* {
    path: "/updatepassword",
    element: <UpdatePassword />,
    errorElement: <ErrorPage />,
  }, */
  {
    path: "dashboard",
    element: (
      // <RequireAuth>
      <Dashboard />
      // </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "userstablas",
        element: <UsersTablas />,
      },
    ],
  },
  /* {
    path: "/dashboardclient",
    element: (
      <RequireAuth>
        <DashboardClient />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "busafirmar",
        element: <Busafirmar />,
      },
      {
        path: "busaaevfirmados",
        element: <BusaAevFirmados />,
      },
      {
        path: "proyectos",
        element: <Proyectos />,
      },
      {
        path: "gastosExtra",
        element: <GastosExtra />,
      },
      {
        path: "pagosCut",
        element: <PagosCut />,
      },
    ],
  }, */
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
