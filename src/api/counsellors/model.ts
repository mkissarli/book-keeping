import db from 'mongoose';
import { appointment_model } from '../appointments/model';

const counsellor_schema = new db.Schema({
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
  appointment_types: {
    type: String,
    enum: [""],
    required: true
  },
  appointment_mediums: {
    type: String,
    enum: [""],
    required: true
  },
  avaliability: {
    type: [appointment_model]
  }
})

export const counsellor_model = db.model<db.Document>("Counsellor", counsellor_schema);
