const server = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/test_database";
const Item = require("../../models/Item");
const User = require("../../models/User");

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB CONNECTION ERROR: ", err))


describe("routes : items", () => {
  
  beforeEach(() => {
    server.listen(3001)
  });

  afterEach((done) => {
    mongoose.connection.close();
    
  });

  describe("POST /items", () => {

    const options = {
      url:"http://localhost:5000/api/items" ,
      item: {
        name: "Pizza",
        quantity: 1,
        userId: 44
      }
    }

    it("should create a new item", (done) => {
      request(server).post(options).expect(200);
      done();
    })                                     
  })
  
  describe("GET /items/:id", () => {


   const user = new User({
      name: "John",
      email: "john@mail.com",
      password: "12345678"
   })
     user.save()

    const item = new Item({
       name: "Chips",
       quantity: 2,
       userId: user.id,
       status: "Not in cart"

     })
  
    
  
 
    const url = `http://localhost:5000/api/items/${item._id}`

    it('should return the item matching the id', (done) => {
      request(server).get(url).expect(200)
    })
  })

  describe("DELETE /api/items/:id", () => {

   const user =  new User({
      name: "Bob",
      email: "bob@mail.com",
      password: "12345678"
   })
     user.save()

     const item = new Item ({
       name: "Chips",
       quantity: 2,
       userId: user.id,
       status: "Not in cart"
     })
     
    
    const url = `http://localhost:5000/api/items/${item._id}`

    it('should return the item matching the id', (done) => {
      request(server).delete(url).expect(200)
    })
  })

  // describe("POST /api/items/update:id", () => {
  //   this.user;
  //   this.item;

  //   User.create({
  //     name: "Bob",
  //     email: "bob@mail.com",
  //     password: "12345678"
  //  })
  //  .then((user) => {
  //    this.user = user

  //    Item.create({
  //      name: "Chips",
  //      quantity: 2,
  //      userId: this.user.id,
  //      status: "Not in cart"

  //    })
  //    .then((item) => {
  //      this.item = item
  //    })
  //    .catch((err) => {
  //      console.log(err)
  //    })
  //  })
  //  .catch((err) => {
  //    console.log(err)
  //  })
  //   const url = `http://localhost:5000/api/items/update/${this.item.id}`
    
  //   it('should return the item matching the id', (done) => {
  //     request(server).post(url).expect(200)
  //   })
  // })

  // describe("POST /api/items/update:id", () => {

  //   const item = {
  //         id: 1,
  //        name: "Pizza",
  //        quantity: 1,
  //        userId: 44
  //   }
      
  //   const url = `http://localhost:5000/api/items/update/${item.id}`
    
  //   it('should return the item matching the id', (done) => {
  //     request(server).post(url).expect(200)
  //   })
  // })

})
