const express = require('express');
const router = express.Router();

const controllers = require('../controllers/order');

router.post('/', controllers.create);
router.patch('/:orderId', controllers.update);
router.delete('/:orderId', controllers.delete);
router.get('/:orderId', controllers.get);
router.post('/recreate', controllers.recreate);

module.exports = router;
