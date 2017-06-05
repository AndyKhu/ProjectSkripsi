const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp },config.secret);
}
exports.signin = function(req,res,next){
  res.send({token:tokenForUser(req.user)});
}
exports.signup = function(req, res, next){
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if(!username || !email || !password){
    return res.status(422).send({error : 'You must provide username , email and password '});
  }
  User.findOne({username: username},function(err,existingUser){
    if(err){ return next(err); }

    if(existingUser){
      return res.status(422).send({error : 'Username is in use'});
    }
    User.findOne({email: email},function(err,existingEmail){
      if(err){return next(err);}

      if(existingEmail){
        return res.status(422).send({error: 'Email is in use'});
      }

      const user = new User({
        username: username,
        email: email,
        password: password
      });

      user.save(function(err){
        if(err){return next(err);}

        res.json({toke: tokenForUser(user)});
      });
    });
  });
}
