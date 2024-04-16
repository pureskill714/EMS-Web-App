const RoomBooking = require('./roomBookingModel');
const { MongoClient } = require('mongodb');

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

module.exports.retrieveTimeslots = async (requestData) => {
    try {
        // MongoDB connection URL
        const uri = 'mongodb://localhost:27017';
        // Database Name
        const dbName = 'ems';

        // Create a new MongoClient
        const client = new MongoClient(uri, { useUnifiedTopology: true });

        // Connect to the MongoDB server
        await client.connect();

        // Get the reference to the database
        const database = client.db(dbName);

        // Collection Name
        const collectionName = 'bookings';

        // Run the MongoDB aggregation pipeline
        const timeslots = await database.collection(collectionName).aggregate([
            // Match documents with the specified date and meeting room
            { $match: { date: { $eq: new Date(requestData.date) }, meetingRoom: requestData.meetingRoom } },
            // Unwind the timeslots array to create a separate document for each timeslot
            { $unwind: "$timeslots" },
            // Group all documents and accumulate the timeslots in an array
            { $group: { _id: null, timeslots: { $addToSet: "$timeslots" } } },
            // Project the result to exclude the _id field
            { $project: { _id: 0, timeslots: 1 } }
        ]).toArray();

        // Close the connection to the MongoDB server
        await client.close();

        // Return the retrieved timeslots
        return timeslots[0].timeslots;
    } catch (error) {
        throw error;
    }
};

module.exports.retrieveBookingInfos = async (requestData) => {
    try {
        // MongoDB connection URL
        const uri = 'mongodb://localhost:27017';
        // Database Name
        const dbName = 'ems';

        // Create a new MongoClient
        const client = new MongoClient(uri, { useUnifiedTopology: true });

        // Connect to the MongoDB server
        await client.connect();

        // Get the reference to the database
        const database = client.db(dbName);

        // Collection Name
        const collectionName = 'bookings';

        // Get today's date
        var today = new Date();
        today.setHours(0, 0, 0, 0);

        // Run the MongoDB query
        const bookings = await database.collection(collectionName).find({
            "email": requestData.email,
            "date": {
                "$gte": today
            }
        }).toArray();


        // Close the connection to the MongoDB server
        await client.close();

        // Return the retrieved booking infos
        return bookings;
    } catch (error) {
        throw error;
    }
};

module.exports.retrieveCalendarInfo = async (requestData) => {
    try {
        const uri = 'mongodb://localhost:27017';
        const dbName = 'ems';
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        const database = client.db(dbName);
        const collectionName = 'bookings';
        
        //MongoDB query
        const result = await database.collection(collectionName).aggregate([
            {
              $match: {
                "date": { $eq: new Date(requestData.date) }, // Match documents with the specified date
                //"email": requestData.email // Match documents with the specified email
              }
            },
            {
              $group: {
                _id: "$meetingRoom",
                timeslots: { $push: "$timeslots" } // Push each timeslots array into the timeslots field for its respective meeting room
              }
            }
          ]).toArray();
        

        await client.close();
        return result;
    } catch (error) {
        throw error;
    }
};

