$(function() {
  $(document).ready(function() {
    if(support_pushstate() && $('html').hasClass("csstransitions")) {
      asynchronous_load_contents();
      pjax_page_transition();
      css_reload();
    }

    var $targets = $('.product_content'),
        height = '405';

    add_os();
    content_lazy_load($targets);
    banner_animation($targets)
  })


  //========================================
  // pjax関連
  //========================================
  function support_pushstate() {
    return (typeof(window.history.pushState) != undefined) ? true : false;
  };

  function asynchronous_load_contents() {
    $('.ajax-content').each(function() {
      var _self = this;
      if(_self.childElementCount == 0) {
        var url = ($(_self).data('ajax'));
        $.ajax({
          type: 'GET',
          url: url,
          dataType: 'html',
          success: function(data) {
            $(_self).html(data);
          }
        })
      }
    })
  }

  function pjax_page_transition() {
    page_animation_init()
    $(document).on('click', '.pjax-link', function(e) {
      var url = $(this).context.href;
      window.history.pushState(null, "", url);

      page_animation_main();
      return false;
    });

    $(window).on('popstate', function(e) {
      page_animation_main();
      return false;
    })
  }

  //========================================
  // ページ切り替えアニメーション関連
  //========================================
  // pjaxでURLが書き換わった後で
  // classを書き換えて実行
  function page_animation_init() {
    var target_path = get_target_path();
    set_target_path(target_path);
  }

  function page_animation_main() {
    var current_wrapper = get_current_wrapper()
    var current_path = get_current_path(current_wrapper);
    var target_path = get_target_path();

    do_animation(current_path, target_path);
  }

  function get_current_wrapper() {
    return ($('body').attr('class'));
  }

  function get_current_path(current_wrapper) {
    return ($('#' + current_wrapper)).attr('class');
  }

  function set_target_path(target_path) {
    var wrapper_class_name = (target_path == 'recruit')? 'wrapper2': 'wrapper1';

    $('body').removeClass().addClass(wrapper_class_name);
    $('#' + wrapper_class_name).removeClass().addClass(target_path);
  }

  function get_target_path () {
    var path = window.location.pathname;
    parsed_path = path.split("/");
    parsed_path.splice(0, 1);

    if(parsed_path[0] == "") {
      var target_path = 'index';
    } else {
      var target_path = parsed_path[0];
    }

    return target_path;
  }

  function do_animation(current_path, target_path) {

    if(current_path == target_path) {
      return false;
    }

    reset_transition();
    if (current_path == 'recruit' || target_path == 'recruit') {
      wrapper_animation();
    } else if (target_path == 'index') {
      content_animation_fade1(current_content, target_content);
    } else if (current_path == 'index') {
      content_animation_fade2(current_content, target_content);
    } else {
      content_animation_transform()
    }
    set_target_path(target_path);
  }

  function reset_transition() {
    $('#wrapper1, #wrapper2').css({'transition': 'none'});
    $('.site-content').css({'transition': 'none'});
  }

  function wrapper_animation() {
    var duration = "600",

    timing_functions = 'linear, linear',
    durations = duration + 'ms ,0',
    properties = 'all, z-index',
    delays = '0, ' + duration/2 +'ms';

    $('#wrapper1, #wrapper2').css({
      'transition-timing-function': timing_functions,
      'transition-duration': durations,
      'transition-property': properties,
      'transition-delay': delays
    });
  }

  function content_animation_fade1(current_content, target_content) {
    var
    duration = "500",

    timing_functions = 'linear',
    durations = duration + 'ms',
    properties = 'opacity',
    delays = '0';

    current_path = '#' + current_path;
    target_path = '#' + target_path;

    $('.site-content').css({
      'transition-timing-function': timing_functions,
      'transition-duration': '0',
      'transition-property': properties,
      'transition-delay': '0'
    });

    $(current_path).css({
      'transition-timing-function': timing_functions,
      'transition-duration': durations,
      'transition-property': properties,
      'transition-delay': delays
    });

    $(target_path).css({
      'transition-timing-function': timing_functions,
      'transition-duration': durations,
      'transition-property': properties,
      'transition-delay': delays
    });
  }

  function content_animation_fade2(current_content, target_content) {
    var
    duration = "500",

    timing_functions = 'linear',
    durations = duration + 'ms',
    properties = 'opacity',
    delays = '0';

    current_content = '#' + current_content;
    target_content = '#' + target_content;

    $('.site-content').css({
      'transition-timing-function': timing_functions,
      'transition-duration': '0',
      'transition-property': properties,
      'transition-delay': duration + 'ms'
    });

    $(current_content).css({
      'transition-timing-function': timing_functions,
      'transition-duration': durations,
      'transition-property': properties,
      'transition-delay': delays
    });

    $(target_content).css({
      'transition-timing-function': timing_functions,
      'transition-duration': durations,
      'transition-property': properties,
      'transition-delay': delays
    });
  }

  function content_animation_transform() {
    var duration = "800",

    timing_functions = 'cubic-bezier(0.215, 0.61, 0.355, 1), linear',
    durations = duration + 'ms, 0',
    properties = 'all, opacity',
    delays = '0, 0';

    $('.site-content').css({
      'transition-timing-function': timing_functions,
      'transition-duration': durations,
      'transition-property': properties,
      'transition-delay': delays
    });
  }

  //========================================
  // ウインドウリサイズ時に呼ばれる関数
  //========================================
  function css_reload() {
    do_reload();
    var timer = false;
    $(window).resize(function() {
      if (timer !== false) {
        clearTimeout(timer);
      }
      timer = setTimeout(function() {
        do_reload();
      }, 200);
    });
  }

  function do_reload() {
    var style_id = 'transform_style';
    var content_half_width = $('#index').innerWidth() / 2;
    var wrapper_half_height = $('#wrapper1').innerHeight() / 2;

    console.log(content_half_width);

    var
    css_template = '<style id="%style_id%">\
    .about #products {\
      -webkit-transform: rotateY(-90deg) translate3d(-%content_half_width%px, 0px, %content_half_width%px);\
    }\
    .products #about {\
      -webkit-transform: rotateY(90deg) translate3d(%content_half_width%px, 0px, %content_half_width%px);\
    }\
    #wrapper1 {\
      -webkit-transform: rotateX(-90deg) translate3d(0px, %wrapper_half_height%px, %wrapper_half_height%px);\
    }\
    #wrapper2 {\
      -webkit-transform: rotateX(90deg) translate3d(0px, -%wrapper_half_height%px, %wrapper_half_height%px);\
    }\
    </style>';

    var style = css_template.replace(/%content_half_width%/g, content_half_width);
    style = style.replace(/%wrapper_half_height%/g, wrapper_half_height);
    style = style.replace(/%style_id%/g, style_id);

    if(document.getElementById(style_id) != null) {
      $('#' + style_id).remove();
    }
    $('head').append(style);
  }

  //========================================
  //macとwindowsそれぞれにクラスを付加
  //========================================
  var add_os = function()
  {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.indexOf("win") != -1) {
      $('html').addClass('windows');
    } else if(ua.indexOf("mac") != -1) {
      $('html').addClass('mac');
    } else {
    }
  };

  //========================================
  //バナーの切り替わり
  //========================================
  var banner_animation = function($targets)
  {
    $targets.each(function() {
      var $self = $(this);
      $self.on('click', function() {
        $self.toggleClass("animated");
      });
    })
  };


  //========================================
  //定量スクロール
  //========================================
  $(document).ready(function() {
    /*
    $('#main').mCustomScrollbar({
      contentTouchScrool: true,
      advanced: {
        updateOnBrowserResize: true
      }
    });
    */
  });

  /*
   var scroll_fixed_amount = function(height)
   {
     var is_animated = false,
         scroll_speed,
         //進行方向に応じたスクロール量を返す
     get_scroll_amount = function(height, range_y) {
       var current = $('body').scrollTop(),
           quotient = Math.floor(current / height),
           remind = current % height;

       if(range_y < 0) {
         return (quotient + 1) * height;
       } else if (range_y > 0 && remind != 0) {
         return quotient * height;
       } else if (range_y > 0 && remind == 0) {
         return (quotient - 1) * height;
       }
     },
     do_scroll = function(amount, duration) {
       $('body').animate({scrollTop: amount}, {'duration': duration, 'easing': 'easeOutQuad'});
     },
     execute = function(height, deltaY)
     {
       if(!is_animated) {
         is_animated = true;
         if(deltaY != 0){

           var duration = 400,
               amount = get_scroll_amount(height, deltaY);

           do_scroll(amount, duration);
           setTimeout(function() {
             is_animated = false;
           }, duration);
         }

         return false;
       } else {
         return false;
       }
     };

     //mousewheelに関する部分
     $(window).on('mousewheel', function(e, delta, deltaX, deltaY) {


       if(Math.abs(deltaY) > scroll_speed) {
         execute(height, deltaY);
       };

       scroll_speed = Math.abs(deltaY);
       return false;
     })
     //key入力に対する部分
     $(window).on('keydown', function(e) {
       //下方向キー
       if(e.keyCode == 40) {
         var deltaY = -1;
         execute(height, deltaY);
         return false;

         //上方向キー
       } else if (e.keyCode == 38) {
         var deltaY = 1;
         execute(height, deltaY);
         return false;

         //シフト+スペースキー
       } else if (e.shiftKey && e.keyCode == 32) {
         var deltaY = 1;
         execute(height, deltaY);
         return false;

         //スペースキー
       } else if (e.keyCode == 32) {
         var deltaY = -1;
         execute(height, deltaY);
         return false;
       }
     });
   };
   */

  //========================================
  //プロダクトページ コンテンツ順次ロード用関数
  //========================================
  function content_lazy_load($targets)
  {
    var count = 0,
        duration = 300;

    $targets.each(function() {
      var $self = $(this);

      $self.on('inview', function() {
        if($self.hasClass('loaded')){
          return false;
        }

        setTimeout(function() {
          $self.addClass("loaded");
        }, count * duration);

        count++

        setTimeout(function() {
          count--;
        }, count * duration);
      });
    })
  };

});
