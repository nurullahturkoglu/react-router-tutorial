import React from "react";
import Root, {
  loader as rootLoader,
  action as actionLoader,
} from "./routes/Root";
import Error from "./Error";
import Index from "./routes/Index"
import DeleteContact,{action as deleteAction} from "./routes/Delete"
import EditContact,{action as editAction} from "./routes/Edit"
import Contact, { loader as contactLoader } from "./routes/Contact";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    action: actionLoader,
    loader: rootLoader,
    children: [
      {
        index:true,
        element:<Index/>,
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/delete",
        element: <DeleteContact />,
        errorElement: <div>Oops! There was an error.</div>,
        action: deleteAction,
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

