const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Variable to be sent to Frontend with Database status
let databaseConnectionMsg = {
  connecting: '"Waiting for Database response...',
  connected: 'Database server connected successfully...',
  disconnected: 'Database server is down...',
  disconnecting: 'Database server is shutting down...',
};

router.get("/", function (req, res, next) {

  if(mongoose.STATES.connected){
    res.send(databaseConnectionMsg.connected);
  }else if(mongoose.STATES.connecting){
    res.send(databaseConnectionMsg.connecting);
  }else if(mongoose.STATES.disconnecting){
    res.send(databaseConnectionMsg.disconnecting);
  }else if(monogoose.STATES.uninitialized || mongoose.STATES.disconnected){
    res.send(databaseConnectionMsg.disconnected);
  }

});

module.exports = router;
