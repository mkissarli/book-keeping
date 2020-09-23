import express from 'express';
import bodyParser from 'body-parser';
import db from 'mongoose';


import {add_appointment, get_filtered_appointments} from './api/counsellors/controller';
import { counsellor_model } from './api/counsellors/model';

// Create a new express application instance
const app: express.Application = express()

//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Should be in .env
db.connect('mongodb://localhost/spill');
db.Promise = global.Promise;

app.get('/sanity_check', function (req, res) {
  res.send('Hello World!');
});

// DO NOT RUN THIS MORE THAN ONCE!
app.post('/populate', async function(req, res) {
  var data = require("../data.json");
  await data.forEach((counsellor: any) => {
    (new counsellor_model(counsellor)).save();
  });
  res.send({
    status: 201,
    message: "We've populated the data."
  });
});

// Get appointements. If a parameter is left empty assume all is fine.
// @params
// start_date : date
// end_date : date
// appointment_types: [String]
// apointment_mediums: [String]
app.get('/appointments', async function (req, res) {
  // Check if defined.
  if(req.body.start_date == undefined ||
     req.body.end_date == undefined ||
     req.body.appointment_types == undefined ||
     req.body.appointment_mediums == undefined){
       res.send({
         status: 400,
         message: "Fail, ensure that all the parameters are included."
       })
     }
  // Check is a datetime string.
  if(!Date.parse(req.body.start_date) || !Date.parse(req.body.end_date)){
    res.send({
      status: 400,
      message: "Dates in incompatible format, insure that they are compatible dates."
    })
  }
  // Check if arrays
  if(!Array.isArray(req.body.appointment_mediums) || !Array.isArray(req.body.appointment_types)){
    res.send({
      status: 400,
      message: "appointment_mediums or appointment_types are not arrays, please ensure they are arrays."
    })
  }

  // Run
  var val: any = await get_filtered_appointments(new Date(req.body.start_date), new Date(req.body.end_date), req.body.appointment_types, req.body.appointment_mediums)
    .then(async (result: any) => {
      return {
        status: 200,
        message: "Got filtered appointments list",
        result: result
      };
    })
    .catch((err) => {
      return {
        status: 500,
        message: "fail?",
        error: err
      }
    })

  res.send(val);
});


app.post('/counsellors/:id/appointments/add', async function (req, res){
  //res.send(req.params.id);
  // Check payload is the correct format.
  // Check payload exists.
  if(req.body == undefined && req.body.datetimes == undefined){
    res.send({
      staus: 400,
      message: "No datetimes provided to add."
    });
  }
      
  // Check payload is array
  else if(!Array.isArray(req.body.datetimes)){
    res.send({
      status: 400,
      message: "datetimes must be an array"
    });
  }

  // Check it isn't empty
  else if(req.body.datetimes.length == 0){
    res.send({
      status: 200,
      message: "Empty list of dates. No appointments added."
    })
  }

  // Check if all the values in the array can be turned into a datetime using Date. This isn't perfect as Date is weird but good enough for this.
  req.body.datetimes.forEach((x: any) => {
    if(!Date.parse(x)){
      res.send({
        status: 400,
        message: "datetimes includes a incompatible datetime string: " + x
      })
    }

    else if (Date.parse(x) < Date.now()){
      res.send({
        status: 400,
        message: "datetimes includes a datetime that is in the past: " + x
      })
    }
  })

  // Adds the appointments.
  var val: any = await counsellor_model.findById(req.params.id)
    .then(()=>{
      req.body.datetimes.forEach(async (x: any) => {
        add_appointment(req.params.id, new Date(x))
          .catch((err) => {
            return {
              status: 500,
              message: "fail?",
              error: err
            }
          });
      });

      return {
        status: 201,
        message: "Appointments added."
      }
    })
    .catch((err: any) => {
      return {
        status: 404,
        message: "No counsellor by the id: " + req.params.id,
        error: err
      }
    });
  res.send(val);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});