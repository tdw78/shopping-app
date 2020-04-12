const Item = require("../models/Item");

module.exports = {

  getItems (req, res) {
    Item.find({userId: req.params.id})
     .then((items) => {
       res.json(items)
    });
  },

  createItem (req, res) {
    const {name, quantity} = req.body;

    if(!name){
      return res.status(400).json({msg: "Pleaae include a name"})
  } 

  if(quantity < 1){
    return res.status(400).json({msg: "Please enter a quantity of 1 or more"})
  }
   
    const newItem = new Item({
      name: req.body.name,
      quantity: req.body.quantity,
      userId: req.body.userId
    });
    newItem.save()
     .then((item) => {
       res.json(item)
    })
     .catch((err) => {
       console.log(err)
    })
  },

  removeItem (req, res) {
    Item.findById(req.params.id)
     .then((item) => {
       if(!item){
         console.log("No Item")
      }
      item.remove()
       .then(() => {
         res.json("Item removed")
       })
     })
       .catch((error) => {
         console.log(error)
    })
  },

  getItem (req, res) {
    Item.findById(req.params.id)
     .then((item) => {
       res.json(item)
    })
     .catch((error) => {
       console.log(error)
    })
  },

  updateItem (req, res) {
    const newItem = {
      name: updatedItem.name,
      quantity: updatedItem.quantity,
      userId: updatedItem.userId,
      status: updatedItem.status
    };

    Item.findOne({_id: updatedItem._id})
     .then(item => {
       item.updateOne(newItem)
        .then((item) => {
          io.emit('updated item', item)
     })
    })
     .catch((err) => {
       console.log(err)
  })
},

removeAll (req, res) {
  Item.find({userId: req.params.id})
    .then((items) => {
      items.forEach((item) => {
        item.remove()
        res.json("Items cleared")
      })
       .then(() => {
         res.json("Items cleared")
      })
       .catch((err) => {
         console.log(err)
       })
     })
     .catch((err) => {
       console.log(err)
    })
  },

}