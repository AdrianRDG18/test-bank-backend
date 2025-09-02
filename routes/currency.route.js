/**
 * Route: /api/currency
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getCurrencies, createCurrency, updateCurrency, getTotalAmount } = require('../controllers/currency.controller');
const { fieldsValidator } = require('../middlewares/fields-validator');

const router = Router();

router.post('/', [
    check('type', 'The type is required').not().isEmpty(),
    check('quantity', 'The quantity is required').not().isEmpty(),
    check('denomination', 'The denomination is required').not().isEmpty(),
    fieldsValidator
], createCurrency);

router.get('/', [], getCurrencies);

router.put('/:id', [
    check('id', 'The id must be a valid id').isMongoId(),
    fieldsValidator
], updateCurrency);

router.get('/get-total', [], getTotalAmount);

module.exports = router;