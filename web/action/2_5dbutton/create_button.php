<?php

  $id = uniqid(rand(10, 10));
  //-------------------------------------------------
  // 文字列のエンティティ化
  //-------------------------------------------------
  function encode_entities($val)
  {
    $encode_entity = htmlentities($val, ENT_QUOTES, "UTF-8");
    return $encode_entity;
  }

  //-------------------------------------------------
  // エンティティ化した文字列のデコード
  //-------------------------------------------------
  function decode_entities($val)
  {
    $decode_entity = html_entity_decode(encode_entities($val), ENT_QUOTES, "UTF-8");
    return $decode_entity;
  }

  //-------------------------------------------------
  // 各文字列の格納
  //-------------------------------------------------
  function stock_value()
  {
    $val = array();
    $val['html_code'] = decode_entities($_POST['html_code']);
    $val['label_size'] = decode_entities($_POST['label_size']);
    $val['icon_size'] = decode_entities($_POST['icon_size']);
    $val['label_color'] = decode_entities($_POST['label_color']);
    $val['popup_dist'] = decode_entities($_POST['popup_dist']);
    $val['horizontal_padding'] = decode_entities($_POST['horizontal_padding']);
    $val['vertical_padding'] = decode_entities($_POST['vertical_padding']);
    $val['radius'] = decode_entities($_POST['radius']);
    $val['speed'] = decode_entities($_POST['speed']);
    $val['button_color'] = decode_entities($_POST['button_color']);
    $val['side_darkness'] = decode_entities($_POST['side_darkness']);
    $pval['line_height'] = decode_entities($_POST['line_height']);
    return $val;
  }

  //-------------------------------------------------
  // ディレクトリのルート指定
  //-------------------------------------------------
  function get_dirs($script_filepath, $id)
  {
    $dirs = array();
    $dirs['root'] = "$script_filepath/downloads/{$id}";
    $dirs['button_template'] = "$script_filepath/button_template";
    $dirs['created_button'] = "{$dirs['root']}/2_5dBUTTON";
    $dirs['css'] = "{$dirs['created_button']}/css";
    $dirs['scss'] = "{$dirs['created_button']}/scss";
    return $dirs;
  }

  //-------------------------------------------------
  // ファイルのルート指定
  //-------------------------------------------------
  function get_files($script_filepath, $id)
  {
    $dirs = get_dirs($script_filepath, $id);
    $files = array();
    $files['html'] = "{$dirs['created_button']}/index.html";
    $files['scss'] = "{$dirs['scss']}/2_5dbutton.scss";
    $files['css'] = "{$dirs['css']}/2_5dbutton.css";
    $files['zip'] = "{$dirs['root']}/2_5dBUTTON.zip";
    $files['zip_download'] = "/downloads/2_5dbutton/{$id}/2_5dBUTTON.zip";
    return $files;
  }

  //-------------------------------------------------
  // ディレクトリ生成
  //-------------------------------------------------
  function create_dir($dir)
  {
    mkdir("{$dir}");
    chmod("{$dir}", 0777);
  }

  //-------------------------------------------------
  // ディレクトリコピー
  //-------------------------------------------------
  function copy_dir($copy_from, $copy_to)
  {
    exec("cp -r {$copy_from} {$copy_to}");
  }

  //-------------------------------------------------
  // ファイル生成
  //-------------------------------------------------
  function create_file($file_name, $file_contents)
  {
    $val = stock_value();
    ob_start();
    include $file_contents;
    file_put_contents($file_name, ob_get_contents());
    ob_end_clean();
  }

  //-------------------------------------------------
  // scssコンパイル
  //-------------------------------------------------
  function scss_compile($scss_file, $css_file)
  {
    exec("sass --style expanded {$scss_file} {$css_file}");
  }

  //-------------------------------------------------
  // zip圧縮
  //-------------------------------------------------
  function create_zip($root, $zip_name)
  {
    system("cd {$root};tar cvf {$zip_name}.zip {$zip_name}");
  }

  //-------------------------------------------------
  // ディレクトリ削除
  //-------------------------------------------------
  function remove_dir($root)
  {
    system("rm -rf {$root}");
  }

  //-------------------------------------------------
  // ファイルをダウンロード
  //-------------------------------------------------
  function download_file($download_path)
  {
    ob_end_clean();
    if (!print($download_path)) {
      die("Cannot read the file: ({$download_path})");
    }
  }

  //-------------------------------------------------
  // 実行用関数
  //-------------------------------------------------
  function execute($id)
  {
    $script_filepath = dirname(__FILE__);

    $dirs = get_dirs($script_filepath, $id);
    $files = get_files($script_filepath, $id);

    create_dir($dirs['root']);
    copy_dir($dirs['button_template'], $dirs['created_button']);
    create_file($files['scss'], "$script_filepath/scss_template.php");
    create_file($files['html'], "$script_filepath/html_template.php");
    scss_compile($files['scss'], $files['css']);
    create_zip($dirs['root'], "2_5dBUTTON");
    remove_dir($dirs['2_5dbutton']);
    download_file($files['zip_download']);
  }

  execute($id);
