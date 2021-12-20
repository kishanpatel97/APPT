import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

module.exports = {
  register: (req: Request, res: Response) => {
    const user = new User(req.body);

    user.save()
      .then((newUser) => {
        res.json({
          successMessage: "Thank you for registering!",
          user: newUser,
        });
      })
      .catch((err: unknown) => {
        res.status(400).json(err);
      });
  },

  login: (req: Request, res: Response) => {
    User.findOne({ email: req.body.email })
      .then((userRecord) => {
        if (userRecord === null) {
          res.status(400).json({ message: "Invalid login attempt!" });
        } else {
          bcrypt
            .compare(req.body.password, userRecord.password)
            .then((isPasswordValid) => {
              if (isPasswordValid) {
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
              res.status(400).json({
                message: "Invalid Attempt",
              });
            });
        }
      })
      .catch((err: unknown) => {
        res.status(400).json({ message: "Invalid Attempt" });
      });
  },

  logout: (req: Request, res: Response) => {
    res.clearCookie("usertoken");
    res.json({
      message: "You have successfully logged out!",
    });
  },

  getOneUser: (req: Request, res: Response) => {
    User.findOne({ _id: req.params.id })
      .then((oneUser) => {
        res.json(oneUser);
      })
      .catch((err: unknown) => {
        res.status(400).json(err);
      });
  },
};

