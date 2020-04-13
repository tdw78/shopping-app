// const User = require("../../models/User");
// const Item = require("../../models/Item");
// const expect = require('chai');

// describe("Item", () => {
//   describe("#create()", () => {
 
//     it("should create a new item", (done) => {

//        const user = {
//          name: "Jonny",
//          email: "jonny@mail.com",
//          password: 'golfer'
//        }
//         User.create(user)
//         const item = {
//           name: "Cereal",
//           quantity: 1,
//           userId: user.id
//         }

//       Item.create(item, (err, item) => {
//         expect(err).to.be.null;
//         expect(item).to.be.an("object");
//         expect(item.name).to.equal('Cereal');
//       })
//       done();
//       });

//       it("should not create a new item that does not meet validation requiremetns", (done) => {

//         const user = {
//           name: "Jonny",
//           email: "jonny@mail.com",
//           password: 'golfer'
//         }
//          User.create(user)
//          const item = {
           
//            quantity: 1,
//            userId: user.id
//          }
 
//        Item.create(item)
//        .then(item => {

//        })
//         .catch((err) => {
//            expect(err).to.be.null;
           
        
//        })
//        done();
//       })

//   });
// });



const User = require("../../models/User");
const Item = require("../../models/Item");
const assert = require('chai');

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
          name: "Cereal",
          quantity: 1,
          userId: user.id
        }

      Item.create(item, (err, item) => {
        assert.isNull(err);
        assert.isObject(item);
        assert.isDefined(item.name)
      })
      done();
      });

      it("should not create a new item that does not meet validation requiremetns", (done) => {

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