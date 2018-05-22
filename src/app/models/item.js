//load the things we need
var mongoose = require('mongoose');


//define the schema for our item model
var itemSchema = mongoose.Schema({	
	name: String,
    quantity: Number,
    type: String,
    expdate: {type: Date},
    reorder: Number,
    uprice: Number
});

//create the model for users and expose it to our app
module.exports = mongoose.model('Item', itemSchema);