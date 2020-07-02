const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Guest = require('../models/guest');
const Visit = require('../models/visit');

router.post('/add', (req, res, next) => {
  const guest = new Guest({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    id: req.body.id,
    qrCode: req.body.qrCode,
    phoneNumber: req.body.phoneNumber,
  });
  guest.save()
    .then(result => {
      res.status(201).json({
        message: "Guest successfully created",
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
  Guest.find().then( guests => {
    res.status(200).json({
      message: guests.length.toString() + " guests fetched!",
      guests: guests
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

});

router.get('/fetch/:id', (req, res, next) => {
  Guest.find({ id: req.params.id }).then( guest => {
    res.status(200).json({
      message: guest.length.toString() + " guest fetched!",
      guest: guest
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get('/visits/:id', (req, res, next) => {
  Visit.find({ guest: req.params.id }).then( visits => {
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

router.get('/getBarcode/:id', (req, res, next) => {
  Guest.find({ id: req.params.id }).then( guest => {
    res.status(200).json({
      message: guest.length.toString() + " barcode fetched!",
      buildings: guest
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


router.patch("/edit/:id",(req, res, next) => {
  const guest =({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    id: req.body.id,
    qrCode: req.body.qrCode,
    phoneNumber: req.body.phoneNumber,
  });
  Guest.updateOne({ id: req.params.id },guest)
    .then(result => {
      res.status(201).json({
        message: "Guest successfully updated.",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    })});


router.delete("/delete/:id", (req, res, next) => {
  Guest.deleteOne({ id: req.params.id }).then(result => {
    res.status(200).json({ message: "Guest deleted!" });
  });
});



module.exports = router;
