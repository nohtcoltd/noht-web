<?php
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
  $mail = h($post_data["mail"]);
  $company = h($post_data["company"]);
  $message = h($post_data["message"]);

  $text = "
    $name 様
    お問い合わせありがとうございます。

    www.noht.co.jpのお問い合わせフォームより、以下の内容の投稿を受け付けました。
    お心当たりのない場合はinfo@noht.co.jpまでご連絡ください。

    お名前
    $name 様

    会社名
    $company

    メールアドレス
    $mail

    問い合わせ内容
    $message
    ";

  $subject="問い合わせを受け付けました。";
  $mailfrom="From:<info@noht.co.jp>";

  mb_send_mail($mail,$subject,$text,$mailfrom);
}

function send_mail_to_noht()
{
  mb_language("Ja") ;
  mb_internal_encoding("UTF8") ;

  $name = h($post_data["name"]);
  $mail = h($post_data["mail"]);
  $company = h($post_data["company"]);
  $message = h($post_data["message"]);

  $text = "
    お問い合わせがありました。

    お名前
    $name 様

    会社名
    $company

    メールアドレス
    $mail

    問い合わせ内容
    $message
    ";

  $subject="問い合わせがありました";
  $mailfrom="From:<info@noht.co.jp>";

  mb_send_mail($mail,$subject,$text,$mailfrom);
}

function h($str) {
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}
