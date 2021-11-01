var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const db = require('../database');

router.get('/users', db.getUsers);
router.get('/users/:id', db.getUserById);
router.post('/users', db.createUser);
router.put('/users/:id', db.updateUser)
router.delete('/users/:id', db.deleteUser);
router.get('/transactions', db.getTransactions)
router.post('/transactions', db.createTransactions);
router.post('/categories', db.createCategories);


module.exports = router;
