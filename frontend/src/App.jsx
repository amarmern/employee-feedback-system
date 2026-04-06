import './App.css';
import { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import FeedbackForm from './components/FeedbackForm';

function App() {
  const [employees, setEmployees] = useState([]);

  return (
    <>
      <h1>Employee feedback sysytem</h1>
      <EmployeeList setEmployees={setEmployees} />
      <FeedbackForm employees={employees} />
    </>
  );
}

export default App;
