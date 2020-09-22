import express from 'express';
import db from 'mongoose';

// Create a new express application instance
const app: express.Application = express();

// Should be in .env
db.connect('mongodb://localhost/spill');
db.Promise = global.Promise;

app.get('/sanity_check', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});