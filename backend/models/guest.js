const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const guestSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: false
    },
    qrCode: {
      type: String,
      required: false
    },
    id: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true
    }}
  ,{timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

guestSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Guest',guestSchema);
