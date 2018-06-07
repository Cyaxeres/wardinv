//load the things we need
import mongoose from 'mongoose';


//define the schema for our item model
const productSchema = mongoose.Schema({
  name: String, //Example: War Pike
  unit: String, //Example: pack
  unitq: Number, //Example: 50 (in a pack)
  uprice: Number, //$450 per pack
  quantity: Number, //Example: How many packs?
  type: String, //Example: medical, general supplies
  expdate: {
    type: Date
  }, //--optional--
  reorder: Number // Example: Trigger alert when there are only two packs left
});

//create the model for users and expose it to our app
module.exports = mongoose.model('Product', productSchema);
