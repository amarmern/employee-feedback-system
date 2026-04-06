const Feedback = require('../models/Feedback');
const mongoose = require('mongoose');
const { feedbackSchema } = require('../validation/feedbackValidation');

exports.submitFeedback = async (req, res) => {
  try {
    const { givenBy, givenTo } = req.body;
    console.log(givenBy, givenTo);
    const { error } = feedbackSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }
    // Validate ObjectIds
    // if (
    //   !mongoose.Types.ObjectId.isValid(givenBy) ||
    //   !mongoose.Types.ObjectId.isValid(givenTo)
    // ) {
    //   return res.status(400).json({
    //     msg: 'Invalid Employee ID format',
    //   });
    // }

    if (givenBy === givenTo) {
      return res.status(400).json({ msg: 'Cannot give feedback to self' });
    }

    // Prevent duplicate in 24 hours
    const existing = await Feedback.findOne({
      givenBy,
      givenTo,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (existing) {
      return res
        .status(400)
        .json({ msg: 'Already submitted feedback in 24 hrs' });
    }

    const feedback = await Feedback.create(req.body);
    res.json(feedback);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getFeedbackForEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid Employee ID' });
    }

    const feedbacks = await Feedback.find({ givenTo: id }).populate(
      'givenBy',
      'name',
    );

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ID first
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid Employee ID' });
    }

    const result = await Feedback.aggregate([
      {
        $match: {
          givenTo: new mongoose.Types.ObjectId(id), // ✅ FIX HERE
        },
      },
      {
        $group: {
          _id: '$givenTo',
          avgRating: { $avg: '$rating' },
          totalFeedbacks: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return res.json({ avgRating: 0, totalFeedbacks: 0 });
    }

    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) return res.status(404).json({ msg: 'Not found' });

  if (feedback.givenBy.toString() !== req.body.userId) {
    return res.status(403).json({ msg: 'Not allowed' });
  }

  await feedback.deleteOne();
  res.json({ msg: 'Deleted' });
};
