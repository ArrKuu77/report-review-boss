import { createBrowserRouter } from "react-router-dom";

import NotFound from "../public/NotFound";
import PublicRoute from "./publicRoute.jsx";
import PublicLayout from "../public/components/PublicLayout.jsx";
console.log(PublicRoute);

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [...PublicRoute],
    errorElement: <NotFound />,
  },
  //   {
  //     path: "/mm",
  //     element: <PublicLayoutMM />,
  //     children: [...publicRouteMM],
  //     errorElement: <NotFound />,
  //   }
]);

export default router;
