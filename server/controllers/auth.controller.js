const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const Users = require("../models/Users");
const Tokens = require("../models/Tokens");
const nodemailer = require('nodemailer');
const pepipostTransport = require('nodemailer-pepipost-transport');

exports.changeUser = async (req, res) => {
    const user = await Users.findOne({ where: { id: req.body.userId } })

    const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret')
    )
    res.json({ token, user })
}

exports.addUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: "Error validashion"
        })
    }

    const { login, password, name, email, city } = req.body;
    const candidate = await Users.findOne({ where: { login } })
    
    if (candidate) {
        return res.status(400).json({ message: "There is such a user" })
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const randomString  = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    Users.create({
        login, password: hashedPassword, 
        name, 
        email, 
        city,
        role: 0,
        status: 0,
    }).then((user) => {
        Tokens.create({
            userId: user.id, token: randomString
        }).then((token) => {

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'dimno322@gmail.com',
                    pass: 'lnm5ro2hio'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            //req.headers.host
            const mailOptions = {
                from: 'dimno322@gmail.com',
                to: email,
                subject: 'Invoices due',
                // text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:3006' + '\/registration\/' + randomString + '.\n'
                text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host  + '\/registration\/' + randomString + '.\n'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.status(201).json({ msg: "User was add" })
        })
    })
}

exports.confirmationUser = async (req, res) => {
    const { token } = req.body
    const tokenInBase = await Tokens.findOne({ where: { token } })

    if (tokenInBase) {
        const userInBase = await Users.update({ isVerified: 0 },
            { where: { id: tokenInBase.userId } })
            console.log(userInBase) 
        if (!userInBase) {
            res.status(400).json({ message: "error" })
        }
        res.status(201).json(userInBase)
    } else {
        res.status(400).json({ message: "error" })
    }
}

exports.editUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: "Error validashion"
        })
    }

    Users.update(
        { login: req.body.login,
            email: req.body.email,
            name: req.body.name,
            city: req.body.city 
        },
        {
            where: { id: req.body.id }
          }
    )
    return res.json(req.body);
}


exports.loginUser = async (req, res) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         errors: errors.array(),
    //         message: "Error validashion"
    //     })
    // }
    // if(candidate.isVerified){
    //     return res.status(400).json({ message: "Тeed to confirm mail" })
    // }
    const { login, password } = req.body;
    const user = await Users.findOne({ where: { login } })
    if (!user) {
        return res.status(400).json({ message: "Not user" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({ message: "Error pass or log" })
    }
    if (!user.status) {
        return res.status(400).json({ message: "user block" })
    }
    if (user.isVerified) {
        return res.status(400).json({ message: "user not check email" })
    }

    const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret')
    )
    res.json({ token, user })
}