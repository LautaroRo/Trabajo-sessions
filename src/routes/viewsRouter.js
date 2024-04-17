import { Router } from "express";


const routerViews = Router()

routerViews.get("/register", (req,res) => {
    res.render("register")
})

routerViews.get("/", (req,res) => {

    if(req.session.user){
        res.render("usersViews", req.session.user)
    }else{
        res.render("home")
    }

})

routerViews.get("/logout", (req,res) => {

    req.session.destroy((err)=>{
        if(err) return console.log("hubo un error")

        res.redirect("/")
    })
})


export default routerViews