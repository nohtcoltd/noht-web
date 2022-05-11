$(function()
{

  //エスケープ文字
  function get_entity()
  {
    var entity = {};
    entity["nl"] = "\n",
    entity["indent_1"] = "\u0020\u0020",
    entity["indent_2"] = entity["indent_1"] + entity["indent_1"],
    entity["indent_3"] = entity["indent_1"] + entity["indent_1"] + entity["indent_1"]
    return entity;
  }

  //RGB→HSL
  function rgb_to_hsl(r, g, b)
  {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if(max == min){
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {h: h, s: s, l: l};
  }

  //HSL→RGB
  function hsl_to_rgb(h, s, l)
  {
    var r, g, b;
    if(s == 0){
      r = g = b = l; // achromatic
    } else {
      function hue_to_rgb(p, q, t)
      {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue_to_rgb(p, q, h + 1/3);
      g = hue_to_rgb(p, q, h);
      b = hue_to_rgb(p, q, h - 1/3);
    }
    return {r: r * 255, g: g * 255, b: b * 255};
  }

  //RGB→HEX
  function rgb_to_hex(rgb)
  {
   var rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
   return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  }

  //色の明暗
  function lighten_darken_color(col, amt)
  {
    if (col[0] == "#") {
      col = col.slice(1);
    }

    var num = parseInt(col, 16);
    var rc = num >> 16;
    var gc = (num >> 8) & 0x00FF;
    var bc = num & 0x0000FF;

    var hsl = rgb_to_hsl(rc, gc, bc);
    var l = hsl.l + (amt / 100);
    var rgb = hsl_to_rgb(hsl.h, hsl.s, l);

    var r = parseInt(rgb.r);
    var g = parseInt(rgb.g);
    var b = parseInt(rgb.b);

    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }
    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }
    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }
    return r + "," + g + "," + b;
  }


//-----------------------------------------
//プリセットのアニメーション
//-----------------------------------------
  //プリセットのタイプ
  function get_preset_type_config()
  {
    var type = {};
    type["via"] = {
      height: "20px",
      width: "20px",
      radius: "10px",
      margin: "2px",
      child_margin: "2px"
    };

    type["nomal"] = {
      number: 1,
      float: "none",
      clear: "none",
      height: "30px",
      width: "150px",
      radius: "3px",
      margin:"15px",
      child_margin: "0px"
    };

    type["circle"] = {
      number: 2,
      float: "left",
      clear: "none",
      height: "50px",
      width: "50px",
      radius: "25px",
      margin: "7px",
      child_margin: "7px"
    };

    type["square"] = {
      number: 3,
      float: "left",
      clear: "both",
      height: "70px",
      width: "70px",
      radius: "5px",
      margin: "5px",
      child_margin: "5px"
    };
    return type;
  }

  //クリック時の挙動
  function preset_animation_init()
  {
    var type = get_preset_type_config();
    var click = {left: "left", right: "right"};
    if ( $(".presets-button-set").val() == false){
      $(".presets-button-set").val(1);
    }
    $.each(click, function()
    {
      var target = this;
      $("." + target).click(function()
      {
        if (target == "left" && $(".presets-button-set").val() == 1) {
          var preset_val = "square";
        } else if (target == "left" && $(".presets-button-set").val() == 3) {
          var preset_val = "circle";
        } else if (target == "left" && $(".presets-button-set").val() == 2) {
          var preset_val = "nomal";
        } else if (target == "right" && $(".presets-button-set").val() == 1) {
          var preset_val = "circle";
        } else if (target == "right" && $(".presets-button-set").val() == 2) {
          var preset_val = "square";
        } else if (target == "right" && $(".presets-button-set").val() == 3) {
          var preset_val = "nomal";
        };
        $(".preset-button").stop().animate({
          "height": type["via"].height,
          "width": type["via"].width,
          "border-radius": type["via"].radius,
          "margin": type["via"].margin
        },{
          duration: 100,
          easing: "swing",
          complete: function()
          {
            change_preset_type(preset_val);
            $(".presets-button-set").val(type[preset_val].number);
            $(".preset-button").css("float", type[preset_val].float);
            $(".presets-button-set .red").css("clear", type[preset_val].clear);
          }
        });
      });
    });
  }

  //各タイプのアニメーション
  function change_preset_type(preset_val)
  {
    var type = get_preset_type_config();
    var animate = $(".preset-button").stop().animate({
      "height": type[preset_val].height,
      "width": type[preset_val].width,
      "border-radius": type[preset_val].radius,
      "margin": type[preset_val].margin
    },{
      duration: 100,
      easing: "swing",
      complete: function()
      {
        $(".presets-button-set .green").css("margin-top", type[preset_val].child_margin);
        $(".presets-button-set .black").css("margin-bottom", type[preset_val].child_margin);
      }
    });
    return animate;
  }

//-----------------------------------------
//セレクター
//-----------------------------------------
  //--------------------------
  //スライダー
  //--------------------------
  //スライダーの設定
  function get_slider_config()
  {
    var slider = {};
    slider["label_size"] = {
      class_name: "label-size",
      intial: 18,
      min: 10,
      max: 60,
      unit: "px",
    };

    slider["icon_size"] = {
      class_name: "icon-size",
      intial: 27,
      min: 10,
      max: 120,
      unit: "px"
    };

    slider["popup"] = {
      class_name: "popup-dist",
      intial: 3,
      min: 0,
      max: 10,
      unit: "px"
    };

    slider["horizontal_padding"] = {
      class_name: "horizontal-padding",
      intial: 15,
      min: 1,
      max: 45,
      unit: "px"
    };

    slider["vertical_padding"] = {
      class_name: "vertical-padding",
      intial: 6,
      min: 1,
      max: 45,
      unit: "px"
    };

    slider["radius"] = {
      class_name: "radius",
      intial: 30,
      min: 0,
      max: 100,
      unit: "%",
    };

    slider["speed"] = {
      class_name: "speed",
      intial: 30,
      min: 0,
      max: 150,
      unit: "ms"
    };

    slider["darkness"] = {
      class_name: "side-darkness",
      intial: 15,
      min: 1,
      max: 100,
      unit: "%"
    };
    return slider;
  }

  //スライダーの初期化用関数
  function slider_init()
  {
    var slider = get_slider_config();
    $.each(slider, function()
    {
      var value = this;
      $("."  + value.class_name +  " .slider").slider({
        value: value.intial,
        min: value.min,
        max: value.max,
        step: 1,
        range: "min",
        css: "fast",
        slide: change_slider,
        change: change_slider
      });
    });
    display_slider_val();
  }

  //変動時の挙動
  function change_slider()
  {
    change_css();
    display_slider_val();
  };

  //現在の値を取得
  function get_current_slider_val(target)
  {
    var slider = get_slider_config();
    var val = $("." + slider[target].class_name + " .slider").slider("value");
    return val;
  }

  //値の改変
  function modify_slider_val()
  {
    if (get_current_slider_val("icon_size") < get_current_slider_val("label_size")) {
      var modify_val = {
        radius: parseInt(get_current_slider_val("radius") * ((get_current_slider_val("label_size") + get_current_slider_val("vertical_padding") * 2) / 2) / 100),
        line_height: 1.0,
        padding:  110 - ((get_current_slider_val("label_size")/2) + get_current_slider_val("vertical_padding")),
        horizontal_padding: get_current_slider_val("horizontal_padding") / 2
      };
    } else {
      var modify_val = {
        radius: parseInt(get_current_slider_val("radius") * ((get_current_slider_val("icon_size") + get_current_slider_val("vertical_padding") * 2) / 2) / 100),
        line_height: (get_current_slider_val("icon_size") / get_current_slider_val("label_size")).toFixed(1),
        padding: 110 - ((get_current_slider_val("icon_size")/2) + get_current_slider_val("vertical_padding")),
        horizontal_padding: get_current_slider_val("horizontal_padding") / 2
      };
    };
    return modify_val;
  }

  //スライダー横の数値表示
  function display_slider_val()
  {
    var slider = get_slider_config();
    $.each(slider, function(){
      var value = this;
      var count = $("." + value.class_name + " .slider").slider("value");
      $("."  + value.class_name +  " .count-display").html( count + value.unit);
      return value;
    });
  }

  //--------------------------
  //カラーピッカー
  //--------------------------
  //カラーピッカーの設定
  function get_color_picker_config()
  {
    var color_picker = {};
    color_picker["label"] = {
      class_name: "label-color",
      intial: "f8f8f8"
    };

    color_picker["button"] = {
      class_name: "button-color",
      intial: "#4385bf"
    };
    return color_picker;
  }

  //カラーピッカーの初期化用関数
  function color_picker_init()
  {
   var color_picker = get_color_picker_config();

    $.each(color_picker, function()
    {
      var value = this;
      $("." + value.class_name + " .color-picker").spectrum({
        color: value.intial,
        showInput: true,
        showInitial: true,
        preferredFormat: "hex6",
        clickoutFiresChange: true,
        showButtons: false,
        change: change_color_picker,
        move: change_color_picker
      });
    });
    display_color_picker_selector();
  }

  //変動時の挙動
  function change_color_picker()
  {
    change_css();
    display_color_picker_selector();
  }

  //現在の値を取得
  function get_current_color_val(target)
  {
    var color_picker = get_color_picker_config();
    var val = $("." + color_picker[target].class_name + " .color-picker").spectrum("get");
    return val;
  }

  //値の改変
  function modify_color_val()
  {
    var modify_val = {
      lighten: rgb_to_hex("rgb(" + lighten_darken_color(get_current_color_val("button").toHexString(), 3) + ")"),
      darken: rgb_to_hex("rgb(" + lighten_darken_color(get_current_color_val("button").toHexString(), -5) + ")"),
      side: lighten_darken_color(get_current_color_val("button").toHexString(), -get_current_slider_val("darkness")),
      inset: lighten_darken_color(get_current_color_val("button").toHexString(), -5 -get_current_slider_val("darkness"))
    };
    return modify_val;
  }

  //セレクタに表示される色
  function display_color_picker_selector()
  {
    var color_picker = get_color_picker_config();
    $.each(color_picker, function(){
      var value = this;
      var color = $("." + value.class_name + " .color-picker").spectrum("get");
      var hsl = rgb_to_hsl(color.toRgb().r, color.toRgb().g, color.toRgb().b);
      if (hsl.l < 0.5) {
        var hover_color = "rgb(" + lighten_darken_color(color.toHexString(), 3) + ")"
        var comp_color = {
          r: 255 - color.toRgb().r + 100,
          g: 255 - color.toRgb().g + 100,
          b: 255 - color.toRgb().b + 100
        }
      } else {
        var hover_color = "rgb(" + lighten_darken_color(color.toHexString(), -3) + ")"
        var comp_color = {
          r: 255 - color.toRgb().r - 100,
          g: 255 - color.toRgb().g - 100,
          b: 255 - color.toRgb().b - 100
        }
      }
      $("." + value.class_name + " .color-picker").css("background-color", color.toHexString()).hover(function()
      {
        $(this).css("background-color", hover_color);
      },function()
      {
        $(this).css("background-color", color.toHexString);
      }
     );

      $("." + value.class_name + " .popup-sign").css("border-top-color", "rgb(" + comp_color.r + "," + comp_color.g + "," + comp_color.b + ")");
      return value;
    });
  }

  //--------------------------
  //テキストボックス
  //--------------------------
  //html要素の設定
  function get_html_code_config()
  {
    var html_code_config = {};
    html_code_config["label"] = {
      class_name: "button-label",
      intial: "TEXT"
    };

    html_code_config["icon"] = {
      class_name: "icon",
      intial: "file"
    };
    return html_code_config;
  }

  //初期化用関数
  function text_box_init()
  {
    var html_code_config = get_html_code_config();
    $("." + html_code_config["label"].class_name + " .text-box").val(html_code_config["label"].intial)
    .click(function()
    {
        $(this).select();
    });
    change_text_box();
  }

  //現在の値を取得
  function get_current_text()
  {
    var html_code_config = get_html_code_config();
    var text = $("." + html_code_config["label"].class_name + " .text-box").val();
    return escapehtml(text);
  }

  //書き換えた時の挙動
  function change_text_box()
  {
    var html_code_config = get_html_code_config();
    $("." + html_code_config["label"].class_name + " .text-box").keyup(function()
    {
     change_html();
    });
  }

  //html escape
  function escapehtml(s) {
    s=s.replace(/&/g,'&amp;');
    s=s.replace(/>/g,'&gt;');
    s=s.replace(/</g,'&lt;');
    return s;
  }


  //--------------------------
  //アイコンの選択
  //--------------------------
  //初期値を反映
  function icon_init()
  {
    var html_code_config = get_html_code_config();
    $(".icon-list ul > li:contains(" + html_code_config["icon"].intial + ")").addClass("selected");
    display_icon();
    popup_icon_selector();
  }

  //ポップアップの挙動
  function popup_icon_selector()
  {
    //開く
    $(".icon .region-content .icon-font-inset").click(function()
    {
      var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      $(".overlay").fadeIn("fast")
                   .css({"top":(scrollY + 50)});
      $(".bg-overlay").fadeTo("fast", 0.7);
    });
    //閉じる
    $(".button-closed, .bg-overlay, .icon-list ul > li").click(function()
    {
      $(".icon-popup > div").fadeOut("slow");
    });
    select_icon();
  }

  //アイコンの選択
  function select_icon()
  {
    $(".icon-list ul > li").click(function()
    {
      $(".icon-list .selected").removeClass("selected");
      $(this).addClass("selected");
      change_html();
      display_icon();
    });
  }

  //現在の値を取得
  function get_current_icon()
  {
    var icon = $(".icon-list .selected").text();
    return icon
  }

  //セレクタに値を表示
  function display_icon()
  {
    $(".icon .icon-font-inset").text(get_current_icon());
  }

  //--------------------------
  //コード
  //--------------------------
  //CSSコード
  function get_css_code()
  {
    var entity = get_entity();
    var css_code = {};
    //挿入用コメント
    css_code["comments"] = {
      user_style_start: "/*------------------------------------------" + entity["nl"] + "// User style start"  + entity["nl"] + "// change"  + entity["nl"] + "----------------------------------------- */" + entity["nl"] + entity["nl"],
      user_style_end: "/*------------------------------------------" + entity["nl"] + "// User style end"  + entity["nl"] + "----------------------------------------- */" + entity["nl"],
      core_style_start: entity["nl"] + "/*------------------------------------------" + entity["nl"] + "// Core style start"  + entity["nl"] + "// not change"  + entity["nl"] + "----------------------------------------- */" + entity["nl"] + entity["nl"],
      core_style_end: entity["nl"] + "/*------------------------------------------" + entity["nl"] + "// Core style end"  + entity["nl"] + "----------------------------------------- */" + entity["nl"],
      touch_start: entity["nl"] + "/*------------------------------------------" + entity["nl"] + "// Touch style start" + entity["nl"] + "----------------------------------------- */",
      touch_end: entity["nl"] + "/*------------------------------------------" + entity["nl"] + "// Touch style end"  + entity["nl"] + "----------------------------------------- */" + entity["nl"],
      hover:  entity["nl"] + entity["nl"] + "/*----------------- at hover -----------------*/",
      active: entity["nl"] + entity["nl"] + "/*----------------- at active -----------------*/"
    };

    //各クラスネーム
    css_code["class_name"] = {
      general: ".general-button" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      general_before: entity["nl"] + entity["nl"] + ".general-button:before" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      button_content: entity["nl"] + entity["nl"] + ".button-content" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      button_text: entity["nl"] + entity["nl"] + ".button-text" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      icon_font: entity["nl"] + entity["nl"] + ".icon-font" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      general_hover: entity["nl"] + entity["nl"] + ".general-button:hover" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      general_hover_before: entity["nl"] + entity["nl"] + ".general-button:hover:before" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      button_content_hover: entity["nl"] + entity["nl"] + ".general-button:hover .button-content" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      general_active: entity["nl"] + entity["nl"] + ".general-button:active" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      general_active_before: entity["nl"] + entity["nl"] + ".general-button:active:before" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      button_content_active: entity["nl"] + entity["nl"] + ".general-button:active .button-content" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      touch_hover: entity["nl"] + entity["nl"] + ".touch .general-button:hover" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      touch_hover_before: entity["nl"] + entity["nl"] + ".touch .general-button:hover:before" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      touch_content_hover: entity["nl"] + entity["nl"] + ".touch .general-button:hover .button-content" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      touch_active: entity["nl"] + entity["nl"] + ".touch .general-button:active" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      touch_active_before: entity["nl"] + entity["nl"] + ".touch .general-button:active:before" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
      touch_content_active: entity["nl"] + entity["nl"] + ".touch .general-button:active .button-content" + entity["indent_1"] + "{" + entity["nl"] + entity["indent_1"],
    };

    //コード短縮
    css_code["snippets"] = {
      radius_all: "border-radius: "+ modify_slider_val().radius + "px;",
      radius_bottom: "border-radius: 0px 0px "+ modify_slider_val().radius + "px "+ modify_slider_val().radius + "px;",
      transition_hover: "transition: all "+ get_current_slider_val("speed") + "ms;"+ entity["nl"] + entity["indent_1"] + "-moz-transition: all "+ get_current_slider_val("speed") + "ms;"+ entity["nl"] + entity["indent_1"] + "-webkit-transition: all "+ get_current_slider_val("speed") + "ms;"+ entity["nl"] + entity["indent_1"] + "-o-transition: all "+ get_current_slider_val("speed") + "ms;",
      transition_active: "transition: all 0ms;"+ entity["nl"] + entity["indent_1"] + "-moz-transition: all 0ms;"+ entity["nl"] + entity["indent_1"] + "-webkit-transition: all 0ms;"+ entity["nl"] + entity["indent_1"] + "-o-transition: all 0ms;",
      close: entity["nl"] + "}"
    };

    //アイコン
    css_code["icon_font"] = {
      font_face: '@font-face {' + entity["nl"] + entity["indent_1"] +
        'font-family: "LigatureSymbols";' + entity["nl"] + entity["indent_1"] +
        'src: url("../font/LigatureSymbols-2.11.eot");' + entity["nl"] + entity["indent_1"] +
        'src: url("../font/LigatureSymbols-2.11.eot?#iefix") format("embedded-opentype"),' + entity["nl"] + entity["indent_3"] +
        '     url("../font/LigatureSymbols-2.11.woff") format("woff"),' + entity["nl"] + entity["indent_3"] +
        '     url("../font/LigatureSymbols-2.11.ttf") format("truetype"),' + entity["nl"] + entity["indent_3"] +
        '     url("../font/LigatureSymbols-2.11.svg#LigatureSymbols") format("svg");' + entity["nl"] + entity["indent_1"] +
        'font-weight: normal;' + entity["nl"] + entity["indent_1"] +
        'font-style: normal;' + entity["nl"] +
        '}' + entity["nl"],
      font_family: entity["nl"] + '.icon-font {' + entity["nl"] + entity["indent_1"] +
        'font-family: "LigatureSymbols";' + entity["nl"] + entity["indent_1"] +
        '-webkit-text-rendering: optimizeLegibility;' + entity["nl"] + entity["indent_1"] +
        '-moz-text-rendering: optimizeLegibility;' + entity["nl"] + entity["indent_1"] +
        '-ms-text-rendering: optimizeLegibility;' + entity["nl"] + entity["indent_1"] +
        '-o-text-rendering: optimizeLegibility;' + entity["nl"] + entity["indent_1"] +
        'text-rendering: optimizeLegibility;' + entity["nl"] + entity["indent_1"] +
        '-webkit-font-smoothing: antialiased;' + entity["nl"] + entity["indent_1"] +
        '-moz-font-smoothing: antialiased;' + entity["nl"] + entity["indent_1"] +
        '-ms-font-smoothing: antialiased;' + entity["nl"] + entity["indent_1"] +
        '-o-font-smoothing: antialiased;' + entity["nl"] + entity["indent_1"] +
        'font-smoothing: antialiased;' + entity["nl"] + entity["indent_1"] +
        '-webkit-font-feature-settings: "liga"1, "dlig"1;' + entity["nl"] + entity["indent_1"] +
        '-moz-font-feature-settings: "liga=1, dlig=1";' + entity["nl"] + entity["indent_1"] +
        '-ms-font-feature-settings: "liga"1, "dlig"1;' + entity["nl"] + entity["indent_1"] +
        '-o-font-feature-settings: "liga"1, "dlig"1;' + entity["nl"] + entity["indent_1"] +
        'font-feature-settings: "liga"1, "dlig"1;' + entity["nl"] +
        '}' + entity["nl"] + entity["nl"]
    };

    //位置調整用margin
    css_code["display_margin"] = ".general-button { margin-top: "+ modify_slider_val().padding + "px; margin-bottom: "+ modify_slider_val().padding + "px; }"

    //可変コード
    css_code["variable_css"] = {
    nomal: "" + css_code["class_name"].general + css_code["snippets"].radius_all + entity["nl"] + entity["indent_1"] + "background-color: "+ get_current_color_val("button") + ";"+ css_code["snippets"].close +
           "" + css_code["class_name"].general_before +  css_code["snippets"].radius_all + entity["nl"] + entity["indent_1"] + "border-bottom: 0px solid rgba("+ modify_color_val().side + ", 0);"+ entity["nl"] + entity["indent_1"] + "background-color: rgba("+ modify_color_val().side + ", 0);"+ css_code["snippets"].close +
           "" + css_code["class_name"].button_content + css_code["snippets"].radius_bottom + entity["nl"] + entity["indent_1"] + "padding: "+ get_current_slider_val("vertical_padding") + "px "+ modify_slider_val().horizontal_padding + "px;"+ entity["nl"] + entity["indent_1"] + "box-shadow: 0px 0px 0px 0px rgba("+ modify_color_val().side + ", 0);" + entity["nl"] + entity["indent_1"] + "color: "+ get_current_color_val("label") + ";"+ css_code["snippets"].close +
           "" + css_code["class_name"].button_text + "padding: 0px "+ modify_slider_val().horizontal_padding + "px;"+ entity["nl"] + entity["indent_1"] + "line-height: "+ modify_slider_val().line_height + "em;"+ entity["nl"] + entity["indent_1"] + "font-size: "+ get_current_slider_val("label_size") + "px;" + entity["nl"] + "}" +
           "" + css_code["class_name"].icon_font + "padding: 0px "+ modify_slider_val().horizontal_padding + "px;"+ entity["nl"] + entity["indent_1"] + "font-size: "+ get_current_slider_val("icon_size") + "px;"+ css_code["snippets"].close,
    hover: "" + css_code["class_name"].general_hover + "top: -"+ get_current_slider_val("popup") + "px;"+ entity["nl"] + entity["indent_1"] + css_code["snippets"].transition_hover + entity["nl"] + entity["indent_1"] + "background-color: "+ modify_color_val().lighten +";"+ css_code["snippets"].close +
           "" + css_code["class_name"].general_hover_before + "border-bottom: "+ get_current_slider_val("popup") + "px solid rgba("+ modify_color_val().side + ", 0);"+ entity["nl"] + entity["indent_1"] + css_code["snippets"].transition_hover + css_code["snippets"].close +
           "" + css_code["class_name"].button_content_hover + "box-shadow: 0px "+ get_current_slider_val("popup") + "px 0px 0px rgba("+ modify_color_val().side + ", 1);"+ entity["nl"] + entity["indent_1"] + css_code["snippets"].transition_hover + css_code["snippets"].close,
    active: "" + css_code["class_name"].general_active + "background-color: "+ modify_color_val().darken + ";"+ entity["nl"] + entity["indent_1"] + "box-shadow: 0px "+ (( get_current_slider_val("popup") / 5) + 1) + "px 0px 0px rgba("+ modify_color_val().inset + ", 1) inset;"+ css_code["snippets"].close +
            "" + css_code["class_name"].general_active_before + "top: -"+ get_current_slider_val("popup") + "px;"+ entity["nl"] + entity["indent_1"] + "padding-bottom: "+ get_current_slider_val("popup") + "px;"+ entity["nl"] + entity["indent_1"] + "border-bottom: 0px solid rgba("+ modify_color_val().side + ", 0);"+ css_code["snippets"].close +
            "" + css_code["class_name"].button_content_active + "box-shadow: 0px 0px 0px 0px rgba("+ modify_color_val().side + ", 0);"+ css_code["snippets"].close + entity["nl"] + entity["nl"]
    };

    //不変コード
    css_code["constant_css"] = {
    nomal: "" + css_code["class_name"].general + "display: -moz-inline-box;"+ entity["nl"] + entity["indent_1"] + "display: inline-block;"+ entity["nl"] + entity["indent_1"] + "user-select: none;"+ entity["nl"] + entity["indent_1"] + "-moz-user-select: none;"+ entity["nl"] + entity["indent_1"] + "-webkit-user-select: none;"+ entity["nl"] + entity["indent_1"] + "-ms-user-select: none;"+ css_code["snippets"].transition_active + "position: relative;"+ entity["nl"] + entity["indent_1"] + "top: 0px;"+ entity["nl"] + entity["indent_1"] + "cursor: pointer;"+ entity["nl"] + entity["indent_1"] + "text-decoration: none;"+ entity["nl"] + entity["indent_1"] + "line-height: 1;"+ css_code["snippets"].close +
           "" + css_code["class_name"].general_before + "content: '';"+ entity["nl"] + entity["indent_1"] + "position: absolute;"+ entity["nl"] + entity["indent_1"] + "top: 0;"+ entity["nl"] + entity["indent_1"] + "left: 0;"+ entity["nl"] + entity["indent_1"] + "width: 100%;"+ entity["nl"] + entity["indent_1"] + "height: 100%;"+ css_code["snippets"].close +
           "" + css_code["class_name"].button_content + "display: table;"+ entity["nl"] + entity["indent_1"] + "transition: all 0ms;"+ entity["nl"] + entity["indent_1"] + "-moz-transition: all 0ms;"+ entity["nl"] + entity["indent_1"] + "-webkit-transition: all 0ms;"+ entity["nl"] + entity["indent_1"] + "-o-transition: all 0ms;"+ css_code["snippets"].close +
           "" + css_code["class_name"].button_text + "display: table-cell;"+ entity["nl"] + entity["indent_1"] + "vertical-align: middle;"+ entity["nl"] + entity["indent_1"] + "text-decoration: none;" + css_code["snippets"].close +
           "" + css_code["class_name"].icon_font + "display: table-cell;"+ entity["nl"] + entity["indent_1"] + "vertical-align: middle;"+ css_code["snippets"].close,
    hover: "" + css_code["class_name"].general_hover + "transition-timing-function: ease-in-out;"+ css_code["snippets"].close +
           "" + css_code["class_name"].general_hover_before + "transition-timing-function: ease-in-out;"+ css_code["snippets"].close +
           "" + css_code["class_name"].button_content_hover + "transition-timing-function: ease-in-out;"+ css_code["snippets"].close,
    active: "" + css_code["class_name"].general_active + "top: 0px;"+ entity["nl"] + entity["indent_1"] + css_code["snippets"].transition_active  + css_code["snippets"].close +
            "" + css_code["class_name"].general_active_before + css_code["snippets"].transition_active + css_code["snippets"].close +
            "" + css_code["class_name"].button_content_active + css_code["snippets"].transition_active  + css_code["snippets"].close + entity["nl"]
    };

    //touch
    css_code["touch_css"] = {
    hover: "" + css_code["class_name"].touch_hover + "top: 0px;" + entity["nl"] + entity["indent_1"] + "background-color: " + get_current_color_val("button") + ";"+ css_code["snippets"].close +
           "" + css_code["class_name"].touch_hover_before + "border-bottom: 0px solid rgba("+ modify_color_val().side + ", 0);"+ css_code["snippets"].close +
           "" + css_code["class_name"].touch_content_hover + "box-shadow: 0px 0px 0px 0px rgba("+ modify_color_val().side + ", 1);"+ entity["nl"] + css_code["snippets"].close,
    active: "" + css_code["class_name"].touch_active + "background-color: "+ modify_color_val().darken + ";"+ entity["nl"] + entity["indent_1"] + "box-shadow: 0px "+ (( get_current_slider_val("popup") / 5) + 1) + "px 0px 0px rgba("+ modify_color_val().inset + ", 1) inset;"+ css_code["snippets"].close +
            "" + css_code["class_name"].touch_active_before + "top: -"+ get_current_slider_val("popup") + "px;"+ entity["nl"] + entity["indent_1"] + "padding-bottom: "+ get_current_slider_val("popup") + "px;"+ entity["nl"] + entity["indent_1"] + "border-bottom: 0px solid rgba("+ modify_color_val().side + ", 0);"+ css_code["snippets"].close +
            "" + css_code["class_name"].touch_content_active + "box-shadow: 0px 0px 0px 0px rgba("+ modify_color_val().side + ", 0);"+ css_code["snippets"].close
    };

    return  {
      //style変更用
      insert_head: css_code["display_margin"]
                  + css_code["variable_css"].nomal + css_code["variable_css"].hover + css_code["variable_css"].active
                  + css_code["constant_css"].nomal  + css_code["constant_css"].hover + css_code["constant_css"].active
                  + css_code["touch_css"].hover + css_code["touch_css"].active,
      //htmlに表示
      insert_html: css_code["icon_font"].font_face + css_code["icon_font"].font_family
                  + css_code["comments"].user_style_start + css_code["variable_css"].nomal + css_code["comments"].hover + css_code["variable_css"].hover + css_code["comments"].active + css_code["variable_css"].active + css_code["comments"].user_style_end
                  + css_code["comments"].core_style_start + css_code["constant_css"].nomal + css_code["comments"].hover + css_code["constant_css"].hover + css_code["comments"].active + css_code["constant_css"].active + css_code["comments"].core_style_end
                  + css_code["comments"].touch_start + css_code["comments"].hover + css_code["touch_css"].hover + css_code["comments"].active +css_code["touch_css"].active + entity["nl"] + css_code["comments"].touch_end
    }
   }

  //HTMLコード
  function get_html_code()
  {
    var entity = get_entity();
    var label_text = get_current_text();
    var icon = get_current_icon();

    var html_code = "<div class=" + '"general-button"' + ">" +
      entity["nl"] + entity["indent_1"] + "<div class=" + '"button-content"' + ">" +
      entity["nl"] + entity["indent_2"] + "<span class=" + '"icon-font"' + ">" + icon + "</span>" +
      entity["nl"] + entity["indent_2"] + "<span class=" + '"button-text"' + ">" + label_text + "</span>" +
      entity["nl"] + entity["indent_1"] + "</div>" +
      entity["nl"] + "</div>" +
      entity["nl"];

    $(".icon .icon-font-inset").css("font-size", "30px");

    if (icon == "none" && label_text == "") {
      var html_code = "<div class=" + '"general-button"' + ">" +
        entity["nl"] + entity["indent_1"] + "<div class=" + '"button-content"' + ">" +
        entity["nl"] + entity["indent_1"] + "</div>" +
        entity["nl"] + "</div>" +
        entity["nl"];
      $(".icon .icon-font-inset").css("font-size", "25px");
    } else if (icon == "none") {
      var html_code = "<div class=" + '"general-button"' + ">" +
        entity["nl"] + entity["indent_1"] + "<div class=" + '"button-content"' + ">" +
        entity["nl"] + entity["indent_2"] + "<span class=" + '"button-text"' + ">" + label_text + "</span>" +
        entity["nl"] + entity["indent_1"] + "</div>" +
        entity["nl"] + "</div>" +
        entity["nl"];
      $(".icon .icon-font-inset").css("font-size", "25px");
    } else if (label_text == "") {
      var html_code = "<div class=" + '"general-button"' + ">" +
        entity["nl"] + entity["indent_1"] + "<div class=" + '"button-content"' + ">" +
        entity["nl"] + entity["indent_2"] + "<span class=" + '"icon-font"' + ">" + icon + "</span>" +
        entity["nl"] + entity["indent_1"] + "</div>" +
        entity["nl"] + "</div>" +
        entity["nl"];
    }

    return html_code;
  }

  //headのstyleにコードを挿入//
  function insert_style()
  {
    var old_style = document.getElementsByTagName("style")[0];
    var new_style = document.createElement("style");
    var head = document.getElementsByTagName("head")[0];
    var css = get_css_code().insert_head;
    if(typeof old_style != "undefined"){
      head.removeChild(old_style)
    }
    head.appendChild(new_style);
    new_style.appendChild(document.createTextNode(css));
  }

  //CSS変更//
  function change_css()
  {
    var css = get_css_code().insert_html;
    insert_style();
    $(".css .code-convert").html(css);
  }

  //HTMLを変更//
  function change_html()
  {
    var entity = get_entity();
    var modernizr_comment = '<!-- ' +
    entity["nl"] + entity["indent_1"] +'Using Modernizr.js for smartphone.' +
    entity["nl"] + entity["indent_1"] +'http://modernizr.com' +
    entity["nl"] + '-->' + entity["nl"];

    var html = get_html_code();
    $(".demo-display").html(html);
    $(".html .code-convert").text(modernizr_comment + html);
  }

  //デモボタンの初期化用
  function button_elements_init()
  {
    change_html();
    change_css();
  }

//-----------------------------------------
//コピーボタン
//-----------------------------------------
  function copy_button()
  {
    var section = {html: "html", css: "css"};
    $.each(section, function()
    {
      var target = this;
      $("." + target + " .copy-button").zclip({
        path: "/js/vendor/ZeroClipboard.swf",
        copy: function()
        {
          return $("." + target + " .code-convert").val();
        }
      });
      $("." + target + " .zclip").hover(function()
      {
        $("." + target + " .copy-button").css("background-color", "#838383");
        $("." + target + " .code-convert").css("background-color", "#ffffff");
      },function()
      {
        $("." + target + " .copy-button").css("background-color", "#7c7c7c");
        $("." + target + " .code-convert").css("background-color", "#fefefe");
      });
      $("." + target + " .zclip").mousedown(function()
      {
        $("." + target + " .copy-button").css("background-color", "#707070");
        $("." + target + " .code-convert").css("background-color", "#fcfcfc");
      });
      $("." + target + " .zclip").mouseup(function()
      {
        $("." + target + " .copy-button").css("background-color", "#7c7c7c");
        $("." + target + " .code-convert").css("background-color", "#ffffff");
      });
    });
  }

//-----------------------------------------
//ダウンロード用データの通信
//-----------------------------------------

  function download_created_button()
  {
    $(".downloads .created-button").click(function()
    {
     value_transmission();
    });
  }

  //ajaxの設定
  function value_transmission()
  {
    $.ajax({
      type: "POST",
      url: "/2_5dbutton/create",
      data: {
        text: get_current_text(),
        icon: get_current_icon(),
        label_size: get_current_slider_val("label_size"),
        icon_size: get_current_slider_val("icon_size"),
        label_color: get_current_color_val("label").toHexString(),
        popup_dist: get_current_slider_val("popup"),
        horizontal_padding: get_current_slider_val("horizontal_padding"),
        vertical_padding: get_current_slider_val("vertical_padding"),
        radius: modify_slider_val().radius,
        speed: get_current_slider_val("speed"),
        button_color: get_current_color_val("button").toHexString(),
        side_darkness: get_current_slider_val("darkness")
      },
      success: function(data)
      {
        location.href = data;
      }
    });
  }

//-----------------------------------------
//初期化実行関数
//-----------------------------------------
  function init()
  {
    //presets
    preset_animation_init();
    //selector
    slider_init();
    color_picker_init();
    text_box_init();
    icon_init();
    button_elements_init();
    //copy
    copy_button();
    //download
    download_created_button();
  }
  init();
}
);
