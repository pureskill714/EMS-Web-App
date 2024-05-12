var nonManagerialEmployeeModel = require('./nonManagerialEmployeeModel');
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

                    // Set employee details from request
                    nonManagerialEmployeeModelData.firstname = nonManagerialEmployeeDetails.firstname;
                    nonManagerialEmployeeModelData.lastname = nonManagerialEmployeeDetails.lastname;
                    nonManagerialEmployeeModelData.email = nonManagerialEmployeeDetails.email;
                    var encrypted = encryptor.encrypt(nonManagerialEmployeeDetails.password);
                    nonManagerialEmployeeModelData.password = encrypted;
                    nonManagerialEmployeeModelData.role = "non-managerial";

                    // Save the employee data to the database
                    nonManagerialEmployeeModelData.save()
                        .then(result => {
                            // Generate a verification token using UUID
                            const verificationToken = uuidv4(); // Generate a random UUID (version 4)
                            
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
            html: `Click <a href="http://yourapp.com/verify/${verificationToken}">here</a> to verify your account.`
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