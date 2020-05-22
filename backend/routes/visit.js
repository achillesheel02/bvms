const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Visit = require('../models/visit');

router.post('/add', (req, res, next) => {
  const visit = new Visit({
    admittingPersonnel: req.body.admittingPersonnel,
    guest: req.body.guest,
    itemsCarried: req.body.itemsCarried,
    businessVisiting: req.body.businessVisiting,

  });
  visit.save()
    .then(result => {
      res.status(201).json({
        message: "Visit successfully created",
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });

    })});

router.get('/all', (req, res, next) => {
  Visit.find().then( businesses => {
    res.status(200).json({
      message: businesses.length.toString() + " businesses fetched!",
      visits: businesses
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

});

router.get('/fetch/:id', (req, res, next) => {
  Business.find({ _id: req.params._id }).then( business => {
    res.status(200).json({
      message: business.length.toString() + " business fetched!",
      business: business
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
