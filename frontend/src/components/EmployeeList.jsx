import { useEffect, useState } from 'react';
import API from '../api/api';

export default function EmployeeList({ setEmployees }) {
  const [employees, setLocalEmployees] = useState([]);

  useEffect(() => {
    API.get('/employees').then((res) => {
      setLocalEmployees(res.data.employees);
      setEmployees(res.data.employees);
    });
  }, []);

  return (
    <div>
      <h3>Employees</h3>
      {employees.map((emp) => (
        <div key={emp._id}>
          {emp.name} - {emp.department}
        </div>
      ))}
    </div>
  );
}
