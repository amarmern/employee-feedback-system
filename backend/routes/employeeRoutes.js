const {
  createEmployee,
  getEmployee,
} = require('../controllers/employeeController');

const router = require('express').Router();

router.post('/', createEmployee);
router.get('/', getEmployee);

module.exports = router;
