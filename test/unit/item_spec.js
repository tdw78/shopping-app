const User = require("../../models/User");
const Item = require("../../models/Item");
const assert = require('chai').assert;

describe("Item", () => {
  describe("#create()", () => {
    it("should create a new item", (done) => {

      const user = {
        name: "Jonny",
        email: "jonny@mail.com",
        password: 'golfer'
      }
       User.create(user)
       const item = {
         name: "Bread",
         quantity: 1,
         userId: user.id
       }

     Item.create(item)
       .then(item => {
         assert.typeOf(item, 'object')
     })
       .catch((err) => { 
        console.log(err)
     })
     done();
    })
        
    it("should not create an item that does not meet validation requiremetns", (done) => {

        const user = {
          name: "Jonny",
          email: "jonny@mail.com",
          password: 'golfer'
        }
         User.create(user)
         const item = {
           
           quantity: 1,
           userId: user.id
         }
 
       Item.create(item)
       .then(item => {

       })
        .catch((err) => {
           assert.isNotNull(err, "Please fill in all fields");   
       })
       done();
      })
  });
});