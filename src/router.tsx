import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import OnlineDetail from "./routes/OnlineDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "onlines/:onlinePk",
        element: <OnlineDetail />,
      },
    ],
  },
]);

export default router;
