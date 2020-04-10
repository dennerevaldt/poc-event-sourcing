const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./src/config');

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
