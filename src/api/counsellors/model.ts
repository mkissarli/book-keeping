import db from 'mongoose';
import { appointment_model, appointment_schema, IAppointment } from '../appointments/model';

export const appointment_types_enum: any = ["consultation", "one_off"];
export const appointment_medium_enum: any = ["phone", "video"];

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
    type: [String],
    enum: appointment_types_enum,
    //validate: (v: any) => Array.isArray(v) && v.length > 0,
  },
  appointment_mediums: {
    type: [String],
    enum: appointment_medium_enum,
    //validate: (v: any) => Array.isArray(v) && v.length > 0,
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
  appointment_types: [string]/*{
    type: [String],
    enum: ["consultation", "one_off"],
    required: true
  }*/,
  appointment_mediums: [string]/*{
    type: [String],
    enum: ["phone", "video"],
    required: true
  }*/,
  availability: [IAppointment]  
}

export const counsellor_model = db.model<ICounsellor>("Counsellor", counsellor_schema);
