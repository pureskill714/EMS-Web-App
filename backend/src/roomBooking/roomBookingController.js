const roomBookingService = require('./roomBookingService');

const createRoomBookingControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const status = await roomBookingService.createRoomBooking(req.body);
        console.log(status);

        if (status) {
            res.send({ "status": true, "message": "Room booking created successfully" });
        } else {
            res.send({ "status": false, "message": "Error creating room booking" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createRoomBookingControllerFn,
};
