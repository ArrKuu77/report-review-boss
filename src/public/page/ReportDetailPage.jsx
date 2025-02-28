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
      </div>
    </div>
  );
};

export default ReportDetailPage;
