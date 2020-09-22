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

// Get appointements. If a parameter is left empty assume all is fine.
// @params
// start_date : date
// end_date : date
// appointment_types: [String]
// apointment_mediums: [String]
app.get('/appointments', function (req, res) {
});

app.post('/counsellors/:id/appointments/add', function (req, res){

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});