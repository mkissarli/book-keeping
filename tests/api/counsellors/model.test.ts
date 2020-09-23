import { counsellor_model } from '../../../src/api/counsellors/model';
import db from 'mongoose';
import { appointment_model } from '../../../src/api/appointments/model';

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

const no_avaliability_data = {
  "counsellor_id": "79590113-a6a3-45c3-9d5e-28472a8c4a74",
  "first_name": "Lettie",
  "last_name": "Wolland",
  "appointment_types": ["consultation", "one_off"],
  "appointment_mediums": ["phone"]
  };

const outdated_data = {
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
      "datetime": "1980-10-15T21:00:00.000Z"
    }]
  };

const missing_f_name_data = {
  "counsellor_id": "79590113-a6a3-45c3-9d5e-28472a8c4a74",
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

const missing_l_name_data = {
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

const missing_app_types_data = {
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
    const valid_counsellor = new counsellor_model(valid_data); 
    const saved_counsellor = await valid_counsellor.save();

    expect(saved_counsellor._id).toBeDefined();
    // Not sure if this should be passed in or generated. It's kind of useless in mongodb.
    expect(saved_counsellor.counsellor_id).toBeDefined();
    expect(saved_counsellor.first_name).toBe(valid_data.first_name);
    expect(saved_counsellor.last_name).toBe(valid_data.last_name);

    // toString() here as dealing with CoreMongooseArray proved to be a headache.
    expect(saved_counsellor.appointment_types.toString()).toBe(valid_data.appointment_types.toString());
    expect(saved_counsellor.appointment_mediums.toString()).toBe(valid_data.appointment_mediums.toString());

    // Others we get _id messing up everything. I should probs remove that.
    for(let i = 0; i < saved_counsellor.availability.length; ++i){
      expect(saved_counsellor.availability[i].id).toBe(valid_data.availability[i].id);
      expect(saved_counsellor.availability[i].datetime).toStrictEqual(new Date(valid_data.availability[i].datetime));
    }
  });

  it("creates and saves a new counsellor successfully when there is no avaliability", async () => {
    const valid_counsellor = new counsellor_model(no_avaliability_data); 
    const saved_counsellor = await valid_counsellor.save();

    expect(saved_counsellor._id).toBeDefined();
    // Not sure if this should be passed in or generated. It's kind of useless in mongodb.
    expect(saved_counsellor.counsellor_id).toBeDefined();
    expect(saved_counsellor.first_name).toBe(no_avaliability_data.first_name);
    expect(saved_counsellor.last_name).toBe(no_avaliability_data.last_name);

    // toString() here as dealing with CoreMongooseArray proved to be a headache.
    expect(saved_counsellor.appointment_types.toString()).toBe(no_avaliability_data.appointment_types.toString());
    expect(saved_counsellor.appointment_mediums.toString()).toBe(no_avaliability_data.appointment_mediums.toString());

    expect(saved_counsellor.availability).toHaveLength(0);
  })

  it("to fail if the some of the avaliability is outdated", async () => {
    const invalid_counsellor = new counsellor_model(outdated_data); 
    const saved_counsellor = invalid_counsellor.save();

    await expect(saved_counsellor)
      .rejects
      .toThrow(db.Error.ValidationError);
  })

  /* I would've thought that this couldn't be missing but the data.json has missing data so? 

  it("to fail if first_name is missing", async () => {
    const invalid_counsellor = new counsellor_model(missing_f_name_data); 
    const saved_counsellor = invalid_counsellor.save();

    await expect(saved_counsellor)
      .rejects
      .toThrow(db.Error.ValidationError);
  })

  it("to fail if last_name is missing", async () => {
    const invalid_counsellor = new counsellor_model(missing_f_name_data); 
    const saved_counsellor = invalid_counsellor.save();

    await expect(saved_counsellor)
      .rejects
      .toThrow(db.Error.ValidationError);
  })
  */
  
  it("to fail if appointment_types is missing", async () => {
    const invalid_counsellor = new counsellor_model(missing_app_types_data); 
    const saved_counsellor = invalid_counsellor.save();

    await expect(saved_counsellor)
      .rejects
      .toThrow(db.Error.ValidationError);
  })

  it("to fail if appointment_mediums is missing", async () => {
    const invalid_counsellor = new counsellor_model(missing_app_mediums_data); 
    const saved_counsellor = invalid_counsellor.save();

    await expect(saved_counsellor)
      .rejects
      .toThrow(db.Error.ValidationError);
  })
  

  it("to fail if appointment_types has wrong data", async () => {
    const invalid_counsellor = new counsellor_model(wrong_app_types_data); 
    const saved_counsellor = invalid_counsellor.save();

    await expect(saved_counsellor)
      .rejects
      .toThrow(db.Error.ValidationError);
  })

  it("to fail if appointment_mediums has wrong data", async () => {
    const invalid_counsellor = new counsellor_model(wrong_app_mediums_data); 
    const saved_counsellor = invalid_counsellor.save();

    await expect(saved_counsellor)
      .rejects
      .toThrow(db.Error.ValidationError);
  })

  async function removeAllCollections () {
    const collections = Object.keys(db.connection.collections)
    for (const collectionName of collections) {
      const collection = db.connection.collections[collectionName]
      await collection.deleteMany({})
    }
  }
  
  afterEach(async () => {
    await removeAllCollections()
  })
})