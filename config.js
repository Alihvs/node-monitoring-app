/*
* Create and export configuration variables
*
*
*/

// Container for all the environmetns
var environments = {};

// Staging (default) environmetn
environments.staging = {
    'port': 3000,
    'envName': 'staging'
};

// Production environmetn
environments.production = {
    'port': 5000,
    'envName': 'production'
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check tha the curret environment is one of the environments above, if not, default back to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the moduel

module.exports = environmentToExport;