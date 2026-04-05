import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    givenBy: '',
    givenTo: '',
    rating: '',
    comment: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/employees')
      .then((res) => setEmployees(res.data));
  }, []);

  const submit = async () => {
    await axios.post('http://localhost:5000/api/feedback', form);
    alert('Feedback submitted');
  };

  return (
    <div>
      <h2>Employees</h2>
      {employees.map((emp) => (
        <div key={emp._id}>
          {emp.name} - {emp.department}
        </div>
      ))}

      <h2>Submit Feedback</h2>
      <select onChange={(e) => setForm({ ...form, givenBy: e.target.value })}>
        <option>Select Giver</option>
        {employees.map((e) => (
          <option value={e._id}>{e.name}</option>
        ))}
      </select>

      <select onChange={(e) => setForm({ ...form, givenTo: e.target.value })}>
        <option>Select Receiver</option>
        {employees.map((e) => (
          <option value={e._id}>{e.name}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Rating"
        onChange={(e) => setForm({ ...form, rating: e.target.value })}
      />

      <input
        type="text"
        placeholder="Comment"
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
      />

      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default App;
