import User from "../models/user.model.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const authPage = async (req, res) => {

    if (req.url === "/login" && req.method === "GET") {
        res.render("layout", { template: "auth", authType: "login", error: null });
        res.end();
        return;
    }

    if (req.url === "/login" && req.method === "POST") {
        const alias = req.body.alias;
        const password = req.body.password;
        await User.getUserByAlias(alias, async (err, user)=>{
            if (err) {
                res.status(500).send({
                    message: err.message || "errors when getting datas",
                });
            } else {
                if(!user.length){
                    res.render("layout", {
                        template: "auth",
                        authType: "login",
                        error: "user does not exist !! !",
                    });
                } else {
                    const isPwValid = await bcrypt.compare(password, user[0].password);
                    console.log(isPwValid);
                    // SI les mdp correspondent, on mets à jour notre session avec les infos de l'user
                    if(isPwValid){ 
                        req.session.user = {
                            alias : user[0].alias,
                            role :  user[0].role,
                        }
                        req.session.isLogged = true;
                        res.redirect("/shop");
                    } else {
                    // SINON ça veut dire qu'ils ne correspondent pas par rapport au nom de l'user
                        res.render("layout", {
                            template: "auth",
                            authType: "login",
                            error: "bad password",
                        })    
                    }
                }
            }
        });        
    }

    if (req.url === "/register" && req.method === "GET") {
        res.render("layout", { template: "auth", authType: "register", error: null  });
        res.end();
        return;
    }

    if (req.url === "/register" && req.method === "POST") {
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const datas = {
            alias: req.body.alias,
            password: hash,
        };
        await User.insertUser(datas, (err, resSQL) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "errors when insertion",
                });
            } else {
                res.redirect("login");
            }
        });
    }

    if (req.url === "/logout") {
        req.session.destroy((err)=>{
            console.log(err);
            res.redirect("/");
        })
    }


};
