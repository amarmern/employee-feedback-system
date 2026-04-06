import { useState } from 'react';
import API from '../api/api';

export default function AvgRating({ employees }) {
  const [avg, setAvg] = useState(null);

  const getAvg = async (id) => {
    const res = await API.get(`/feedback/avg/${id}`);
    setAvg(res.data);
  };

  return (
    <div>
      <h3>Average Rating</h3>

      <select onChange={(e) => getAvg(e.target.value)}>
        <option>Select Employee</option>
        {employees.map((e) => (
          <option key={e._id} value={e._id}>
            {e.name}
          </option>
        ))}
      </select>

      {avg && (
        <div>
          Avg Rating: {avg.avgRating} | Total: {avg.totalFeedbacks}
        </div>
      )}
    </div>
  );
}
