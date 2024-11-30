import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import App from "../App";
import Add_User from "../Pages/Add_User/Add_User";
import UpdateUser from "../Pages/UpdateUser/UpdateUser";
import axios from "axios";
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,

      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/add_user",
          element: <Add_User />,
        },
        {
          path: "/update_user/:id",
          element: <UpdateUser />,
          loader: async ({ params }) =>
            await axios.get(`http://localhost:5000/update_user/${params.id}`),
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
