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
            res.status(404).json({ status: false, message: 'No timeslots available' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createRoomBookingControllerFn,
    retrieveBookingTimeslotsControllerFn
};
