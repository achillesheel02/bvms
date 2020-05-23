const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Business = require('../models/business');
const Building = require('../models/building');


router.post('/add', (req, res, next) => {
  const business = new Business({
    name: req.body.name,
    businessOwner: req.body.businessOwner,
    building: req.body.building,
    description: req.body.description,
    floorNo: req.body.floorNo,
  });
  business.save()
    .then(result => {
      res.status(201).json({
        message: "Business successfully created",
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
  Business.find().then( businesses => {
    res.status(200).json({
      message: businesses.length.toString() + " businesses fetched!",
      businesses: businesses
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

});

router.get('/fetch/:id', (req, res, next) => {
  Business.find({ _id: req.params.id }).then( business => {
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

router.get('/fetchByOwner/:id', (req, res, next) => {
  Business.find({ businessOwner: req.params.id }).then( businesses => {
    res.status(200).json({
      message: businesses.length.toString() + " businesses fetched!",
      businesses: businesses
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

function getBusinesses(item) {
  item.forEach(x => {
    Business.find({building: x._id}).then(re => {
      console.log(re);
    })
  })
}

router.get('/fetchByPersonnelGuarding/:id', (req, res, next) => {

  Building.find({personnel: req.params.id}).then(building => {
    const businesses =[];
    building.forEach(x => {
      Business.find({building: x._id}).then(re => {
        businesses.push(re);
      })
        .then( () => {
          res.status(200).json({
            message: businesses.length.toString() + " businesses fetched!",
            businesses: [...businesses]
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
  });



router.get('/fetchByBuilding/:id', (req, res, next) => {
  Business.find({ building: req.params.id }).then( businesses => {
    res.status(200).json({
      message: businesses.length.toString() + " businesses fetched!",
      businesses: businesses
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/edit/:id",(req, res, next) => {
  const business =({
    name: req.body.name,
    description: req.body.description,
    floorNo: req.body.floorNo,
  });
  Business.updateOne({ _id: req.params.id },business)
    .then(result => {
      res.status(201).json({
        message: "Business successfully updated.",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    })});


router.delete("/delete/:id", (req, res, next) => {
  Business.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Business deleted!" });
  });
});


module.exports = router;
