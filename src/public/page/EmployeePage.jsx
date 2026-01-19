"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeCreateForm";

// Initialize Supabase client
const supabaseUrl = "https://bgvxqjymtdtvmbsqxtxk.supabase.co";
const supabaseKey = "sb_publishable_XidIv5hq7Tw1HPftdDS33w_natGp9u0";

const supabase = createClient(supabaseUrl, supabaseKey);

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("employee_table").select("*");

      if (error) {
        throw error;
      }

      setEmployees(data || []);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
      alert("Error fetching employees: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (name) => {
    console.log(name.trim());
    try {
      const { data, error } = await supabase
        .from("employee_table")
        .insert([{ name: name }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setEmployees([...employees, data]);
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error("Error adding employee:", error.message);
      alert("Error adding employee: " + error.message);
    }
  };

  const updateEmployee = async (id, name) => {
    try {
      const { data, error } = await supabase
        .from("employee_table")
        .update({ name: name.trim() })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setEmployees(employees.map((emp) => (emp.id === id ? data : emp)));
        setEditingEmployee(null);
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error("Error updating employee:", error.message);
      alert("Error updating employee: " + error.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const { error } = await supabase
        .from("employee_table")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error.message);
      alert("Error deleting employee: " + error.message);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Employee Management
          </h1>
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Add Employee
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {isFormOpen ? (
              <EmployeeForm
                employee={editingEmployee}
                onSubmit={editingEmployee ? updateEmployee : addEmployee}
                onCancel={() => setIsFormOpen(false)}
              />
            ) : (
              <EmployeeTable
                employees={employees}
                onEdit={handleEdit}
                onDelete={deleteEmployee}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
