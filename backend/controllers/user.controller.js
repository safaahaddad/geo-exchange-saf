const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var axios = require('axios');

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
    user.save(err => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "User was registered successfully!" });
    });
};
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
        phone: user.phone,
        firstname: user.firstname,
        lastname: user.lastname,
        location: user.location,
        password: user.password
      });
    });
};


exports.getGeoInfo = async (req, res) => {
  const {ip} = req.params 
  try {
    const response = await axios.get(`http://ipinfo.io/${ip}/geo`);
    res.send(response.data);

  } catch (error) {
    res.send(null);
  }
  
};