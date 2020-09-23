import db from 'mongoose';
import { counsellor_model } from '../src/api/counsellors/model';

const valid_data = {
  "counsellor_id": "79590113-a6a3-45c3-9d5e-28472a8c4a74",
  "first_name": "Lettie",
  "last_name": "Wolland",
  "appointment_types": ["consultation", "one_off"],
  "appointment_mediums": ["phone"],
  "availability": [
    {
      "id": "88ZAQZbhu2Hf7CyVUmASLM",
      "datetime": "2020-10-25T19:00:00.000Z"
    },
    {
      "id": "jLYfhekg7wjZk3JyRH35eX",
      "datetime": "2020-10-15T21:00:00.000Z"
    }]
  };

const valid_data_2 = {
    "counsellor_id": "1f255dda-d654-490f-a6c0-96d03a13743a",
    "first_name": "Gard",
    "last_name": "Zarb",
    "appointment_types": ["one_off"],
    "appointment_mediums": ["video"],
    "availability": [
      {
        "id": "oW3GkuJWj6o5BsSf9BL3nv",
        "datetime": "2020-10-17T10:00:00.000Z"
      },
      {
        "id": "bSBLwzdM64MhrPugjCfqze",
        "datetime": "2020-10-19T17:00:00.000Z"
      }]
}

const valid_data_3 = {
    "counsellor_id": "1f255dda-d654-490f-a6c0-96d03a13743b",
    "first_name": "Gardy",
    "last_name": "Zarby",
    "appointment_types": ["consultation"],
    "appointment_mediums": ["video"],
    "availability": [
      {
        "id": "oW3GkuJWj6o5BsSf9BL3nb",
        "datetime": "2020-10-17T10:00:00.000Z"
      },
      {
        "id": "bSBLwzdM64MhrPugjCfqzl",
        "datetime": "2020-10-19T17:00:00.000Z"
      }]
}


describe("Adding appointments Api Test", () => {
  beforeAll(async () => {
    await db.connect("mongodb://localhost/spill", { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
          console.error(err);
          process.exit(1);
      }
    });
  });

  it("works when passed valid data.", async function () {
    await (new counsellor_model(valid_data)).save();
    await (new counsellor_model(valid_data_2)).save();
    await (new counsellor_model(valid_data_3)).save();
  });
})