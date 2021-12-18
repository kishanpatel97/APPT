import appt from './appt.routes'
import user from './user.routes'
import { Express } from "express";

export default (app: Express) => {
  appt(app),
  user(app)
}