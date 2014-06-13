<?php
include_once('../library/spyc.php');
$routing_config_file = '../config/routing.yml';
$routing_data = Spyc::YAMLLoad($routing_config_file);
$parsed_path = get_parsed_path();
$method = get_method();

main();

//============================================================
// 実行関数
//============================================================
function main()
{
  routing();
}

//今のところ1階層のみしかroutingできない
function routing()
{
  global $routing_data, $parsed_path, $method;
  include_action_file($routing_data, $parsed_path, $method);
}

function get_parsed_path()
{
  $url = parse_url($_SERVER["REQUEST_URI"]);
  $path = $url["path"];

  $parsed_path = explode("/", $path);
  //$parsed_path[0]は必ず空になるので
  //array_shiftで削除する
  if (count($parsed_path) != 0) {
    array_shift($parsed_path);
  }

  return $parsed_path;
}

function get_method()
{
  return $_SERVER["REQUEST_METHOD"];
}

function is_ajax()
{
  if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    return true;
  }
  return false;
}

function include_action_file($routing_data, $parsed_path, $method)
{
  $matched_object = $routing_data;

  foreach ($parsed_path as $path) {

    if ($path === "") {
      continue;
    }

    if (array_key_exists($path, $matched_object)) {
      $matched_object = $matched_object[$path];
    } else {
      get_page_404();
      return;
    }
  }

  if (array_key_exists($method, $matched_object)) {
    include($matched_object[$method]);
  } else {
    get_page_404();
    return;
  }
}

function get_page_404()
{
  header("HTTP/1.1 404 Not Found");
  include 'partials/errors/404.php';
}
