const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();
const upload = multer({ dest: 'src/uploads/' });

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', auth, upload.array('images', 4), createProduct);
router.put('/:id', auth, upload.array('images', 4), updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
