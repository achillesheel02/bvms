const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const ShortId = require('mongoose-shortid-nodeps');

function customIdGenerator(options, callback) {

  // do Id generation
  var generatedId ;

  if (generatedId) {
    callback(null, generatedId);
  } else {
    callback(err);
  }
}



const buildingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    buildingOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: false
    },
    geoLocation: {
      longitude: Number,
      latitude: Number,
    },
    floors: {
      type: Number,
      required: true
    },
    buildingId: {
      type: ShortId,
      len: 5,
      index: true,
      alphabet: 'abcdefghijklmnopqrstuvwxyz0123456789'
    }}
  ,{timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

buildingSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Building',buildingSchema);
