const User = require('../models/User');
const bcrypt = require('bcrypt');


const _getHashedPassword = async(password) => {
  try{
    const saltRound = 10;
    return await bcrypt.hash(password,saltRound);
  }catch(err){
    console.error('Error hashing the password',err);
  }
}

exports.getUsers = async (req,res) => {
  let result = {};
  let status = 201;

  try{
    const users = [...await User.find({})];

    result.result = users;
    result.status = status;
    res.status(status).send(result);
  }catch(err){
    console.error(err);

    status = 500;
    result.status = status;
    result.error = err;
    res.status(status).send(result);
  }
}
/**
 *  GET /login
 *  login using email and password
 */
exports.getLogin = async (req,res) => {
  let result = {};
  let status = 201;

  const {email,password} = req.body;

  User.findOne({email},async (err,user) => {
    if(!err){
      if(user){
        try{
          const match = await bcrypt.compare(password,user.password);
          if(match){
            result.result = user;
            result.status = status;
            res.status(status).send(result);
          }else{
            status = 401;
            result.status = status;
            result.error = 'Authentication error';
            res.status(status).send(result);
          }
        }catch(err){
          console.error('bcrypt compare password error',err);
          status = 500;
          result.status = status;
          result.error = err;
          res.status(status).send(result);
        }
      }else{
        status = 404;
        result.status = status;
        result.error = 'User not found';
        res.status(status).send(result);
      }
    }else{
      console.error(err);
      status = 500;
      result.status = status;
      result.error = err;
      res.status(status).send(result);
    }
  });
}

/**
 *  POST /signup
 *  Create a new user account
 */
exports.postSignup = async(req,res) => {
    let result = {};
    let status = 201;

    let {firstName,lastName,password,email} = req.body;
    password = await _getHashedPassword(password);

    const user  = new User({firstName,lastName,email,password});
    user.save((err,user)=>{
      if(!err){
        result.status = status;
        result.result = user;
      }else{
        status = 500;
        result.status = status;
        result.error = err;
      }
      res.status(status).send(result);
    })
}
