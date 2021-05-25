const { Router } = require('express');
const { getGastosResume } = require('../controllers/dasboard');
const router = Router();
router.get(
    '/gastoResume', 
    
    getGastosResume
);

module.exports = router;