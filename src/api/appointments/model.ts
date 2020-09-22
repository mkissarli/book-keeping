import db from 'mongoose';

export const appointment_schema = new db.Schema({
  id: {
    type: String,
    //required: true
  },
  datetime: {
    type: Date,
    required: true,
    min: Date.now()
  }
});


export interface IAppointment extends db.Document{
  id: {
    type: String,
    //required: true
  },
  datetime:{
    type: Date,
    //required: true
  }
}

export const appointment_model = db.model<IAppointment>("Appointment", appointment_schema);
