var nonManagerialEmployeeModel = require('./nonManagerialEmployeeModel');
const { MongoClient, ObjectId } = require('mongodb');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

const nodemailer = require('nodemailer');
//const encryptionModule = require('./encryptor'); // Import your encryptor module
const { v4: uuidv4 } = require('uuid'); // Import uuid package and alias v4 method as uuidv4

module.exports.createnonManagerialEmployeeDBService = (nonManagerialEmployeeDetails) => {
    return new Promise(function(resolve, reject) {
        // Check if email already exists in the database
        nonManagerialEmployeeModel.findOne({ email: nonManagerialEmployeeDetails.email })
            .then(existingEmployee => {
                if (existingEmployee) {
                    // Email already exists, reject the promise
                    reject({ message: 'Email already exists' });
                } else {
                    // Create a new non-managerial employee instance
                    var nonManagerialEmployeeModelData = new nonManagerialEmployeeModel();

                    // Generate a verification token using UUID
                    const verificationToken = uuidv4(); // Generate a random UUID (version 4)

                    // Set employee details from request
                    nonManagerialEmployeeModelData.firstname = nonManagerialEmployeeDetails.firstname;
                    nonManagerialEmployeeModelData.lastname = nonManagerialEmployeeDetails.lastname;
                    nonManagerialEmployeeModelData.email = nonManagerialEmployeeDetails.email;
                    var encrypted = encryptor.encrypt(nonManagerialEmployeeDetails.password);
                    nonManagerialEmployeeModelData.password = encrypted;
                    nonManagerialEmployeeModelData.role = "non-managerial";
                    nonManagerialEmployeeModelData.verificationToken = verificationToken;

                    // Save the employee data to the database
                    nonManagerialEmployeeModelData.save()
                        .then(result => {
                            
                            // Send verification email with the generated token
                            sendVerificationEmail(nonManagerialEmployeeModelData.email, verificationToken)
                                .then(() => resolve(true)) // Resolve the promise if email sent successfully
                                .catch(err => reject(err)); // Reject if email sending fails
                        })
                        .catch(error => {
                            reject(error); // Reject with error if saving to database fails
                        });
                }
            })
            .catch(error => {
                reject(error); // Reject with error if database query fails
            });
    });
};

