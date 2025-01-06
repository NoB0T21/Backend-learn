const express = require("express");
const router = express();
const ownermodel = require("../models/owner_model");

if(process.env === "devlopment"){
    router.post("/create", async (req,res) => {
        let owners = await ownermodel.find();
        if(owners.length > 0){
            return res
                .send(503)
                .send("You dont have permission to create a new owner")
        }

        let {fullname, email, password} = req.body;
        let createdOwner = await ownermodel.create()({
            fullname,
            email,
            password
        });
        res.status(201).send(createdOwner)
    });
}

router.get("/", (req,res) => {
    res.send("hello");
});

module.exports = router;