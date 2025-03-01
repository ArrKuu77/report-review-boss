import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useDarkMode from "../../store/darkMode";

const ReportDetailPage = () => {
  const location = useLocation();
  const report = location.state;
  console.log(report);
  const { isDarkMode } = useDarkMode();
  console.log(isDarkMode);

  return (
    <div
      className={`p-1 min-h-screen transition-colors ${
        isDarkMode == "true"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <label className="font-medium text-xl block mb-3">Report Detail</label>
      <div className="flex flex-col justify-between items-center gap-3">
        <div className="flex flex-wrap justify-between items-center w-full gap-3">
          <div className="flex items-center w-full sm:w-auto">
            <label className="font-medium text-xl">MR Name - </label>
            <span className="text-xl">{report.employee_table.name}</span>
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <label className="font-medium text-xl">Date - </label>
            <span className="text-xl">{report.date}</span>
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <label className="font-medium text-xl">Township - </label>
            <span className="text-xl">{report.township}</span>
          </div>
        </div>

        <div className="overflow-x-auto mt-2 w-full">
          <table
            className={`w-full border-collapse border ${
              isDarkMode == "true" ? "border-gray-700" : "border-gray-300"
            } shadow-md rounded-lg`}
          >
            <thead>
              <tr
                className={`${
                  isDarkMode == "true"
                    ? "bg-gray-800 text-gray-200"
                    : "bg-white text-gray-900"
                }`}
              >
                <th className="border px-4 py-2 text-sm sm:text-base">
                  Customer Name
                </th>
                <th className="border px-4 py-2 text-sm sm:text-base">
                  Hospital
                </th>
                <th className="border px-4 py-2 text-sm sm:text-base">
                  Objective
                </th>
                <th className="border px-4 py-2 text-sm sm:text-base">
                  Product Name
                </th>
                <th className="border px-4 py-2 text-sm sm:text-base">
                  Customer's Feedback
                </th>
                <th className="border px-4 py-2 text-sm sm:text-base">
                  Action Plan for Next Call
                </th>
              </tr>
            </thead>
            <tbody>
              {report.report_detail.map((detail, index) => (
                <tr
                  key={index}
                  className={`${
                    isDarkMode == "true"
                      ? "odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600"
                      : "odd:bg-gray-100 even:bg-white hover:bg-gray-200"
                  } transition-all`}
                >
                  <td className="border px-4 py-2 text-sm sm:text-base">
                    {detail.DoctorName}
                  </td>
                  <td className="border px-4 py-2 text-sm sm:text-base">
                    {detail.Hospital}
                  </td>
                  <td className="border px-4 py-2 text-sm sm:text-base">
                    {detail.Objective}
                  </td>
                  <td className="border px-4 py-2 text-sm sm:text-base">
                    {detail.ShortName.length === 0
                      ? "-"
                      : detail.ShortName.join(", ")}
                  </td>
                  <td className="border px-4 py-2 text-sm sm:text-base">
                    {detail.CustomerFeedback}
                  </td>
                  <td className="border px-4 py-2 text-sm sm:text-base">
                    {detail.NextPlan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* sale and quantity */}

        <div
          className={`flex flex-col  justify-center item-center mx-auto w-full p-4 space-y-4 
  ${
    isDarkMode === "true"
      ? "border-gray-700 bg-gray-900"
      : "border-gray-300 bg-gray-100"
  }
  `}
        >
          {/* Sale Information */}
          {report.daily_sale ? (
            <div
              className={`w-full  p-4 rounded-lg shadow-md border 
      ${
        isDarkMode === "true"
          ? "bg-gray-800 text-gray-200 border-gray-600"
          : "bg-white text-gray-900 border-gray-300"
      }`}
            >
              <h3 className="text-xl font-medium text-center mb-4">
                Sales Information
              </h3>

              <div className="space-y-4">
                {[
                  {
                    label: "Today Sale:",
                    value: report?.daily_sale?.Todaysales,
                  },
                  {
                    label: "Previous Sale:",
                    value:
                      report?.daily_sale?.TotalSale -
                      report?.daily_sale?.Todaysales,
                  },
                  {
                    label: "Total Sale:",
                    value: report?.daily_sale?.TotalSale,
                  },
                  { label: "Target Sale:", value: report?.daily_sale?.Target },
                  {
                    label: "Achievement:",
                    value: `${report?.daily_sale?.Achievement} %`,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-lg font-medium">{item.label}</span>
                    <p className="text-lg">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Product Quantity Information */}
          <div
            className={`w-full  p-4 rounded-lg shadow-md border overflow-x-auto
    ${
      isDarkMode === "true"
        ? "bg-gray-800 text-gray-200 border-gray-600"
        : "bg-white text-gray-900 border-gray-300"
    }
  `}
          >
            <h3 className="text-xl font-medium text-center mb-4">
              Product Quantities
            </h3>

            {report?.daily_productQty.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                        Product Name
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-end">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.daily_productQty.map(
                      (list, index) =>
                        list.quantity > 0 && (
                          <tr
                            key={index}
                            className="odd:bg-gray-50 even:bg-white dark:odd:bg-gray-700 dark:even:bg-gray-800"
                          >
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                              {list.name}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-end">
                              {list.quantity}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500">No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;
