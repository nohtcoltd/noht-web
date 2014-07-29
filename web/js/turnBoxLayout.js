$(function()
{
  //----------------------------------
  // EXAMPLES
  //----------------------------------
  function config_example_switch_box(width)
  {
    var general_box = $(".example.switch");

    general_box.turnBox({
      width: width,
      height: 87
    });
  }

  function config_example_wizard_box(width)
  {
    var general_box = $(".example.wizard");

    general_box.turnBox({
      width: width,
      height: 87
    });
  }

  function config_example_login_box(width)
  {
    var duration = 450;
    var general_box = $(".example.login-form");
    var confirm_box = general_box.find(".check");
    var remember_box = general_box.find(".remember");
    var forgotpass_box = general_box.find(".forgot-pass");
    var signup_box = general_box.find(".sign-up");

    general_box.turnBox({
      width: width,
      height: 87,
      even: 320,
      perspective: 3000,
      duration: duration,
      easing: "ease-in-out",
      type: "repeat"
    });

     confirm_box.turnBox({
      width: parseInt(width * 0.4),
      height: 50,
      perspective: 3000,
      duration: 300,
      easing: "ease-in-out"
    });

     remember_box.turnBox({
      width: parseInt(width * 0.35),
      height: 30,
      perspective: 3000,
      duration: 300,
      easing: "ease-in-out"
    });

     forgotpass_box.turnBox({
      width: parseInt(width * 0.4),
      height: 23,
      perspective: 3000,
      duration: 300,
      easing: "ease-in-out"
    });

     signup_box.turnBox({
      width: parseInt(width * 0.23),
      height: 23,
      perspective: 3000,
      duration: 300,
      easing: "ease-in-out"
    });

    $(".login-sns .icon").addClass("show");
    $(".login-sns a").on("click", function()
    {
      $(this).children().removeClass("show");
      $(this).children(".loading").addClass("show");
      setTimeout(function()
      {
        general_box.turnBoxAnimate(
        {
          face: 3
        });
        setTimeout(function()
        {
          $(".login-sns a").children().removeClass("show");
          $(".login-sns a").children(".icon").addClass("show");
        }, duration);
      }, 1000);
    });


    confirm_box.find(".go").turnBoxLink({
      box: ".login-form",
      events: "click touchend"
    });

    confirm_box.find(".go").on("click touchend", function()
    {
      setTimeout(function()
      {
        confirm_box.turnBoxAnimate({
          animation: false
        });
        remember_box.turnBoxAnimate({
          animation: false
        });
        forgotpass_box.turnBoxAnimate({
          animation: false
        });
        signup_box.turnBoxAnimate({
          animation: false
        });
        general_box.find("input").val("").attr("checked", false);

      }, duration);
    });
  }

  function config_example_notify_box(width)
  {
    var duration = 450;
    var general_box = $(".example.notify");
    var confirm_box = general_box.find(".check");

    general_box.turnBox({
      width: width,
      height: 87,
      even: 320,
      perspective: 3000,
      duration: duration,
      easing: "ease-in-out",
      type: "repeat"
    });

    confirm_box.turnBox({
      width: width,
      height: 75,
      perspective: 3000,
      duration: 200,
      easing: "ease-in-out"
    });
    
    general_box.find(".ok").turnBoxLink({
      box: ".notify",
      events: "click touchend"
    });

    general_box.find(".ok").on("click touchend", function()
    {
      setTimeout(function()
      {
        confirm_box.turnBoxAnimate({
          animation: false
        });
      }, duration);
    });
  }

  function config_example_contact_box(width)
  {
    var duration = 450;
    var general_box = $(".example.contact-form");
    var confirm_box = general_box.find(".check");

    general_box.turnBox({
      width: width,
      height: 87,
      even: 400,
      perspective: 3000,
      duration: duration,
      easing: "ease-in-out",
      type: "repeat"
    });

     confirm_box.turnBox({
      width: width * 0.9,
      height: 60,
      perspective: 3000,
      duration: 300,
      easing: "ease-in-out"
    });

    confirm_box.find(".send").turnBoxLink({
      box: ".contact-form",
      events: "click touchend"
    });

    $(".confirm-button").on("click", function()
    {
      $(".contact-form input, .contact-form textarea").addClass("lock").attr("disabled", "disabled");
    });

    $(".cancel").on("click", function()
    {
      $(".contact-form input, .contact-form textarea").removeClass("lock").removeAttr("disabled");
    });
    confirm_box.find(".send").on("click touchend", function()
    {
      setTimeout(function()
      {
        confirm_box.turnBoxAnimate({
          animation: false
        });
        general_box.find("input").val("");
        general_box.find("textarea").val("");
        $(".contact-form input, .contact-form textarea").removeClass("lock").removeAttr("disabled");
      }, duration);
    });
  }

  function config_example_alert_box(width)
  {
    var duration = 450;
    var general_box = $(".example.alert-dialog");
    var agree_box_class = general_box.find(".ok");

    general_box.turnBox({
      width: width,
      height: 87,
      even: 400,
      perspective: 3000,
      duration: duration,
      easing: "ease-in-out",
      type: "repeat"
    });

     agree_box_class.turnBox({
      width: width * 0.9,
      height: 50,
      perspective: 3000,
      duration: 300,
      easing: "ease-in-out"
    });

    agree_box_class.find(".parent-action").turnBoxLink({
      box: ".alert-dialog",
      events: "click touchend"
    });

    general_box.find(".cancel").turnBoxLink(
    {
      box: ".alert-dialog",
      dist: "prev"
    });

    $(".parent-action").on("click touchend", function()
    {
      setTimeout(function()
      {
        agree_box_class.turnBoxAnimate({
          animation: false
        });
      }, duration);
    });
  }

  function config_example_uploader_box(width)
  {
    var box = $(".example.uploader");
    var duration = 450;

    box.turnBox(
    {
      width: width,
      height: 87,
      even: 5,
      duration: duration,
      perspective: "400px 20",
      type: "repeat",
      direction: "negative",
      easing: "ease-in-out"
    });

    var bar = $(".example.uploader .turnBoxFaceNum2");
    var loading = 0;
    var time = 1000 / 600;
    var bar_width;

    function loading_bar()
    {
      if(loading > bar_width * 0.65) {
        time = time * 1.1;
      }

      if(loading > bar_width * 0.75) {
        time = 1;
        loading = loading + 2;
      } else {
        loading = loading + 1;
      }

      timer = setTimeout(function()
      {
        bar.children("div").css("width", loading + "px");
        loading_bar();
      }, time);

      if(loading >= bar_width) {
        
        clearTimeout(timer);

        box.turnBoxAnimate(
        {
          face: 3
        });

        setTimeout(function()
        {
          loading = 0;
          bar.children("div").css("width", "0px");
          time = 1000 / 600;
        }, duration);
      }
    }

    $(".uploader .turnBoxFaceNum1").on("click", function()
    {
      setTimeout(function()
      {
        bar_width = bar.innerWidth();
        loading_bar();
      }, duration + 1000);
    });
    $(".uploader .turnBoxFaceNum3").on("click", function()
    {
      box.turnBoxAnimate();
    });
  }

  function config_example_colorpicker_box(width)
  {
    var box = $(".example.color-picker");
    var colorpicker = box.find(".color-picker-container");
    var duration = 300;
    var height = 200;
    var initial_color = "#217ac0";
    var get_color_R;
    var get_color_G;
    var get_color_B;

    box.turnBox(
    {
      width: width,
      height: 87,
      even: height,
      duration: duration
    });

    colorpicker.spectrum({
      preferredFormat: "hex",
      containerClassName: "picker-bg",
      flat: true,
      color: initial_color,
      showInput: true,
      showInitial: true,
      move: function(color)
      {
        if(color.toRgb().r + color.toRgb().g + color.toRgb().b > (255 * 3) / 2) {
          $(".hex-display").css("color", "#2b2b2b");
        } else {
          $(".hex-display").css("color", "#fff");
        }

        $(".hex-display").text("").text(color.toHexString());
        box.children(".turnBoxFaceNum1").css(
        {
          "background": color.toHexString()
        });
      }
    });

    function init_colorpicker()
    { 
      box.children(".turnBoxFaceNum1").css({
        "background": initial_color
      });
      $(".hex-display").text(initial_color);
    }

    init_colorpicker();

    $(".examples-container").on("click", function()
    {
      box.turnBoxAnimate();
    });
  }

  function config_example_tab_box(tab_width, content_width)
  {
    var duration = 350;
    var tab_box_class = $(".examples.tab-wrapper .tab");
    var content_box_class = $(".examples.tab-wrapper .content-box");

    tab_box_class.turnBox({
      width: tab_width,
      height: 60,
      perspective: 300,
      duration: duration,
      easing: "ease-in-out"
    });

    content_box_class.turnBox({
      width: content_width,
      height: 150,
      perspective: 1300,
      duration: duration,
      easing: "ease-in-out",
      type: "skip",
      axis: "y"
    });

    for(i = 0; i < tab_box_class.length; i++) {
      var num = i + 1;
      $(".examples .tab.tab-" + num).turnBoxLink(
      {
        box: ".tab-wrapper .content-box",
        dist: num,
        events: "click"
      });
    };

    $.each($(".tabs").children(), function(key)
    {
      var tab = key + 1;

      $(".examples .tab.tab-" + tab).find(".turnBoxButton").on("click", function()
      {
        $(".examples .tab").not(".tab-" + tab).turnBoxAnimate();
      });
    });

    $(".examples .tab.tab-1").turnBoxAnimate(
    {
      face: 2,
      animation: false
    });
  }

  function config_example_radio_box()
  {
    var duration = 200;
    var box_class = $(".example.radio");

    box_class.turnBox(
    {
      duration: duration
    });
    $.each(box_class.parent().children(".radio"), function(key)
    {
      var radio = this;
      $(radio).find(".turnBoxButton").on("click", function()
      {
        box_class.parent().children(".radio").not(radio).turnBoxAnimate();
      });
    });

    $(box_class.parent().children(".radio")[0]).turnBoxAnimate(
    {
      face: 2,
      animation: false
    });
  }

  function config_example_checkbox_box()
  {
    var duration = 200;
    var box_class = $(".example.check-box");

    box_class.turnBox(
    {
      duration: duration
    });
  }

  function config_example_menu_box()
  {
    var duration = 200;
    var box_class = $(".example.menu");

    box_class.turnBox(
    {
      duration: duration
    });

    $.each(box_class, function()
    {
      $(this).off("mouseenter").on("mouseenter", function()
      {
        $(this).turnBoxAnimate({
          face: 2
        });
        setTimeout(function()
        {
          $(this).off("mouseenter mouseleave");
        }, duration);
      });
      $(this).off("mouseleave").on("mouseleave", function()
      {
        $(this).turnBoxAnimate();
        setTimeout(function()
        {
          $(this).off("mouseenter mouseleave");
        }, duration);
      });
    });
  }

  function init_examples()
  {
    if($(window).width() > 900) {
      var width = 340;
      var tab_width = 264;
      var content_width = 800;
    } else if($(window).width() > 700) {
      var width = 280;
      var tab_width = 190.5;
      var content_width = 580;
    } else {
      var width = 280;
      var tab_width = 92;
      var content_width = 280;
    }

    config_example_switch_box(width);
    config_example_wizard_box(width);
    config_example_login_box(width);
    config_example_notify_box(width);
    config_example_contact_box(width);
    config_example_alert_box(width);
    config_example_tab_box(tab_width, content_width);
    config_example_uploader_box(width);
    config_example_colorpicker_box(width);
    config_example_radio_box();
    config_example_checkbox_box();
    config_example_menu_box();
  }
  init_examples();

  //----------------------------------
  // MAIN CONTENTS
  //----------------------------------

  var example_height;
  var usage_height;
  var download_height;
  var contents_height;
  var current_num;
  var contents_duration = 450;

  function get_contents_val()
  {
    example_height = $(".examples-container").innerHeight();
    usage_height = $(".usage").innerHeight();
    download_height = $(".download").innerHeight();

    if($(".contents-body").hasClass("turnBoxCurrentFace1") == true) {
      contents_height = example_height;
      current_num = 1;
    } else if($(".contents-body").hasClass("turnBoxCurrentFace2") == true) {
      contents_height = usage_height;
      current_num = 2;
    } else {
      contents_height = download_height;
      current_num = 3;
    }

    init_contents();
  }

  function resize_window()
  {
    var timer = false;

    $(window).resize(function()
    {
      if (timer !== false) {
        clearTimeout(timer);
      }

      timer = setTimeout(function()
      {
        init_examples();
        config_header_box();
        config_tab_box();
        config_contents_box();
        setTimeout(function()
        {
          get_contents_val();
        }, 600);
      }, 200);
    });
  }

  //----------------------------------
  // HEADER
  //----------------------------------
  function config_header_box()
  {
    if($(window).width() > 700) {
      var width = 350;
    } else {
      var width = 210;
    }

    $(".title").turnBox({
      width: width,
      height: 50,
      even: 150,
      perspective: 10000,
      duration: 150,
      easing: "linear",
      type: "real",
      backface: "visible"
    });
  }

  //----------------------------------
  // CONTENTS BOX
  //----------------------------------

  // TAB
  function config_tab_box()
  {
    if($(window).width() > 900) {
      var width = 200;
    } else if($(window).width() > 700) {
      var width = 150;
    } else {
      var width = 95;
    }
    var tab_box_class = $(".contents-tabs .tab");
    
    tab_box_class.turnBox({
      width: width,
      height: 40,
      perspective: 300,
      duration: contents_duration,
      easing: "ease-in-out"
    });
  }

  function render_tab_box()
  {
    $.each($(".contents-tabs").children(), function(key)
    {
      var num = key + 1;
      var tab = $(".contents-tabs .tab" + num);

      tab.turnBoxLink(
      {
        box: ".contents-body",
        dist: num
      });

      tab.find(".turnBoxButton").on("click", function()
      {
        $(".contents-tabs .tab").not(".tab" + num).turnBoxAnimate();
      });
    });

    $(".contents-tabs .tab1").turnBoxAnimate(
    {
      face: 2,
      animation: false
    });
  }

  // CONTENTS
  function config_contents_box()
  {
    var content_box_class = $(".contents-body");
    var window_width = $(window).width();

    content_box_class.turnBox({
      width: window_width,
      perspective: 3000,
      duration: contents_duration,
      easing: "ease-in-out",
      type: "skip",
      axis: "y"
    });

    $(".contents-body").children().css("height", "auto");
  }

  function init_contents()
  {
    $(".contents-body").css({
      "-webkit-perspective-origin": "50% 800px",
      "-moz-perspective-origin": "50% 800px",
      "-ms-perspective-origin": "50% 800px",
      "-o-perspective-origin": "50% 800px",
      "perspective-origin": "50% 800px"
    }); 

    $(".contents-body").children().css({
      "height": contents_height + "px",
      "overflow-y": "hidden"
    });

    setTimeout(function()
    {
      $(".contents-body").css("height", contents_height + "px");
      $(".contents-body").children(".turnBoxFaceNum" + current_num).css({
        "height": "auto",
        "overflow-y": "visible"
      });
    }, contents_duration);
  }

  function change_content()
  {
    $(".contents-tabs .tab").on("click", function()
    {
      if($(this).hasClass("tab1") == true) {
        contents_height = example_height;
        current_num = 1;
      } else if($(this).hasClass("tab2") == true) {
        contents_height = usage_height;
        current_num = 2;
      } else {
        contents_height = download_height;
        current_num = 3;
      }

      init_contents();
    });
  }

  //----------------------------------
  // EXAMPLE CONTAINER
  //----------------------------------
  var count = 0;

  function click_example_button()
  {
    $(".examples-container, .example .turnBoxButton").on("click", function()
    {
      count = 0;
      render_example_height();
    });
  }

  function render_example_height()
  {
    setTimeout(function()
    {
      example_height = $(".examples-container").innerHeight();
      contents_height = $(".examples-container").innerHeight();
      
      $(".contents-body").css({
        "height": contents_height + "px",
        "overflow-y": "visible"
      });
    }, 500);
  }

  function show_box()
  {
    var examples = $(".examples");
    var examples_length = $(".examples").length;

    setTimeout(function()
    {
      $(".title").addClass("show");
    }, 500);

    $.each(examples, function(key)
    {
      var example = $(this).find(".example");
      var num = key + 1;
      var time = 200 * num;

      setTimeout(function()
      {
        example.addClass("show");
      }, 800 + time);
    });
  }

  //----------------------------------
  // USAGE
  //----------------------------------
  function config_language_box()
  {
    $(".language").turnBox(
    {
      width: 40,
      height: 30
    });

    $(".language").find(".turnBoxButton").on("click", function()
    {
      var self_box = $(this).closest(".turnBoxContainer");
      if(self_box.hasClass("en") == true) {
        var text_lang = $(".text.en");
      } else {
        var text_lang = $(".text.jp");
      }

      $(".language").not(self_box).turnBoxAnimate();
      $(".text").removeClass("show");
      text_lang.addClass("show");
    });

    $(".language.jp").turnBoxAnimate({
      face: 2
    });

    $(".text.jp").addClass("show");
  }

  function config_css_box()
  {
    $(".css-sample").turnBox();
  }

  function config_usage_link_box()
  {
    $(".sample-box").turnBox({
      height: 60,
      type: "skip"
    });

    $(".child-box").turnBox({
      width: 80,
      height: 40
    });

    $(".link-button-inner").turnBoxLink({
      box: ".sample-box",
    });

    $(".link-button-prev").turnBoxLink({
      box: ".sample-box",
      dist: "prev"
    });

    $(".link-button-next").turnBoxLink({
      box: ".sample-box",
    });

    $(".link-button-skip").turnBoxLink({
      box: ".sample-box",
      events: "mouseover touchstart",
      dist: 2
    });

    $(".link-button-inner").on("click", function()
    {
      setTimeout(function()
      {
        $(".child-box").turnBoxAnimate({
          face: 1,
          animation: false
        });
      }, 200);
    });
  }

  function config_usage_animate_box()
  {
    $(".animate-sample").turnBox({
      height: 60,
      type: "skip"
    });

    $(".animate-true").on("click", function()
    {
      $(".animate-sample").turnBoxAnimate();
    });

    $(".animate-false").on("click", function()
    {
      $(".animate-sample").turnBoxAnimate(
      {
       animation: false
      });
    });
  }

  //----------------------------------
  // DOWNLOAD
  //----------------------------------
  function config_download_box()
  {
    $(".download-button").turnBox({
      width: 250,
      height: 80,
      duration: 300,
    });

    $(".github-button").turnBox({
      width: 230,
      height: 60,
      duration: 300,
    });

    $(".contents-tabs .tab3").on("click", function()
    {
      setTimeout(function()
      {
        $(".github-button").turnBoxAnimate(
        {
          face: 2
        });
      }, 500);
      setTimeout(function()
      {
        $(".download-button").turnBoxAnimate(
        {
          face: 2
        });
      }, 600);
    });

    $(".contents-tabs .tab").not(".tab3").on("click", function()
    {
      setTimeout(function()
      {
        $(".download-button, .github-button").turnBoxAnimate();
      }, 450);
    });
  }


  function init_layout()
  {
    config_header_box();

    config_tab_box();
    config_contents_box();
    resize_window();
    render_tab_box();

    click_example_button();

    config_language_box();
    config_css_box();
    config_usage_link_box();
    config_usage_animate_box();

    config_download_box();

    setTimeout(function()
    {
      get_contents_val();
      change_content();
      show_box();
    }, 600);
  }

  init_layout();
});