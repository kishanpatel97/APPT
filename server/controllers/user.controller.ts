// import { IUser } from "../interfaces/user.interface";

// const register = async (req: Request, res: Response) => {}
// const login = async (req: Request, res: Response) => {}
// const logout = async (req: Request, res: Response) => {}
// const getOneUser = async (req: Request, res: Response) => {}

// export default { register, login, logout, getOneUser }

import { Request, Response } from "express";
import User from "../models/user.model"
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req: Request, res: Response) => {
    console.log("in register");
    console.log(req.body);
    const user = new User(req.body);

    user.save()
      .then((newUser) => {
        console.log(newUser);
        console.log("registration successful");
        res.json({
          successMessage: "Thank you for registering!",
          user: newUser,
        });
      })
      .catch((err: unknown) => {
        console.log("registration unsuccessful");
        console.log(err);
        res.status(400).json(err);
      });
  },

  login: (req: Request, res: Response) => {
    User.findOne({ email: req.body.email })
      .then((userRecord) => {
        if (userRecord === null) {
          res.status(400).json({ message: "Invalid login attempt!" });
        } else {
          console.log("gets here");
          bcrypt
            .compare(req.body.password, userRecord.password)
            .then((isPasswordValid) => {
              if (isPasswordValid) {
                console.log("password is valid");

                res.cookie(
                  "usertoken",
                  jwt.sign(
                    {
                      id: userRecord._id,
                      email: userRecord.email,
                    },
                    process.env.JWT_SECRET,
                  ),

                  {
                    httpOnly: true,
                    expires: new Date(Date.now() + 9000000),
                  },
                ).json({
                  message: "Successfully logged in",
                  userId: userRecord._id,
                });
              } else {
                res.status(400).json({
                  message: "Login and/or email invalid",
                });
              }
            })

            .catch((err: unknown) => {
              console.log(err);
              res.status(400).json({
                message: "Invalid Attempt",
              });
            });
        }
      })
      .catch((err: unknown) => {
        console.log("error");
        res.status(400).json({ message: "Invalid Attempt" });
      });
  },

  logout: (req: Request, res: Response) => {
    console.log("logging out");
    res.clearCookie("usertoken");
    res.json({
      message: "You have successfully logged out!",
    });
  },

  getOneUser: (req: Request, res: Response) => {
    User.findOne({ _id: req.params.id })
      .then((oneUser) => {
        console.log(oneUser);
        res.json(oneUser);
      })
      .catch((err: unknown) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

