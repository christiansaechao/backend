import { createBrowserRouter as Router } from "react-router";
import App from "../App";
import { Protected } from "../layouts/Protected";
import { DisplayNotes, notesLoader } from "../components/DisplayNotes";
import { NewNote } from "../components/NewNote";
import { Login } from "../components/auth/Login";
import { Signup } from "../components/auth/Signup";

const router = Router([
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  {
    Component: Protected,
    children: [
      {
        path: "/",
        Component: App,
        children: [
          { path: "notes", Component: DisplayNotes, loader: notesLoader },
          { path: "new-note", Component: NewNote },
        ],
      },
    ],
  },
]);

export default router;
