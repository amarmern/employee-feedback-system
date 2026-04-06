import './App.css';
import { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import AvgRating from './components/AvgRating';

function App() {
  const [employees, setEmployees] = useState([]);

  return (
    <>
      <h1>Employee feedback sysytem</h1>
      <EmployeeList setEmployees={setEmployees} />
      <FeedbackForm employees={employees} />
      <FeedbackList employees={employees} />
      <AvgRating employees={employees} />
    </>
  );
}

export default App;
