$(function()
{  
  $(document).ready(function()
  {
    init_input();
    confirm_animation();
    thanks_animation();
    close_button();
    console.log("init");
  });

  function confirm_animation()
  {
    $(document).on("click", ".confirm", function()
    {
      if($("input, textarea").not("#company").hasClass("empty") > 0) {
        $(".empty").not("#company").parent(".customer-info").addClass("has-error");
        console.log("empty");
      } else {
        $(".form-wrapper").addClass("check");
        $("input, textarea").attr("disabled", "disabled");
      }
    });
    $(document).on("click", ".back", function()
    {
      $(".form-wrapper").removeClass("check");
      $("input, textarea").removeAttr("disabled");
    });

  }

  function thanks_animation()
  {
    $(document).on("click", ".ok", function()
    {
      $(".form-wrapper, .thanks-wrapper").addClass("send-request");
    });
  }

  function init_input()
  {
    $(".customer-info").each(function()
    {
      var target = $(this).children();
      var id = target.attr("id");
      var box_val = id.charAt(0).toUpperCase() + id.slice(1);
      if(id == "message") {
        box_val = "Content";
      }
      if(box_val == "Company") {
        box_val = "Company (optional)";
      }

      if(target.val().length == 0) {
        target.addClass("empty").val(box_val);
      }

      target.off("focus").on("focus", function()
      {
        $(this).parent(".customer-info").removeClass("has-error");
      }).off("keydown").on("keydown", function()
      {
        if(target.hasClass("empty") > 0) {
          target.val("").removeClass("empty");
        }
      }).off("blur").on("blur", function()
      {
        init_input();
      });
    });
    console.log("nput");
  }

  function close_button()
  {

  }
});
