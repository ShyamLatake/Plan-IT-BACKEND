/**
 * this is used to handle the response from the server to the client side of the application
 * this function takes in the response object, the status code, the message, the data and the error
 * its returns the response object with the status code, message, data and error
 * @param {*} res 
 * @param {*} status 
 * @param {*} message 
 * @param {*} data 
 * @param {*} error 
 * @returns 
 */
const handleResponse = (res, status, message, data, error) => {
    const responseData = { status };
    if (message) responseData.message = message;
    if (data) responseData.data = data;
    if (error) responseData.error = error;
    return res.status(status).json(responseData);
};

/**
 * This is used to handle the response from the server to the client side of the application 
 * @param {object} res
 * @param {number} status
 * @param {string} message
 */
export const response = {
    success: (res, status, data, message) => handleResponse(res, status, message || 'Success', data),
    error: (res, status, error, message) => handleResponse(res, status, message || 'Error', null, error),
    notFound: (res, status, error, message) => handleResponse(res, status, message || 'Not Found', null, error),
    conflict: (res, status, error, message) => handleResponse(res, status, message || 'Conflict', null, error),
    badRequest: (res, status, error, message) => handleResponse(res, status, message || 'Bad Request', null, error),
    unauthorized: (res, status, error, message) => handleResponse(res, status, message || 'Unauthorized', null, error),
    forbidden: (res, status, error, message) => handleResponse(res, status, message || 'Forbidden', null, error),
    serverError: (res, status, error, message) => handleResponse(res, status, message || 'Internal Server Error', null, error),
    noContent: (res, status, data, message) => handleResponse(res, status, message || 'No Content', data),
};
