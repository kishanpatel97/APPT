import { Express } from "express";
import * as AppointmentController from "../controllers/appt.controller"
import authenticate from '../config/jwt.config'

export default (app: Express) => {
    app.get("/api/appointments", AppointmentController.findAllAppointments);
    app.post("/api/appointments", AppointmentController.createNewAppointment);
    app.get("/api/appointment/:id", AppointmentController.findOneAppointment);
    app.put("/api/appointment/:id", AppointmentController.updateAppointment);
    app.delete("/api/appointment/:id", AppointmentController.deleteAppointment);;
}