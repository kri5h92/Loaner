const mongoose = require('mongoose');

/**
 * Set mongoose default options
 */
const defMongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

export const connect = (uri, mongooseOptions = {}) => {
  return new Promise(function(resolve,reject){
    mongooseOptions = Object.assign({}, defMongooseOptions, mongooseOptions);
    mongoose.connect(uri,mongooseOptions);

    //db reference
    const db = mongoose.connection;

    db.then((response) => {
      resolve(response);
    }).catch((error)=>{
      reject(error);
    });

  })
}

export const disconnect = () => {
  mongoose.disconnect();
}

