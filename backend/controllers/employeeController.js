const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json({
      status: 'Success',
      emp,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json({ status: 'success', employees });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};
