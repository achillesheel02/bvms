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



const businessSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    businessOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Building",
      required: true,
    },
    description: {
      type: String,
      required: false
    },
    floorNo: {
      type: Number,
      required: true
    },
    businessId: {
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

businessSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Business',businessSchema);
