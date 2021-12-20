import { Express } from "express";
const UserController = require(`../controllers/user.controller`);

export default (app : Express) => {
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.get("/api/users/:id", UserController.getOneUser);
};