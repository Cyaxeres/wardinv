//load the things we need
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


//define the schema for our order model
const orderSchema = Schema({
  items: [{type: Schema.Types.ObjectId, ref:'Item'}],
  total: Number,
  active: Boolean,
  pickup_emp: String, //TODO: Possible independent model
  patient: String //TODO: Possible independent model [ARRAY OF DOCKET NUMBERS]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

//create the model for users and expose it to our app
module.exports = mongoose.model('Order', orderSchema);
