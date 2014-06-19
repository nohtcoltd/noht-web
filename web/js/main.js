$(function()
{
  var current_content;
  var index_function = false;
  var about_function = false;
  var products_function = false;

  $(document).ready(function()
  {
    if(support_pushstate() && $('html').hasClass("csstransitions")) {
      asynchronous_load_contents();
      pjax_page_transition();
      css_reload();
    }

    wrapper_transition_fix();
    page_animation();
    smart_phone_menu();
    add_os();
  });

  //-------------------------------------------------
  // スマホサイズ時のメニューの表示
  //-------------------------------------------------
  function smart_phone_menu()
  {
    $(document).on("click", ".menu-button", function()
    {
      $("#header").toggleClass("show");
    });
    $(document).on("click", ".pjax-link", function()
    {
      $("#header").removeClass("show");
    });
    $(window).on("popstate", function()
    {
      $("#header").removeClass("show");
    });
  }

  //-------------------------------------------------
  // pjax関連
  //-------------------------------------------------
  function support_pushstate()
  {
    return (typeof(window.history.pushState) != undefined) ? true : false;
  };

  function asynchronous_load_contents()
  {
    $('.ajax-content').each(function()
    {
      var _self = this;
      if($(_self).children().length == 0) {

        var url = ($(_self).data('ajax'));
        if(url === "/") {
          url = "/index";
        }
        url = url + "/xhr";

        $.ajax(
        {
          type: 'GET',
          url: url,
          dataType: 'html',
          success: function(data)
          {
            $(_self).html(data);
          }
        });
      }
    });
  }

  function pjax_page_transition()
  {
    var page_animate = false;
    $(document).on('click', '.pjax-link', function(e)
    {
      var url = $(this).context.href;

      if(!page_animate) {
        page_animate = true;
        window.history.pushState(null, "", url);
        page_animation();
        ga_send();
      }
      setTimeout(function()
      {
        page_animate = false;
      }, 1000);

      return false;
    });

    $(window).on('popstate', function(e)
    {
      page_animation();
      ga_send();
      return false;
    });
  }

  function ga_send()
  {
     var location = window.location.pathname + window.location.search;
     if(ga) {
        ga('send', 'pageview', location);
     }
  }
  //-------------------------------------------------
  // ページ切り替えアニメーション関連
  //-------------------------------------------------
  // pjaxでURLが書き換わった後で
  // classを書き換えて実行

  function get_current_wrapper()
  {
    return ($('body').attr('class'));
  }

  function get_current_path(current_wrapper)
  {
    var path = $('#' + current_wrapper).attr('class');
    var current_path = path.split(" ")[0];

    return current_path;
  }

  function get_target_path()
  {
    var path = window.location.pathname;
    parsed_path = path.split("/");
    parsed_path.splice(0, 1);

    if(parsed_path[0] == "contact") {
      //var target_path = 'index';
      // productsをindexに設定している間のみ
      var target_path = 'products';
    }
    if(parsed_path[0] == "") {
      //var target_path = 'index';
      // productsをindexに設定している間のみ
      var target_path = 'products';
    } else {
      var target_path = parsed_path[0];
    }

    return target_path;
  }

  function page_animation()
  {
    var current_wrapper = get_current_wrapper();
    var current_path = get_current_path(current_wrapper);
    var target_path = get_target_path();
    var target_wrapper = (target_path == 'contact')? 'wrapper2': 'wrapper1';

    if (target_path == 'index') {
      init_index_function();
    }
    if (target_path == 'about') {
      init_about_function();
      document.title = "ABOUT - NOHT.,CO.LTD.";
    }
    if (target_path == 'products') {
      init_products_function();
      document.title = "NOHT.,CO.LTD.";
    }
    if (target_path == 'contact') {
      $.getScript("/js/contact.js");
      document.title = "CONTACT - NOHT.,CO.LTD.";
    }

    current_content = target_path;
    if(target_wrapper == "wrapper1") {
      $("#gmenu li").removeClass("selected");
      $("#gmenu ." + target_path).addClass("selected");
    }

    if(current_path == target_path && current_wrapper == target_wrapper)
    {
      $("#" + current_path).addClass("show");
      return false;
    }

    content_tarnsition(current_path, target_path);

    $('body').removeClass().addClass(target_wrapper);
    $('#' + target_wrapper).removeClass().addClass(target_path + wrapper_transition_fix());
  }

  //アニメーション中だけtransitionを持ったclassの付与する関数
  function content_tarnsition(current_path, target_path)
  {
    $("#" + target_path).addClass("show");
    if(current_path != 'contact' && target_path != 'contact') {

      $("#" + current_path + ", #" + target_path + ", .pjax-link > span").addClass("content-transition");

      if (current_path == 'index') {
        if (target_path == 'about' || target_path == 'products') {
          $(".site-contents").addClass("pers-top");
        }
      }

      if (current_path == 'about' || current_path == 'products') {
        if (target_path == 'index') {
          $(".site-contents").addClass("pers-bottom");
        }
        if (target_path == 'about') {
          $(".site-contents").addClass("pers-left");
        }
        if (target_path == 'products') {
          $(".site-contents").addClass("pers-right");
        }
      }
    }
    setTimeout(function()
    {
      $(".site-contents").removeClass("pers-left pers-right pers-top pers-bottom");
      $(".site-content, .pjax-link > span").removeClass("content-transition");
      $("#" + current_path).removeClass("show");
    }, 800);
  }

  //safariではページ読み込み後にtransitionがかかるため、
  //時間差でtransitionを持ったclassを付与する
  function wrapper_transition_fix()
  {
    var class_name = "wrapper-transition";
    setTimeout(function()
    {
      $("#wrapper1, #wrapper2").addClass(class_name);
    }, 1);

    return " " + class_name;
  }

  //-------------------------------------------------
  // ウインドウリサイズ時に呼ばれる関数
  //-------------------------------------------------
  function css_reload()
  {
    do_reload();
    var timer = false;
    $(window).resize(function()
    {
      if (timer !== false) {
        clearTimeout(timer);
      }
      timer = setTimeout(function()
      {
        do_reload();
      }, 200);
    });
  }

  function do_reload()
  {
    var style_id = 'transform_style';
    var window_width = $(window).innerWidth();
    var header_width = $('#wrapper1 header').innerWidth();
    if(window_width < 700) {
      header_width = 0;
    }
    var content_half_width = (window_width - header_width) / 2;
    var wrapper_half_height = $('#wrapper1').innerHeight() / 2;
    var perspective = content_half_width + header_width;

    var
    css_template = '<style id="%style_id%">\
    .about #about, .about #products, .products #about, .products #products {\
      -webkit-transform-origin: %perspective%px 50%;\
      -moz-transform-origin: %perspective%px 50%;\
      -ms-transform-origin: %perspective%px 50%;\
      -o-transform-origin: %perspective%px 50%;\
      transform-origin: %perspective%px 50%;\
    }\
    .about #products {\
      -webkit-transform: rotateX(0deg) rotateY(-90deg) translate3d(-%content_half_width%px, 0px, %content_half_width%px);\
      -moz-transform: rotateX(0deg) rotateY(-90deg) translate3d(-%content_half_width%px, 0px, %content_half_width%px);\
      -ms-transform: rotateX(0deg) rotateY(-90deg) translate3d(-%content_half_width%px, 0px, %content_half_width%px);\
      -o-transform: rotateX(0deg) rotateY(-90deg) translate3d(-%content_half_width%px, 0px, %content_half_width%px);\
      transform: rotateX(0deg) rotateY(-90deg) translate3d(-%content_half_width%px, 0px, %content_half_width%px);\
    }\
    .products #about {\
      -webkit-transform: rotateX(0deg) rotateY(90deg) translate3d(%content_half_width%px, 0px, %content_half_width%px);\
      -moz-transform: rotateX(0deg) rotateY(90deg) translate3d(%content_half_width%px, 0px, %content_half_width%px);\
      -ms-transform: rotateX(0deg) rotateY(90deg) translate3d(%content_half_width%px, 0px, %content_half_width%px);\
      -o-transform: rotateX(0deg) rotateY(90deg) translate3d(%content_half_width%px, 0px, %content_half_width%px);\
      transform: rotateX(0deg) rotateY(90deg) translate3d(%content_half_width%px, 0px, %content_half_width%px);\
    }\
    .about #index, .products #index {\
      -webkit-transform: rotateX(90deg) rotateY(0deg) translate3d(0px, -%wrapper_half_height%px, %wrapper_half_height%px);\
      -moz-transform: rotateX(90deg) rotateY(0deg) translate3d(0px, -%wrapper_half_height%px, %wrapper_half_height%px);\
      -ms-transform: rotateX(90deg) rotateY(0deg) translate3d(0px, -%wrapper_half_height%px, %wrapper_half_height%px);\
      -o-transform: rotateX(90deg) rotateY(0deg) translate3d(0px, -%wrapper_half_height%px, %wrapper_half_height%px);\
      transform: rotateX(90deg) rotateY(0deg) translate3d(0px, -%wrapper_half_height%px, %wrapper_half_height%px);\
    }\
    .index #about, .index #products {\
      -webkit-transform: rotateX(-90deg) rotateY(0deg) translate3d(0px, %wrapper_half_height%px, %wrapper_half_height%px);\
      -moz-transform: rotateX(-90deg) rotateY(0deg) translate3d(0px, %wrapper_half_height%px, %wrapper_half_height%px);\
      -ms-transform: rotateX(-90deg) rotateY(0deg) translate3d(0px, %wrapper_half_height%px, %wrapper_half_height%px);\
      -o-transform: rotateX(-90deg) rotateY(0deg) translate3d(0px, %wrapper_half_height%px, %wrapper_half_height%px);\
      transform: rotateX(-90deg) rotateY(0deg) translate3d(0px, %wrapper_half_height%px, %wrapper_half_height%px);\
    }\
    .wrapper2 #wrapper1 {\
      -webkit-transform: rotateX(90deg) translate3d(0px, -%wrapper_half_height%px, %wrapper_half_height%px);\
      -moz-transform: rotateX(90deg) translate3d(0px, -%wrapper_half_height%px, %wrapper_half_height%px);\
      -ms-transform: rotateX(90deg) translate3d(0px, -%wrapper_half_height%px, %wrapper_half_height%px);\
      -o-transform: rotateX(90deg) translate3d(0px, -%wrapper_half_height%px, %wrapper_half_height%px);\
      transform: rotateX(90deg) translate3d(0px, -%wrapper_half_height%px, %wrapper_half_height%px);\
    }\
    .wrapper1 #wrapper2 {\
      -webkit-transform: rotateX(-90deg) translate3d(0px, %wrapper_half_height%px, %wrapper_half_height%px);\
      -moz-transform: rotateX(-90deg) translate3d(0px, %wrapper_half_height%px, %wrapper_half_height%px);\
      -ms-transform: rotateX(-90deg) translate3d(0px, %wrapper_half_height%px, %wrapper_half_height%px);\
      -o-transform: rotateX(-90deg) translate3d(0px, %wrapper_half_height%px, %wrapper_half_height%px);\
      transform: rotateX(-90deg) translate3d(0px, %wrapper_half_height%px, %wrapper_half_height%px);\
    }\
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\
      #general-layout.wrapper2 #wrapper1, #general-layout.wrapper1 #wrapper2 {\
        -webkit-transform: none;\
        -moz-transform: none;\
        -ms-transform: none;\
        -o-transform: none;\
        transform: none;\
        opacity: 0;\
      }\
    }\
    </style>';

    var
    style = css_template.replace(/%content_half_width%/g, content_half_width);
    style = style.replace(/%header_width%/g, header_width);
    style = style.replace(/%window_width%/g, window_width);
    style = style.replace(/%perspective%/g, perspective);
    style = style.replace(/%wrapper_half_height%/g, wrapper_half_height);
    style = style.replace(/%style_id%/g, style_id);

    if(document.getElementById(style_id) != null) {
      $('#' + style_id).remove();
    }
    $('head').append(style);
  }


  //-------------------------------------------------
  // macとwindowsそれぞれにクラスを付加
  //-------------------------------------------------
  function add_os()
  {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.indexOf("win") != -1) {
      $('html').addClass('windows');
    } else if(ua.indexOf("mac") != -1) {
      $('html').addClass('mac');
    } else {
    }
  };

  //=================================================
  // indexの関数
  //=================================================

  function init_index_function()
  {
    if(index_function) {
      return;
    };

    function get_usr_info()
    {
      function get_location()
      {
        var key = "9f47bb16beaae230f68d4705ef7b401fd99f9ddeaceb07e64760a19bcea63e09";
        $.getJSON("http://api.ipinfodb.com/v3/ip-city/?key=" + key + "&format=json&callback=?" )
        .error(function()
        {
          get_weather("Tokyo");
        })
        .success(function(result)
        {
          get_weather(result.cityName);
        });
      }

      function get_weather(city)
      {
        $.ajax({
          type: "POST",
          data: {city: city},
          url:"/usr_location/get_weather.php",
          success: function(data)
          {
            var data = JSON.parse(data);

            init_stage(data);
          },
          error: function()
          {
            var data = {
              condition: "partlycloudy",
              humidity: "68%",
              location: "Tokyo",
              moon_age: "1",
              sunrise: {hour: "4", minute: "00"},
              sunset: {hour: "18", minute: "00"},
              temp_c: 22.7
            };

            init_stage(data);
          }
        });
      }

      get_location();
    }

    function init_stage(weather_data)
    {
      var stage,
      box,
      window_width,
      window_height,
      move_x, move_y,
      mouse_down_x, mouse_down_y,
      deg_x, deg_y,
      clickable = false,
      weather_data;

      //天気データ
      function get_weather_val()
      {
        var condition_data = weather_data.condition.toLowerCase();

        if(condition_data == "partlycloudy") {
          condition_data = "sunny";
        }
        if(condition_data == "partlysunny") {
          condition_data = "cloudy";
        }

        var pattern = {};
        pattern["sunny"] = ["sunny", "clear"];
        pattern["cloudy"] = ["cloud", "fog", "hazy", "overcast"];
        pattern["rain"] = ["rain", "storm"];
        pattern["snow"] = ["snow", "sleet", "flurr"];

        var word;
        var condition;

        function search_words(type)
        {
          $.each(type, function()
            {
              var test = this;
              var val = condition_data.indexOf(test);

              if (val > -1) {
                word = test;
              }
          });
        }

        function serch_condition()
        {
          $.each(pattern, function(key)
            {
              var type = this;

              search_words(type);

              var text = word;

              if ($.inArray("" + text +  "", type) > -1) {
                condition = key;
              }
            });
        }

        serch_condition();

        var weather = {};
        weather["condition"] = condition;
        weather["temp"] = weather_data.temp_c;
        weather["hum"] = parseInt(weather_data.humidity);
        weather["sunrise"] = (parseInt(weather_data.sunrise.hour) * 60) + parseInt(weather_data.sunrise.minute);
        weather["sunset"] = (parseInt(weather_data.sunset.hour) * 60) + parseInt(weather_data.sunset.minute);

        return weather;
      }

      //各天候の設定
      function get_condition_val()
      {
        var weather = get_weather_val();
        var condition = weather.condition;
        var condition_val = {};

        if(condition == "sunny") {
          condition_val = {
            condition: condition,
            lope_y: 0
          };
        }
        if(condition == "cloudy") {
          condition_val = {
            condition: condition,
            lope_y: 0
          };
        }
        if(condition == "rain") {
          condition_val = {
            condition: condition,
            lope_y: 50
          };
        }
        if(condition == "snow") {
          condition_val = {
            condition: condition,
            lope_y: 50
          };
        }

        return condition_val;
      }

      function get_symbol_val()
      {
        var weather = get_weather_val();
        var sunrise = weather.sunrise;
        var sunset = weather.sunset;
        var today = new Date();
        var now = (today.getHours() * 60) + today.getMinutes();
        var symbol;

        if(now > sunrise && now < sunset)
        {
          symbol = "sun";
        } else {
          symbol = "moon";
        }

        return symbol;
      }

      //雲の設定
      function get_cloud_val()
      {
        var condition_val = get_condition_val();
        var cloud = {};

        cloud["c-1"] = {
          lope_x: 230,
          lope_y: 1250,
          lope_z: -800,
          scale: 2
        };
        cloud["c-2"] = {
          lope_x: 230,
          lope_y: 600,
          lope_z: 0,
          scale: 1
        };
        cloud["c-3"] = {
          lope_x: -120,
          lope_y: 450,
          lope_z: 200,
          scale: 0.65
        };

        if(condition_val.condition == "rain" || condition_val.condition == "snow") {
          cloud["c-4"] = {
            lope_x: -1,
            lope_y: 320,
            lope_z: 360,
            scale: 0.45
          };
        }

        return  cloud;
      }

      //オブジェクトの設定
      function get_obj_val()
      {
        var condition_val = get_condition_val();
        var symbol = get_symbol_val();
        var cloud = get_cloud_val();
        var obj = {};

        obj[symbol] = {
          class: ".symbol " + symbol,
          width: 118,
          lope_x: 0,
          lope_y: condition_val.lope_y + 600,
          lope_z: -200,
          obj_x: 1,
          scale: 1,
          thick: 5
        };

        $.each(cloud, function(key)
          {
            var val = this;

            obj["cloud-" + key] = {
              class: ".cloud " + key,
              width: 137,
              lope_x: val.lope_x,
              lope_y: (condition_val.lope_y * val.scale) + val.lope_y,
              lope_z: val.lope_z,
              obj_x: 0,
              scale: val.scale,
              thick: 3
            };
          });

        return obj;
      }

      function create_box()
      {
        var box_size = 1500;
        stage = Sprite3D.stage();
        box = stage.appendChild(
          Sprite3D
          .box(box_size, box_size, 20, ".control-box")
          .update()
        );
      }

      //オブジェクトの作成
      function create_obj()
      {
        var condition_val = get_condition_val();
        var obj_val = get_obj_val();
        var lope_width = 3;
        var lope_height = 920;
        var obj_space = 1;

        $.each(obj_val, function(key)
        {
          var obj_val = this;
          var obj_class = obj_val.class + " " + condition_val.condition;
          var min_thick = 1;
          var max_thick = obj_val.thick + 1;

          //ロープ
          var lope = box.appendChild(
            Sprite3D.create(".lope")
            .position(obj_val.lope_x, obj_val.lope_z, 3000)
            .rotation(-90, 0, 0)
            .scale(obj_val.scale, obj_val.scale, obj_val.scale)
            .update()
          );

          //接着テープ
          lope.appendChild(
            Sprite3D.create(".adhensive")
            .origin(10, -14)
            .position(lope_width, lope_height, -obj_space)
            .update()
          );

          //オブジェクト
          for (i = min_thick; i < max_thick; i++) {
            var position_z = i * obj_space;

            if(i == max_thick - min_thick) {
              var obj_class = obj_class + " face";
            }

            var obj = lope.appendChild(
              Sprite3D.create(obj_class)
              .origin(obj_val.width/2 + obj_val.obj_x, 0)
              .position(lope_width, lope_height, position_z)
              .update()
            );
          }

          //太陽の要素
          if(key == "sun") {
            obj.appendChild(
              Sprite3D.create(".clock")
              .origin(-20, -20)
              .position(0, 0, obj_space)
              .update()
            );
            obj.appendChild(
              Sprite3D.create(".sun-core")
              .origin(-20, -20)
              .position(0, 0, obj_space * 2)
              .update()
            );
          }

          //雲の要素
          if(key.indexOf("cloud") == 0) {
            var mater_hand = lope.appendChild(
              Sprite3D.create(obj_class + " mater-hand")
              .origin(obj_val.width/2 + obj_val.obj_x, 0)
              .position(lope_width, lope_height, ((max_thick - 1) * obj_space) - (obj_space / 2))
              .update()
            );

            $(".mater-hand").removeClass("face");

            mater_hand.appendChild(
              Sprite3D.create(".mater")
              .origin(-135, 270)
              .position(0, 0, 0)
              .update()
            );

            if(condition_val.condition == "rain" || condition_val.condition == "snow") {
              mater_hand.appendChild(
                Sprite3D.create(".adhensive-sub")
                .origin(-21, -41)
                .position(0, 0, -1.5)
                .update()
              );
              mater_hand.appendChild(
                Sprite3D.create(".fall-obj")
                .origin(-28, -45)
                .position(0, 0, -1)
                .update()
              );
            }
          }

          show_obj(lope, obj_val.calss, obj_val.lope_y);
        });
      }

      function show_obj(lope, elm, length)
      {
        setTimeout(function()
        {
          lope.z(length).update();
        }, 100);
      }

      function drop_obj()
      {
        $(".adhensive").on("click", function()
          {
            var adhensive = this;
            $(adhensive).parent().children().addClass("drop");
          });
        $(".adhensive-sub").on("click", function()
          {
            var adhensive = this;
            $(adhensive).parent().children(".fall-obj").addClass("drop-sub");
            $(adhensive).parent().children(".adhensive-sub").addClass("hide");
          });
      }

      function click_sun_core()
      {
        var target = $(".sun-core");

        target.on("click", function()
        {
          $(this).addClass("click");

          if (target.hasClass("break-2") == true) {
            target.addClass("break-3");
            setTimeout(function()
          {
            target.addClass("drop");
          }, 50);
          } else if (target.hasClass("break-1") == true) {
            target.addClass("break-2");
          } else {
            target.addClass("break-1");
          }

          setTimeout(function()
            {
              target.removeClass("click");
            }, 30);
        });
      }

      function init_clock()
      {
        var hour = '<div class="hour"><img src="/images/index/image_clock_hour.png"></div>';
        var min =  '<div class="min"><img src="/images/index/image_clock_min.png"></div>';
        var sec =  '<div class="sec"><img src="/images/index/image_clock_sec.png"></div>';

        $(".clock").append(hour + min + sec);

        function rotate_clock()
        {
          today = new Date();
          var hour = today.getHours();
          var min = today.getMinutes();
          var sec = today.getSeconds();

          $(".clock .hour").rotate(hour * 30 + min / 2);
          $(".clock .min").rotate(min * 6 + sec / 10);
          $(".clock .sec").rotate(sec * 6);

          setTimeout(function()
          {
            rotate_clock();
          },1000);
        }

        rotate_clock();
      }

      function click_cloud()
      {
        var cloud = get_cloud_val();
        var max = 100;
        var test_val = 33;
        var mater_height = 317 - 4;
        var val =  mater_height / (max / test_val);

        $.each(cloud, function(key)
          {
            var mater = $("." + key + " .mater");

            mater.css("top", val + "px");
            $(".cloud.face." + key).on("click", function()
              {
                $(this).addClass("drop");
                mater.addClass("show");
              });
          });
      }

      //コントロール
      function control_box()
      {
        window_width = $(window).width();
        window_height = $(window).height();
        move_x = 0;
        move_y = 0.5;
        deg_x = 0;
        deg_y = 0.5;
        mouse_down_x = 0;
        mouse_down_y = 0;
        function mouse_down()
        {
          $(window).on("mousedown", function(e)
          {
            if(current_content == "index") {
              if (!clickable) {
                mouse_down_x = ( e.pageX / window_width );
                mouse_down_y = ( e.pageY / window_height );
                clickable = true;
              }
            }
            e.preventDefault();
          });
        }

        function mouse_move()
        {
          $(window).on("mousemove", function(e)
          {
            if(clickable) {
              var now_x = ( e.pageX / window_width );
              var now_y = ( e.pageY / window_height );
              var control_move = 0.5;

              move_x -= now_x - mouse_down_x;
              move_y -= now_y - mouse_down_y;
              mouse_down_x = now_x;
              mouse_down_y = now_y;

              if ( move_x < -control_move ) {move_x = -control_move};
              if ( move_x > control_move ) {move_x = control_move};
              if ( move_y < -control_move ) {move_y = -control_move};
              if ( move_y > control_move ) {move_y = control_move};
            }
            e.preventDefault();
          });
        }

        function mouse_up()
        {
          $(window).on("mouseup", function(e)
          {
            clickable = false;
            e.preventDefault();
          });
        }

        function resize_window()
        {
          $(window).resize(function()
          {
            window_width = $(window).width();
            window_height = $(window).height();
            var scale = Math.min( window_width, window_height ) / 1000;
            stage.scale( scale, scale, scale ).update();
          });
        }

        function reload_box()
        {
          requestAnimationFrame(reload_box);
          rotation_box();
        }

        function rotation_box()
        {
          var limit_x = 60;
          var limit_y = 360;

          var rz = deg_x * limit_y;
          var pz = -deg_y * 800;

          deg_x += (move_x - deg_x) * 0.1;
          deg_y += (move_y - deg_y) * 0.1;
          box.rotation(limit_x + deg_y * 50, 0, rz)
          .position( deg_x * 100, 10 + deg_y * 1, pz)
          .update();
        }
        mouse_down();
        mouse_move();
        mouse_up();
        resize_window();
        reload_box();
      }

      create_box();
      control_box();
      create_obj();
      drop_obj();
      init_clock();
      //click_sun_core();
      //click_cloud();
    }

    get_usr_info();
    index_function = true;
  }

  //=================================================
  // aboutの関数
  //=================================================
  function init_about_function()
  {
    if(about_function) {
      return;
    };

    //googlemap関係
    function init_map()
    {
      var init_latlng = new google.maps.LatLng(35.0122814,135.730745);
      var office_latlng = new google.maps.LatLng(35.0094314,135.730745);
      var myOptions = {
        zoom: 14,
        center: init_latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
        {"stylers":[{"saturation":-100},{"gamma":1}]},
        {"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},
        {"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},
        {"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
        {"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},
        {"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
        {"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},
        {"featureType":"water","stylers":[{"visibility":"on"},
        {"saturation":50},
        {"gamma":0},
        {"hue":"#50a5d1"}]},
        {"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},
        {"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},
        {"color":"#333333"}]},
        {"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},
        {"saturation":50}]}]
      };

      var map = new google.maps.Map(document.getElementById('map'),myOptions);
      var marker_width = 370;
      var marker_height = 130;
      var marker = new google.maps.Marker({
          map: map,
          position: office_latlng,
          icon: new google.maps.MarkerImage(
            '/images/about/image_map_marker.png',
            new google.maps.Size(marker_width, marker_height), // size
            new google.maps.Point(0, 0),  // origin
            new google.maps.Point(marker_width / 4, marker_height/ 2), // anchor
            new google.maps.Size(marker_width / 2, marker_height / 2) // anchor
            )
        });

      expand_map();
    }

    function expand_map()
    {
      $(document).on("click", ".expand-button", function()
      {
        $("#about .location").toggleClass("expand");
      });
    }

    init_map();
    about_function = true;
  }

  //=================================================
  // productの関数
  //=================================================
  function init_products_function()
  {
    if(products_function) {
      return;
    };

    var $targets = $('#products .promotion-wrap');

    function window_resize()
    {
      var timer = false;
      $(window).resize(function()
      {
        if (timer !== false) {
            clearTimeout(timer);
        }
        timer = setTimeout(function()
        {
          change_box_height();
        }, 200);
      });
    }

    function prepend_banner_background()
    {
      var background_html = "<div class='background'></div>"

      $("#products .banner").prepend(background_html);
    }

    function change_box_height()
    {
      var style_id = 'product_box';
      var window_width = $(window).width();

      if(window_width > 1200) {
        window_width = 1200;
      }
      var box_height = parseInt((window_width / 25) * 7);
      var description_height = box_height;
      var description_y = box_height / 2;
      var description_z = box_height / 2;
      var origin = box_height / 2;

      if(window_width < 900) {
        var description_height = box_height * 3;
        var description_y = 0;
        var description_z = description_height;
        var origin = description_height;
      }

      var
      css_template = '<style id="%style_id%">\
      #products .promotion-wrap {\
        height: %box_height%px;\
      }\
      #products .panel {\
          -webkit-transform-origin: 50% %origin%px 0px;\
          -moz-transform-origin: 50% %origin%px 0px;\
          -ms-transform-origin: 50% %origin%px 0px;\
          -o-transform-origin: 50% %origin%px 0px;\
      }\
      #products .description {\
          height: %description_height%px;\
          -webkit-transform: rotateX(90deg) translate3d(0px, -%description_y%px, %description_z%px);\
          -moz-transform: rotateX(90deg) translate3d(0px, -%description_y%px, %description_z%px);\
          -ms-transform: rotateX(90deg) translate3d(0px, -%description_y%px, %description_z%px);\
          -o-transform: rotateX(90deg) translate3d(0px, -%description_y%px, %description_z%px);\
      }\
      #products .animated {\
          height: %description_height%px;\
      }\
      #products .animated .banner {\
          height: %box_height%px;\
          -webkit-transform: rotateX(-90deg) translate3d(0px, %description_z%px, %description_y%px);\
          -moz-transform: rotateX(-90deg) translate3d(0px, %description_z%px, %description_y%px);\
          -ms-transform: rotateX(-90deg) translate3d(0px, %description_z%px, %description_y%px);\
          -o-transform: rotateX(-90deg) translate3d(0px, %description_z%px, %description_y%px);\
      }\
      </style>';

      var
      style = css_template.replace(/%style_id%/g, style_id);
      style = style.replace(/%box_height%/g, box_height);
      style = style.replace(/%description_height%/g, description_height);
      style = style.replace(/%origin%/g, origin);
      style = style.replace(/%description_y%/g, description_y);
      style = style.replace(/%description_z%/g, description_z);


      if(document.getElementById(style_id) != null) {
        $('#' + style_id).remove();
      }
      $('head').append(style);
    }

    //バナーの切り替わり
    function banner_animation()
    {
      var box_animate = false;
      var link_button = false;

      $targets.each(function()
      {
        var $self = $(this);
        mouse_down_link($self);
        mouse_down($self);
        mouse_move($self);
        mouse_up($self);
      });

      function mouse_down_link(target)
      {
        $("#products .link-button").on('mousedown', function(e)
        {
          if(link_button == false) {
            link_button = true;
          }
        });
        target.on('mouseup', function(e)
        {
          if(link_button) {
            link_button = false;
          }
        });
      }

      function mouse_down(target)
      {
        target.on('mousedown', function(e)
        {
          if(box_animate == false && link_button == false) {
            box_animate = true;
          }
        });
      }

      function mouse_move(target)
      {
        target.on('mousemove', function(e)
        {
          if(box_animate) {
            setTimeout(function()
            {
              box_animate = false;
            }, 200);
          }
        });
      }

      function mouse_up(target)
      {
        var timer = false;
        target.on('mouseup', function(e)
        {
          if(box_animate) {
            $("#wrapper1 .main").css("z-index", "20");
            target.toggleClass("animated");
            
            if (timer !== false) {
                clearTimeout(timer);
            }

            timer = setTimeout(function()
            {
              $("#wrapper1 .main").css("z-index", "0");
            }, 600);
            box_animate = false;
          }
        });
      }
    }
    //プロダクトページ コンテンツ順次ロード用関数
    function content_lazy_load()
    {
      var
      count = 0,
      duration = 350;

      $targets.each(function()
      {
        var $self = $(this);
        $self.on('inview', function()
        {
          if($self.hasClass('loaded')) {
            return false;
          }

          setTimeout(function()
          {
            $self.addClass("loaded");
          }, count * duration);

          count++;

          setTimeout(function()
          {
            count--;
          }, count * duration);
        });
      });
    }

    prepend_banner_background();
    content_lazy_load();
    window_resize();
    change_box_height();
    banner_animation();
    products_function = true;
  }
});
