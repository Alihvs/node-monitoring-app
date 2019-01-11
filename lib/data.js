/* 
* Library for storing and editing data
*
*/

// Dependencies
var fs = require('fs');
var path = require('path');

// Container for the module (to be exported)
var lib = {};

// Define the base directory of the lib folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to the file
lib.create = function (dir, file, data, callback) {
    // Open the file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
        if(!err && fileDescriptor)  {
            //Convert data to string
            var stringData = JSON.stringify(data);

            // Write to file and close it
            fs.writeFile(fileDescriptor, stringData, function(err) {
                if(!err) {
                    fs.close(fileDescriptor, function (err) {
                        if(!err) {
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    })
                } else {
                    callback('Error writing to new file');
                }
            })
        } else {
            callback(err);
        }
    });
};

// Read data from a file
lib.read = function (dir, file, callback) {
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function(err, data){
        callback(err, data);
    });
};

// Update an existing file with new data
lib.update = function(dir, file, data, callback) {
    // Open the file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
        if(!err && fileDescriptor) {
            //Convert data to string
            var stringData = JSON.stringify(data);

            // Truncate the file
            fs.truncate(fileDescriptor, function (err) {
                if(!err) {
                    // Write to teh file and close it
                    fs.writeFile(fileDescriptor, stringData, function (err) {
                        if (!err) {
                            fs.close(fileDescriptor, function (err) {
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback('There was an error closing the file: ' + err)
                                }
                            })
                        } else {
                            callback('Error writing to exsting file: ' + err);
                        }
                    })
                } else {
                    callback('Error truncating file: ' + err);
                }
            })
        } else {
            callback('Could not open the file for updating: ' + err);
        }
    });
};

// Delete a file
lib.delete = function (dir, file, callback) {
    // Unlink the file
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', function (err) {
        if(!err) {
            callback(false)
        } else {
            callback('Error deleting the file: ' + err);
        }
    })
};


// Export the module
module.exports = lib;
