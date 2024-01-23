const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./routes/route');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => {
    console.log('MongoDB connection error:', err.message);
  });

app.use('/products', route);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
