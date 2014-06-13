$(function()
{
//--------------------
//値の保持
//--------------------

  //現在の時刻を保持
  function reserve_now()
  {
    var now = new Date();
    var now = {
      unix: now.getTime().toString().slice(0, -3),
      hour: now.getHours(),
      min: now.getMinutes(),
      sec: now.getSeconds()
    };

    $(".reserve-value .now .unix").val(now.unix);
    $(".reserve-value .now .hour").val(now.hour);
    $(".reserve-value .now .min").val(now.min);
    $(".reserve-value .now .sec").val(now.sec);

    display_clock("now");
    setTimeout(function()
    {
      reserve_now();
    }, 1000);
  }

  //終了時刻を保持
  function reserve_end()
  {
    var now = get_now();
    var conpose = get_conpose();
    var end = {
      unix: now.unix + conpose.unix,
      hour: now.hour + conpose.hour,
      min: now.min + conpose.min,
      sec: now.sec + conpose.sec
    }

    if(end.sec > 60) {
      end.sec = end.sec - 60;
      end.min = end.min + 1;
    }
    if(end.min > 60) {
      end.min = end.min - 60;
      end.hour = end.hour + 1;
    }
    if(end.hour > 23) {
      end.hour = end.hour - 24;
    }

    $(".reserve-value .end .unix").val(end.unix);
    $(".reserve-value .end .hour").val(end.hour);
    $(".reserve-value .end .min").val(end.min);
    $(".reserve-value .end .sec").val(end.sec);
  }

  //分解時間の保持
  function reserve_conpose()
  {
    var shortest = {
      hour: 0,
      min: 45,
      sec: 0
    };
    var longest = {
      hour: 1,
      min: 15,
      sec: 7
    };
    var convert_shortest = ((shortest.hour * 3600) + (shortest.min * 60) + shortest.sec);
    var convert_longest = ((longest.hour * 3600) + (longest.min * 60) + longest.sec);
    var rondom_sec = Math.floor(Math.random() * (convert_longest + 1 - convert_shortest) + convert_shortest);
    var conpose = {
      hour: parseInt(rondom_sec / 3600),
      min: parseInt(rondom_sec % 3600 / 60),
      sec: rondom_sec % 3600 % 60
    };
    var conpose_unix = (conpose.hour * 3600) + (conpose.min * 60) + conpose.sec;

    $(".reserve-value .conpose .unix").val(conpose_unix);
    $(".reserve-value .conpose .hour").val(conpose.hour);
    $(".reserve-value .conpose .min").val(conpose.min);
    $(".reserve-value .conpose .sec").val(conpose.sec);
  }

  //残り時間の保持
  function reserve_left()
  {
    var now_sec = get_now().unix;
    var end_sec = get_end().unix;
    var left_sec = end_sec - now_sec;

    if(left_sec < 0) {
      left_sec = 0;
    }

    var left = {
      hour: parseInt(left_sec / 3600),
      min: parseInt(left_sec % 3600 / 60),
      sec: left_sec % 3600 % 60
    }


    $(".reserve-value .left .hour").val(left.hour);
    $(".reserve-value .left .min").val(left.min);
    $(".reserve-value .left .sec").val(left.sec);

    setTimeout(function()
    {
      reserve_left();
    }, 1000);
  }

//--------------------
//値の取得
//--------------------

  //現在の時刻の取得
  function get_now()
  {
    var now = {
      unix: parseInt($(".reserve-value .now .unix").val()),
      hour: parseInt($(".reserve-value .now .hour").val()),
      min: parseInt($(".reserve-value .now .min").val()),
      sec: parseInt($(".reserve-value .now .sec").val())
    };

    return now;
  }

  //分解時間の取得
  function get_conpose()
  {
    var conpose = {
      unix: parseInt($(".reserve-value .conpose .unix").val()),
      hour: parseInt($(".reserve-value .conpose .hour").val()),
      min: parseInt($(".reserve-value .conpose .min").val()),
      sec: parseInt($(".reserve-value .conpose .sec").val())
    };

    return conpose;
  }

  //終了時間の取得
  function get_end()
  {
    var end = {
      unix: parseInt($(".reserve-value .end .unix").val()),
      hour: parseInt($(".reserve-value .end .hour").val()),
      min: parseInt($(".reserve-value .end .min").val()),
      sec: parseInt($(".reserve-value .end .sec").val())
    };

    return end;
  }

  //残り時間の取得
  function get_left()
  {
    var left = {
      hour: parseInt($(".reserve-value .left .hour").val()),
      min: parseInt($(".reserve-value .left .min").val()),
      sec: parseInt($(".reserve-value .left .sec").val())
    };

    return left;
  }

//--------------------
//スクロールイベント
//--------------------

  function scroll_top()
  {
    var scroll_height = $("header").height() + $(".display-video-wrap").height();
    var roll_speed = {};
    roll_speed["hour"] = 1600;
    roll_speed["min1"] = 650;
    roll_speed["min2"] = 600;
    roll_speed["sec1"] = 550;
    roll_speed["sec2"] = 500;

    $(window).off("scroll").on("scroll", function()
    {
      if ($(this).scrollTop() > scroll_height) {
        reserve_conpose();
        reserve_end();
        display_clock("end");
        $.each(roll_speed, function(key)
        {
          var timer_id;
          var sec = this;

          function start()
          {
            timer_id = setInterval(function()
            {
              loading_roll(key);
              init_progress_bar();
            }, sec / 30);
          }

          function stop()
          {
            clearInterval(timer_id);
          }

          start();

          setTimeout(function()
          {
            stop();
          }, 1000);
        });

        reserve_left();
        render_number_image();
        setTimeout(function()
        {
          $(".number-display.end-time").addClass("scroll");
        }, 1500);
        $(window).off("scroll");
        }
      });
  }

  function loading_roll(type)
  {
    var number_display = $(".number-display.countdown ." + type);
    var current_num = parseInt(number_display.attr("class").slice(-1));
    var target_num = current_num - 1;
    
    number_display.attr("class");
    if( target_num < 0 ) {
      $(".number-display.countdown ." + type).attr("class", "number " + type + " num-9");
    } else {
      $(".number-display.countdown ." + type).attr("class", "number " + type + " num-" + target_num);
    }
  }

//--------------------
//画面表示
//--------------------

  //時刻の表示
  function display_clock(type)
  {
    var hour =  $(".reserve-value ." + type + " .hour").val().toString().split("");
    var min =  $(".reserve-value ." + type + " .min").val().toString().split("");
    var sec =  $(".reserve-value ." + type + " .sec").val().toString().split("");

    if(hour < 10) {
      hour = "0" + hour;
    }
    if(min < 10) {
      min = "0" + min;
    }
    if(sec < 10) {
      sec = "0" + sec;
    }

    var get_number = {};
    get_number["hour1"] = hour[0];
    get_number["hour2"] = hour[1];
    get_number["min1"] = min[0];
    get_number["min2"] = min[1];

    $(".number-display." + type + "-time li").removeClass("selected");
    $(".number-display." + type + "-time .hour1").removeClass("invisible");

    if(get_number["hour1"] == "0") {
      $(".number-display." + type + "-time .hour1").addClass("invisible");
    }

    $.each(get_number, function(key)
      {
        var val = this;
        $(".number-display." + type + "-time ." + key).addClass("num-" + val);
      });
  }

  //残り時間の数字表示
  function render_number_image()
  {
    var left = get_left();

    if(left.min < 10) {
      left.min = "0" + left.min;
    }
    if(left.sec < 10) {
      left.sec = "0" + left.sec;
    }
    var min_split = left.min.toString().split("");
    var sec_split = left.sec.toString().split("");
    var get_number = {};
    get_number["hour"] = left.hour.toString();
    get_number["min1"] = min_split[0];
    get_number["min2"] = min_split[1];
    get_number["sec1"] = sec_split[0];
    get_number["sec2"] = sec_split[1];


    $(".number-display.countdown li").removeClass("selected");

    $.each(get_number, function(key)
      {
        $(".number-display.countdown ." + key).attr("class");

        var val = this;
        $(".number-display.countdown ." + key).attr("class", "number " + key + " num-" + val);
      });

    setTimeout(function()
    {
      render_number_image();
    }, 1000);
  }

  function init_progress_bar()
  {
    $(".progress-bar div").addClass("loading");
    setTimeout(function()
    {
      $(".progress-bar div").removeClass("loading");
      $(".progress-bar div").addClass("active");
    }, 1500);
    render_progress_bar();
  }

  //残り時間のバー表示
  function render_progress_bar()
  {
    var conpose = get_conpose();
    var left = get_left();

    var conpose_sec = (conpose.hour  * 3600) + (conpose.min * 60) + conpose.sec;
    var left_sec = (left.hour  * 3600) + (left.min * 60) + left.sec;
    var percent = 100 - parseInt((left_sec / conpose_sec) * 100);
    var bar_width = parseInt($(".progress-bar").width() * (1 - (left_sec / conpose_sec)));

    $(".progress-bar div").css("width", bar_width + "px");
    setTimeout(function()
    {
      render_progress_bar();
    }, 1000);
  }


  function init()
  {
    scroll_top();
    reserve_now();
  }

  init();
}
);
