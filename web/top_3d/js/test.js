$(function()
{
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
        thick: 8
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
          $(adhensive).parent().children(".fall-obj").addClass("drop");
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
      var hour = '<div class="hour"><img src="images/image_clock_hour.png"></div>';
      var min =  '<div class="min"><img src="images/image_clock_min.png"></div>';
      var sec =  '<div class="sec"><img src="images/image_clock_sec.png"></div>';

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
          if (!clickable) {
            mouse_down_x = ( e.pageX / window_width );
            mouse_down_y = ( e.pageY / window_height );
            clickable = true;
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

  function get_usr_info()
  {
    function get_location()
    {
      var key = "9f47bb16beaae230f68d4705ef7b401fd99f9ddeaceb07e64760a19bcea63e09";
      $.getJSON("http://api.ipinfodb.com/v3/ip-city/?key=" + key + "&format=json&callback=?" )
      .error (function  () {
          get_temp("Tokyo");
       }) 
        .success(function (result) {
          get_temp(result.cityName);
       });

    }

    function get_temp(city)
    {
      $.ajax(
        {
          type: "POST",
          data: {city: city},
          url:"/usr_location/get_weather.php",
          success: function(data)
          {
            var data = JSON.parse(data);

            console.log(data);
            init_stage(data);
          },
          error: function()
          {
            console.log("error");
          }
        });
    }

    get_location();
  }

  get_usr_info();
}
);
