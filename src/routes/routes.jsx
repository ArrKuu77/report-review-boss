import { createBrowserRouter } from "react-router-dom";

//import PublicRoute from "./publicRoute.jsx";
import HomePage from "../public/page/HomePage.jsx";
import EmployeePage from "../public/page/EmployeePage.jsx";
import ReportReviewPage from "../public/page/ReportReviewPage.jsx";
import ReportDetailPage from "../public/page/ReportDetailPage.jsx";
import Layout from "../public/components/Layout.jsx";
import { Children } from "react";

//console.log(PublicRoute);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: "/",
        element: <ReportReviewPage />,
      },
      {
        path: "/employee",
        element: <EmployeePage />,
      },
      // {
      //   path: "/report-review",
      //   element: <ReportReviewPage />,
      // },
      {
        path: "/report-detail/:id",
        element: <ReportDetailPage />,
      },
    ],
  },
]);

export default router;
