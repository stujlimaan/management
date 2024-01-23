const express = require('express');
const Product = require('../controllers/ProductController');
const router = express.Router();

router.post('/create', Product.createProduct);
router.get('/', Product.getAllProducts);
router.put('/:id', Product.updateProduct);
router.delete('/:id', Product.deleteProduct);

module.exports = router;
