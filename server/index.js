var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var constring = 'postgres://postgres:password@localhost/fronttoback'

var app = module.exports = express();
var massiveInstance = massive.connectSync({
  connectionString: constring
});
app.set('db', massiveInstance);
var db = app.get('db');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../public'));

// GET ENDPOINTS
app.get('/products', function(req, res, next) {
  db.get_all_products(function(err, products) {
    res.status(200).json(products);
  });
});

app.get('/products/:id', function(req, res, next) {
  db.get_product_by_name(req.params.name, function(err, product) {
    res.status(200).send(product);
  })
});
// POST ENDPOINTS
app.post('/products', function(req, res, next) {

});
// PUT ENDPOINTS
app.put('/products/:id', function(req, res, next) {

})
// DELETE ENDPOINTS
app.delete('/products/:id', function(req, res, next) {

})

app.listen(3000, function() {
  console.log('whatever');
});
