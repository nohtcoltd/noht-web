$(function()
{  
  $(document).ready(function()
  {
    confirm_animation();
    init_input();
  });

  function confirm_animation()
  {
    $(document).on("click", ".confirm", function()
    {
      $(".form-wrapper").addClass("check");
      $("input, textarea").attr("disabled", "disabled");
    });
    $(document).on("click", ".back", function()
    {
      $(".form-wrapper").removeClass("check");
      $("input, textarea").removeAttr("disabled");
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

      if(target.val().length == 0) {
        target.addClass("empty-box").val(box_val);
      }

      target.off("focus").on("focus", function()
      {
        if(target.hasClass("empty-box") > 0) {
          target.val("").removeClass("empty-box");
        }
      }).off("blur").on("blur", function()
      {
        init_input();
      });
    });
  }

});
