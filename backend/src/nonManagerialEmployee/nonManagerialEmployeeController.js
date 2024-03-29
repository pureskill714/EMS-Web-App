var nonManagerialEmployeeService = require('./nonManagerialEmployeeService');

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
            res.send({ "status": true, "message": result.msg, "role": result.role,"firstname": result.firstname,"lastname":result.lastname});
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

module.exports = { createnonManagerialEmployeeControllerFn,loginUserControllerFn };