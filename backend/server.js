const expres = require('express');
const connetDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = expres();

const PORT = process.env.PORT;

connetDB();

//middleware
app.use(cors());
app.use(expres.json());

// routes
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.listen(PORT, () => {
  console.log(`Server is runing on PORT ${PORT}`);
});
