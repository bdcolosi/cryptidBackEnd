const express = require("express");
const router = express.Router();
const Channels = require("../models/Channels");
const bcrypt = require("bcrypt");

const loginPost = async (req, res, next) => {
    const { channel, password } = req.body;
    const channelInstance = await Channels.channelLogin(channel);
    const isValid = channelInstance.checkpassword(password);
    console.log('isValid',isValid);
    if (isValid) {
        req.session.is_logged_in = isValid;
        req.session.channel_id = channelInstance.id;
        req.session.name = channelInstance.channel;
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
}

const putChannel = async (req, res) => {
    const { channel, password } = req.body;
    const channelInstance = await Channels.add(channel, password);
    if(channel === channelInstance.channel){
        console.log("GOOD STATUS")
        res.sendStatus(200);
    }else {
        res.sendStatus(403);
    }
}


router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/');
})


module.exports = { loginPost, putChannel};