const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

module.exports = {

  signup (req, res) {
    const {name, email, password, passwordConfirmation} = req.body;

    if(!name || !email || !password || !passwordConfirmation){
      return res.status(400).json({msg: "Pleaae fill in all of the fields"})
  } 

   User.findOne({email})
     .then(user => {
       if(user){
         return res.status(400).json({msg: "An account has already been created with that email"})
      }
       if (password === passwordConfirmation) {
         const newUser = new User({
           name: name,
           email: email,
           password: password,
           passwordConfirmation: passwordConfirmation
      });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash
            newUser.save()
            .then(user => {
              const token = jwt.sign(
                { id: user._id }, 
                  process.env.JWT_SECRET, 
                  { expiresIn: '14d' },
                  (err, token) => {
                    if(err) throw err;
                    res.json({
                      token,
                      user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                  })
                }  
              ); 
            })
          })
        })
      } else {
        return res.status(400).json({msg: "Password and Password Confirmation must match"})
      }
    });
  },

signin (req, res) {
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json({msg: "Please fill in all of the fields"})
  }
   
   User.findOne({email})
     .then(user => {
       if(!user) return res.status(400).json({msg: "Unable to find an account associated with that email"})

       bcrypt.compare(password, user.password)
       .then(isMatch => {
         if(!isMatch) {
           return res.status(400).json({msg: "The password does not match our records"})
         }
         const {_id, name, email, role} = user
         const token = jwt.sign(
           { id: user._id }, 
             process.env.JWT_SECRET, 
             {expiresIn: '14d'},
             (err, token) => {
               if(err) throw err;
               res.json({
                 token,
                 user: { 
                   id: user.id, 
                   name: user.name, 
                   email: user.email 
              }
            })
          }  
        );
      })      
    });
  },
  getUser (req, res) {
    User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
  }
}