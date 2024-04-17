import { Router } from "express";
import usersModel from "../models/users.js";


const routerSession = Router();

routerSession.post("/register", async (req, res) => {

    const { First_Name, Last_Name, Number, Email, Age, Password, Role } = req.body;

    const exist = await usersModel.findOne({ email: Email });
    if (exist) {
        return res
            .status(400)
            .send({ status: "error", error: "el correo ya existe" });
    }
    const user = {
        First_Name: First_Name,
        Last_Name: Last_Name,
        Email: Email,
        Age: Age,
        Number: Number,
        Password: Password,
        Role: Role
    };
    req.session.user = {
        First_Name: First_Name,
        Last_Name: Last_Name,
        Age: Age,
        Email: Email
    }

    if (req.session.user) {
        await usersModel.create(user);

        console.log(req.session.user, "hola")
        res.status(201).send({ staus: "success", payload: req.session.user });
    } else {
        res.send("error")
    }

});

routerSession.post("/login", async (req, res) => {

    const { Email, Password } = req.body;
    const user = await usersModel.findOne({ Email }); 
    if (!user) {
        return res
            .status(400)
            .send({ status: "error", error: "error en las credenciales" });
    }


    if (user.Password !== Password){
        return res
            .status(401)
            .send({ error: "error", message: "Error de credenciales" });
    }

    req.session.user = {
        First_Name: user.First_Name,
        Last_Name: user.Last_Name,
        Age: user.Age,
        Email: user.Email
    }


    res.render("usersViews", req.session.user);

});


export default routerSession;
