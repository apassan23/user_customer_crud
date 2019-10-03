const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(config.PORT, () => {
  mongoose.set('findOneAndModify', false);
  mongoose.connect(config.URI, { useNewUrlParser: true });
});

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
  require('./routes/customers')(app);
  require('./routes/users')(app);
  console.log(`Server Running on Port ${config.PORT}`);
});
