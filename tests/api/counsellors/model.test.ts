import { counsellor_model } from '../../../src/api/counsellors/model';
import db from 'mongoose';
import { appointment_model } from '../../../src/api/appointments/model';

const valid_counsellor_data = {
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

const no_avaliability_counsellor_data = {
  "counsellor_id": "79590113-a6a3-45c3-9d5e-28472a8c4a74",
  "first_name": "Lettie",
  "last_name": "Wolland",
  "appointment_types": ["consultation", "one_off"],
  "appointment_mediums": ["phone"]
  };

const outdated_counsellor_data = {
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

const missing_f_name_counsellor_data = {
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

const missing_l_name_counsellor_data = {
  "counsellor_id": "79590113-a6a3-45c3-9d5e-28472a8c4a74",
    "first_name": "Lettie",
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

const missing_app_types_counsellor_data = {
  "counsellor_id": "79590113-a6a3-45c3-9d5e-28472a8c4a74",
  "first_name": "Lettie",
  "last_name": "Wolland",
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

const missing_app_mediums_data = {
  "counsellor_id": "79590113-a6a3-45c3-9d5e-28472a8c4a74",
  "first_name": "Lettie",
  "last_name": "Wolland",
  "appointment_types": ["consultation", "one_off"],
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

const wrong_app_types_data = {
  "counsellor_id": "79590113-a6a3-45c3-9d5e-28472a8c4a74",
  "first_name": "Lettie",
  "last_name": "Wolland",
  "appointment_types": ["please"],
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

const wrong_app_mediums_data = {
  "counsellor_id": "79590113-a6a3-45c3-9d5e-28472a8c4a74",
  "first_name": "Lettie",
  "last_name": "Wolland",
  "appointment_types": ["consultation", "one_off"],
  "appointment_mediums": ["never"],
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

describe("Counsellor Model Test", () => {
  beforeAll(async () => {
    await db.connect("mongodb://localhost/spill", { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
          console.error(err);
          process.exit(1);
      }
    });
  });

  it("create and save a new counsellor successfully", async () => {

    const valid_counsellor = new counsellor_model(valid_counsellor_data); 
    valid_counsellor.markModified("avaliability");
    const saved_counsellor = await valid_counsellor.save();

    expect(saved_counsellor._id).toBeDefined();
    // Not sure if this should be passed in or generated. It's kind of useless in mongodb.
    expect(saved_counsellor.counsellor_id).toBeDefined();
    expect(saved_counsellor.first_name).toBe(valid_counsellor_data.first_name);
    expect(saved_counsellor.last_name).toBe(valid_counsellor_data.last_name);

    // toString() here as dealing with CoreMongooseArray proved to be a headache.
    expect(saved_counsellor.appointment_types.toString()).toBe(valid_counsellor_data.appointment_types.toString());
    expect(saved_counsellor.appointment_mediums.toString()).toBe(valid_counsellor_data.appointment_mediums.toString());

    // Others we get _id messing up everything. I should probs remove that.
    for(let i = 0; i < saved_counsellor.availability.length; ++i){
      expect(saved_counsellor.availability[i].id).toBe(valid_counsellor_data.availability[i].id);
      expect(saved_counsellor.availability[i].datetime).toStrictEqual(new Date(valid_counsellor_data.availability[i].datetime));
    }
  });

})