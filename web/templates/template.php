<?php
function h($str) {
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

function check_include($expect)
{
  global $parsed_path, $routing_data, $method;
  $parsed_path[0] = $parsed_path[0] === "" ? "products" : $parsed_path[0];
  if($parsed_path[0] == $expect) {
    $parsed_path[] = "xhr";
    include_action_file($routing_data, $parsed_path, "GET");
  }
}

?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="ja" class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>NOHT CO.,LTD.</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="shortcut icon" href="/favicon.ico" />
    <script src="/js/vendor/modernizr-2.6.2.min.js"></script>
  </head>
  <body id='general-layout' class="<?php echo ($parsed_path[0] === "recruit") ? "wrapper2" : "wrapper1"?>">
    <div id="wrapper1" class="<?php echo ($parsed_path[0] !== "" || $parsed_path[0] === "recruit") ? $parsed_path[0] : "products"?>">
      <header id="header">
        <div class="h-contents">
          <h1 class="logo">
            <a class="pjax-link" href="/"></a>
          </h1>
          <ul id="gmenu">
            <!--
            <li class="products"><a class="pjax-link" href="/products/">PRODUCTS</a></li>
            -->
            <li class="products"><a class="pjax-link" href="/">PRODUCTS</a></li>
            <li class="about"><a class="pjax-link" href="/about/">ABOUT</a></li>
            <li class="contact"><a class="pjax-link" href="/contact/">CONTACT</a></li>
            <!--
            <li class="language">
              <span class="jp">JP</span>/<span class="en">EN</span>
            </li>
            -->
          </ul>
          <div class="menu-button"></div>
        </div>
      </header>
      <div class="main">
        <ul class="site-contents">
          <!--<li id="index" class="site-content ajax-content" data-ajax="/">
            <?php check_include("index") ?>
          </li>-->
          <li id="products" class="site-content ajax-content" data-ajax="/products">
            <?php check_include("products") ?>
          </li>
          <li id="about" class="site-content ajax-content" data-ajax="/about">
            <?php check_include("about") ?>
          </li>
        </ul>
      </div>
    </div>
    <div id="wrapper2" class="contact">
      <div class="main">
        <div class="site-contents">
          <div id="contact" class="site-content ajax-content" data-ajax="/contact">
            <?php check_include("contact") ?>
          </div>
        </div>
      </div>
    </div>

    <!-- javascript -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.11.0.min.js"><\/script>')</script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD22qYSCV3dF6Ja8gpwdiYw8ECF8W-oYVs&amp;sensor=false"></script>
      <script src="/js/vendor/jquery.easing.1.3.min.js"></script>
    <script type="text/javascript" src="/js/vendor/jquery.inview.min.js"></script>
    <script type="text/javascript" src="/js/vendor/json3.js"></script>
    <script type="text/javascript" src="/js/vendor/Sprite3D.js"></script>
    <script type="text/javascript" src="/js/vendor/requestAnimationFrame.js"></script>
    <script type="text/javascript" src="/js/vendor/jQueryRotate.js"></script>
    <script type="text/javascript" src="/js/plugins.js"></script>
    <script type="text/javascript" src="/js/main.js"></script>
    <?php include("templates/ga.php"); ?>
  </body>
</html>
