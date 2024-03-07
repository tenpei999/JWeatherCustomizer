<?

/**
 * 外部APIからデータを取得する関数。
 * 
 * @param string $url APIのエンドポイント。
 * @return array|null 取得したデータを含む配列、またはエラーが発生した場合はnull。
 */
function fetchDataFromApi($apiUrl) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $err = curl_error($ch);
    curl_close($ch);

    if ($err) {
        logMessage("cURL Error: " . $err);
        return null;
    } else {
        return json_decode($response, true);
    }
}
