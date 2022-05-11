<?php
require_once("Mail.php");

$post_data = $_POST;
define("status_error", "error");
define("status_success", "success");

$result;
$errors = array();
$status = "";

//validation name
if ($post_data["name"] === "") {
  $status = status_error;
  $errors["name"] = "必須項目です。";
}

//validation mail
if ($post_data["mail"] === "") {
  $status = status_error;
  $errors["mail"] = "必須項目です。";
} else if (!mail_validation($post_data["mail"])) {
  $status = status_error;
  $errors["mail"] = "不正なメールアドレスです。";
}

//validation mail_confirm
if ($post_data["mail_confirm"] === "") {
  $status = status_error;
  $errors["mail_confirm"] = "必須項目です。";
} else if ($post_data["mail"] !== $post_data["mail_confirm"]) {
  $status = status_error;
  $errors["mail_confirm"] = "メールの内容が一致しません。";
}

//validation mail_confirm
if ($post_data["message"] === "") {
  $status = status_error;
  $errors["message"] = "必須項目です。";
}

if ($status == status_error) {
  $result = array("status"=>$status, "errors"=>$errors);
} else {
  $status = status_success;
  $result = array("status"=>$status);
  send_mail_to_customer($post_data);
  send_mail_to_noht($post_data);
}

echo json_encode($result);

function mail_validation($mail_address)
{
  //http://blog.livedoor.jp/dankogai/archives/51189905.html
  $pattern =
    '/^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&\'*+\\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!'.
    '#\$\%&\'*+\\/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:'.
    '[a-zA-Z0-9_!#\$\%&\'*+\\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&\'*+\\/=?\^`'.
    "{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/"
    ;

  return (bool)preg_match($pattern, $mail_address);
}

function send_mail_to_customer($post_data)
{
  mb_language("Ja") ;
  mb_internal_encoding("UTF8") ;

  $name = h($post_data["name"]);
  $recipients = h($post_data["mail"]);
  $company = h($post_data["company"]);
  $message = h($post_data["message"]);

  $params = array(
    "host" => "mail.noht.co.jp",   // SMTPサーバー名
    "port" => 25,              // ポート番号
    "auth" => true,            // SMTP認証を使用する
    "username" => "info@noht.co.jp",  // SMTPのユーザー名
    "password" => "8S9U8yy6CW49Oq85vA7EbQzzLoJ7xOVJ"   // SMTPのパスワード
  );

  $mailObject = Mail::factory("smtp", $params);

  $subject="We have received your inquiry.";
  $headers = array(
    "To" => $recipients,
    "From" => "info@noht.co.jp",
    "Subject" => mb_encode_mimeheader($subject, 'ISO-2022-JP')
  );

  $body = "
    Hi $name,

    Thank you for your interest in our services!
    Please confirm your inquiry below:

    Name: $name
    Company: $company
    Email: $mail_to
    Message:
    $message

    If you have any questions, please contact us at info@noht.co.jp.
    ";
  $body = mb_convert_encoding($body, "ISO-2022-JP", "UTF-8");

  $mailObject -> send($recipients, $headers, $body);
  //$send = $mailObject -> send($recipients, $headers, $body);
  //if (PEAR::isError($send)) { print($send->getMessage());}
}

function send_mail_to_noht($post_data)
{
  mb_language("Ja") ;
  mb_internal_encoding("UTF8") ;

  $to = "info@noht.co.jp";

  $name = h($post_data["name"]);
  $from = h($post_data["mail"]);
  $company = h($post_data["company"]);
  $message = h($post_data["message"]);

  $params = array(
    "host" => "mail.noht.co.jp",   // SMTPサーバー名
    "port" => 25,              // ポート番号
    "auth" => true,            // SMTP認証を使用する
    "username" => "info@noht.co.jp",  // SMTPのユーザー名
    "password" => "8S9U8yy6CW49Oq85vA7EbQzzLoJ7xOVJ"   // SMTPのパスワード
  );

  $mailObject = Mail::factory("smtp", $params);

  $subject="問い合わせがありました";
  $headers = array(
    "To" => $to,
    "From" => "info@noht.co.jp",
    "Subject" => mb_encode_mimeheader($subject, 'ISO-2022-JP')
  );
  $body = "
    問い合わせがありました。

    お名前
    $name 様

    会社名
    $company

    メールアドレス
    $from

    問い合わせ内容
    $message
  ";
  $body = mb_convert_encoding($body, "ISO-2022-JP", "UTF-8");

  $mailObject -> send($to, $headers, $body);
}

function h($str) {
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}
