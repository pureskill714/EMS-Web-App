var express = require('express');

var nonManagerialEmployeeController = require('../src/nonManagerialEmployee/nonManagerialEmployeeController');
var roomBookingController = require('../src/roomBooking/roomBookingController');


const router = express.Router();

router.route('/login').post(nonManagerialEmployeeController.loginUserControllerFn);
router.route('/create').post(nonManagerialEmployeeController.createnonManagerialEmployeeControllerFn);

router.route('/booking').post(roomBookingController.createRoomBookingControllerFn);
router.route('/retrievebookingtimeslots').post(roomBookingController.retrieveBookingTimeslotsControllerFn);
router.route('/retrievebookinginfos').post(roomBookingController.retrieveBookingInfosControllerFn);
router.route('/retrievecalendarinfos').post(roomBookingController.retrieveCalendarInfosControllerFn);
router.route('/cancelbooking').post(roomBookingController.cancelBookingControllerFn);

module.exports = router;