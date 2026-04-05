const mongosse = require('mongoose');

const connetDB = async () => {
  try {
    await mongosse.connect(process.env.MONGO_URI);
    console.log('Mongo connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connetDB;
