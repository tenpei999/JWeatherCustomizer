<?

/**
 * 外部APIからデータを取得する関数。
 * 
 * @param string $url APIのエンドポイント。
 * @return array|null 取得したデータを含む配列、またはエラーが発生した場合はnull。
 */
function fetchDataFromApi($apiUrl)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl); // cURLセッションに使用するURLを設定します。$apiUrlにはリクエストを送りたいAPIのURLが含まれます。

    // CURLOPT_RETURNTRANSFERをtrueに設定することで、
    // cURL実行時に直接出力するのではなく、結果を文字列として返すようにします。
    // これにより、APIのレスポンスを変数に保存し、後続の処理で使用できるようになります。
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // SSL証明書の検証を強制
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10); // 接続のタイムアウトを10秒に設定
    curl_setopt($ch, CURLOPT_TIMEOUT, 15); // 全体のタイムアウトを15秒に設定
    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        logMessage("cURL Error: " . curl_error($ch));
        curl_close($ch);
        return null;
    }

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode != 200) {
        logMessage("HTTP Request failed with code: " . $httpCode);
        curl_close($ch);
        return null;
    }

    curl_close($ch);
    return json_decode($response, true);
}
