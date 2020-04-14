const server = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/test_database";
const Item = require("../../models/Item");

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB CONNECTION ERROR: ", err))

describe("routes : items", () => {

  before(() => {
    server.listen(3001)
  });

  after((done) => {
    mongoose.connection.close();
    done();
  })

  describe("POST /items", () => {

    const options = {
      url:"http://localhost:5000/api/items",
      item: {
        name: "Pizza",
        quantity: 1,
        userId: 11
      }
    }

    it("should create a new item", (done) => {
      request(server).post(options).expect(200);
      done();
    })                                     
  })
  
  describe("GET /items/:id", () => {

    const item = new Item({
       name: "Chips",
       quantity: 2,
       userId: 12
     })
  
    const url = `http://localhost:5000/api/items/${item._id}`

    it('should return the item matching the id', (done) => {
      request(server).get(url).expect(200)
      done();
    })
  })

  describe("DELETE /api/items/:id", () => {

     const item = new Item ({
       name: "Chips",
       quantity: 2,
       userId: 14,
       status: "Not in cart"
     })
     
     const url = `http://localhost:5000/api/items/${item._id}`

     it('should delete the item matching the id', (done) => {
       request(server).delete(url).expect(200)
       done();
    })
  })

  describe("POST /api/items/update/:id", () => {

     const item = new Item({
       name: "Chips",
       quantity: 2,
       userId: 19,
       status: "Not in cart"
     })
  
    const url = `http://localhost:5000/api/items/update/${item.id}`
    
    it('should update the item matching the id', (done) => {
      request(server).post(url).expect(200)
      done();
    })
  })
})