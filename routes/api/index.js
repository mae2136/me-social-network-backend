const router = require('express').Router();
// Create Users and Thoughts routes
const userRoutes = require('./userRoutes.js');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;