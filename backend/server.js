const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

// Middleware setup
app.use(cors({
  origin: '*' // Allows requests from any origin
}));

app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
mongoose.connect("mongodb://database:27017/ems")
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(error => {
    console.error("Error connecting to the database:", error);
  });

// Use routes with '/api' prefix
app.use(routes);

// Test route without the '/api' prefix
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

// Start the server
app.listen(9992, () => {
  console.log("Server started on port 9992");
});
