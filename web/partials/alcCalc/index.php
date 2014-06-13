<!DOCTYPE html>
<html lang="ja">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>alcCalc</title>
  <link rel="stylesheet" type="text/css" media="screen" href="/css/alccalc.css">
  <link rel="stylesheet" type="text/css" media="screen" href="/css/main.css">
</head>
<body id="alccalc">
  <header>
    <div class="content">
      <span class="language">
        <a class="en" href="/en/alcCalc/">EN</a>/<a class="jp selected" href="/alcCalc/">JP</a>
      </span>
      <div class="title">
        <div class="logo"><img src="/images/alcCalc/logo_alccalc.png" alt="alccalc"></div>
        <div class="applestore">
          <a href=""><img src="/images/alcCalc/banner_applestore.png" alt="apple store"></a>
        </div>
      </div>
    </div>
  </header>
  <section class="display-video-wrap">
    <div class="display-video">
      <div class="video-container">
        <div class="video-wrap">
          <iframe width="1280" height="720" src="http://www.youtube-nocookie.com/embed/5RueEpZMwrE?hd=1&rel=0&showinfo=0&autohide=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=1&title=0&byline=0&portrait=0" frameborder="0"></iframe>
        </div>
      </div>
    </div>
  </section>
  <section class="main">
    <section class="caption">
      <p>
        アルコール分解時刻の予測
      </p>
      <span class="note">飲み始めのタイミングで追加するだけ。</span>
    </section>
    <section class="display-image">
      <div class="reserve-value">
        <div class="now">
          <input type="text" class="unix" size="1" disabled="disabled" value="">
          <input type="text" class="hour" size="1" disabled="disabled" value="">
          <input type="text" class="min" size="1" disabled="disabled" value="">
          <input type="text" class="sec" size="1" disabled="disabled" value="">
        </div>
        <div class="conpose">
          <input type="text" class="unix" size="1" disabled="disabled" value="">
          <input type="text" class="hour" size="1" disabled="disabled" value="">
          <input type="text" class="min" size="1" disabled="disabled" value="">
          <input type="text" class="sec" size="1" disabled="disabled" value="">
        </div>
        <div class="end">
          <input type="text" class="unix" size="1" disabled="disabled" value="">
          <input type="text" class="hour" size="1" disabled="disabled" value="">
          <input type="text" class="min" size="1" disabled="disabled" value="">
          <input type="text" class="sec" size="1" disabled="disabled" value="">
        </div>
        <div class="left">
          <input type="text" class="hour" size="1" disabled="disabled" value="">
          <input type="text" class="min" size="1" disabled="disabled" value="">
          <input type="text" class="sec" size="1" disabled="disabled" value="">
        </div>
      </div>
      <section class="clock-display">
        <div class="number-display now-time">
          <span class="number hour1"></span>
          <span class="number hour2"></span>
          <span class="coron">
            <img src="/images/alcCalc/image_clock_coron.png" alt="clock_coron">
          </span>
          <span class="number min1"></span>
          <span class="number min2"></span>
        </div>
        <div class="number-display end-time">
          <span class="number hour1"></span>
          <span class="number hour2"></span>
          <span class="coron">
            <img src="/images/alcCalc/image_clock_coron.png" alt="clock_coron">
          </span>
          <span class="number min1"></span>
          <span class="number min2"></span>
        </div>
      </section>
      <section class="number-display countdown">
        <span class="number hour"></span>
        <span class="number min1"></span>
        <span class="number min2"></span>
        <span class="number sec1"></span>
        <span class="number sec2"></span>
      </section>
      <section class="progress-bar">
        <div></div>
      </section>
    </section>
    <section class="using">
      <ul>
        <li class="breath">
          <p class="caption">呼気アルコール量計算</p>
        </li>
        <li class="blood">
          <p class="caption">血中アルコール量計算</p>
        </li>
        <li class="calorie">
          <p class="caption">カロリー量計算</p>
        </li>
      </ul>
      <ul>
        <li class="hangover">
          <p class="caption">二日酔い判定</p>
        </li>
        <li class="share">
          <p class="caption">シェア機能</p>
        </li>
        <li class="no_ad">
          <p class="caption">無料 + 広告なし</p>
        </li>
      </ul>
    </section>
    <section class="applestore">
      <a href=""><img src="/images/alcCalc/banner_applestore.png" alt="apple store"></a>
    </section>
    <section class="caution">
      <div class="image">
        <img src="/images/alcCalc/icon_caution.png" alt="caution">
      </div>
      <p>
        <span>表示する内容は体重から算出した目安です。</span><span>保証するものではありません。</span><br/>
        <span>酒気帯び・酒酔いでの自動車などの運転は絶対におやめください。</span>
      </p>
    </section>
  </section>
  <footer>
    <p class="copyright">
      © NOHT CO.,LTD.
    </p>
    <p class="staff">
      Director / Designer : KEIICHIRO HIRAI <a href="http://twitter.com/hirausan">@hirausan</a><br/>
      Engineer : TAKUMA FURUTANI <a href="http://twitter.com/Filriya_N">@Filriya_N</a><br/>
      Assistant : ATSUSHI TOMOFUJI <a href="http://twitter.com/tmfj2">@tmfj2</a><br/>
    </p>
  </footer>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.11.0.min.js"><\/script>')</script>
  <script type="text/javascript" src="/js/alccalc.js"></script>
</body>
</html>
