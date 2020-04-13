// const assert = require('chai');
// const User = require('../../models/User');

// describe("USER /", () => {
//   it('should create a user', (done) => {
//          const user = {
//            name: "tim",
//            email: 'tim@mail.com',
//            password: '123abc'
//          }
//          User.create(user, (err, user) => {
//            assert.isNull(err);
//            assert.isObject(user);
//            assert.isDefined(user.name)
           
//          })
//          done();
//         })

// })


// const expect = require('chai');
// const User = require('../../models/User');

// describe("USER /", () => {
//   it('should create a user', (done) => {
//          const user = {
//            name: "tim",
//            email: 'tim@mail.com',
//            password: '123abc'
//          }
//          User.create(user, (err, user) => {
//            expect(err).to.be.null;
//            expect(user).to.be.an("object");
//            expect(user.name).to.equal('tim')
           
//          })
//          done();
//         })

// })




const User = require("../../models/User");
const expect = require('chai');

describe("User", () => {
 

  describe("#create()", () => {
    it("should create a new user", (done) => {
      const user = {
        name: "Mickey",
        email: "mantle@yankees.com",
        password: 'worldseries'
      };
      User.create(user, () => {
        expect(err).to.be.null;
        expect(user).to.be.an("object");
        expect(user.name).to.equal('Mickey')
      })
      done();
      })
   
  
    it("should not create a new user with invalid password", (done) => {
      const user = {
        name: "Mickey",
        email: "mantle@yankees.com",
        password: '11'
      };
      User.create(user, (err, user) => {
         expect(err).to.not.be.null;
         expect(user.name).to.not.exist;
      })
      
      done();
    });
    
    it("should not create a new user with email already used", (done) => {
      const user = {
        name: "Mickey",
        email: "mantle@yankees.com",
        password: 'worldseries'
      };
      User.create(user)

      const user2 = {
        name: "Jonny",
        email: "mantle@yankees.com",
        password: "abc1234"
      }
      User.create(user2, (err, user) => {
        expect(err).not.to.be.null;
        expect(user.name).not.to.exist;
        expect(user).not.to.be.an(object)
      })
       done();
    });
  });
});
