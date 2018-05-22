const Items = require('../models/item');

exports.showItems = (req, res) => {
    // Items.create({
    //     name: 'Water Bottle',
    //     quantity: 236,
    //     type: 'general',
    //     expdate: new Date("2018-05-27"),
    //     reorder: 3,
    //     uprice: 200.00
    // }, (err, item) => {
    //     if(err){
    //         console.log('err');
    //     } else {
    //         console.log('new item is:' + item);
    //     }
    // });

    //Find items and send them to view
    Items.find({}, function(err, items){
        if(err){
            console.log(err);
        }else{
            res.render('test', 
            {
                products: items
            });
        }
    });
}