<?php

require_once("Mail.php");


//日本語メールを送る際に必要
mb_language("Japanese");
mb_internal_encoding("UTF-8");

// SMTPサーバーの情報を連想配列にセット
$params = array(
  "host" => "mail.noht.co.jp",   // SMTPサーバー名
  "port" => "587",              // ポート番号
  "auth" => true,            // SMTP認証を使用する
  "username" => "info@noht.co.jp",  // SMTPのユーザー名
  "password" => "fCyTQgktngFwwNcM6lTGD8HWdtjYBV"   // SMTPのパスワード
);

// PEAR::Mailのオブジェクトを作成
// ※バックエンドとしてSMTPを指定
$mailObject = Mail::factory("smtp", $params);

// 送信先のメールアドレス
$recipients = "arizoxppc@gmail.com";

// メールヘッダ情報を連想配列としてセット
$headers = array(
  "To" => $recipients,         // →ここで指定したアドレスには送信されない
  "From" => "info@noht.co.jp",
  "Subject" => mb_encode_mimeheader("てすと") // 日本語の件名を指定する場合、mb_encode_mimeheaderでエンコード
);

// メール本文
$body = "日本語メールの本文。";

// 日本語なのでエンコード
$body = mb_convert_encoding($body, "ISO-2022-JP", "UTF-8");

// sendメソッドでメールを送信
$mailObject->send($recipients, $headers, $body);
