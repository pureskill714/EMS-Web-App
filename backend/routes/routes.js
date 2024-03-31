var express = require('express');

var nonManagerialEmployeeController = require('../src/nonManagerialEmployee/nonManagerialEmployeeController');
var roomBookingController = require('../src/roomBooking/roomBookingController');


const router = express.Router();

router.route('/login').post(nonManagerialEmployeeController.loginUserControllerFn);
router.route('/create').post(nonManagerialEmployeeController.createnonManagerialEmployeeControllerFn);

router.route('/booking').post(roomBookingController.createRoomBookingControllerFn);


module.exports = router;