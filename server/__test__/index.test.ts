import supertest from "supertest"
import server from "../server"
import mongoose from "mongoose"
import Appointment from '../models/appt.model'

beforeEach((done) => {
  mongoose.connect("mongodb://localhost/appt_test_db", () => done());
});

afterEach((done) => {
  mongoose.connection.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

test("GET /api/appointments", async () => {
  const appointment = await Appointment.create({ name: "Dr. Who", specialty: "Cardiology", time: "10AM", location: "San Francisco", notes: "Patient Notes" });

  await supertest(server).get("/api/appointments")
    .expect(200)
    .then((response) => {
      expect(response.body[0]._id).toBe(appointment._id.toString());
      expect(response.body[0].name).toBe(appointment.name);
      expect(response.body[0].specialty).toBe(appointment.specialty);
      expect(response.body[0].time).toBe(appointment.time);
      expect(response.body[0].location).toBe(appointment.location);
      expect(response.body[0].notes).toBe(appointment.notes);
    });
});

test("GET /api/appointment/:id", async () => {
  const appointment = await Appointment.create({ name: "Dr. Who", specialty: "Cardiology", time: "10AM", location: "San Francisco", notes: "Patient Notes" });
  const id = appointment._id.toString()
  await supertest(server).get(`/api/appointment/${id}`)
    .expect(200)
    .then((response) => {
      expect(response.body._id).toBe(id);
      expect(response.body.name).toBe(appointment.name);
      expect(response.body.specialty).toBe(appointment.specialty);
      expect(response.body.time).toBe(appointment.time);
      expect(response.body.location).toBe(appointment.location);
      expect(response.body.notes).toBe(appointment.notes);
    });
});

test("CREATE /api/appointments", async () => {
  const appointment = { name: "Dr. Strange", specialty: "Internal", time: "7AM", location: "Oregon", notes: "Patient Notes" }
  const expectedFields = ['_id', 'name', 'specialty','time', 'location', 'notes', 'createdAt', 'updatedAt', '__v']
  await supertest(server).post("/api/appointments")
    .send(appointment)
    .expect(201)
    .then((response) => {
      expect(Object.keys(response.body).length).toBe(expectedFields.length);
      expect(response.body.name).toBe(appointment.name);
      expect(response.body.specialty).toBe(appointment.specialty);
      expect(response.body.time).toBe(appointment.time);
      expect(response.body.location).toBe(appointment.location);
      expect(response.body.notes).toBe(appointment.notes);
    });
});

test("PUT /api/appointment/:id", async () => {
  const appointment = await Appointment.create({ name: "Dr. Who", specialty: "Cardiology", time: "10AM", location: "San Francisco", notes: "Patient Notes" });
  const id = appointment._id.toString()
  const update = { name: "Dr. Strange", specialty: "Internal", time: "7AM", location: "Oregon", notes: "Patient Notes" }
  await supertest(server).put(`/api/appointment/${id}`)
    .send(update)
    .expect(200)
    .then((response) => {
      expect(response.body._id).toBe(id);
      expect(response.body.name).toBe(update.name);
      expect(response.body.specialty).toBe(update.specialty);
      expect(response.body.time).toBe(update.time);
      expect(response.body.location).toBe(update.location);
      expect(response.body.notes).toBe(update.notes);
    });
});

test("DELETE /api/appointment/:id", async () => {
  const appointment = await Appointment.create({ name: "Dr. Who", specialty: "Cardiology", time: "10AM", location: "San Francisco", notes: "Patient Notes" });
  const id = appointment._id.toString()
  await supertest(server).delete(`/api/appointment/${id}`)
    .expect(200)
    .then((response) => {
      expect(response.body.deletedCount).toBe(1);
    });
});
