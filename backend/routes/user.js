const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');


router.post('/create', (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        role: req.body.role
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: "User successfully created",
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });


    })
});

router.get('/all', (req, res, next) => {
  User.find().then( users => {
    res.status(200).json({
      message: users.length.toString() + " users fetched!",
      users: users
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

});


router.delete("/delete/:id", (req, res, next) => {
  User.deleteOne({ userId: req.params.userId }).then(result => {
    res.status(200).json({ message: "User deleted!" });
  });
});

router.delete("/user/:id", (req, res, next) => {
  User.find({ userId: req.params.userId }).then(result => {
    res.status(200).json({
      message: "User deleted!",
      userInfo: result
    });
  });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({userId: req.body.userId.toLowerCase()})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "No such User ID"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(500).json({
          message: "Wrong Password"
        });
      }
       const token = jwt.sign(
         {id: fetchedUser._id, userId: fetchedUser.userId},
         'server_secret',
         {expiresIn: "1h"}
         );
      res.status(200).json({
        token: token,
        userId: fetchedUser.userId,
      })
    })
    .catch(err => {
      res.status(401).json({
        message: err
      });
    })
});



module.exports = router;
