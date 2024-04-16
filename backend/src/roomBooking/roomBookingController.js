const roomBookingService = require('./roomBookingService');

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

const retrieveCalendarInfosControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const calendarInfo = await roomBookingService.retrieveCalendarInfo(req.body);

        if (calendarInfo && calendarInfo.length > 0) {
            res.status(200).json({ status: true, calendarInfo: calendarInfo });
        } else {
            res.status(404).json({ status: false, message: "No calendar information found." });
        }
    } catch (error) {
        console.error("Error retrieving calendar information:", error);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
};




module.exports = {
    createRoomBookingControllerFn,
    retrieveBookingTimeslotsControllerFn,
    retrieveBookingInfosControllerFn,
    retrieveCalendarInfosControllerFn
};
