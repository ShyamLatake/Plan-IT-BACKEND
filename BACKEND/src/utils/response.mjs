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
    success: (res,data,message ) => handleResponse(res,200,data, message || 'Success'),
    error: (res, error, message) => handleResponse(res, 404, message || 'Error', error),
    notFound: (res,message,error) => handleResponse(res, 404, message || 'Not Found', error),
    conflict: (res, error, message) => handleResponse(res, 409, message || 'Conflict', error),
    badRequest: (res, error, message) => handleResponse(res, 422, message || 'Bad Request', error),
    unauthorized: (res, error, message) => handleResponse(res, 401, message || 'Unauthorized', error),
    forbidden: (res, error, message) => handleResponse(res, 403, message || 'Forbidden', error),
    serverError: (res, error, message) => handleResponse(res, 500, message || 'Internal Server Error', error),
};
