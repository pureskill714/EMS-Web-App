var nonManagerialEmployeeModel = require('./nonManagerialEmployeeModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

module.exports.createnonManagerialEmployeeDBService = (nonManagerialEmployeeDetails) => {
    return new Promise(function(resolve, reject) {
        // Check if email already exists in the database
        nonManagerialEmployeeModel.findOne({ email: nonManagerialEmployeeDetails.email })
            .then(existingEmployee => {
                if (existingEmployee) {
                    // Email already exists, reject the promise
                    reject({ message: 'Email already exists' });
                } else {
                    var nonManagerialEmployeeModelData = new nonManagerialEmployeeModel();
 
                    nonManagerialEmployeeModelData.firstname = nonManagerialEmployeeDetails.firstname;
                    nonManagerialEmployeeModelData.lastname = nonManagerialEmployeeDetails.lastname;
                    nonManagerialEmployeeModelData.email = nonManagerialEmployeeDetails.email;
                    nonManagerialEmployeeModelData.password = nonManagerialEmployeeDetails.password;
                    var encrypted = encryptor.encrypt(nonManagerialEmployeeDetails.password);
                    nonManagerialEmployeeModelData.role = "non-managerial";
                    nonManagerialEmployeeModelData.password = encrypted;
 
                    nonManagerialEmployeeModelData.save()
                        .then(result => {
                            resolve(true);
                        })
                        .catch(error => {
                            reject(false);
                        });
                }
            })
            .catch(error => {
                reject(false);
            });
    });
 };

module.exports.loginuserDBService = (nonManagerialEmployeeDetails) => {
   return new Promise((resolve, reject) => {
       nonManagerialEmployeeModel.findOne({ email: nonManagerialEmployeeDetails.email })
           .then(result => {
               if (!result) {
                   reject({ status: false, msg: "Invalid Data" });
               } else {
                   var decrypted = encryptor.decrypt(result.password);
                   if (decrypted === nonManagerialEmployeeDetails.password) {
                       resolve({ status: true, msg: "non-managerial employee Validated Successfully", role: result.role });
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