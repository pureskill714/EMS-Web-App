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

const retrieveCalendarInfosWithNamesControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const calendarInfoWithNames = await roomBookingService.retrieveCalendarInfoWithNames(req.body);

        if (calendarInfoWithNames && Object.keys(calendarInfoWithNames).length > 0) {
            // Check if calendarInfoWithNames is not empty
            res.status(200).json({ status: true, calendarInfoWithNames: calendarInfoWithNames });
        } else {
            // Handle case where no calendar information is found
            res.status(404).json({ status: false, message: "No calendar information (with names) found." });
        }
    } catch (error) {
        // Handle server error
        console.error("Error retrieving calendar information (with names):", error);
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

const retrieveCalendarMeetingRoomDetailsControllerFn = async (req, res) => {
    try {
        console.log(req.body); // Log request body for debugging if needed
        
        // Call the service function to retrieve calendar details using request data
        const calendarDetailsAllMeetingRoom = await roomBookingService.retrieveCalendarMeetingRoomDetails(req.body);
        
        res.status(200).json(calendarDetailsAllMeetingRoom);
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

const addNewMeetingRoomControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const result = await roomBookingService.addNewMeetingRoomService(req.body);

        if (result) {
            res.send({ status: true, message: 'New Meeting Room added successfully' });
        } else {
            res.send({ status: false, message: 'Error creating New Meeting Room' });
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

const editMeetingRoomNameControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const result = await roomBookingService.editMeetingRoomNameService(req.body);

        if (result) {
            res.send({ status: true, message: 'Meeting Room name edited successfully' });
        } else {
            res.send({ status: false, message: 'Error editing meeting room name' });
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

const editMeetingRoomOrderControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const result = await roomBookingService.editMeetingRoomOrderService(req.body);

        if (result) {
            res.send({ status: true, message: 'Meeting Room order edited successfully' });
        } else {
            res.send({ status: false, message: 'Error editing meeting room order' });
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

const editMeetingRoomCapacityControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const result = await roomBookingService.editMeetingRoomCapacityService(req.body);

        if (result) {
            res.send({ status: true, message: 'Meeting Room capacity edited successfully' });
        } else {
            res.send({ status: false, message: 'Error editing meeting room capacity' });
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

const editMeetingRoomLocationControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const result = await roomBookingService.editMeetingRoomLocationService(req.body);

        if (result) {
            res.send({ status: true, message: 'Meeting Room Location edited successfully' });
        } else {
            res.send({ status: false, message: 'Error editing meeting room Location' });
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

const deleteMeetingRoomControllerFn = async (req, res) => {
    try {
        console.log(req.body); // Log request body for debugging if needed
        const cancelResult = await roomBookingService.deleteMeetingRoomService(req.body); // Assuming req.body contains the necessary data

        if (cancelResult.deletedCount === 1) {
            res.status(200).json({ status: true, message: "meeting room deleted successfully." });
        } else {
            res.status(404).json({ status: false, message: "meeting room deleted not found or already cancelled." });
        }
    } catch (error) {
        console.error("Error deleting meeting room:", error);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
};

var getMeetingRoomsControllerFn = async (req, res) => {
    const uri = 'mongodb://localhost:27017';
    const dbName = 'ems';
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection('meetingrooms');

        // Fetch all meeting room names sorted by roomOrder field from MongoDB
        const meetingRooms = await collection.find({}, { projection: { name: 1, roomOrder: 1, _id: 1,capacity:1,location:1 } }).sort({ roomOrder: 1 }).toArray();

        // Respond with the retrieved meeting rooms
        res.status(200).json(meetingRooms);
    } catch (error) {
        console.error('Error fetching meeting room names', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Ensure the client is closed in case of error or success
        await client.close();
    }
};


module.exports = {
    createRoomBookingControllerFn,
    retrieveBookingTimeslotsControllerFn,
    retrieveBookingInfosControllerFn,
    retrievePastBookingInfosControllerFn,
    retrieveCalendarInfosControllerFn,
    retrieveCalendarInfosWithNamesControllerFn,
    retrieveCalendarDetails,
    retrieveCalendarMeetingRoomDetailsControllerFn ,
    cancelBookingControllerFn,
    addNewMeetingRoomControllerFn,
    editMeetingRoomNameControllerFn,
    editMeetingRoomOrderControllerFn,
    editMeetingRoomCapacityControllerFn,
    editMeetingRoomLocationControllerFn,
    deleteMeetingRoomControllerFn,
    getMeetingRoomsControllerFn
};
