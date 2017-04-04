var Product = require('../app/models/product') ;
var router  = require('express').Router() ;

router.post('/', function(req, res, nxt) {
  if(req.session.hello === true || req.session.hello === undefined) {
    req.session.hello = false ;
  }

  var searchTerm = req.body.searchTerm.toLowerCase() ;
  console.log('searching') ;
  console.log(searchTerm) ;
  var checkInput = "^[A-Za-z0-9]*$" ;

  if(searchTerm.search(/checkInput/i) === -1) {
    req.session.hello = true ;
    res.redirect('../') ;
  }

  else {
    Product.find().exec(function(err, products) {
      if(err) {
        return nxt(err) ;
      }
      else {
        // var allProds = products ;
        var prods = [] ;
        for(var i = 0 ; i < products.length ; i++) {
          if(products[i].name.toLowerCase().match(searchTerm)) {
            prods.push(products[i]) ;
          }
        }
        console.log(prods) ;
        req.session.searchRes = prods ;
        res.redirect('../results') ;
      }
    }) ;
  }
}) ;

module.exports = router ;
