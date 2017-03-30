var Profile        = require('../app/models/profile') ;
var router         = require('express').Router() ;

router.post('/', function(req, res, nxt) {
  Profile.findOne({email: req.body.email}, function(err, profile) {
    if(err) {
      res.send("Login failed") ;
    }
    else {
      if(profile.validPassword(req.body.password)) {
        var info = { 'email': profile.email, 'name': profile.name, 'location': profile.location} ;
        var session = req.session ;
        session.pid = 'null' ;
        console.log(session.pid) ;
        session.pid = profile._id ;
        console.log(session.pid) ;
        res.redirect("../") ;
      }
      else {
        console.log('invalid password') ;
        res.redirect("../") ;
      }
    }
  }) ;
}) ;

module.exports = router ;
