const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidate, registerValidate } = require("./validate");
const { json } = require("express");
const { restart } = require("nodemon");

const userController = {
  register: async function (req, res) {
    const { error } = registerValidate(req.body);
    if (error) return res.status(400).send(error);
    // validate CPF and Email
    const selectedEmail = await User.findOne({
      email: req.body.email,
    });
    const selectedCPF = await User.findOne({
      cpf: req.body.cpf,
    });
    if (selectedEmail || selectedCPF)
      return res.status(400).json({ message: "Email or CPF already exists!" });

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      cpf: req.body.cpf,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password),
      bookedTickets: req.body.bookedTickets,
    });

    try {
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  login: async function (req, res) {
    const { error } = loginValidate(req.body);
    if (error) return res.status(400).send(error);

    // validate if user have a account
    const selectedUser = await User.findOne({
      email: req.body.email,
    });
    if (!selectedUser) return res.status(401).send(error);
    // compare password
    const passwordAndUserMatch = bcrypt.compareSync(
      req.body.password,
      selectedUser.password
    );
    if (!passwordAndUserMatch)
      return res.status(401).json({ message: "User or Password incorrect!" });

    const token = jwt.sign(
      {
        _id: selectedUser._id,
        name: selectedUser.name,
        email: selectedUser.email,
      },
      process.env.TOKEN_SECRET
    );

    res.header("x-access-token", token);
    res.status(200).json(selectedUser);
  },
  all: function (req, res) {
    User.find((error, data) => {
      if (error) {
        res.status(404).send(error);
      } else {
        res.send(data);
      }
    });
  },
  getForId: (req, res) => {
    User.findById(req.params.id, (error, data) => {
      if (error) {
        res.send(404).send(error);
      } else {
        res.status(200).send(data);
      }
    });
  },
  reserve: async function (req, res) {
    const USER = await User.findById(req.params.id);
    const NEW_RESERVE = req.body.newReserve;
    NEW_RESERVE.reserve=true;
    USER.bookedTickets.push(NEW_RESERVE);
    User.findByIdAndUpdate(req.params.id, {"bookedTickets": USER.bookedTickets}, function(error, result){
        if(error){
            res.status(400).send(error)
        }
        else{
            res.status(200).send(result)
        }

    })
  },
  cancelReserve: async function (req, res) {
    const USER = await User.findById(req.params.id);
    const RESERVE = req.body.cancelReserve;
    RESERVE.reserve=false;
    const NEWDATA = USER.bookedTickets.filter(item => item._id !== RESERVE._id);
    User.findByIdAndUpdate(req.params.id, {"bookedTickets": NEWDATA}, function(error, result){
        if(error){
            res.status(400).send(error)
        }
        else{
            res.status(200).send(result)
        }

    })
  }
  ,
  returnToken: async function (req, res) {
    const USER = await User.findById(req.params.id);

    const token = jwt.sign(
      {
        _id: USER._id,
        name: USER.name,
        email: USER.email,
      },
      process.env.TOKEN_SECRET
    );

    res.status(200).json(token);
  },
  userArea: async function (req, res) {
    const USER = await User.findById(req.params.id);

    const data = USER.bookedTickets;

    res.status(200).json(data);
  },
  compareEmail: async function (req, res) {
    const EMAIL = await User.findOne({
      email: req.body.email,
    });
    if (EMAIL) return res.status(200).json(!!EMAIL);
    return res.status(404).json(!!EMAIL);
  },
  compareCPF: async function (req, res) {
    const CPF = await User.findOne({
      cpf: req.body.cpf,
    });
    if (CPF) return res.status(200).json(!!CPF);
    return res.status(404).json(!!CPF);
  },
};

module.exports = userController;
