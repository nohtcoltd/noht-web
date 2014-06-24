<!DOCTYPE html>
<html lang="ja">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>alcCalc - アルコール分解計算・飲酒アプリ</title>
  <link rel="stylesheet" type="text/css" media="screen" href="/css/alccalc.css">
  <link rel="stylesheet" type="text/css" media="screen" href="/css/main.css">
</head>
<body id="alccalc">
  <div class="global-header">
    <div class="gheader-content">
      <span class="noht-logo">
        <a href="/">
        </a>
      </span>
      <span class="language">
        <a class="en" href="/en/alcCalc/">EN</a><a class="jp selected" href="/alcCalc/">JP</a>
      </span>
    </div>
  </div>
  <header>
    <div class="content">
      <div class="title">
        <div class="logo"><img src="/images/alcCalc/logo_alccalc.png" alt="alccalc"></div>
        <div class="sns-buttons">
          <!-- google+1 -->
          <span class="sns-button google">
            <div class="g-plusone" data-size="medium" data-annotation="none"></div>
            <script type="text/javascript">
              (function()
              {
                var po = document.createElement('script');
                po.type = 'text/javascript'; po.async = true;
                po.src = 'https://apis.google.com/js/platform.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
              })();
            </script>
          </span>

          <!-- Hatena -->
          <span class="sns-button hatena">
            <a href="http://b.hatena.ne.jp/entry/http://www.noht.co.jp/en/alcCalc/" class="hatena-bookmark-button" data-hatena-bookmark-title="alcCalc" data-hatena-bookmark-layout="simple" title="このエントリーをはてなブックマークに追加">
              <img src="http://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" />
            </a>
            <script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>
          </span>

          <!-- Twitter-->
          <span class="sns-button twitter">
            <a href="https://twitter.com/share" class="twitter-share-button" data-count="none" data-url="http://www.noht.co.jp/alcCalc/" data-lang="en">tweet</a>
            <script>
              !function(d,s,id)
              {
                var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
                if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
            </script>
          </span>

          <!-- Facebook-->
          <span class="sns-button facebook">
            <iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.noht.co.jp%2Fen%2FalcCalc%2F&amp;width=130&amp;layout=button&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:70px; height:21px;" allowTransparency="true"></iframe>
          </span>
        </div>
        <div class="applestore">
          <a href="http://itunes.apple.com/jp/app/id887557458?mt=8"><img src="/images/alcCalc/banner_applestore.png" alt="apple store"></a>
        </div>
      </div>
    </div>
  </header>
  <section class="display-video-wrap">
    <div class="display-video">
      <div class="video-container">
        <div class="video-wrap">
          <iframe width="1280" height="720" src="http://www.youtube-nocookie.com/embed/5RueEpZMwrE?vq=highrez&rel=0&showinfo=0&autohide=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=1&title=0&byline=0&portrait=0" frameborder="0"></iframe>
        </div>
      </div>
    </div>
  </section>
  <section class="get-hashtag">
    <a class="twitter-timeline" data-dnt="true" href="https://twitter.com/hashtag/alcCalc" data-widget-id="481356220561764352" height="300" data-chrome="noheader nofooter">#alcCalc件のツイート</a>
    <script>
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
    if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    </script>
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
        <span class="number hour num-0"></span>
        <span class="number min1 num-0"></span>
        <span class="number min2 num-0"></span>
        <span class="number sec1 num-0"></span>
        <span class="number sec2 num-0"></span>
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
      <a href="http://itunes.apple.com/jp/app/id887557458?mt=8"><img src="/images/alcCalc/banner_applestore.png" alt="apple store"></a>
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
      <a href="/">© NOHT CO.,LTD.</a>
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
  <?php include("templates/ga.php"); ?>
</body>
</html>
