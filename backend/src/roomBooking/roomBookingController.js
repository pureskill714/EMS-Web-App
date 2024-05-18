const roomBookingService = require('./roomBookingService');
const { MongoClient, ObjectId } = require('mongodb');

const createRoomBookingControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const result = await roomBookingService.createRoomBooking(req.body);

        if (result) {
            res.send({ status: true, message: 'Room booking created successfully' });
        } else {
            res.send({ status: false, message: 'Error creating room booking' });
        }
    } catch (error) {
        if (error.status && error.message) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

const retrieveBookingTimeslotsControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const timeslots = await roomBookingService.retrieveTimeslots(req.body);

        if (timeslots.length > 0) { // Check if timeslots are retrieved successfully
            res.status(200).json({ status: true, message: 'Timeslots retrieved successfully', timeslots: timeslots });
        } else {
            res.status(404).json({ status: false, message: 'No timeslots detected' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const retrieveBookingInfosControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const bookings = await roomBookingService.retrieveBookingInfos(req.body);

        if (bookings && bookings.length > 0) { // Check if bookings are retrieved successfully
            res.status(200).json({ status: true, bookings: bookings });
        } else {
            res.status(404).json({ status: false, message: "No bookings found." });
        }
    } catch (error) {
        console.error("Error retrieving booking information:", error);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
};

const retrievePastBookingInfosControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const bookings = await roomBookingService.retrievePastBookingInfos(req.body);

        if (bookings && bookings.length > 0) { // Check if bookings are retrieved successfully
            res.status(200).json({ status: true, bookings: bookings });
        } else {
            res.status(404).json({ status: false, message: "No bookings found." });
        }
    } catch (error) {
        console.error("Error retrieving booking information:", error);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
};

const retrieveCalendarInfosControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const calendarInfo = await roomBookingService.retrieveCalendarInfo(req.body);

        if (calendarInfo && Object.keys(calendarInfo).length > 0) {
            // Check if calendarInfo is not empty
            res.status(200).json({ status: true, calendarInfo: calendarInfo });
        } else {
            // Handle case where no calendar information is found
            res.status(404).json({ status: false, message: "No calendar information found." });
        }
    } catch (error) {
        // Handle server error
        console.error("Error retrieving calendar information:", error);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
};

const retrieveCalendarDetails = async (req, res) => {
    try {
        // Log the request body (optional)
        console.log(req.body);

        // Call the roomBookingService to retrieve calendar details using request data
        const calendarDetails = await roomBookingService.retrieveCalendarDetails(req.body);

        if (calendarDetails && calendarDetails.length > 0) {
            // Check if calendarDetailsMeetingRoomOneis not empty
            res.status(200).json({ status: true, calendarDetails: calendarDetails });
        } else {
            // Handle case where no calendar information is found
            res.status(404).json({ status: false, message: "No calendar details found." });
        }
    } catch (error) {
        // Handle server error
        console.error("Error retrieving calendar details:", error);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
};

const retrieveCalendarMeetingRoomOneDetails = async (req, res) => {
    try {
        // Log the request body (optional)
        console.log(req.body);

        // Call the roomBookingService to retrieve calendar details using request data
        const calendarDetailsMeetingRoomOne = await roomBookingService.retrieveCalendarMeetingRoomOneDetails(req.body);

        if (calendarDetailsMeetingRoomOne && calendarDetailsMeetingRoomOne.length > 0) {
            // Check if calendarDetailsMeetingRoomOneis not empty
            res.status(200).json({ status: true, calendarDetailsMeetingRoomOne: calendarDetailsMeetingRoomOne });
        } else {
            // Handle case where no calendar information is found
            res.status(404).json({ status: false, message: "No calendar details found." });
        }
    } catch (error) {
        // Handle server error
        console.error("Error retrieving calendar details:", error);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
};

const retrieveCalendarMeetingRoomTwoDetails = async (req, res) => {
    try {
        // Log the request body (optional)
        console.log(req.body);

        // Call the roomBookingService to retrieve calendar details using request data
        const calendarDetailsMeetingRoomTwo = await roomBookingService.retrieveCalendarMeetingRoomTwoDetails(req.body);

        if (calendarDetailsMeetingRoomTwo && calendarDetailsMeetingRoomTwo.length > 0) {
            // Check if calendarDetailsMeetingRoomOneis not empty
            res.status(200).json({ status: true, calendarDetailsMeetingRoomTwo: calendarDetailsMeetingRoomTwo });
        } else {
            // Handle case where no calendar information is found
            res.status(404).json({ status: false, message: "No calendar details found." });
        }
    } catch (error) {
        // Handle server error
        console.error("Error retrieving calendar details:", error);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
};

const cancelBookingControllerFn = async (req, res) => {
    try {
        console.log(req.body); // Log request body for debugging if needed
        const cancelResult = await roomBookingService.cancelBooking(req.body); // Assuming req.body contains the necessary data

        if (cancelResult.deletedCount === 1) {
            res.status(200).json({ status: true, message: "Booking cancelled successfully." });
        } else {
            res.status(404).json({ status: false, message: "Booking not found or already cancelled." });
        }
    } catch (error) {
        console.error("Error cancelling booking:", error);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
};

var getMeetingRoomsControllerFn = async (req, res) => {
    try {

        const uri = 'mongodb://localhost:27017';
        const dbName = 'ems';
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection('meetingrooms');


      // Fetch all meeting room names from MongoDB
      const meetingRooms = await collection.find({}, { projection: { name: 1, _id: 0 } }).toArray();
  
      // Respond with the retrieved employees
      res.status(200).json(meetingRooms);
    } catch (error) {
      console.error('Error fetching meeting room names', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


module.exports = {
    createRoomBookingControllerFn,
    retrieveBookingTimeslotsControllerFn,
    retrieveBookingInfosControllerFn,
    retrievePastBookingInfosControllerFn,
    retrieveCalendarInfosControllerFn,
    retrieveCalendarDetails,
    retrieveCalendarMeetingRoomOneDetails,
    retrieveCalendarMeetingRoomTwoDetails,
    cancelBookingControllerFn,
    getMeetingRoomsControllerFn
};
