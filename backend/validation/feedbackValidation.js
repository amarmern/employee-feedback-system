const Joi = require('joi');

exports.feedbackSchema = Joi.object({
  givenBy: Joi.string().length(24).required(),
  givenTo: Joi.string().length(24).required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().optional(),
});
