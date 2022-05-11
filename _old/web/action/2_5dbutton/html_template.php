<?php
  if($val['icon'] == "none") {
    $val['icon'] = "";
  } else {
    $val['icon'] = '<span class="icon-font">'.$val['icon'].'</span>';
  };

  if($val['text'] == "") {
    $val['text'] = "";
  } else {
    $val['text'] = '<span class="button-text">'.$val['text'].'</span>';
  };

?>
<!DOCTYPE html>
<!-- 
  Using Modernizr.js for smartphone.
  http://modernizr.com
-->
<html class="no-js">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" type="text/css" media="screen" href="css/2_5dbutton.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="css/layout.css" />
  <script type="text/javascript" src="js/modernizr-2.6.2.min.js"></script>
</head>
<body>
  <div class="general-button">
    <div class="button-content">
      <?php print($val['icon']); ?>
      <?php print($val['text']); ?>
    </div>
  </div>
</body>
</html>