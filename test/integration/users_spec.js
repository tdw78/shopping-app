const server = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/test_database";
const expect = require('chai');

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB CONNECTION ERROR: ", err))


describe("routes : users", () => {
  
  before(() => {
    server.listen(3001)
  });

  after((done) => {
    mongoose.connection.close();
    
  });

  describe("POST /signup", () => {

    const options = {
      url:"http://localhost:5000/api/users/signup" ,
      user: {
        name: "Ethan",
        email: "user@example.com",
        password: "123456789"
      }
    }

    it("should signup new user", (done) => {
      request(server).post(options).expect(200);
      done();
    })   
    
    it("should not signup new user with invaid inputs", (done) => {
      const options = {
        url:"http://localhost:5000/api/users/signup" ,
        user: {
          name: "Ethan",
          email: "ethan",
          password: "123456789"
        }
      }
      request(server).post(options).
         expect(err).to.not.be.null;
         done();
    })  
    
  })

})


// const mongoose = require("mongoose");
// const mongoDB = "mongodb://localhost:27017/test_database";
// mongoose.connect(mongoDB)
// const User = require('../../models/User');

// describe("User", () => {

//   // beforeAll(async () => {
//   //   await User.remove({});
//   // })

//   // afterEach(async () => {
//   //   await User.remove({});
//   // })

//   // afterAll(async () => {
//   //   await mongoose.connect.close();
//   // })

//   describe("save a new user", () => {
//     it("saves a user", async () => {
//       const user = new User({
//         name: "Ethan",
//         email: "ethan@mail.com",
//         password: "1234abc"
//       })

//      const savedUser = await user.save();
//      const expected = "Ethan";
//      const actual = savedUser.name;
//      expected(actual).toEqual(expected);

//     })
//   })

// })