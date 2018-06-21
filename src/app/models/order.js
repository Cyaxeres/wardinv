//load the things we need
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


//define the schema for our order model
const orderSchema = Schema({
  user: {type: Schema.ObjectId, ref: 'Users', required: true},
  cart: {type: Object, required: true},
  // pickup_emp: {type: Schema.Types.ObjectID, ref: 'User'}, //TODO: Possible independent model
  // patient: {type: Schema.Types.ObjectID, ref: 'User'} //TODO: Possible independent model [ARRAY OF DOCKET NUMBERS]
  patient: {type: String, required: true} 
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

//create the model for users and expose it to our app
module.exports = mongoose.model('Order', orderSchema);
