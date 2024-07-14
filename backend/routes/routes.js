var express = require('express');

var nonManagerialEmployeeController = require('../src/nonManagerialEmployee/nonManagerialEmployeeController');
var roomBookingController = require('../src/roomBooking/roomBookingController');


const router = express.Router();

router.route('/login').post(nonManagerialEmployeeController.loginUserControllerFn);
router.route('/create').post(nonManagerialEmployeeController.createnonManagerialEmployeeControllerFn);
router.route('/verify-account').post(nonManagerialEmployeeController.verifyAccountControllerFn);
router.route('/resend-verification').post(nonManagerialEmployeeController.resendVerificationControllerFn);
router.route('/forgot-password').post(nonManagerialEmployeeController.forgetPasswordControllerFn);
router.route('/verifyResetPassword').post(nonManagerialEmployeeController.verifyResetPasswordControllerFn);
router.route('/resetPassword').post(nonManagerialEmployeeController.resetPasswordControllerFn);

router.get('/getemployeedetails', nonManagerialEmployeeController.getAllEmployeesControllerFn);
router.route('/deleteaccount').post(nonManagerialEmployeeController.deleteAccountControllerFn);

router.get('/getmeetingrooms', roomBookingController.getMeetingRoomsControllerFn);
router.route('/addmeetingrooms').post(roomBookingController.addNewMeetingRoomControllerFn);
router.route('/editmeetingroomname').post(roomBookingController.editMeetingRoomNameControllerFn);
router.route('/editmeetingroomorder').post(roomBookingController.editMeetingRoomOrderControllerFn);
router.route('/editmeetingroomcapacity').post(roomBookingController.editMeetingRoomCapacityControllerFn);
router.route('/deletemeetingrooms').post(roomBookingController.deleteMeetingRoomControllerFn);

router.route('/booking').post(roomBookingController.createRoomBookingControllerFn);
router.route('/retrievebookingtimeslots').post(roomBookingController.retrieveBookingTimeslotsControllerFn);
router.route('/retrievebookinginfos').post(roomBookingController.retrieveBookingInfosControllerFn);
router.route('/retrievepastbookinginfos').post(roomBookingController.retrievePastBookingInfosControllerFn);

router.route('/retrievecalendarinfos').post(roomBookingController.retrieveCalendarInfosControllerFn);
router.route('/retrievecalendarinfoswithnames').post(roomBookingController.retrieveCalendarInfosWithNamesControllerFn);
router.route('/retrievecalendardetails').post(roomBookingController.retrieveCalendarDetails);
router.route('/retrievecalendarmeetingroomdetails').post(roomBookingController.retrieveCalendarMeetingRoomDetailsControllerFn);
router.route('/cancelbooking').post(roomBookingController.cancelBookingControllerFn);

module.exports = router;