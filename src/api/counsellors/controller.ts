import { counsellor_schema, counsellor_model, appointment_medium_enum, appointment_types_enum } from './model';
import { appointment_model, IAppointment } from '../appointments/model';

export var add_appointment = async function(db_id: string, datetime: Date){
  var doc = await counsellor_model.findById(db_id)
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      throw new Error("adding appointment failed: " + err);
      return err;
    });
  await doc?.availability.push(new appointment_model({datetime: datetime}));
  doc?.markModified("availability");
  await doc.save();
  return doc;
}

export var get_filtered_appointments = async function(
  start_datetime: Date,
  end_datetime: Date,
  _appointment_types: string[],
  _appointment_mediums: string[]){

    var doc;
    // If it detects an empty array it assumes everything. Theres probs a more elegant way of doing this.
    if(_appointment_types == []  && _appointment_mediums == []){
      doc = await counsellor_model.find({})
    }
    else if(_appointment_types == []){
      doc = await counsellor_model.find({
        appointment_mediums: {$in: _appointment_mediums},
      })
    }
    else if(_appointment_mediums == []){
      doc = await counsellor_model.find({
        appointment_types:  {$in: _appointment_types},
      })
    }
    else{
      doc = await counsellor_model.find({
        appointment_types:  {$in: _appointment_types},
        appointment_mediums: {$in: _appointment_mediums},
      })
    }
   
    var result:any = [];
    doc.forEach(x => x.availability.forEach(y => result.push(y)));
    
    /* Doesn't seem to work?
    var values = result.filter((x: any) => {
      //console.log(x.datetime > start_datetime);
      //console.log(x.datetime < end_datetime);
      x.datetime > start_datetime && x.datetime < end_datetime
    });
    */

    var final_result: any = [];

    result.forEach((x: any) => {
      if(x.datetime > start_datetime && x.datetime < end_datetime) final_result.push(x)
    });

    return final_result;
}