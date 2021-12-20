import { Document } from "mongoose";

export interface IAppointment extends Document {
  name: string;
  specialty: string;
  time: string;
  location: string;
  notes: string;
}