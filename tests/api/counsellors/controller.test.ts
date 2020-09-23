import { counsellor_schema, counsellor_model } from '../../../src/api/counsellors/model';
import { add_appointment, get_filtered_appointments } from '../../../src/api/counsellors/controller';
import db from 'mongoose';

describe("Counsellor Controller Test", () => {
  beforeAll(async () => {
    await db.connect("mongodb://localhost/spill", { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
          console.error(err);
          process.exit(1);
      }
    });
  });
  
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

  it("add a new valid appointment time", async () => {
    var saved = await (new counsellor_model(valid_data)).save();
    await add_appointment(saved._id, new Date("2021-10-13T10:00:00.000Z"));
    var doc = await counsellor_model.findOne({_id: saved._id})
      .then(async function (doc: any) {
        return doc;
      });
    
      var result = false;
      doc.availability.forEach((x: any) => {
        // Hack but they types are being annoying.
        if(x.datetime.toString() == new Date("2021-10-13T10:00:00.000Z").toString()){
          result = true;
        }
      });
      
    expect(result).toBe(true);
  })

  it("fails when adding a outdated appointment time", async () => {
    var saved = await (new counsellor_model(valid_data)).save();
    var value = add_appointment(saved._id, new Date("1980-10-13T10:00:00.000Z"));

    await expect(value)
      .rejects
      .toThrow(db.Error.ValidationError);
  })

  it("fails when using a invalid id", async () => {
    var value = add_appointment("nononononoyes", new Date("2021-10-13T10:00:00.000Z"));

    await expect(value)
      .rejects
      .toThrow();
  })

  it("gets filtered_appointments when passed valid data", async () => {
    await (new counsellor_model(valid_data)).save();
    await (new counsellor_model(valid_data_2)).save();
    await (new counsellor_model(valid_data_3)).save();

    // Should give two.
    var doc = await get_filtered_appointments(new Date("2020-10-16T10:00:00.000Z"), new Date("2020-10-18T10:00:00.000Z"), ['one_off'], ['video']);
    
    expect(doc[0].datetime).toStrictEqual(new Date("2020-10-17T10:00:00.000Z"));
    expect(doc[0].id).toBe("oW3GkuJWj6o5BsSf9BL3nv");
    expect(doc).toHaveLength(1); 

    var doc = await get_filtered_appointments(new Date("2019-10-16T10:00:00.000Z"), new Date("2021-10-18T10:00:00.000Z"), ['consultation'], ['video', 'phone']);
    expect(doc).toHaveLength(4); 
  })

  it("gets filtered_appointments when passed valid data where appointment_medium is empty", async () => {
    await (new counsellor_model(valid_data)).save();
    await (new counsellor_model(valid_data_2)).save();
    await (new counsellor_model(valid_data_3)).save();

    // Should give two.
    var doc = await get_filtered_appointments(new Date("2020-10-16T10:00:00.000Z"), new Date("2020-10-18T10:00:00.000Z"), ['one_off'], []);
    
    expect(doc[0].datetime).toStrictEqual(new Date("2020-10-17T10:00:00.000Z"));
    expect(doc[0].id).toBe("oW3GkuJWj6o5BsSf9BL3nv");
    expect(doc).toHaveLength(1); 
  })

  it("gets filtered_appointments when passed valid data where appointment_types is empty", async () => {
    await (new counsellor_model(valid_data)).save();
    await (new counsellor_model(valid_data_2)).save();
    await (new counsellor_model(valid_data_3)).save();

    // Should give two.
    var doc = await get_filtered_appointments(new Date("2020-10-16T10:00:00.000Z"), new Date("2020-10-18T10:00:00.000Z"), [], ['video']);
    
    expect(doc).toHaveLength(2); 
  })

  // How do I test this more? I can't miss parameter, typescript doesn't allow it. Dates can go in the wrong direction, thats valid but will just always result in nothing.

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