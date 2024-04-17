import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import routerViews from "./routes/viewsRouter.js";
import routerSession from "./routes/sessionsRouter.js";
const app = express();

//seteamos el puerto
app.set("PORT", process.env.PORT || 4000);

const DBURL =
    "mongodb+srv://Lautaro:Ors6E5ixvF0N1pVh@cluster0.beeo5kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DBURL);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));


//logica de la sesión
app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: DBURL,
        ttl: 3600
    }),
}))




//platilla
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use("/", routerViews);
app.use("/", routerSession)



//listener
app.listen(app.get("PORT"), console.log(`Server on port ${app.get("PORT")}`));