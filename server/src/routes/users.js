const express = require('express');
const router = express.Router();
const Usercontroller = require('../controllers/user.controller');
const auth = require('../middleware/auth');

// router.get('/', auth, Usercontroller.getUser);
router.get('/get_all', Usercontroller.getAllUser);
router.get('/', Usercontroller.getUserId);
router.post('/', Usercontroller.createUser);
router.post('/signin', Usercontroller.loginUser);
router.delete('/', Usercontroller.DelUser);



module.exports = router;
