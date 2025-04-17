const express = require("express");
const diyRouter = express.Router();

diyRouter.get('/diy-projects', async(req,res)=>{
    try {
        const diyProjects = ['Home Decor', 'Upcycled Crafts', 'DIY Travel Gear'];
        res.status(200).send(diyProjects);
    } catch (error) {
        console.error(error);
        res.status(500).send({msg:"Something went wrong"});
    }
});

module.exports = diyRouter;