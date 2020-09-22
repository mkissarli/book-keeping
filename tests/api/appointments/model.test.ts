import { appointment_model } from '../../../src/api/appointments/model';
import db from 'mongoose';

const valid_appointment_data = {date: "2020-10-13T10:00:00.000Z"};

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
    expect(saved_appointment.date).toStrictEqual(new Date(valid_appointment_data.date));
  });

  it("fail if new apoointment is in the past", async () => {
    //expect(4).toBe(3);
  })

})