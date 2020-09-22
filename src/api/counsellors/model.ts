import db from 'mongoose';
import { appointment_model, appointment_schema, IAppointment } from '../appointments/model';

export const counsellor_schema = new db.Schema({
  counsellor_id: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true,
    default: undefined
  },
  last_name: {
    type: String,
    required: true,
    default: undefined
  },
  appointment_types: {
    type: [{
      type: String,
      enum: ["consultation", "one_off"],
      default: undefined
    }],
    validate: (v: any) => Array.isArray(v) && v.length > 0,
  },
  appointment_mediums: {
    type: [{
      type: String,
      enum: ["phone", "video"],
      default: undefined
    }],
    validate: (v: any) => Array.isArray(v) && v.length > 0,
  },
  availability: {
    type: [appointment_schema]
  }
});

counsellor_schema.pre("save", function() {
  this.markModified("avaliability");

});

export interface ICounsellor extends db.Document {
  counsellor_id: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
    default: undefined
  },
  last_name: {
    type: String,
    required: true,
    default: undefined
  },
  appointment_types: {
    type: [{
      type: String,
      enum: ["consultation", "one_off"],
      default: undefined
    }],
    required: true
  },
  appointment_mediums: {
    type: [{
      type: String,
      enum: ["phone", "video"],
      default: undefined
    }],
    required: true
  },
  availability: [IAppointment]  
}

export const counsellor_model = db.model<ICounsellor>("Counsellor", counsellor_schema);
