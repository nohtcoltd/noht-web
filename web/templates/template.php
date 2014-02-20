<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="ja" class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="shortcut icon" href="/favicon.ico" />
    <script src="/js/vendor/modernizr-2.6.2.min.js"></script>
  </head>
  <body id='general-layout' class="<?php echo(($parsed_path == "recruit") ? "wrapper2" : "wrapper1")?>">
    <div id="wrapper1" class="<?php echo($parsed_path != "recruit" ? $parsed_path : "index")?>">
      <header id="header">
        <h1 class="logo">
          <a class="pjax-link" href="/"><img src="/images/index/logo_noht_color.png" alt="NOHT CO.,LTD."/></a>
        </h1>
        <ul id="gmenu">
          <li><a class="pjax-link" href="/products/">PRODUCTS</a></li>
          <li><a class="pjax-link" href="/about/">ABOUT</a></li>
          <li><a class="pjax-link" href="/recruit/">RECRUIT</a></li>
        </ul>
      </header>
      <div class="main">
        <div class="site-contents">
          <div id="index" class="site-content ajax-content" data-ajax="/">
            <?php check_include($partials_root, $parsed_path, "index") ?>
          </div>
          <div id="products" class="site-content ajax-content" data-ajax="/products">
            <?php check_include($partials_root, $parsed_path, "products") ?>
          </div>
          <div id="about" class="site-content ajax-content" data-ajax="/about">
            <?php check_include($partials_root, $parsed_path, "about") ?>
          </div>
        </div>
      </div>
    </div>
    <div id="wrapper2" class="recruit">
      <header id="header">
        <h1 class="logo">
          <a class="pjax-link" href="/"><img src="/images/index/logo_noht_color.png" alt="NOHT CO.,LTD."/></a>
        </h1>
        <ul id="gmenu">
          <li><a class="pjax-link" href="/products/">PRODUCTS</a></li>
          <li><a class="pjax-link" href="/about/">ABOUT</a></li>
          <li><a class="pjax-link" href="/recruit/">RECRUIT</a></li>
        </ul>
      </header>
      <div class="main">
        <div class="site-contents">
          <div id="recruit" class="site-content ajax-content" data-ajax="/recruit">
            <?php check_include($partials_root, $parsed_path, "recruit") ?>
          </div>
        </div>
      </div>
    </div>

    <!-- javascript -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.11.0.min.js"><\/script>')</script>
    <script src="/js/vendor/jquery.easing.1.3.min.js"></script>
    <script src="/js/vendor/jquery.inview.min.js"></script>
    <script src="/js/plugins.js"></script>
    <script src="/js/main.js"></script>

  </body>
</html>
