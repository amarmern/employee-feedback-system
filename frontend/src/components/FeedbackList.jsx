import React, { useState } from 'react';
import API from '../api/api';

const FeedbackList = ({ employees }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  const loadFeedback = async (id) => {
    const res = await API.get(`/feedback/${id}`);
    setFeedbacks(res.data);
  };

  const deleteFeedback = async (fid, userId) => {
    await API.delete(`/feedback/${fid}`, {
      data: { userId },
    });
    alert('Deleted');
  };
  return (
    <div>
      <h3>View feedbacks</h3>
      <select onChange={(e) => loadFeedback(e.target.value)}>
        <option>Select Employee</option>
        {employees.map((e) => (
          <option key={e._id} value={e._id}>
            {e.name}
          </option>
        ))}
      </select>

      {feedbacks.map((f) => (
        <div key={f._id}>
          ⭐ {f.rating} - {f.comment} (By: {f.givenBy.name})
          <button onClick={() => deleteFeedback(f._id, f.givenBy._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
