import { Document, Model, model, Schema } from "mongoose";
import { IAppointment } from "../interfaces/appointment.interface";

const appointmentSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
}, { timestamps: true });

const Appointment: Model<IAppointment> = model("Appointment", appointmentSchema);

export default Appointment;