// Function to send verification email
function sendVerificationEmail(email, verificationToken) {
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
            subject: 'Account Verification',
            html: `Click <a href="http://58.182.172.239/verify/${verificationToken}">here</a> to verify your account.`
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


 module.exports.loginuserDBService = (nonManagerialEmployeeDetails) => {
    return new Promise((resolve, reject) => {
        nonManagerialEmployeeModel.findOne({ email: nonManagerialEmployeeDetails.email })
            .then(result => {
                if (!result) {
                    reject({ status: false, msg: "Invalid Data" });
                } else {
                    var decrypted = encryptor.decrypt(result.password);
                    if (decrypted === nonManagerialEmployeeDetails.password) {
                        resolve({ status: true, msg: "non-managerial employee Validated Successfully", role: result.role, firstname: result.firstname, lastname: result.lastname, isVerified: result.isVerified });
                    } else {
                        reject({ status: false, msg: "non-managerial employee Validation Failed" });
                    }
                }
            })
            .catch(error => {
                reject({ status: false, msg: "non-managerial employee Error Details" });
            });
    });
 };

 module.exports.verifyAccount = async (verificationToken) => {
    try {
        // MongoDB connection URL
        const uri = 'mongodb://database:27017';
        // Database Name
        const dbName = 'ems';

        // Create a new MongoClient
        const client = new MongoClient(uri, { useUnifiedTopology: true });

        // Connect to the MongoDB server
        await client.connect();

        // Get the reference to the database
        const database = client.db(dbName);

        // Collection Name
        const collectionName = 'nonmanagerialemployees';

        // MongoDB query to update the document
        const result = await database.collection(collectionName).updateOne(
            { verificationToken: verificationToken },
            { $set: { isVerified: true } }
        );

        // Close the MongoDB client connection
        await client.close();

        // Check the result of the update operation
        if (result.modifiedCount === 1) {
            // Document updated successfully
            return { status: true, msg: "Employee verified successfully" };
        } else {
            // No document was updated (verificationToken not found)
            return { status: false, msg: "Employee not found or update failed" };
        }
    } catch (error) {
        // Handle errors during MongoDB operations
        throw { status: false, msg: "Error updating employee verification status", error };
    }
};

module.exports.resendVerificationService = (bodyData) => {
    return new Promise((resolve, reject) => {
        const { email } = bodyData;
        
        if (!email) {
            reject({ message: 'Email is required' });
            return;
        }
        
        // Generate a new verification token using UUID
        const verificationToken = uuidv4();

        // Find the employee by email
        nonManagerialEmployeeModel.findOne({ email: email })
            .then(employee => {
                if (!employee) {
                    reject({ message: 'Employee not found' });
                } else {
                    // Update the verification token in the database
                    employee.verificationToken = verificationToken;

                    // Save the updated employee data
                    employee.save()
                        .then(() => {
                            // Send the verification email
                            sendVerificationEmail(email, verificationToken)
                                .then(() => resolve({ message: 'Verification email sent successfully' }))
                                .catch(err => reject({ message: 'Failed to send verification email', error: err }));
                        })
                        .catch(err => reject({ message: 'Failed to update verification token', error: err }));
                }
            })
            .catch(err => reject({ message: 'Database query failed', error: err }));
    });
};

module.exports.forgetPasswordService = (email) => {
    return new Promise((resolve, reject) => {
        // Check if email exists in the database
        nonManagerialEmployeeModel.findOne({ email })
            .then(existingEmployee => {
                if (existingEmployee) {
                    // Email found, generate a reset token
                    const resetToken = uuidv4(); // Generate a random UUID (version 4)
                    
                    // Update the employee document with the reset token
                    existingEmployee.resetToken = resetToken;

                    // Save the updated employee data to the database
                    existingEmployee.save()
                        .then(() => {
                            // Send forgot password email with the generated token
                            sendForgotPasswordEmail(email, resetToken)
                                .then(() => resolve({ message: 'Password reset email sent successfully' })) // Resolve if email sent successfully
                                .catch(err => reject({ message: 'Error sending password reset email', error: err })); // Reject if email sending fails
                        })
                        .catch(error => {
                            reject({ message: 'Error saving reset token to database', error }); // Reject if saving to database fails
                        });
                } else {
                    // Email not found, reject the promise
                    reject({ message: 'Email not found in database' });
                }
            })
            .catch(error => {
                reject({ message: 'Error querying the database', error }); // Reject if database query fails
            });
    });
};

function sendForgotPasswordEmail(email, resetToken) {
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
            subject: 'Password Reset Request',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Password Reset Request</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            margin: 0;
                            padding: 0;
                            background-color: #f9f9f9;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            overflow: hidden;
                        }
                        .header {
                            background-color: #4CAF50;
                            color: white;
                            text-align: center;
                            padding: 20px 0;
                        }
                        .content {
                            padding: 20px;
                            text-align: center;
                        }
                        .button {
                            display: inline-block;
                            padding: 10px 20px;
                            margin-top: 20px;
                            color: white;
                            background-color: #4CAF50;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        .footer {
                            padding: 10px;
                            text-align: center;
                            background-color: #f1f1f1;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Password Reset Request</h1>
                        </div>
                        <div class="content">
                            <p>We received a request to reset the password for your account associated with this email address. If you made this request, please click the button below to reset your password:</p>
                            <a href="http://58.182.172.239/reset-password/${resetToken}" class="button">Reset Password</a>
                            <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
                            <p>If you have any questions, feel free to contact our support team.</p>
                            <p>Best regards,</p>
                            <p>The [Company Name] Team</p>
                        </div>
                        <div class="footer">
                            <p>&copy; ${new Date().getFullYear()} [Company Name]. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
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

module.exports.verifyResetPasswordService = async (resetToken) => {
    try {
        const uri = 'mongodb://database:27017';
        const dbName = 'ems';

        // Create a new MongoClient
        const client = new MongoClient(uri, { useUnifiedTopology: true });

        // Connect to the MongoDB server
        await client.connect();

        // Get the reference to the database
        const database = client.db(dbName);

        // Collection Name
        const collectionName = 'nonmanagerialemployees'; // Adjust based on your collection name

        // MongoDB query to find the document with resetToken
        const result = await database.collection(collectionName).findOne({ resetToken });

        // Close the MongoDB client connection
        await client.close();

        // Check if result is not null (resetToken found)
        if (result) {
            return true; // Reset token found in the database
        } else {
            return false; // Reset token not found in the database
        }
    } catch (error) {
        // Handle errors during MongoDB operations
        console.error('Error verifying reset token:', error);
        throw new Error("Error verifying reset token"); // Throw error if an error occurs
    }
};

module.exports.resetPasswordService = async (resetToken, newPassword) => {
    try {
        const uri = 'mongodb://database:27017';
        const dbName = 'ems';

        // Create a new MongoClient
        const client = new MongoClient(uri, { useUnifiedTopology: true });

        // Connect to the MongoDB server
        await client.connect();

        // Get the reference to the database
        const database = client.db(dbName);

        // Collection Name
        const collectionName = 'nonmanagerialemployees'; // Adjust based on your collection name

        // MongoDB query to find the document with resetToken
        const user = await database.collection(collectionName).findOne({ resetToken });

        if (user) {
            // Encrypt the new password
            const encryptedPassword = encryptor.encrypt(newPassword);

            // Update the user's password and resetToken
            await database.collection(collectionName).updateOne(
                { resetToken },
                {
                    $set: { password: encryptedPassword },
                    $unset: { resetToken: null }
                }
            );

            // Close the MongoDB client connection
            await client.close();

            return true; // Password updated successfully
        } else {
            // Close the MongoDB client connection
            await client.close();

            return false; // Reset token not found in the database
        }
    } catch (error) {
        // Handle errors during MongoDB operations
        console.error('Error in resetPasswordService:', error);
        throw new Error("Error resetting password"); // Throw error if an error occurs
    }
};


module.exports.deleteAccountService = async (requestData) => {
    try {
        const uri = 'mongodb://database:27017';
        const dbName = 'ems';
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        const database = client.db(dbName);
        const collectionName = 'nonmanagerialemployees';

        // Retrieve the account details using the provided ObjectId
        const account = await database.collection(collectionName).findOne({ _id: new ObjectId(requestData.id) });

        if (!account) {
            throw new Error('Account not found'); // Handle if account with the specified id is not found
        }

        // MongoDB query to delete the document with the specified _id
        const result = await database.collection(collectionName).deleteOne({ _id: new ObjectId(requestData.id) });

        await client.close();

        return result;
    } catch (error) {
        throw error;
    }
};