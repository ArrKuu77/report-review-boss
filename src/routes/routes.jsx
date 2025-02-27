import { createBrowserRouter } from "react-router-dom";

//import PublicRoute from "./publicRoute.jsx";
import HomePage from "../public/page/HomePage.jsx";
import EmployeePage from "../public/page/EmployeePage.jsx";
import ReportReviewPage from "../public/page/ReportReviewPage.jsx";
import ReportDetailPage from "../public/page/ReportDetailPage.jsx";

//console.log(PublicRoute);

const router = createBrowserRouter([
  {
    index : "/",
    element : <HomePage />,
  },
  {
    path: "/employee",
    element: <EmployeePage />,
  },
  {
    path : "/report-review",
    element: <ReportReviewPage />,
  },
  {
    path : "/report-review-detail/:id",
    element: <ReportDetailPage />,
  },
]);

export default router;
