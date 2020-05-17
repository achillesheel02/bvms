const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');


router.post('/create', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        id: req.body.id,
        phoneNumber: req.body.phoneNumber,
        roles: req.body.roles
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
router.get('/fetchByDbId/:id', (req, res, next) => {
  User.find({ _id: req.params.id }).then( user => {
    res.status(200).json({
      message: user.length.toString() + " user fetched!",
      user: user
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

});

router.get('/fetch/:id', (req, res, next) => {
  User.find({ id: req.params.id }).then( user => {
    res.status(200).json({
      message: user.length.toString() + " user fetched!",
      user: user
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

});

router.get('/role/:id', (req, res, next) => {
  User.find({ roles: req.params.id }).then( users => {
    console.log(users);
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


router.patch("/edit/:id",(req, res, next) => {
  const user =({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    id: req.body.id,
    phoneNumber: req.body.phoneNumber,
  });
  User.updateOne({ id: req.params.id },user)
    .then(result => {
      res.status(201).json({
        message: "User successfully created.",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    })});


router.delete("/delete/:id", (req, res, next) => {
  User.deleteOne({ id: req.params.id }).then(result => {
    res.status(200).json({ message: "User deleted!" });
  });
});


router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({id: req.body.id})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "No such ID"
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
         {id: fetchedUser._id, userId: fetchedUser.id},
         'server_secret',
         {expiresIn: "1h"}
         );
      res.status(200).json({
        token: token,
        id: fetchedUser.id,
      })
    })
    .catch(err => {
      res.status(401).json({
        message: err
      });
    })
});



module.exports = router;
