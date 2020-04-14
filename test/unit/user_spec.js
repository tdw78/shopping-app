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
