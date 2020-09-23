import { appointment_model } from '../../../src/api/appointments/model';
import db from 'mongoose';

const valid_appointment_data = {datetime: "2020-10-13T10:00:00.000Z"};
const outdated_appointment_data = {datetime: "1980-10-13T10:00:00.000Z"};
const wrong_date_appointment_data = {datetime: "not today little friend."};

describe("Appointment Model Test", () => {
  beforeAll(async () => {
    await db.connect("mongodb://localhost/spill", { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
          console.error(err);
          process.exit(1);
      }
    });
  });

  it("create and save a new appointment successfully", async () => {
    const valid_appointment = new appointment_model(valid_appointment_data);
    const saved_appointment = await valid_appointment.save();

    expect(saved_appointment._id).toBeDefined();
    // Idk why it doesn't like toBe here but it works.
    expect(saved_appointment.datetime).toStrictEqual(new Date(valid_appointment_data.datetime));
  });

  it("fail if new apoointment is in the past", async () => {
    const invalid_appointment = new appointment_model(outdated_appointment_data);
    //const saved_appointment = await invalid_appointment.save();

    await expect(invalid_appointment.save())
      .rejects
      .toThrow(db.Error.ValidationError);
  });

  it("invalid date format for appointment", async () => {
    const invalid_appointment = new appointment_model(wrong_date_appointment_data);

    await expect(invalid_appointment.save())
      .rejects
      .toThrow(db.Error.ValidationError);
  });

  // Should I test incomplete dates? Atm they would be considered correct and that's fine but it can introduces inconsistencies.

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