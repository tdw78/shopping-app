// const server = require("../../app");
// const request = require("supertest");
// const mongoose = require("mongoose");
// const mongoDB = "mongodb://localhost:27017/test_database";
// const expect = require('chai');

// mongoose.connect(mongoDB, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })
// .then(() => console.log("DB connected"))
// .catch((err) => console.log("DB CONNECTION ERROR: ", err))


// describe("routes : users", () => {
  
//   before(() => {
//     server.listen(3001)
//   });

//   after((done) => {
//     mongoose.connection.close();
//     done();
//   });

//   describe("POST /signup", () => {

//     const options = {
//       url:"http://localhost:5000/api/users/signup" ,
//       user: {
//         name: "Ethan",
//         email: "user@example.com",
//         password: "123456789"
//       }
//     }

//     it("should signup new user", (done) => {
//       request(server).post(options).expect(200);
//       done();
//     })   
    
//     // it("should not signup new user with invaid inputs", (done) => {
//     //   const options = {
//     //     url:"http://localhost:5000/api/users/signup" ,
//     //     user: {
//     //       name: "Ethan",
//     //       email: "ethan",
//     //       password: "123456789"
//     //     }
//     //   }
//     //   request(server).post(options).
//     //      expect(err).to.not.be.null;
//     //      done();
//     // })  
    
//   })

// })


const server = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/test_database";
const User = require("../../models/User");

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

  describe("POST /signup", () => {

    const options = {
      url:"http://localhost:5000/api/users/signup",
      user: {
        name: "Jerry",
        email: "jerry@mail.com",
        password: "1234abc"
      }
    }

    it("should sign up a new user", (done) => {
      request(server).post(options).expect(200);
      done();
    })                                     
  })
  
  it("should not create a new user with invalid password", (done) => {
    
    const options = {
      url:"http://localhost:5000/api/users/signup",
      user: {
        name: "Jerry",
        email: "jerry",
        password: "1234abc"
      }
    }
    request(server).post(options).expect(400);
      done();
  });

  
})