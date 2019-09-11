/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */
var listingSchema = new Schema({
  code : {type: String, required: true, unique: true}, // All buildings must have unique codes
  name : {type: String, required: true}, // Im assuming they could share a common name
  coordinates : {
    latitude : Number,
    longitude: Number
  },
  address : String,
  updated_at : Date,
  created_at : Date

});

/* Create a 'pre' function that adds the updated_at (and created_at if not already there) property 
   See https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/
listingSchema.pre('save', function(next) {
  var updatedDate = new Date(); // Pulls the current date
  this.updated_at = updatedDate;

  if(!this.created_at) // If created at is not defined then it was created in this instance
    this.created_at = updatedDate;

  next();
});

/* Use your schema to instantiate a Mongoose model */
//Check out - https://mongoosejs.com/docs/guide.html#models
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
