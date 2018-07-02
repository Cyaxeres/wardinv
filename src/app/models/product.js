//load the things we need
import mongoose from 'mongoose';
import shortid from 'shortid';

//define the schema for our item model
const productSchema = mongoose.Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  name: {
    type: String,
    required: true
  }, //Example: War Pike
  unit: {
    type: String,
    required: true
  }, //Example: pack
  unitq: {
    type: Number,
    required: true
  }, //Example: 50 (in a pack)
  uprice: {
    type: Number,
    required: true
  }, //$450 per pack
  quantity: {
    type: Number,
    required: true
  }, //Example: How many packs?
  type: {
    type: String,
    required: true
  }, //Example: medical, general supplies
  expdate: {
    //--optional--
    type: Date
  },
  reorder: {
    type: Number,
    required: true
  } // Example: Trigger alert when there are only two packs left
});

//create the model for users and expose it to our app
module.exports = mongoose.model('Product', productSchema);
