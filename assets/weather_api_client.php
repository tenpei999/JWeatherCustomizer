<?

/**
 * Fetches data from the specified API URL using cURL.
 * This function initializes a cURL session, sets various options for the session,
 * executes the session, and handles errors like cURL errors or non-200 HTTP responses.
 * It returns the response data as an associative array if successful, or null in case of errors.
 * 
 * @param string $apiUrl The URL of the API from which to fetch data.
 * @return mixed The decoded JSON response as an associative array, or null on failure.
 */
function fetchDataFromApi($apiUrl)
{
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT => 15
    ]);

    // Execute cURL session
    $response = curl_exec($ch);

    // Check for cURL errors
    if (curl_errno($ch)) {
        logMessage("cURL Error: " . curl_error($ch));
        curl_close($ch);
        return null;
    }

    // Check HTTP response code
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode != 200) {
        logMessage("HTTP Request failed with code: " . $httpCode);
        curl_close($ch);
        return null;
    }

    curl_close($ch);
    return json_decode($response, true);
}
