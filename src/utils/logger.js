const logger = require('../logs/logger');

const logInfo = (message, details = null) => {
    logger.log(message, details);
};

const logError = (message, details = null) => {
    logger.error(message, details);
};

const logDebug = (message, details = null) => {
    logger.log(message, details);
};

const logWarning = (message, details = null) => {
    logger.log(`WARNING: ${message}`, details);
};

global.logInfo = logInfo;
global.logError = logError;
global.logDebug = logDebug;
global.logWarning = logWarning;
