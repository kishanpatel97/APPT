import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import dotenv from "dotenv";
dotenv.config()

const register = async (req: Request, res: Response): Promise<IUser> => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and Confirm Password must match.'});
    }

    const registration = await User.create({
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    });

    const userToken = jwt.sign({
      id: registration._id
    }, process.env.SECRET_KEY);

    return res.cookie("usertoken", userToken, process.env.secret, {
        httpOnly: true
      })
      .json({ message: "Successfully created a new user", registration });
  } catch(e) {
    return res.status(400).json(e.message);
  }
}

const login = async (req: Request, res: Response): Promise<IUser> => {
  const user = await User.findOne({ email: req.body.email });
  if(user === null) {
    return res.status(400).send({ message: "user does not exist."});
  }

  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
  if(!isPasswordCorrect) {
    return res.status(403).send({ message: "Password or email is incorrect."});
  }
  
  const name = `${user.firstName} ${user.lastName}`
  const userToken = jwt.sign({
    id: user._id
  }, process.env.SECRET_KEY, { noTimestamp:true, expiresIn: '1h' });

  return res
    .cookie("usertoken", userToken, process.env.secret, {
      httpOnly: true
    })
    .json({ message: "Successful login!", user: {name, email: user.email} });
}

const logout = async (req: Request, res: Response) => {
  res.clearCookie('usertoken');
  return res.status(200).json({ message: "Successfully logged out!", redirect: "/login" });
}
const getOneUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id});
    return res.json(user);
  } catch(e) {
    return res.status(400).json(e);
  }
}

export { register, login, logout, getOneUser }
