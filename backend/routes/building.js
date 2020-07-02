const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Building = require('../models/building');

router.post('/add', (req, res, next) => {
      const building = new Building({
        name: req.body.name,
        buildingOwner: req.body.buildingOwner,
        location: req.body.location,
        geoLocation: req.body.geoLocation,
        floors: req.body.floors,
      });
      building.save()
        .then(result => {
          res.status(201).json({
            message: "Building successfully created",
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
  Building.find().then( buildings => {
    res.status(200).json({
      message: buildings.length.toString() + " buildings fetched!",
      buildings: buildings
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

});

router.get('/fetch/:id', (req, res, next) => {
  Building.find({ _id: req.params.id }).then( building => {
    res.status(200).json({
      message: building.length.toString() + " building fetched!",
      building: building
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get('/fetchByOwner/:id', (req, res, next) => {
  Building.find({ buildingOwner: req.params.id }).then( buildings => {
    res.status(200).json({
      message: buildings.length.toString() + " buildings fetched!",
      buildings: buildings
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get('/fetchPersonnel/:id', (req, res, next) => {
  Building.find({ buildingOwner: req.params.id }).then( buildings => {
    res.status(200).json({
      message: buildings.length.toString() + " buildings fetched!",
      buildings: buildings
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get('/fetchByBusiness/:id', (req, res, next) => {
  Building.find({ _id: req.params.id }).then( buildings => {
    res.status(200).json({
      message: buildings.length.toString() + " building fetched!",
      building: building
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/edit/:id",(req, res, next) => {
  const building =({
    name: req.body.name,
    location: req.body.location,
    geoLocation: req.body.geoLocation,
    floors: req.body.floors,
  });
  Building.updateOne({ _id: req.params.id },building)
    .then(result => {
      res.status(201).json({
        message: "Building successfully updated.",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    })});


router.delete("/delete/:id", (req, res, next) => {
  Building.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Building deleted!" });
  });
});

module.exports = router;
