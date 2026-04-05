const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    givenBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    givenTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Feedback', feedbackSchema);
