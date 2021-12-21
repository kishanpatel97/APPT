import { Express } from "express";
import AppointmentController from "../controllers/appt.controller"
import authenticate from '../config/jwt.config'

export default (app: Express) => {
    app.get("/api/appointments", authenticate, AppointmentController.findAllAppointments);
    app.post("/api/appointments", authenticate, AppointmentController.createNewAppointment);
    app.get("/api/appointment/:id", authenticate, AppointmentController.findOneAppointment);
    app.put("/api/appointment/:id", authenticate, AppointmentController.updateAppointment);
    app.delete("/api/appointment/:id", authenticate, AppointmentController.deleteAppointment);
}