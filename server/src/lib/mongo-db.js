const mongoose = require('mongoose');

/**
 * Set varaiable
 */
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

export const connect = (uri) => {
  return new Promise(function(resolve,reject){
    mongoose.connect(uri);
    // If there is a connection error send an error message
    mongoose.connection.on("error", (error) => {
      reject(error);
    });
    // If connected to MongoDB send a success message
    mongoose.connection.once("open", (res) => {
      console.log(res);
      resolve("Connected to Database");
    });
  })
}

export const disconnect = () => {
  mongoose.disconnect();
}

