import { useEffect, useState } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  function fetchEmployees() {
    fetch('http://localhost:7070/info')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error:', error));
  }

  function handleAddEmployee(e) {
    e.preventDefault();
    const newEmployee = { name, email, mobile };

    fetch('http://localhost:7070/addEmp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to add employee');
        return response.text();
      })
      .then(() => {
        fetchEmployees();
        resetForm();
        setIsFormVisible(false);
      })
      .catch((error) => console.error('Error:', error));
  }

  function handleUpdateEmployee(e) {
    e.preventDefault();
    const updatedEmployee = { empId: editId, name, email, mobile };

    fetch(`http://localhost:7070/updateEmp/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEmployee),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to update employee');
        return response.text();
      })
      .then(() => {
        fetchEmployees();
        resetForm();
      })
      .catch((error) => console.error('Error:', error));
  }

  function loadEmployeeForEdit(emp) {
    setName(emp.name);
    setEmail(emp.email);
    setMobile(emp.mobile);
    setEditId(emp.empId);
    setIsEditing(true);
    setIsFormVisible(true);
  }

  function deleteEmployee(id) {
    fetch(`http://localhost:7070/info/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Delete failed');
        return response.text();
      })
      .then(() => fetchEmployees())
      .catch((error) => console.error('Error:', error));
  }

  function resetForm() {
    setName('');
    setEmail('');
    setMobile('');
    setEditId(null);
    setIsEditing(false);
  }

  return (
    <div className="px-24 py-10 text-black">
     <div className='flex justify-around py-8'>
     <h2 className="text-3xl font-bold mb-6 text-white">Employee List</h2>

{/* Button to toggle Add Employee Form */}
<button
  onClick={() => {
    setIsFormVisible(!isFormVisible);
    resetForm();
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
>
  {isFormVisible ? 'Cancel' : 'Add New Employee'}
</button>
     </div>

      {/* Add/Edit Form */}
      {isFormVisible && (
        <form
          className="bg-white rounded-xl shadow p-6 mb-10 w-[400px]"
          onSubmit={isEditing ? handleUpdateEmployee : handleAddEmployee}
        >
          <h3 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Employee' : 'Add Employee'}
          </h3>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mb-3 w-full rounded text-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-3 w-full rounded text-white"
            required
          />
          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border p-2 mb-3 w-full rounded text-white"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {isEditing ? 'Update Employee' : 'Add Employee'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-4 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </form>
      )}

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow-md overflow-hidden">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Mobile</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-6 font-semibold capitalize  text-xl py-4">{emp.name}</td>
                <td className="px-6 py-4 lowercase">{emp.email}</td>
                <td className="px-6 py-4">{emp.mobile}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                      onClick={() => loadEmployeeForEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      onClick={() => deleteEmployee(emp.empId)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
