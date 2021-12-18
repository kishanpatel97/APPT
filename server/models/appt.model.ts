import { Model, model, Schema } from "mongoose";
import { IAppointment } from "../interfaces/appointment.interface";

const appointmentSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    specialty: {
        type: String,
        required: [true, "Speciality is required"],
    },
    time: {
        type: String,
        required: [true, "Time is required"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
    notes: {
        type: String,
        required: [true, "Notes are required"],
    },
}, { timestamps: true });

const Appointment: Model<IAppointment> = model("Appointment", appointmentSchema);

export default Appointment;