import db from 'mongoose';
import { appointment_model, appointment_schema, IAppointment } from '../appointments/model';

export const counsellor_schema = new db.Schema({
  counsellor_id: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  appointment_types: [{
    type: String,
    enum: ["consultation", "one_off"],
    required: true
  }],
  appointment_mediums: [{
    type: String,
    enum: ["phone", "video"],
    required: true
  }],
  availability: {
    type: [appointment_schema]
  }
});

//counsellor_schema.pre("save", function() {
//  this.markModified("avaliability");
//});

export interface ICounsellor extends db.Document {
  counsellor_id: {
    type: String,
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  appointment_types: [{
    type: String,
    enum: ["consultation", "one_off"],
    required: true
  }],
  appointment_mediums: [{
    type: String,
    enum: ["phone", "video"],
    required: true
  }],
  availability: [IAppointment]  
}

export const counsellor_model = db.model<ICounsellor>("Counsellor", counsellor_schema);
