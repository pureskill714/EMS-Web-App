var nonManagerialEmployeeService = require('./nonManagerialEmployeeService');
const { MongoClient, ObjectId } = require('mongodb');

var createnonManagerialEmployeeControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        var status = await nonManagerialEmployeeService.createnonManagerialEmployeeDBService(req.body);
        console.log(status);

        if (status) {
            res.send({ "status": true, "message": "nonManagerialEmployee created successfully" });
        } else {
            res.send({ "status": false, "message": "Error creating user" });
        }
    } catch (err) {
        console.log(err);
        if (err.message === 'Email already exists') {
            res.status(409).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

var loginUserControllerFn = async (req, res) => {
    var result = null;
    try {
        result = await nonManagerialEmployeeService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg, "role": result.role,"firstname": result.firstname,"lastname":result.lastname,"isVerified":result.isVerified});
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var verifyAccountControllerFn = async (req, res) => {
    try {
        // Extract the verificationToken from the request body or query parameters
        const verificationToken = req.body.token || req.query.token;

        // Call the verifyAccount service function with the verificationToken
        const result = await nonManagerialEmployeeService.verifyAccount(verificationToken);

        // Handle the result from the service function
        if (result.status) {
            // If account verification is successful, send success response
            res.status(200).json({
                status: true,
                message: result.msg,
                updatedEmployee: result.updatedEmployee
            });
        } else {
            // If account verification fails, send error response
            res.status(400).json({
                status: false,
                message: result.msg
            });
        }
    } catch (error) {
        // Handle any errors that occur during account verification process
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Error verifying account"
        });
    }
};

var forgetPasswordControllerFn = async (req, res) => {
    try {
        // Extract the email from the request body
        const { email } = req.body;

        // Call the forgetPassword service function with the email
        const result = await nonManagerialEmployeeService.forgetPasswordService(email);

        // Handle the result from the service function
        if (result.message === 'Password reset email sent successfully') {
            // If password reset email is sent successfully, send success response
            res.status(200).json({
                status: true,
                message: result.message
            });
        } else {
            // If the email is not found or sending email fails, send error response
            res.status(400).json({
                status: false,
                message: result.message
            });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Error sending password reset email"
        });
    }
};

var verifyResetPasswordControllerFn = async (req, res) => {
    try {
        // Extract resetToken from request body or query parameters
        const resetToken = req.body.resetToken || req.query.resetToken;

        // Call the verifyResetPasswordService function with the resetToken
        const resetTokenFound = await nonManagerialEmployeeService.verifyResetPasswordService(resetToken);

        // Respond based on the result from verifyResetPasswordService
        if (resetTokenFound) {
            res.status(200).json({
                success: true,
                message: "Reset token found in the database"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Reset token not found in the database"
            });
        }
    } catch (error) {
        console.error('Error in verifyResetPasswordControllerFn:', error);
        res.status(500).json({
            success: false,
            message: "Error verifying reset token"
        });
    }
};

var resendVerificationControllerFn = async (req, res) => {
    try {
        // Extract the email from the request body
        const { email } = req.body;

        // Call the resendVerificationService function with the email
        const result = await  nonManagerialEmployeeService.resendVerificationService({ email });

        // Handle the result from the service function
        if (result) {
            // If resending verification email is successful, send success response
            res.status(200).json({
                status: true,
                message: 'Verification email sent successfully'
            });
        } else {
            // If there is some issue in resending verification email, send error response
            res.status(400).json({
                status: false,
                message: 'Failed to resend verification email'
            });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Error resending verification email'
        });
    }
};

var getAllEmployeesControllerFn = async (req, res) => {
    try {

        const uri = 'mongodb://localhost:27017';
        const dbName = 'ems';
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        const database = client.db(dbName);
        const collectionName = 'nonmanagerialemployees';


      // Fetch all employees from MongoDB
      const employees = await database.collection(collectionName).find().sort({ "firstname": 1 }).toArray();
  
      // Respond with the retrieved employees
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  var deleteAccountControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        var status = await nonManagerialEmployeeService.deleteAccountService(req.body);
        console.log(status);

        if (status) {
            res.send({ "status": true, "message": "Account deleted successfully" });
        } else {
            res.send({ "status": false, "message": "Error deleting account" });
        }
    } catch (err) {
        console.log(err);
        if (err.message === 'Account not found') {
            res.status(404).json({ error: 'Account not found' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


module.exports = { createnonManagerialEmployeeControllerFn,
                   loginUserControllerFn,
                   getAllEmployeesControllerFn,
                   verifyAccountControllerFn,
                   resendVerificationControllerFn,
                   forgetPasswordControllerFn,
                   verifyResetPasswordControllerFn,
                   deleteAccountControllerFn
                 };