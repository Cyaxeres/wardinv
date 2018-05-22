# Cabinet Management Documentation

Today I'm gonna teach you how to use Express MVC Architecture. The flow looks like this:

```sh
______ MVC FLOW ____________
Model --> Controller --> View
View --> Controller --> Model
```

## Step 1: Making a Model

You can make a model file under the models folder like:

```javascript
app/
|-- models/
    |-- [karen_was_my_model_but_she_left_me].js
```

After this, you can link to mongoose, define your schema and export it. See `models/item.js` for reference.

## Step 2: Model Meet Controller

Great! So now you have a model. **BIG DEAL.** But how do we get it into the app?

Well, thats what controllers are for __*Captain Smartypants*__. [ +10 Humor ]

We need to make a file in the.. wait for it... __`controllers/`__ folder. Who would have guessed?

```javascript
app/
|-- controllers/
    |-- [karen_please_come_home].js
```

Now in this file we have to link to that model we made before since the model and controller need to be on speaking terms before the views come over and show off. An example is in `app/controllers/items.js` but I'm learning Markdown so read the following code block, *puppet*.

```javascript
//File: app/controllers/items.js
//------------------------------
//adopt a pet model called 'item' from models shelter and call him...'Item'
var Items = require('../models/item');
//your pet model won't replace Karen :(
```

Congratulations on your model talking to your controller. woop. [applause]

The controller has functions that are used to define what happens when you get data from the database or from the view. The functions are often exported requests functions so they look like:

```javascript
//File: app/controllers/items.js
//------------------------------
exports.functionName = function(req, res){
    //whatever bro
}
```

**You can check out `app/controllers/items.js` for the rest of the file. I'm not here to be your maid.**

## Step 3: Rethinking Why I Made This Doc

Ugh. So now on to routing. Luckily, the routes are in one single folder, `config/routes.js`. That means it's **hard** to mess it up. Even *you*.

But here we have something familiar. Say, remember that time we imported the model into the controller and it didn't fill the gap that Karen left in our hearts? Well, here is where we adopt controllers into our file instead.

```javascript
//File: config/routes.js
//------------------------------
var home = require('../app/controllers/home');
var item = require('../app/controllers/items');
```

Then you can assign routes to functions in the appropriate controller. So like in the items controller you have a `showItems` function that looks like:

```javascript
//File: controllers/item.js
//------------------------------
exports.showItems = function(req, res){
    //Find items and send them to view
    Items.find({}, function(err, items){
        if(err){
            console.log(err);
        }else{
            res.render('../views/item/test', {products: items});
        }
    });
}
```

To get this function to work and pass the data to the view, in the routes we do something extremely complex:

```javascript
//File: config/routes.js
//------------------------------
app.get('/items', item.showItems);
```

So that when we go to `localhost:8042/items`, the `showItems` function will run, and `../views/item/test` (see `showItems` function) will be rendered.

## Step 4: Is That Karen I See

No. That's just the web page. Why is this Step 4?

*Anyway*, just make a view file (`views/[yourfile].ejs`) and call it in your controller when you want to render something, like in the `showItems` function:

```javascript
//File: controllers/item.js
//------------------------------
// exports.showItems = function(req, res){
//     //Find items and send them to view
//     Items.find({}, function(err, items){
//         if(err){
//             console.log(err);
//         }else{

         //render test.ejs and pass the products in.
            res.render('../views/item/test', {products: items});
//         }
//     });
// }
```

## Confession-clusion

I had way too much fun writing this. Hope it helped, puppet.
