import db from 'mongoose';

export const appointment_schema = new db.Schema({
  id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

export const appointment_model = db.model<db.Document>("Appointment", appointment_schema);
