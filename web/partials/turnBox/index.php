<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="old-ie ie6" lang="ja"> <![endif]-->
<!--[if IE 7 ]> <html class="old-ie ie7" lang="ja"> <![endif]-->
<!--[if IE 8 ]> <html class="old-ie ie8" lang="ja"> <![endif]-->
<!--[if IE 9 ]> <html class="old-ie ie9" lang="ja"> <![endif]-->
<!--[if !(IE)]><!--><html lang="ja"><!--<![endif]-->
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>TURNBOX.js - NOHT CO.,LTD.</title>
  <link rel="stylesheet" type="text/css" media="screen" href="/css/main.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="/css/vender/spectrum.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="/css/turn_box.css" />
</head>
<body id="turnBox">
  <header>
    <a href="/">
      <img src="/images/share/logo_noht_white.png" alt="">
    </a>
    <div class="sns-buttons top">
      <!-- google+1 -->
      <span class="sns-button google">
        <div class="g-plusone" data-size="medium" data-annotation="none"></div>
        <script type="text/javascript">
          window.___gcfg = {
            lang: 'en-US'
          };
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
        <a href="http://b.hatena.ne.jp/entry/http://noht.co.jp/turnbox" class="hatena-bookmark-button" data-hatena-bookmark-title="TURNBOX.js" data-hatena-bookmark-layout="simple" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a>
        <script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>
      </span>
      <!-- Twitter-->
      <span class="sns-button twitter">
        <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://noht.co.jp/turnbox" data-count="none" data-lang="en">Tweet</a>
        <script>
        !function(d,s,id)
        {
          var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
          if(!d.getElementById(id)){js=d.createElement(s);
            js.id=id;js.src=p+'://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
        </script>
      </span>
      <!-- Facebook-->
      <span class="sns-button facebook">
        <iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fnoht.co.jp%2Fturnbox&amp;width=130&amp;locale=en_US&amp;layout=button&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:48px; height:21px;" allowTransparency="true"></iframe>
      </span>
    </div>
    <div class="title">
      <div>
        <p class="turnBoxButton turnBoxTo3">
          TURNBOX.js
        </p>
      </div>
      <div>
        <p class="turnBoxButton">
        </p>
      </div>
      <div>
        <p class="turnBoxButton">
        </p>
      </div>
      <div>
        <p class="turnBoxButton">
        </p>
      </div>
    </div>
    <div class="contents-tabs-wrap">
      <ul class="contents-tabs">
        <li class="tab tab1">
          <div class="turnBoxButton">EXAMPLES</div>
          <div>EXAMPLES</div>
        </li>
        <li class="tab tab2">
          <div class="turnBoxButton">USAGE</div>
          <div>USAGE</div>
        </li>
        <li class="tab tab3">
          <div class="turnBoxButton">DOWNLOAD</div>
          <div>DOWNLOAD</div>
        </li>
      </ul>
    </div>
  </header>
  <div class="contents-body">
    <div class="examples-container">
      <div class="examples">
        <div class="example-wrapper">
          <h2>TOGGLE</h2>
          <div class="example switch">
            <div>
              <p class="turnBoxButton">OFF</p>
            </div>
            <div>
              <p class="turnBoxButton turnBoxButtonPrev">ON</p>
            </div>
          </div>
        </div>
        <div class="example-wrapper">
          <h2>CONFIRM</h2>
          <div class="example wizard">
            <div>
              <p class="turnBoxButton">OFF</p>
            </div>
            <div>
              <span class="turnBoxButton turnBoxButtonPrev">CANCEL</span>
              <span class="turnBoxButton">OK</span>
            </div>
            <div>
              <p class="turnBoxButton turnBoxButtonPrev">ON</p>
            </div>
          </div>
        </div>
      </div>
      <div class="examples">
        <div class="example-wrapper">
          <h2>UPLOADER</h2>
          <div class="example uploader">
            <div>
              <p class="turnBoxButton">
                UPLOAD
              </p>
            </div>
            <div>
              <div class="uploading-bar"></div>
            </div>
            <div>
              <p>
                COMPLETE
              </p>
            </div>
          </div>
        </div>

        <div class="example-wrapper">
          <h2>COLOR PICKER</h2>
          <div class="example color-picker">
            <div>
              <p class="hex-display"></p>
              <div class="bg-filter turnBoxButton"></div>
            </div>
            <div>
              <div class="color-picker-container"></div>
              <div class="bg-filter"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="examples">
        <div class="example-wrapper">
          <h2>FORM A</h2>
          <div class="example login-form">
            <div>
              <p class="turnBoxButton">
                LOGIN
              </p>
            </div>
            <div>
              <ul class="user-information">
                <li>
                  <span>ID</span><input type="text">
                </li>
                <li>
                  <span>PASS</span><input type="text">
                </li>
              </ul>
              <div class="help">
                <div class="forgot-pass">
                  Forgot password?
                </div>
                <br/>
                <div class="sign-up">
                  Sign up?
                </div>
              </div>
              <div class="login-contents">
                <div class="remember">
                  <div>
                    <p class="turnBoxButton">
                      Remember Me
                    </p>
                  </div>
                  <div>
                    <p class="turnBoxButton turnBoxButtonPrev">
                      <img src="/images/turnbox/icon_check.png" alt="">Remember Me
                    </p>
                  </div>
                </div>
                <span class="check">
                  GO
                </span>
              </div>
              <div class="login-sns">
                <a>
                  <img class="icon" src="/images/turnbox/icon_sns_googleplus.png" alt="">
                  <img class="loading" src="/images/turnbox/icon_loading.gif" alt="">
                </a>
                <a>
                  <img class="icon" src="/images/turnbox/icon_sns_twitter.png" alt="">
                  <img class="loading" src="/images/turnbox/icon_loading.gif" alt="">
                </a>
                <a>
                  <img class="icon" src="/images/turnbox/icon_sns_facebook.png" alt="">
                  <img class="loading" src="/images/turnbox/icon_loading.gif" alt="">
                </a>
                <a>
                  <img class="icon" src="/images/turnbox/icon_github.png" alt="">
                  <img class="loading" src="/images/turnbox/icon_loading.gif" alt="">
                </a>
              </div>
            </div>
            <div>
              <p class="turnBoxButton turnBoxButtonPrev">LOGIN SUCCEEDED</p>
            </div>
          </div>
        </div>
        <div class="example-wrapper">
          <h2>DIALOG A</h2>
          <div class="example notify">
            <div>
              <p class="turnBoxButton">
                NOTIFY
              </p>
            </div>
            <div>
              <img src="/images/turnbox/icon_information.png" alt="information">
              <p class="message">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <span class="check">
                OK
              </span>
            </div>
            <div>
              <p class="turnBoxButton turnBoxButtonPrev">CONFIRMED</p>
            </div>
          </div>
        </div>
      </div>
      <div class="examples">
        <div class="example-wrapper">
          <h2>FORM B</h2>
          <div class="example contact-form">
            <div>
              <p class="turnBoxButton">
                CONTACT
              </p>
            </div>
            <div>
              <ul class="user-information">
                <li>
                  <span>NAME</span><input type="text">
                </li>
                <li>
                  <span>MAIL</span><input type="text">
                </li>
              </ul>
              <textarea></textarea>
              <span class="check">
                <div>
                  <p class="confirm-button turnBoxButton">
                    CONFIRM
                  </p>
                </div>
                <div>
                  <p class="cancel turnBoxButton turnBoxButtonPrev">CANCEL</p>
                  <p class="send turnBoxButton">SEND</p>
                </div>
              </span>
            </div>
            <div>
              <p class="turnBoxButton turnBoxButtonPrev">SENDING SUCCEEDED</p>
            </div>
          </div>
        </div>
        <div class="example-wrapper">
          <h2>DIALOG B</h2>
          <div class="example alert-dialog">
            <div>
              <p class="turnBoxButton">
                ALERT
              </p>
            </div>
            <div>
              <img src="/images/turnbox/icon_caution.png" alt="information">
              <p class="message">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <span class="ok">OK</span>
              <span class="cancel">CANCEL</span>
            </div>
            <div>
              <p class="turnBoxButton turnBoxButtonPrev">CONFIRMED</p>
            </div>
          </div>
        </div>
      </div>

      <div class="examples tab-wrapper">
        <div class="tabs">
          <h2>TAB</h2>
          <div class="example tab tab-1">
            <div>
              <p class="turnBoxButton turnBoxNext">TAB1</p>
            </div>
            <div>
              <p>TAB1</p>
            </div>
          </div>
          <div class="example tab tab-2">
            <div>
              <p class="turnBoxButton turnBoxNext">TAB2</p>
            </div>
            <div>
              <p>TAB2</p>
            </div>
          </div>
          <div class="example tab tab-3">
            <div>
              <p class="turnBoxButton turnBoxNext">TAB3</p>
            </div>
            <div>
              <p>TAB3</p>
            </div>
          </div>
        </div>
        <div class="example content-box">
          <div>CONTENT 1</div>
          <div>CONTENT 2</div>
          <div>CONTENT 3</div>
        </div>
      </div>
      <div class="examples plural-box">
        <div class="radio-wrapper">
          <h2>RADIO</h2>
          <div class="example radio">
            <div>
              <p class="turnBoxButton">OFF</p>
            </div>
            <div>
              <p>ON</p>
            </div>
          </div>
          <div class="example radio">
            <div>
              <p class="turnBoxButton">OFF</p>
            </div>
            <div>
              <p>ON</p>
            </div>
          </div>
          <div class="example radio">
            <div>
              <p class="turnBoxButton">OFF</p>
            </div>
            <div>
              <p>ON</p>
            </div>
          </div>
          <div class="example radio">
            <div>
              <p class="turnBoxButton">OFF</p>
            </div>
            <div>
              <p>ON</p>
            </div>
          </div>
        </div>
        <div class="check-box-wrapper">
          <h2>CHECK</h2>
          <div class="example check-box">
            <div>
              <p class="turnBoxButton">OFF</p>
            </div>
            <div>
              <p class="turnBoxButton turnBoxButtonPrev">ON</p>
            </div>
          </div>
          <div class="example check-box">
            <div>
              <p class="turnBoxButton">OFF</p>
            </div>
            <div>
              <p class="turnBoxButton turnBoxButtonPrev">ON</p>
            </div>
          </div>
          <div class="example check-box">
            <div>
              <p class="turnBoxButton">OFF</p>
            </div>
            <div>
              <p class="turnBoxButton turnBoxButtonPrev">ON</p>
            </div>
          </div>
          <div class="example check-box">
            <div>
              <p class="turnBoxButton">OFF</p>
            </div>
            <div>
              <p class="turnBoxButton turnBoxButtonPrev">ON</p>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div class="credit">
          <p>
            Director,Design KeiichiroHirai  <a href="http://twitter.com/hirausan">@hirausan</a><br/>
            Frontend YuheiYamamori
          </p>
          <p>
            This page uses the Spectrum.<a href="http://bgrins.github.io/spectrum/">Spectrum</a> by <a href="https://twitter.com/bgrins">@bgrins.</a>
          </p>
        </div>
        <div class="sns-buttons bottom">
          <!-- google+1 -->
          <span class="sns-button google">
            <div class="g-plusone" data-size="medium" data-annotation="none"></div>
          </span>
          <!-- Hatena -->
          <span class="sns-button hatena">
            <a href="http://b.hatena.ne.jp/entry/http://noht.co.jp/turnbox" class="hatena-bookmark-button" data-hatena-bookmark-title="TURNBOX.js" data-hatena-bookmark-layout="simple" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a>
          </span>
          <!-- Twitter-->
          <span class="sns-button twitter">
            <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://noht.co.jp/turnbox" data-count="none" data-lang="en">Tweet</a>
          </span>
          <!-- Facebook-->
          <span class="sns-button facebook">
            <iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fnoht.co.jp%2Fturnbox&amp;width=130&amp;locale=en_US&amp;layout=button&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:48px; height:21px;" allowTransparency="true"></iframe>
          </span>
        </div>
        <div class="logo">
          <a href="/">
            <img src="/images/turnbox/logo_noht_white.png" alt="">
          </a>
        </div>
      </footer>
    </div>
    <div class="usage">
      <div class="language-wrap">
        <div class="language en">
          <div>
            <p class="turnBoxButton">
              <img src="/images/turnbox/icon_flag_en.png" alt="">
            </p>
          </div>
          <div>
            <p class="turnBoxButton">
              <img src="/images/turnbox/icon_flag_en.png" alt="">
            </p>
          </div>
        </div>
        <div class="language jp">
          <div>
            <p class="turnBoxButton">
              <img src="/images/turnbox/icon_flag_jp.png" alt="">
            </p>
          </div>
          <div>
            <p class="turnBoxButton">
              <img src="/images/turnbox/icon_flag_jp.png" alt="">
            </p>
          </div>
        </div>
      </div>
      <section class="set-up">
        <h2>Set up</h2>
        <div class="description">
          <sapn class="text en">
            We use jQuery.Load turnBox.js after loading jquery.js.
          </sapn>
          <sapn class="text jp">
            jQueryを使用しています。jquery.jsを読み込んだ後でturnBox.jsを読み込んでください。
          </sapn>
        </div>
        <pre>
          <div class="code">
&lt;<span class="code-color tag">script</span> <span class="code-color attribute">src</span>=<span class="code-color string">"//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"</span>>&lt;/<span class="code-color tag">script</span>&gt;
&lt;<span class="code-color tag">script</span> <span class="code-color attribute">type</span>=<span class="code-color string">"text/javascript"</span> <span class="code-color attribute">src</span>=<span class="code-color string">"/js/turnBox.js"</span>&gt;&lt;/<span class="code-color tag">script</span>&gt;
          </div>
        </pre>
      </section>
      <section class="html">
        <h2>HTML</h2>
        <div class="description">
          <span class="text en">
            Create a child element for each screen you wish to generate, directly below the element where you want to call turnBox.js.<br/>
            Minimum 2, maximum 4. If there are 5 or more child elements, they will be deleted.
          </span>
          <span class="text jp">
            turnBox.jsを適用したい要素の直下に、生成したい面の数だけ子要素を設置してください。<br/>
            最低は2、最大は4です。5以上の子要素がある場合は削除されます。
          </span>
        </div>
        <pre>
          <div class="code">
&lt;<span class="code-color tag">div</span> <span class="code-color attribute">class</span>=<span class="code-color string">"sample"</span>&gt;
  &lt;<span class="code-color tag">div</span>&gt;&lt;/<span class="code-color tag">div</span>&gt;
  &lt;<span class="code-color tag">div</span>&gt;&lt;/<span class="code-color tag">div</span>&gt;
  &lt;<span class="code-color tag">div</span>&gt;&lt;/<span class="code-color tag">div</span>&gt;
  &lt;<span class="code-color tag">div</span>&gt;&lt;/<span class="code-color tag">div</span>&gt;
&lt;/<span class="code-color tag">div</span>&gt;
          </div>
        </pre>
      </section>
      <section class="js">
        <h2>JS</h2>
        <div class="description">
          <span class="text en">
            When the .turnBox() method is applied to a target element, it will generate it with default values.<br/>
            Check the "Defaults and options" section to see which parameters can be changed.
          </span>
          <span class="text jp">
            対象となる要素に.turnBox()のメソッドを適用するとデフォルトの値で作成されます。<br/>
            変更可能なパラメータはDefaults and optionsで確認して下さい。
          </span>
        </div>
        <pre>
          <div class="code">
<span class="code-color jquery">$</span>(<span class="code-color string">".sample"</span>).turnBox();
          </div>
        </pre>
      </section>
      <section class="defaults-and-options">
        <h2>Defaults and options</h2>
        <pre>
          <div class="code">
// Defaults //

<span class="code-color jquery">$</span>(<span class="code-color string">".sample"</span>).turnBox({
  width: <span class="code-color number">200</span>,
  height: <span class="code-color number">50</span>,
  axis: <span class="code-color string">"X"</span>,
  even:,
  perspective: <span class="code-color number">800</span>,
  duration: <span class="code-color number">200</span>,
  delay: <span class="code-color number">0</span>,
  easing: <span class="code-color string">"linear"</span>,
  direction: <span class="code-color string">"positive"</span>,
  type: <span class="code-color string">"real"</span>
});
          </div>
        </pre>
        <div class="description">
          <span class="text en">
            width: Width of box.<br/>
            height: Height of box.<br/>
            axis: Sets rotation axis. "X" for vertical rotation, "Y" for horizontal rotation.<br/>
            even: Length of even-numbered screens.<br/>
            axis: Set to "X" for vertical width, "Y" for horizontal width. If not set, both will be equal.<br/>
            perspective: Intensity of perspective.<br/>
            duration: Duration of animation.<br/>
            delay: Delay time before animation starts.<br/>
            easing: Pace of animation. When easing is set using a transition-timing-function, bezier curves can be entered.<br/>
            direction: Direction of rotation. "negative" will reverse the rotation.<br/>
            type: The following three types of rotation animation can be selected:
          </span>
          <span class="text jp">
            width: ボックスの横幅。<br/>
            height: ボックスの縦幅。<br/>
            axis: 回転軸の設定。"X"なら縦回転、"Y"なら横回転。<br/>
            even: 偶数面の長さ。axis: "X"なら縦幅、"Y"なら横幅に設定されます。設定しない場合は等幅になります。<br/>
            perspective: パースペクティブの強さ。<br/>
            duration: アニメーションの時間。<br/>
            delay: アニメーションを開始するまでの時間。<br/>
            easing: アニメーションの緩急。transition-timing-functionで設定できるeasing、ペジェ曲線を入力できます。<br/>
            direction: 回転方向の設定。"negative"で逆回転します。<br/>
            type: 回転アニメーションを以下の３種類から選択できます。
          </span>
        </div>
        <ul class="types">
          <li>
            <span class="text en">
              <span class="code-color string">"real"</span><br/>
              Rotates the screen 90° at a time like an actual box.<br/>
              Can be set to even.
            </span>
            <span class="text jp">
              <span class="code-color string">"real"</span><br/> 実際の箱のように９０°ずつ面を回転させます。<br/>
              even設定可能。
            </span>
          </li>
          <li>
            <span class="text en">
              <span class="code-color string">"repeat"</span><br/>
              Will repeat the animated movement of screens 1 and 2 for screens 3 and 4.<br/>
              Can be set to even.
            </span>
            <span class="text jp">
              <span class="code-color string">"repeat"</span><br/>
              ３・４面を１・２面と同じ動きでアニメーションを繰り返します。<br/>
              even設定可能。
            </span>
          </li>
          <li>
            <span class="text en">
              <span class="code-color string">"skip"</span><br/>
              Will cancel the display of a passing screen, and rotate the animation 90°relative to the designated screen.<br/>
              A screen can be designated using <span class="code-color string">"turnBoxButtonTo"</span> on the turnBoxButton.
            </span>
            <span class="text jp">
              <span class="code-color string">"skip"</span><br/> 通過する面の表示をキャンセルして、指定した面に９０°の回転でアニメーションをします。<br/>
              面の指定はturnBoxButtonの<span class="code-color string">"turnBoxButtonTo"</span>で行えます。
            </span>
          </li>
        </ul>
      </section>
      <section class="turn-box-button">
        <h2>turnBoxButton</h2>
        <div class="description set-button">
          <span class="text en">
            By adding a <span class="code-color string">"turnBoxButton"</span> class to the child element of a screen, you can set a trigger for box rotation.<br/>
            By default, an animation is set for the next screen. However, by adding <span class="code-color string">"turnBoxButtonPrev"</span> to the class, you can change this to the previous screen.
          </span>
          <span class="text jp">
            面の子要素にclass<span class="code-color string">"turnBoxButton"</span>を追加することでボックスを回転させるトリガーに設定できます。<br/>
            デフォルトでは次の面にアニメーションするように設定されていますが、<br/>
            classに<span class="code-color string">"turnBoxButtonPrev"</span>を追加することで前の面にアニメーションするよう変更できます。
          </span>
        </div>
        <div class="description add-events">
          <span class="text en">
            By default, the turnBoxButton event is set to <span class="code-color string">"click"</span>, but this can be changed by adding the following class.<br/>
            The character strings after <span class="code-color string">"turnboxButtonEvent"</span> correspond to the jQuery event name.
          </span>
          <span class="text jp">
            turnBoxButtonのイベントはデフォルトでは<span class="code-color string">"click"</span>に設定されていますが、<br/>
            以下のclassを追加することで変更できます。<br/>
            <span class="code-color string">"turnBoxButtonEvent"</span>の後の文字列がjQueryのイベント名に対応しています。
          </span>
        </div>
        <ul class="events">
          <li><span class="code-color string">"turnBoxButtonEventClick"</span></li>
          <li><span class="code-color string">"turnBoxButtonEventMouseover"</span></li>
          <li><span class="code-color string">"turnBoxButtonEventMouseup"</span></li>
          <li><span class="code-color string">"turnBoxButtonEventMousedown"</span></li>
          <li><span class="code-color string">"turnBoxButtonEventMousemove"</span></li>
          <li><span class="code-color string">"turnBoxButtonEventMouseout"</span></li>
          <li><span class="code-color string">"turnBoxButtonEventTouchstart"</span></li>
          <li><span class="code-color string">"turnBoxButtonEventTouchmove"</span></li>
          <li><span class="code-color string">"turnBoxButtonEventTouchend"</span></li>
        </ul>
        <div class="description skip-button">
          <span class="text en">
            For boxes which are set to type: <span class="code-color string">"skip"</span>, using the <span class="code-color string">"turnBoxButtonTo"</span> class and adding the number of the screen to be animated will cancel the display of a passing screen, and result in a 90° rotation of the designated screen.
          </span>
          <span class="text jp">
            type: <span class="code-color string">"skip"</span>に設定してあるボックスでは、classに<span class="code-color string">"turnBoxButtonTo"</span>と、移動先の面の番号を追加することで<br/>通過する面の表示をキャンセルして、指定した面に９０°の回転でアニメーションをします。
          </span>
        </div>
        <pre>
          <div class="code">
&lt;<span class="code-color tag">div</span> <span class="code-color attribute">class</span>=<span class="code-color string">"sample"</span>&gt;
  &lt;<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
  &lt;<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton turnBoxButtonPrev"</span>&gt;PREV&lt;/<span class="code-color tag">span</span>&gt;
    &lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">span</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
  &lt;<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton turnBoxButtonEventMouseover turnBoxButtonEventTouchstart"</span>&gt;NEXT&lt;/<span class="code-color tag">span</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
  &lt;<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton turnBoxButtonTo1"</span>&gt;skip to 1&lt;/<span class="code-color tag">span</span>&gt;
    &lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton turnBoxButtonTo2"</span>&gt;skip to 2&lt;/<span class="code-color tag">span</span>&gt;
    &lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton turnBoxButtonTo3"</span>&gt;skip to 3&lt;/<span class="code-color tag">span</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
&lt;/<span class="code-color tag">div</span>&gt;
          </div>
        </pre>
      </section>
      <section class="css">
        <h2>CSS</h2>
        <div class="description">
          <span class="text en">
            By applying CSS, you can use a class that is set by .turnBox() in addition to the preset id class. <br/>
            This designates the numerical value of the screen following <span class="code-color string">"turnBoxFaceNum"</span>.
          </span>
          <span class="text jp">
            CSSを適用する場合、予め設定したid・classの他に、.turnBox()で設定されたclassを使用することができます。<br/>
            <span class="code-color string">"turnBoxFaceNum"</span>の後に面の数値を指定します。
          </span>
        </div>
        <h3>DEMO</h3>
        <div class="demo">
          <div class="css-sample">
            <div id="css-sample-front">
              <p class="turnBoxButton">NEXT</p>
            </div>
            <div>
              <p class="turnBoxButton">NEXT</p>
            </div>
            <div>
              <p class="turnBoxButton">NEXT</p>
            </div>
            <div>
              <p class="turnBoxButton">NEXT</p>
            </div>
          </div>
        </div>
        <pre>
          <div class="code">
&lt;<span class="code-color tag">style</span>&gt;

  <span class="code-color attribute">.turnBoxButton</span> {
    <span class="code-color function">line-height</span>: <span class="code-color number">2.5</span>;
    <span class="code-color function">display</span>: <span class="code-color function">block</span>;
    <span class="code-color function">text-align</span>: <span class="code-color function">center</span>;
  }

  <span class="code-color attribute">#css-sample-front</span> {
    <span class="code-color function">background</span>: <span class="code-color function">red</span>;
  }

  <span class="code-color attribute">.turnBoxFaceNum2</span> {
    <span class="code-color function">background</span>: <span class="code-color function">blue</span>;
  }

  <span class="code-color attribute">.turnBoxFaceNum3</span> {
    <span class="code-color function">background</span>: <span class="code-color function">green</span>;
  }

  <span class="code-color attribute">.turnBoxFaceNum4</span> {
    <span class="code-color function">background</span>: <span class="code-color function">gray</span>;
  }

&lt;/<span class="code-color tag">style</span>&gt;

&lt;<span class="code-color tag">div</span> <span class="code-color attribute">class</span>=<span class="code-color string">"css-sample"</span>&gt;
  &lt;<span class="code-color tag">div</span> <span class="code-color attribute">id</span>=<span class="code-color string">"css-sample-front"</span>&gt;
    &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
&lt;/<span class="code-color tag">div</span>&gt;

&lt;<span class="code-color tag">script</span> <span class="code-color attribute">type</span>=<span class="code-color string">"text/javascript"</span>&gt;

  <span class="code-color jquery">$</span>(<span class="code-color string">".css-sample"</span>).turnBox();

&lt;/<span class="code-color tag">script</span>&gt;
          </div>
        </pre>
      </section>
      <section class="turn-box-link">
        <h2>turnBoxLink</h2>
        <div class="description set-link">
          <span class="text en">
            The .turnBoxLink() method is used to start an animation from outside the box, by using the designated element as a button.<br/>
            In a similar manner, an external box can be operated by creating another box inside the first box.
          </span>
          <span class="text jp">
            ボックスを外部からアニメーションさせる場合はボタンに設定したい要素に.turnBoxLink()のメソッドを適用します。<br/>
            ボックスの内側にもう一つボックスを作って外側のボックスを操作する場合も同様です。
          </span>
        </div>
        <h3>Defaults and options</h3>
        <pre>
          <div class="code">
// Defaults //

<span class="code-color jquery">$</span>(<span class="code-color string">".link-sample"</span>).turnBoxLink({
  box: ,
  events: <span class="code-color string">"click"</span>,
  dist: <span class="code-color string">"next"</span>
});
          </div>
        </pre>
        <div class="description parameter">
          <span class="text en">
            box: Selects the box to be animated.<br/>
            events: JQuery event. You can set plural events by delimiting them by spaces.<br/>
            dist: Setting this to <span class="code-color string">"prev"</span> will use an animation to move to the previous screen. When the box is type: <span class="code-color string">"skip"</span>, entering the screen number will use an animation to move to the desired screen.
          </span>
          <span class="text jp">
            box: 対象となるボックスのセレクタ。<br/>
            events: jQueryイベント。複数設定する場合は半角スペースを開けて入力してください。<br/>
            dist: <span class="code-color string">"prev"</span>で前の面へアニメーション。対象のボックスがtype: <span class="code-color string">"skip"</span>の場合は数値を入力で指定した面へアニメーション。
          </span>

        </div>
        <h3>DEMO</h3>
        <div class="demo">
          <div class="sample-box">
            <div>
              <span>1:</span>
              <p class="turnBoxButton">NEXT</p>
            </div>
            <div>
              <span>2:</span>
              <div class="child-box">
                <div>
                  <p class="turnBoxButton">NEXT</p>
                </div>
                <div>
                  <span class="link-button-inner">LINK</span>
                </div>
              </div>
            </div>
            <div>
              <span>3:</span>
              <p class="turnBoxButton turnBoxButtonPrev">PREV</p>
            </div>
            <div>
              <span>4:</span>
            </div>
          </div>
          <span class="link-button-prev">PREV</span>
          <span class="link-button-next">NEXT</span>
          <span class="link-button-skip">skip to 2</span>
        </div>
        <pre>
          <div class="code">
&lt;<span class="code-color tag">div</span> <span class="code-color attribute">class</span>=<span class="code-color string">"link-sample"</span>&gt;
  &lt;<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
  &lt;<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">div</span> <span class="code-color attribute">class</span>=<span class="code-color string">"child-box"</span>&gt;
      &lt;<span class="code-color tag">div</span>&gt;
        &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
      &lt;/<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">div</span>&gt;
        &lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"link-button-inner"</span>&gt;LINK&lt;/<span class="code-color tag">span</span>&gt;
      &lt;/<span class="code-color tag">div</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
  &lt;<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton turnBoxButtonPrev"</span>&gt;PREV&lt;/<span class="code-color tag">span</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
  &lt;<span class="code-color tag">div</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
&lt;/<span class="code-color tag">div</span>&gt;

&lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"link-button-prev"</span>&gt;PREV&lt;/<span class="code-color tag">span</span>&gt;
&lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"link-button-next"</span>&gt;NEXT&lt;/<span class="code-color tag">span</span>&gt;
&lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"link-button-skip"</span>&gt;skip to 2&lt;/<span class="code-color tag">span</span>&gt;

&lt;<span class="code-color tag">script</span> <span class="code-color attribute">type</span>=<span class="code-color string">"text/javascript"</span>&gt;

  <span class="code-color jquery">$</span>(<span class="code-color string">".link-sample"</span>).turnBox({
    height: <span class="code-color number">60</span>,
    type: <span class="code-color string">"skip"</span>
  });

  <span class="code-color jquery">$</span>(<span class="code-color string">".child-box"</span>).turnBox({
    width: <span class="code-color number">80</span>,
    height: <span class="code-color number">40</span>
  });

  <span class="code-color jquery">$</span>(<span class="code-color string">".link-button-inner"</span>).turnBoxLink({
    box: <span class="code-color string">".link-sample"</span>
  });

  <span class="code-color jquery">$</span>(<span class="code-color string">".link-button-prev"</span>).turnBoxLink({
    box: <span class="code-color string">".link-sample"</span>,
    dist:  <span class="code-color string">"prev"</span>
  });

  <span class="code-color jquery">$</span>(<span class="code-color string">".link-button-next"</span>).turnBoxLink({
    box: <span class="code-color string">".link-sample"</span>
  });

  <span class="code-color jquery">$</span>(<span class="code-color string">".link-button-skip"</span>).turnBoxLink({
    box: <span class="code-color string">".link-sample"</span>,
    events: <span class="code-color string">"mouseover touchstart"</span>,
    dist: <span class="code-color number">2</span>
  });

&lt;/<span class="code-color tag">script</span>&gt;
          </div>
        </pre>
      </section>
      <section class="turn-box-animate">
        <h2>turnBoxAnimate</h2>
        <div class="description set-animate">
          <span class="text en">
            When you want to initialize a box, or change the surface of a box by linking it to another JavaScript function, use the .turnBoxAnimate() function on the target box.
          </span>
          <span class="text jp">
            ボックスを初期化したい場合や、他のjs関数に紐付けてボックスの面を変更したい場合には<br/>
            対象となるボックスに.turnBoxAnimate()を適用してください。
          </span>
        </div>
        <h3>Defaults and options</h3>
        <pre>
          <div class="code">
// Defaults //

<span class="code-color jquery">$</span>(<span class="code-color string">".animate-sample"</span>).turnBoxAnimate({
  face: <span class="code-color number">1</span>,
  animation: <span class="code-color exam">true</span>
});
          </div>
        </pre>
        <div class="description parameter">
          <span class="text en">
            face: designates the numerical value of the face before it is moved.<br/>
            animation: set to <span class="code-color exam">false</span> to disable animations at rotation time.<br/>
            Assuming that the target box does not have the value type: <span class="code-color string">"skip"</span>, this will be set to <span class="code-color exam">false</span> if the current face and the designated face are not connected.
          </span>
          <span class="text jp">
            face: 移動先の面を数値で指定します。<br/>
            animation: <span class="code-color exam">false</span>に設定すると回転時にアニメーションしません。<br/>
            また対象のボックスがtype: <span class="code-color string">"skip"</span>ではない場合に、現在の面とfaceで指定した面が連続でないと<span class="code-color exam">false</span>に設定されます。
          </span>
        </div>
        <h3>DEMO</h3>
        <div class="demo">
          <div class="container">
            <div class="animate-sample">
              <div>
                <span>1:</span>
                <p class="turnBoxButton">NEXT</p>
              </div>
              <div>
                <span>2:</span>
                <p class="turnBoxButton">NEXT</p>
              </div>
              <div>
                <span>3:</span>
                <p class="turnBoxButton">NEXT</p>
              </div>
              <div>
                <span>4:</span>
                <p class="turnBoxButton">NEXT</p>
              </div>
            </div>
            <div class="animate-sample">
              <div>
                <span>1:</span>
                <p class="turnBoxButton">NEXT</p>
              </div>
              <div>
                <span>2:</span>
                <p class="turnBoxButton">NEXT</p>
              </div>
              <div>
                <span>3:</span>
                <p class="turnBoxButton">NEXT</p>
              </div>
              <div>
                <span>4:</span>
                <p class="turnBoxButton">NEXT</p>
              </div>
            </div>
            <div class="animate-sample">
              <div>
                <span>1:</span>
                <p class="turnBoxButton">NEXT</p>
              </div>
              <div>
                <span>2:</span>
                <p class="turnBoxButton">NEXT</p>
              </div>
              <div>
                <span>3:</span>
                <p class="turnBoxButton">NEXT</p>
              </div>
              <div>
                <span>4:</span>
                <p class="turnBoxButton">NEXT</p>
              </div>
            </div>
          </div>
          <span class="animate-true">INIT ANIMATION</span>
          <span class="animate-false">INIT NOT-ANIMATION</span>
        </div>
        <pre>
          <div class="code">
&lt;<span class="code-color tag">div</span> <span class="code-color attribute">class</span>=<span class="code-color string">"container"</span>&gt;
  &lt;<span class="code-color tag">div</span> <span class="code-color attribute">class</span>=<span class="code-color string">"animate-sample"</span>&gt;
    &lt;<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">span</span>&gt;1:&lt;/<span class="code-color tag">span</span>&gt;
      &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">span</span>&gt;2:&lt;/<span class="code-color tag">span</span>&gt;
      &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">span</span>&gt;3:&lt;/<span class="code-color tag">span</span>&gt;
      &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">span</span>&gt;4:&lt;/<span class="code-color tag">span</span>&gt;
      &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
  &lt;<span class="code-color tag">div</span> <span class="code-color attribute">class</span>=<span class="code-color string">"animate-sample"</span>&gt;
    &lt;<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">span</span>&gt;1:&lt;/<span class="code-color tag">span</span>&gt;
      &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">span</span>&gt;2:&lt;/<span class="code-color tag">span</span>&gt;
      &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">span</span>&gt;3:&lt;/<span class="code-color tag">span</span>&gt;
      &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">span</span>&gt;4:&lt;/<span class="code-color tag">span</span>&gt;
      &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
  &lt;<span class="code-color tag">div</span> <span class="code-color attribute">class</span>=<span class="code-color string">"animate-sample"</span>&gt;
    &lt;<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">span</span>&gt;1:&lt;/<span class="code-color tag">span</span>&gt;
      &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">span</span>&gt;2:&lt;/<span class="code-color tag">span</span>&gt;
      &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">span</span>&gt;3:&lt;/<span class="code-color tag">span</span>&gt;
      &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
    &lt;<span class="code-color tag">div</span>&gt;
      &lt;<span class="code-color tag">span</span>&gt;4:&lt;/<span class="code-color tag">span</span>&gt;
      &lt;<span class="code-color tag">p</span> <span class="code-color attribute">class</span>=<span class="code-color string">"turnBoxButton"</span>&gt;NEXT&lt;/<span class="code-color tag">p</span>&gt;
    &lt;/<span class="code-color tag">div</span>&gt;
  &lt;/<span class="code-color tag">div</span>&gt;
&lt;/<span class="code-color tag">div</span>&gt;

&lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"animate-true"</span>&gt;ANIMATION&lt;/<span class="code-color tag">span</span>&gt;
&lt;<span class="code-color tag">span</span> <span class="code-color attribute">class</span>=<span class="code-color string">"animate-false"</span>&gt;NOT-ANIMATION&lt;/<span class="code-color tag">span</span>&gt;

&lt;<span class="code-color tag">script</span> <span class="code-color attribute">type</span>=<span class="code-color string">"text/javascript"</span>&gt;

<span class="code-color jquery">$</span>(<span class="code-color string">".animate-sample"</span>).turnBox({
  height: <span class="code-color number">60</span>,
  type: <span class="code-color string">"skip"</span>
});

<span class="code-color jquery">$</span>(<span class="code-color string">".animate-true"</span>).on(<span class="code-color string">"click"</span>, <span class="code-color function">function</span>()
{
  <span class="code-color jquery">$</span>(<span class="code-color string">".animate-sample"</span>).turnBoxAnimate();
});

<span class="code-color jquery">$</span>(<span class="code-color string">".animate-false"</span>).on(<span class="code-color string">"click"</span>, <span class="code-color function">function</span>()
{
  <span class="code-color jquery">$</span>(<span class="code-color string">".animate-sample"</span>).turnBoxAnimate(
  {
   animation: <span class="code-color exam">false</span>
  });
});

&lt;/<span class="code-color tag">script</span>&gt;
          </div>
        </pre>
      </section>
      <section class="operability-confirmed">
        <h2>Browser support</h2>
        <div class="description note">
          <span class="text en">We have confirmed compatibility with the following browsers.</span>
          <span class="text jp">以下のブラウザで動作を確認しています。</span>
        </div>
        <div class="description browser">
          Google Chrome<br/>
          Firefox<br/>
          Safari<br/>
          Opera<br/>
          Internet Explorer 10+
        </div>
      </section>
      <footer>
        <div class="credit">
          <p>
            Director,Design KeiichiroHirai  <a href="https://twitter.com/hirausan">@hirausan</a><br/>
            Frontend YuheiYamamori
          </p>
          <p>
            This page uses the Spectrum.<a href="http://bgrins.github.io/spectrum/">Spectrum</a> by <a href="https://twitter.com/bgrins">@bgrins.</a>
          </p>
        </div>
        <div class="sns-buttons bottom">
          <!-- google+1 -->
          <span class="sns-button google">
            <div class="g-plusone" data-size="medium" data-annotation="none"></div>
          </span>
          <!-- Hatena -->
          <span class="sns-button hatena">
            <a href="http://b.hatena.ne.jp/entry/http://noht.co.jp/turnbox" class="hatena-bookmark-button" data-hatena-bookmark-title="TURNBOX.js" data-hatena-bookmark-layout="simple" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a>
          </span>
          <!-- Twitter-->
          <span class="sns-button twitter">
            <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://noht.co.jp/turnbox" data-count="none" data-lang="en">Tweet</a>
          </span>
          <!-- Facebook-->
          <span class="sns-button facebook">
            <iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fnoht.co.jp%2Fturnbox&amp;width=130&amp;locale=en_US&amp;layout=button&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:48px; height:21px;" allowTransparency="true"></iframe>
          </span>
        </div>
        <div class="logo">
          <a href="/">
            <img src="/images/turnbox/logo_noht_white.png" alt="">
          </a>
        </div>
      </footer>
    </div>
    <div class="download">
      <div class="download-content">
        <h2>
          TURNBOX.js
        </h2>
        <p>
          jQuery plugin<br/>
          Version 1.0
        </p>
        <div class="download-button">
          <div>
            <p class="turnBoxButton">Download</p>
          </div>
          <div>
            <a href="https://github.com/nohtcoltd/turnbox_js/archive/master.zip">Download</a>
          </div>
        </div>
        <div class="github-button">
          <div><span class="turnBoxButton">Download by Github </span></div>
          <div><a href="https://github.com/nohtcoltd/turnbox_js">Download by Github </a></div>
        </div>
      </div>
      <footer>
        <div class="credit">
          <p>
            Director,Design KeiichiroHirai  <a href="https://twitter.com/hirausan">@hirausan</a><br/>
            Frontend YuheiYamamori
          </p>
          <p>
            This page uses the Spectrum.<a href="http://bgrins.github.io/spectrum/">Spectrum</a> by <a href="https://twitter.com/bgrins">@bgrins.</a>
          </p>
        </div>
        <div class="sns-buttons bottom">
          <!-- google+1 -->
          <span class="sns-button google">
            <div class="g-plusone" data-size="medium" data-annotation="none"></div>
          </span>
          <!-- Hatena -->
          <span class="sns-button hatena">
            <a href="http://b.hatena.ne.jp/entry/http://noht.co.jp/turnbox" class="hatena-bookmark-button" data-hatena-bookmark-title="TURNBOX.js" data-hatena-bookmark-layout="simple" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a>
          </span>
          <!-- Twitter-->
          <span class="sns-button twitter">
            <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://noht.co.jp/turnbox" data-count="none" data-lang="en">Tweet</a>
          </span>
          <!-- Facebook-->
          <span class="sns-button facebook">
            <iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fnoht.co.jp%2Fturnbox&amp;width=130&amp;locale=en_US&amp;layout=button&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:48px; height:21px;" allowTransparency="true"></iframe>
          </span>
        </div>
        <div class="logo">
          <a href="/">
            <img src="/images/turnbox/logo_noht_white.png" alt="">
          </a>
        </div>
      </footer>
    </div>
  </div>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.11.0.min.js"><\/script>')</script>
  <script type="text/javascript" src="/js/vendor/spectrum.js"></script>
  <script type="text/javascript" src="/js/turnBox.js"></script>
  <script type="text/javascript" src="/js/turnBoxLayout.js"></script>
  <?php include("templates/ga.php"); ?>
</body>
</html>
