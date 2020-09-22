import db from 'mongoose';

export const appointment_schema = new db.Schema({
  //id: {
  //  type: String,
  //  required: true
  //},
  date: {
    type: Date,
    required: true
  }
});

export interface Appointment extends db.Document {
  date:{
    type: Date,
    required: true
  }
}

export const appointment_model = db.model<Appointment>("Appointment", appointment_schema);
