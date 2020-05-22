const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://admin:qnZTnA7rsqObJyLA@cluster0-hdooz.mongodb.net/bvmis?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'INFO: Connection error:'));
db.once('open', function() {
  console.log("INFO: Connected to server.")
});

const userRoutes = require('./routes/user');
const visitRoutes = require('./routes/visit');
const businessRoutes = require('./routes/business');
const guestRoutes = require('./routes/guest');
const buildingRoutes = require('./routes/building');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/visit', visitRoutes);
app.use('/api/building', buildingRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/guest', guestRoutes);


module.exports = app;
