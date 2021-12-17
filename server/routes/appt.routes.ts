const AppointmentController = require("../controllers/apppointment.controller");

const { authenticate } = require("../config/jwt.config");

module.exports = (app : any) =>{
    app.get("/api/appointments", authenticate, AppointmentController.findAllAppointments);
    app.post("/api/appointments", authenticate, AppointmentController.createNewAppointment);
    app.get("/api/appointment/:id", authenticate, AppointmentController.findOneAppointment);
    app.put("/api/appointment/:id", authenticate, AppointmentController.updateAppointment);
    app.delete("/api/appointment/:id", authenticate, AppointmentController.deleteAppointment);;
}