const RoomBooking = require('./roomBookingModel');
const { MongoClient, ObjectId } = require('mongodb');

const nodemailer = require('nodemailer');
//const encryptionModule = require('./encryptor'); // Import your encryptor module
const { v4: uuidv4 } = require('uuid'); // Import uuid package and alias v4 method as uuidv4

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

        // Generate a verification token using UUID
        const verificationToken = uuidv4(); // Generate a random UUID (version 4)

        // After saving to DB, send verification email
        await sendBookingConfirmationnEmail(roomBookingDetails.email,roomBookingDetails.firstName,
            roomBookingDetails.lastName,roomBookingDetails.date, roomBookingDetails.meetingRoom,
            roomBookingDetails.timeslots,roomBookingDetails.purpose
        );


        return result;
    } catch (error) {
        throw error;
    }
};

// Function to send Room Booking Confirmation email
function sendBookingConfirmationnEmail(email,firstName,lastName,date,meetingRoom,timeslots,purpose) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'wizvision600@gmail.com',
                pass: 'xikf gvuy lzud lqnk'
            }
        });

        const mailOptions = {
            from: 'wizvision600@gmail.com',
            to: email,
            subject: 'Room Booking Confirmation',

            html: `
            <p>Dear ${firstName} ${lastName},</p>
            <p>The following booking has been accepted successfully. The details are as follows:</p>
            <table style="border-collapse: collapse; width: 100%; border: 1px solid black;">
                <tr>
                    <th style="border: 1px solid black; padding: 8px;">Date</th>
                    <th style="border: 1px solid black; padding: 8px;">Meeting Room</th>
                    <th style="border: 1px solid black; padding: 8px;">Timeslots</th>
                    <th style="border: 1px solid black; padding: 8px;">Purpose</th>
                </tr>
                <tr>
                    <td style="border: 1px solid black; padding: 8px;">${date}</td>
                    <td style="border: 1px solid black; padding: 8px;">${meetingRoom}</td>
                    <td style="border: 1px solid black; padding: 8px;">${timeslots.join('<br>')}</td>
                    <td style="border: 1px solid black; padding: 8px;">${purpose}</td>
                </tr>
            </table>
        `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                reject(err); // Reject with error if email sending fails
            } else {
                console.log('Email sent:', info.response);
                resolve(); // Resolve the promise if email sent successfully
            }
        });
    });
}

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

