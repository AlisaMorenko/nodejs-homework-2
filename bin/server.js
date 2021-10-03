const mongoose = require('mongoose');
require('dotenv').config();
const app = require('../app');

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Database connection successfull`);
    }),
  )
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
