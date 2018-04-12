const Tb_User = require('../models').Tb_User;
const jwt = require('jwt-simple');
function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp },config.secret);
}
module.exports = {
  signup(req,res,next){
    res.send({token:tokenForUser(req.user)});
  },
  create(data,done) {
    
  },
  guid(){
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
};