import { responseErrorMessage } from "../objects/responseErrorMessages";

/**
 * Handles API error responses by mapping error status codes to user-friendly error messages.
 * This function checks if there is an API error and, if so, retrieves a corresponding error message
 * based on the error's status code. If the status code does not have a predefined error message,
 * it returns a default unknown error message.
 * 
 * @param {Object} isApiError - An object containing information about the API error, including a boolean flag indicating an error and the status code.
 * @returns {Object|null} - An object containing details about the error message to be displayed to the user, or null if there is no error.
 */
export const handleWeatherError = (isApiError) => {

  // If there is no API error, return null to indicate no error handling is needed.
  if (!isApiError.isError) {
    return null;
  }

  const pluginImagePaths = JWeatherCustomizerData.pluginImagePath;
  const messages = responseErrorMessage(pluginImagePaths);
  const messageForStatusCode = messages[isApiError.statusCode];

  if (!messageForStatusCode) {
    return {
      title: 'Unknown Error',
      notice: 'An unknown error occurred.',
      icon: `${pluginImagePaths}default-error-icon.svg`,
    };
  }

  return messageForStatusCode;
};
