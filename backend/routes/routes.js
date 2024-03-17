var express = require('express');

var nonManagerialEmployeeController = require('../src/nonManagerialEmployee/nonManagerialEmployeeController');
const router = express.Router();

router.route('/login').post(nonManagerialEmployeeController.loginUserControllerFn);
router.route('/create').post(nonManagerialEmployeeController.createnonManagerialEmployeeControllerFn);


module.exports = router;