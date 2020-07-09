const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const visitSchema = new mongoose.Schema({
    admittingPersonnel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
    businessVisiting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    itemsCarried: [{
      type: String,
      required: false
    }],
    timeIn: {
      type: Date,
      required: true,
      default: Date.now
    },
    checkedOut: {
      type: Boolean,
      default: false,
    },
    timeOut: {
      type: Date,
      required: false,
    }}
  ,{timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

visitSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Visit',visitSchema);
