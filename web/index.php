<?php
main();

//============================================================
// 実行関数
//============================================================
function main()
{
  routing();
}

function is_ajax()
{
  if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    return true;
  }
  return false;
}

//今のところ1階層のみしかroutingできない
function routing()
{
  $partials_root = dirname(__FILE__)."/partials";
  $templates_root = dirname(__FILE__)."/templates";

  $url = parse_url($_SERVER["REQUEST_URI"]);
  $path = $url["path"];
  $parsed_path = parse_path($path);

  if(!file_exists($partials_root.$path)) {
    get_page_404($partials_root);
  } else if(is_ajax()) {
    include_partial($partials_root, $parsed_path);
  } else if($_SERVER["REQUEST_METHOD"] == "GET") {
    include_template($templates_root, $partials_root, $parsed_path);
  }
}

function get_page_404($partials_root)
{
  header("HTTP/1.1 404 Not Found");
  include $partials_root.'/errors/404.php';
}

function include_template($templates_root, $partials_root, $parsed_path)
{
  include $templates_root."/template.php";
}

function include_partial($partials_root, $parsed_path)
{
  include $partials_root."/".$parsed_path."/index.php";
}

function parse_path($path)
{
  $parsed_pathes = explode("/", $path);
  //$parsed_path[0]は必ず空になるので
  //array_shiftで削除する
  array_shift($parsed_pathes);

  if($parsed_pathes[0] == "") {
    $parsed_pathes[0] = "index";
  }

  return $parsed_pathes[0];
}

//template.php内で使用する関数
//必要なものだけincludeする関数
function check_include($partials_root, $parsed_path, $expect)
{
  if($parsed_path == $expect) {
    include_partial($partials_root, $parsed_path);
  }
}
