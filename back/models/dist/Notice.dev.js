"use strict";

var mongoose = require('mongoose');

var now = new Date();
var noticeSchema = mongoose.Schema({
  email: {
    type: String,
    maxlength: 50
  },
  image: {
    type: String,
    maxlength: 100
  },
  text: {
    type: String,
    maxlength: 500
  },
  title: {
    type: String,
    maxlength: 100
  },
  Date: {
    type: String,
    maxlength: 50
  }
});
var Notice = mongoose.model('Notice', noticeSchema);
module.exports = {
  Notice: Notice
};