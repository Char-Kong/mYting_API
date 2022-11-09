const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

router.get('/', ctrl.index);
router.post('/', ctrl.login);
router.get('/login', ctrl.login);
router.post('/login', ctrl.login);

module.exports = router;