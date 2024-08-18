const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var routes = require('./routes/routes');
const cors = require('cors');

app.use(cors({
  origin: '*',  // Allows requests from any origin
}));

app.listen(9992, () => {
  console.log("Server started");
});

mongoose.connect("mongodb://database:27017/ems")
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(error => {
    console.error("Error connecting to the database:", error);
  });

app.use(express.json());
app.use(routes);