module.exports.retrievePastBookingInfos = async (requestData) => {
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

        // Get the current year
        const currentYear = new Date().getFullYear();

        // Calculate the start and end dates for the current year
        const startDate = new Date(`${currentYear}-01-01`);
        const endDate = new Date(`${currentYear}-12-31`);

        // Run the MongoDB query to retrieve past bookings within the current year
        const bookings = await database.collection(collectionName).find({
            "email": requestData.email,
            "date": {
                "$lt": new Date(), // Bookings made before today's date
                "$gte": startDate, // Bookings made on or after the start of the current year
                "$lte": endDate // Bookings made on or before the end of the current year
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

        // MongoDB aggregation pipeline
        const result = await database.collection(collectionName).aggregate([
            {
                $match: {
                    "date": { $eq: new Date(requestData.date) }
                    // Optionally, you can include email matching criteria here
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

        // Prepare arrays for each meeting room
        const meetingRoomArrays = {};

        result.forEach((item) => {
            const meetingRoomId = item._id;
            const timeslotsArray = item.timeslots.flat(); // Flatten the timeslots arrays

            if (!meetingRoomArrays[meetingRoomId]) {
                meetingRoomArrays[meetingRoomId] = [];
            }

            meetingRoomArrays[meetingRoomId] = timeslotsArray;
        });

        // Ensure arrays are initialized for all meeting rooms (even if empty)
        const meetingRooms = Object.keys(meetingRoomArrays);
        meetingRooms.forEach((roomId) => {
            if (!meetingRoomArrays[roomId]) {
                meetingRoomArrays[roomId] = [];
            }
        });

        return meetingRoomArrays;
    } catch (error) {
        throw error;
    }
};

module.exports.retrieveCalendarDetails = async (requestData) => {
    try {
        const uri = 'mongodb://localhost:27017';
        const dbName = 'ems';
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        const database = client.db(dbName);
        const collectionName = 'bookings';
        
        // Define the fixed list of timeslots in the desired order
        const timeslotOrder = [
            '09:00-10:00',
            '10:00-11:00',
            '11:00-12:00',
            '12:00-13:00',
            '13:00-14:00',
            '14:00-15:00',
            '15:00-16:00',
            '16:00-17:00',
            '17:00-18:00'
        ];

        // Construct MongoDB aggregation pipeline
        const pipeline = [
            // Match documents where meetingRoom is "Meeting Room 1" and date is '2024-05-11'
            {
                $match: {
                    meetingRoom: requestData.meetingRoom,
                    "date": { $eq: new Date(requestData.date) }
                }
            },
            // Add a new field 'timeslotOrderIndex' based on the index of timeslot in timeslotOrder
            {
                $addFields: {
                    timeslotOrderIndex: { $indexOfArray: [timeslotOrder, { $arrayElemAt: ["$timeslots", 0] }] }
                }
            },
            // Sort documents by 'timeslotOrderIndex' (ascending) and '_id' (ascending by default)
            { $sort: { timeslotOrderIndex: 1 } }
        ];

        // Execute aggregation pipeline
        const result = await database.collection(collectionName).aggregate(pipeline).toArray();

        // Close MongoDB client connection
        await client.close();

        return result;
    } catch (error) {
        throw error;
    }
};

module.exports.retrieveCalendarMeetingRoomDetails = async (requestData) => {
    try {
        const uri = 'mongodb://localhost:27017';
        const dbName = 'ems';
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        const database = client.db(dbName);

        // Define the fixed list of timeslots in the desired order
        const timeslotOrder = [
            '09:00-10:00',
            '10:00-11:00',
            '11:00-12:00',
            '12:00-13:00',
            '13:00-14:00',
            '14:00-15:00',
            '15:00-16:00',
            '16:00-17:00',
            '17:00-18:00'
        ];

        // Define the query date
        const queryDate = new Date(requestData.date);

        // Construct MongoDB aggregation pipeline
        const pipeline = [
            // Lookup bookings for each meeting room
            {
                $lookup: {
                    from: "bookings",
                    let: { roomName: "$name" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$date", queryDate] },
                                        { $eq: ["$meetingRoom", "$$roomName"] }
                                    ]
                                }
                            }
                        },
                        {
                            $addFields: {
                                timeslotOrderIndex: { $indexOfArray: [timeslotOrder, { $arrayElemAt: ["$timeslots", 0] }] }
                            }
                        },
                        {
                            $sort: { timeslotOrderIndex: 1 }
                        }
                    ],
                    as: "bookings"
                }
            },
            // Unwind bookings to sort them by timeslotOrderIndex
            {
                $unwind: {
                    path: "$bookings",
                    preserveNullAndEmptyArrays: true
                }
            },
            // Sort by roomOrder (from meeting rooms) and timeslotOrderIndex (from bookings)
            {
                $sort: {
                    roomOrder: 1,
                    "bookings.timeslotOrderIndex": 1
                }
            },
            // Group back to consolidate bookings under their respective meeting rooms
            {
                $group: {
                    _id: "$_id",
                    meetingRoom: { $first: "$name" },
                    bookings: { $push: "$bookings" },
                    roomOrder: { $first: "$roomOrder" }
                }
            },
            // Project the final result
            {
                $project: {
                    _id: 0,
                    meetingRoom: 1,
                    bookings: {
                        $filter: {
                            input: "$bookings",
                            as: "booking",
                            cond: { $ne: ["$$booking", null] }
                        }
                    }
                }
            },
            // Sort by roomOrder again to ensure the final output order is correct
            {
                $sort: { roomOrder: 1 }
            }
        ];

        // Execute aggregation pipeline
        const result = await database.collection('meetingrooms').aggregate(pipeline).toArray();

        // Close MongoDB client connection
        await client.close();

        return result;
    } catch (error) {
        throw error;
    }
};

module.exports.cancelBooking = async (requestData) => {
    try {
        const uri = 'mongodb://localhost:27017';
        const dbName = 'ems';
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        const database = client.db(dbName);
        const collectionName = 'bookings';

        // Retrieve the booking details using the provided ObjectId
        const booking = await database.collection(collectionName).findOne({ _id: new ObjectId(requestData.id) });

        const cancellationDate = booking.date

        // Extract month, day, and year components from the date object
        const month = cancellationDate.getMonth() + 1; // Months are zero-based (January is 0), so add 1
        const day = cancellationDate.getDate();
        const year = cancellationDate.getFullYear();

        // Construct the formatted date string in MM/DD/YYYY format
        const formattedCancellationDate = `${year}-${month}-${day}`;

        if (!booking) {
            throw new Error('Booking not found'); // Handle if booking with the specified id is not found
        }

        // MongoDB query to delete the document with the specified _id
        const result = await database.collection(collectionName).deleteOne({ _id: new ObjectId(requestData.id) });

        await client.close();

        // Send cancellation email using retrieved booking details
        await sendBookingCancellationEmail(
            booking.email,
            booking.firstName,
            booking.lastName,
            formattedCancellationDate,
            booking.meetingRoom,
            booking.timeslots,
            booking.purpose
        );

        return result;
    } catch (error) {
        throw error;
    }
};

// Function to send Room Booking Cancellation email
function sendBookingCancellationEmail(email,firstName,lastName,date,meetingRoom,timeslots,purpose) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'wizvision600@gmail.com',
                pass: 'xikf gvuy lzud lqnk'
            }
        });

        const mailOptions = {
            from: 'wizvision600@gmail.com',
            to: email,
            subject: 'Room Cancellation Confirmation',

            html: `
            <p>Dear ${firstName} ${lastName},</p>
            <p>The following booking has been cancelled successfully. The details are as follows:</p>
            <table style="border-collapse: collapse; width: 100%; border: 1px solid black;">
                <tr>
                    <th style="border: 1px solid black; padding: 8px;">Date</th>
                    <th style="border: 1px solid black; padding: 8px;">Meeting Room</th>
                    <th style="border: 1px solid black; padding: 8px;">Timeslots</th>
                    <th style="border: 1px solid black; padding: 8px;">Purpose</th>
                </tr>
                <tr>
                    <td style="border: 1px solid black; padding: 8px;">${date}</td>
                    <td style="border: 1px solid black; padding: 8px;">${meetingRoom}</td>
                    <td style="border: 1px solid black; padding: 8px;">${timeslots.join('<br>')}</td>
                    <td style="border: 1px solid black; padding: 8px;">${purpose}</td>
                </tr>
            </table>
        `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                reject(err); // Reject with error if email sending fails
            } else {
                console.log('Email sent:', info.response);
                resolve(); // Resolve the promise if email sent successfully
            }
        });
    });
}



