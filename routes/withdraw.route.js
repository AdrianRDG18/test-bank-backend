/**
 * Route: /api/withdraw
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { makeWithdraw } = require('../controllers/withdraw.controller');

const router = Router();

router.post('/', [
    check('amount', 'The amount is required').not().isEmpty(),
    fieldsValidator
], makeWithdraw);

module.exports = router;