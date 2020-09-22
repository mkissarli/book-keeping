import { counsellor_schema, counsellor_model } from './model';
import { appointment_model } from '../appointments/model';

export var add_appointment = async function(db_id: string, datetime: Date){
  var doc = await counsellor_model.findById(db_id)
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      throw new Error("adding appointment failed: " + err);
      return err;
    });
  await doc.availability.push(new appointment_model({datetime: datetime}));
  doc.markModified("availability");
  await doc.save();
}

counsellor_schema.methods.get_filtered_appointments = function(
  start_datetime: Date,
  end_datetime: Date,
  appointment_types: [string],
  appointment_mediums: [string]){


}