import { Request, Response } from "express";
import Appointment from "../models/appt.model";

const findAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find()
    return res.status(200)
  } catch(e) {
    return res.status(500).send(e.message)
  }
}

const createNewAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.create()
    return res.status(200)
  } catch(e) {
    return res.status(500).send(e.message)
  }
}

const findOneAppointment = async (req: Request, res: Response) => {}
const updateAppointment = async (req: Request, res: Response) => {}
const deleteAppointment = async (req: Request, res: Response) => {}

export { findAllAppointments, createNewAppointment, findOneAppointment, updateAppointment, deleteAppointment }
