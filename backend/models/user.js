const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: false
    },
    id: {
      type: Number,
      required: true,
      unique: true
    },
    phoneNumber: {
      type: Number,
      required: false
    },
    qrCode: {
      type: String,
      required: false
    },
    roles: [{
      type: String,
      required: true
    }]}
  ,{timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);
