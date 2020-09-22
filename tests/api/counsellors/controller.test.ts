import { counsellor_schema, counsellor_model } from '../../../src/api/counsellors/model';
import { add_appointment } from '../../../src/api/counsellors/controller';
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
});