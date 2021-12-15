import { Document, Model, model, Schema } from "mongoose";

export interface IAppointment extends Document {
    name: string;
    specialty: string;
    time: string;
    location: string;
    notes: string;
}

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
});

const Appointment: Model<IAppointment> = model("Appointment", appointmentSchema);

export default Appointment;