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
  Visit.find().then( visits => {
    res.status(200).json({
      message: visits.length.toString() + " visits fetched!",
      visits: visits
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

});

router.get('/fetch/:id', (req, res, next) => {
  Visit.find({ _id: req.params.id }).then( visits => {
    res.status(200).json({
      message: visits.length.toString() + " business fetched!",
      visit: visits
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});



router.patch('/checkOut/:id', (req, res, next) => {
  const checkOut = {
    checkedOut: true,
    timeOut: Date.now()
  };
  Visit.updateOne({ _id: req.params.id },checkOut)
    .then( result => {
    res.status(200).json({
      message:"Checked Out!",
      result: result
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
