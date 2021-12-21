import { Request, Response } from "express";
import Appointment from "../models/appt.model";
import { IAppointment } from "../interfaces/appointment.interface";

type ResultError = { type: 'error'; error: Error }

const findAllAppointments = async (req: Request, res: Response): Promise<IAppointment[]> => {
  try {
    const appointments = await Appointment.find()
    return res.status(200).json(appointments)
  } catch(e: unknown) {
    return res.status(400).json(e)
  }
}

const createNewAppointment = async (req: Request, res: Response): Promise<IAppointment> => {
  try {
    const appointment = await Appointment.create(req.body)
    return res.status(201).json(appointment)
  } catch(e: unknown) {
    return res.status(400).json(e)
  }
}

const findOneAppointment = async (req: Request, res: Response): Promise<IAppointment> => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id })
    return res.status(200).json(appointment)
  } catch(e: unknown) {
    return res.status(400).json(e)
  }
}
const updateAppointment = async (req: Request, res: Response): Promise<IAppointment> => {
  try {
    const appointment = await Appointment.findByIdAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true })
    return res.status(200).json(appointment)
  } catch(e: unknown) {
    return res.status(400).json(e)
  }
}
const deleteAppointment = async (req: Request, res: Response): Promise<{}> => {
  try {
    const appointment = await Appointment.deleteOne({ _id: req.params.id })
    return res.status(200).json(appointment)
  } catch(e: unknown) {
    return res.status(400).json(e)
  }
}

export default {
  findAllAppointments,
  createNewAppointment,
  findOneAppointment,
  updateAppointment,
  deleteAppointment
}
