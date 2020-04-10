const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./src/config');

mongoose.connect(config.db.mongodb.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('connected', console.error.bind(console, 'Connected with MongoDB'));
db.on('error', console.error.bind(console, 'Failed connect with MongoDB'));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./src/routes'));

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function ({ status, message }, req, res, next) {
  res.status(status || 500).json({ error: message });
});

const PORT = config.app.port;

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
