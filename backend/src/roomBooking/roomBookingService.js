const RoomBooking = require('./roomBookingModel');

module.exports.createRoomBooking = (roomBookingDetails) => {
    return new Promise((resolve, reject) => {
        const newRoomBooking = new RoomBooking({
            date: roomBookingDetails.date,
            meetingRoom: roomBookingDetails.meetingRoom,
            purpose: roomBookingDetails.purpose,
            timeslots: roomBookingDetails.timeslots,
            email: roomBookingDetails.email,
            firstName: roomBookingDetails.firstName,
            lastName: roomBookingDetails.lastName
        });

        newRoomBooking.save()
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
};
