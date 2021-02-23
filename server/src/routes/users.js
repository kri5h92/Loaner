const express = require('express');
const router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find()
    .then((users)=>{
      res.json(users);
    })
    .catch((err)=>{
      console.error(err);
      res.status(404).json({msg: 'No users found'})
    })
});

module.exports = router;
