import React from 'react'


import { useState, useEffect } from "react"

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (employee) {
      
      setName(employee.name || "")
    } else {
      setName("")
    }
  }, [employee])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const trimmedName = name.trim()
    if (!trimmedName) {
      setError("Name is required")
      return
    }
    
   if (employee) {
      onSubmit(employee.id, trimmedName)
    }
    else {
      onSubmit(trimmedName)
    }
    
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
      <h2 className="text-xl font-semibold mb-4">{employee ? "Edit Employee" : "Add New Employee"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Employee Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError("")
            }}
            className={`w-full px-3 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter employee name"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {employee ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EmployeeForm

