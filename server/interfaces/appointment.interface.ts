import { Document } from "mongoose";
import Appointment from "../models/appt.model";

export interface IAppointment extends Document {
  name: string;
  specialty: string;
  time: string;
  location: string;
  notes: string;
}