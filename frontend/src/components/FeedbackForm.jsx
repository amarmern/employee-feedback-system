import { useState } from 'react';
import API from '../api/api';

export default function FeedbackForm({ employees }) {
  const [form, setForm] = useState({
    givenBy: '',
    givenTo: '',
    rating: '',
    comment: '',
  });

  const submit = async () => {
    try {
      await API.post('/feedback', form);
      alert('Feedback submitted');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div>
      <h3>Submit Feedback</h3>

      <select onChange={(e) => setForm({ ...form, givenBy: e.target.value })}>
        <option>Select Giver</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setForm({ ...form, givenTo: e.target.value })}>
        <option>Select Receiver</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
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
