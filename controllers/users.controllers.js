const Users = require("../models/Users");
const Fanfictions = require("../models/Fanfictions");
const Comments = require('../models/Comments');

exports.getUsers = (req, res) => {
    Users.findAll({ raw: true }).then(users => {
        return res.json(users);
    }).catch(err => console.log(err));
}

exports.getUser = (req, res) => {
    Users.findOne({ where: { id: req.body.userId } }).then(users => {
        return res.json(users);
    }).catch(err => console.log(err));
}

exports.deleteUser = async (req, res) => {
    const admins = await Users.findAll({ where: { role: 1 }, })
    if (admins.length === 1) {
        if (req.body.userId == admins[0].dataValues.id) {
            return res.status(400).json({ message: "Need one admin" })
        }
    }
    await Fanfictions.destroy({
        where: { userId: req.body.userId }
    });
    await Comments.destroy({
        where: { userId: req.body.userId }
    });
    const user = await Users.findOne({
        where: { id: req.body.userId }
    });
    await Users.destroy({
        where: { id: req.body.userId }
    });

    return res.json(user);
}


exports.blockUser = async (req, res) => {
    const admins = await Users.findAll({ where: { role: 1 }, });

    if (admins.length === 1) {
        if (req.body.userId == admins[0].dataValues.id) {
            return res.status(400).json({ message: "Need one admin" });
        }
    }

    const user = await Users.findOne({
        where: { id: req.body.userId }
    })

    let statusUser = false;

    if (user.dataValues.status == 1) {
        statusUser = 0;
    } else {
        statusUser = 1;
    }

    await Users.update({ status: statusUser }, {
        where: { id: req.body.userId }
    })

    return res.json(user);
}
exports.adminUser = async (req, res) => {
    const admins = await Users.findAll({ where: { role: 1 }, });
    if (admins.length === 1) {
        if (req.body.userId == admins[0].dataValues.id) {
            return res.status(400).json({ message: "Need one admin" });
        }
    }

    const user = await Users.findOne({
        where: { id: req.body.userId }
    });

    let roleUser = false;

    if (user.dataValues.role == 1) {
        roleUser = 0;
    } else {
        roleUser = 1;
    }

    await Users.update({ role: roleUser }, {
        where: { id: req.body.userId }
    });

    return res.json(user);
}
