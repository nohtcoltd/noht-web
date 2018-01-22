<?php
function h($str) {
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

function check_include($expect)
{
  global $parsed_path, $routing_data, $method;
  $parsed_path[1] = $parsed_path[1] === "" ? "products" : $parsed_path[1];
  if($parsed_path[1] == $expect) {
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
    <!--
   ________   ________  ___  ___  _________
  |\   ___  \|\   __  \|\  \|\  \|\___   ___\
  \ \  \\ \  \ \  \|\  \ \  \\\  \|___ \  \_|
   \ \  \\ \  \ \  \\\  \ \   __  \   \ \  \
    \ \  \\ \  \ \  \\\  \ \  \ \  \   \ \  \
     \ \__\\ \__\ \_______\ \__\ \__\   \ \__\
      \|__| \|__|\|_______|\|__|\|__|    \|__|

-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>NOHT CO.,LTD.</title>
    <meta name="description" content="NOHT CO.,LTD. is planning and running of the websites or services, developing system and applications.">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="shortcut icon" href="/favicon.ico" />
    <script src="/js/vendor/modernizr-2.6.2.min.js"></script>
  </head>
  <body id='general-layout' class="<?php echo ($parsed_path[1] === "contact") ? "wrapper2" : "wrapper1"?>">
    <div id="wrapper1" class="<?php echo ($parsed_path[1] !== "" || $parsed_path[1] === "contact") ? $parsed_path[1] : "products"?>">
      <header id="header">
        <div class="h-contents">
          <h1 class="logo">
            <a class="pjax-link" href="/en/">
              <?php include("svg/logo_noht_short.svg"); ?>
            </a>
          </h1>
          <ul id="gmenu">
            <li class="language">
              <span class="en selected"><a href="/en/">EN</a></span><span class="jp"><a href="/">JP</a></span>
            </li>
            <li class="products"><a class="pjax-link" href="/en/">
              <span class="bg-color"><p>PRODUCTS</p></span><span class="bg-none"><p>PRODUCTS</p></span>
            </a></li>
            <li class="about"><a class="pjax-link" href="/en/about/">
              <span class="bg-color"><p>ABOUT</p></span><span class="bg-none"><p>ABOUT</p></span>
            </a></li>
            <li class="contact"><a class="pjax-link" href="/en/contact/">
              <p>CONTACT</p>
            </a></li>
          </ul>
          <div class="menu-button"><div class="icon"></div></div>
        </div>
      </header>
      <div class="main">
        <ul class="site-contents">
          <li id="products" class="site-content ajax-content" data-ajax="/en/products">
            <?php check_include("products") ?>
          </li>
          <li id="about" class="site-content ajax-content" data-ajax="/en/about">
            <?php check_include("about") ?>
          </li>
        </ul>
      </div>
    </div>
    <div id="wrapper2" class="contact">
      <div class="main">
        <div class="site-contents">
          <div id="contact" class="site-content ajax-content" data-ajax="/en/contact">
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
