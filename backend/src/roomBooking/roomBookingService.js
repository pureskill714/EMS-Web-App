const RoomBooking = require('./roomBookingModel');

module.exports.createRoomBooking = async (roomBookingDetails) => {
    try {
        // Check if there are any existing bookings on the specified date and meeting room
        const existingBookings = await RoomBooking.find({
            date: roomBookingDetails.date,
            meetingRoom: roomBookingDetails.meetingRoom
        });

        // Check if any timeslots from existing bookings conflict with the new booking
        const conflictingTimeslots = existingBookings.some(booking => {
            return roomBookingDetails.timeslots.some(timeslot => booking.timeslots.includes(timeslot));
        });

        if (conflictingTimeslots) {
            // If there are conflicting timeslots, return a rejection with status code 409
            return Promise.reject({ status: 409, message: 'Timeslots are already booked for the specified date and meeting room' });
        }

        // If no conflicts, create the new room booking
        const newRoomBooking = new RoomBooking({
            date: roomBookingDetails.date,
            meetingRoom: roomBookingDetails.meetingRoom,
            purpose: roomBookingDetails.purpose,
            timeslots: roomBookingDetails.timeslots,
            email: roomBookingDetails.email,
            firstName: roomBookingDetails.firstName,
            lastName: roomBookingDetails.lastName
        });

        const result = await newRoomBooking.save();
        return result;
    } catch (error) {
        throw error;
    }
};
