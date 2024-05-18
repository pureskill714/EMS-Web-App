var express = require('express');

var nonManagerialEmployeeController = require('../src/nonManagerialEmployee/nonManagerialEmployeeController');
var roomBookingController = require('../src/roomBooking/roomBookingController');


const router = express.Router();

router.route('/login').post(nonManagerialEmployeeController.loginUserControllerFn);
router.route('/create').post(nonManagerialEmployeeController.createnonManagerialEmployeeControllerFn);
router.route('/verify-account').post(nonManagerialEmployeeController.verifyAccountControllerFn);
router.route('/resend-verification').post(nonManagerialEmployeeController.resendVerificationControllerFn);

router.get('/getemployeedetails', nonManagerialEmployeeController.getAllEmployeesControllerFn);


router.get('/getmeetingrooms', roomBookingController.getMeetingRoomsControllerFn);
router.route('/booking').post(roomBookingController.createRoomBookingControllerFn);
router.route('/retrievebookingtimeslots').post(roomBookingController.retrieveBookingTimeslotsControllerFn);
router.route('/retrievebookinginfos').post(roomBookingController.retrieveBookingInfosControllerFn);
router.route('/retrievepastbookinginfos').post(roomBookingController.retrievePastBookingInfosControllerFn);

router.route('/retrievecalendarinfos').post(roomBookingController.retrieveCalendarInfosControllerFn);
router.route('/retrievecalendardetails').post(roomBookingController.retrieveCalendarDetails);
router.route('/retrievecalendarmeetingroom1details').post(roomBookingController.retrieveCalendarMeetingRoomOneDetails);
router.route('/retrievecalendarmeetingroom2details').post(roomBookingController.retrieveCalendarMeetingRoomTwoDetails);
router.route('/cancelbooking').post(roomBookingController.cancelBookingControllerFn);

module.exports = router;