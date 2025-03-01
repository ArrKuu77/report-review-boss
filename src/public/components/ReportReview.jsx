"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Loader2,
  Calendar,
  Users,
  ReceiptText,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

// Initialize Supabase client
const supabaseUrl = "https://vjhmhyikyllvpirsjpen.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqaG1oeWlreWxsdnBpcnNqcGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5Nzk0NTIsImV4cCI6MjA1NTU1NTQ1Mn0.TcyJcTc9CtSH7gSIdGNY4cZHCYUDUGD5ByjYnLks8IA";

const supabase = createClient(supabaseUrl, supabaseKey);

function ReportReview() {
  const currentDate = new Date(); // Get the current date

  const formattedDate = currentDate.toISOString(); // Format the date to ISO string
  console.log(formattedDate);

  const [reports, setReports] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [limit, setLimit] = useState(2);
  // Fetch employees for the dropdown

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data, error: employeeError } = await supabase
          .from("employee_table")
          .select("name,id");

        if (employeeError) throw employeeError;

        console.log(data);
        setEmployees(
          data.map((employee) => ({ name: employee.name, id: employee.id }))
        );
        // data.forEach((report) => {
        //     const obj = {
        //         id : report.employee_id,
        //         name : report.employee_table.name
        //     }

        // })
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);
  // Memoized fetch function
  // const itemsPerPage = 3;
  const fetchReports = useCallback(async () => {
    try {
      // const offset = (page - 1) * itemsPerPage;
      setLoading(true);
      let query = supabase
        .from("reports_table")
        .select(`*, employee_table (name)`)
        // .range(offset, offset + itemsPerPage - 1)
        .order(sortField, { ascending: sortDirection === "asc" });

      if (selectedEmployee !== "all") {
        query = query.eq("employee_id", selectedEmployee);
      }
      if (startDate == null) {
        query = query.eq("date", formattedDate);
        // .lte("created_at", endDate.toISOString());
      }

      if (startDate && endDate) {
        query = query
          .gte("date", startDate.toISOString())
          .lte("date", endDate.toISOString());
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) throw supabaseError;
      console.log(data);
      setReports(data || []);

      setError(null);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError(err.message);
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, [sortField, sortDirection, selectedEmployee, startDate, endDate]);

  // Fetch reports when dependencies change
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "urgent":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    console.log(dateString);

    if (!dateString) return "N/A";

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 dark:bg-red-900/10 rounded-lg">
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Filters */}
      <div className="p-4 border-b border-border dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Employee Selection */}
          <div className="relative flex-1 max-w-xs">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="appearance-none w-full pl-10 pr-10 py-2 bg-muted dark:bg-gray-700 border border-border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Employees</option>
              {employees.map((employee, index) => (
                <option key={index} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {/* Date Range Picker */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              placeholderText="Select date range"
              className="w-full pl-10 pr-4 py-2 bg-muted dark:bg-gray-700 border border-border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              wrapperClassName="w-full"
            />
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort("title")}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Name
                  {sortField === "title" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Township
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort("created_at")}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Date
                  {sortField === "created_at" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </button>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Report Detail
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-12">
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-12 text-center text-muted-foreground"
                >
                  No reports found
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-muted/50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground dark:text-white">
                        {report.employee_table.name}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {report.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm capitalize">
                        {report.township}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <Link to={`/report-detail/${report.id}`} state={report}>
                        <span className=" text-sm cursor-pointer">
                          <ReceiptText className=" text-xl  text-blue-500" />
                        </span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportReview;
