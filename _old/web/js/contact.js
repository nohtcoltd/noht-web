$(function()
{
  var is_submit = false;
  $(document).ready(function()
  {
    confirm_action();
    submit_action();
    close_button();
  });

  function init_input_validate()
  {
    $(".customer-info").each(function()
    {
      var target = $(this).children("input, textarea")[0];

      $(target).off("blur").on("blur", function(e) {
        input_validate(target);
      });
      input_validate(target);
    });
  }

  function input_validate(obj)
  {
    var isSuccess = true;
    var $id = $(obj);
    var id = $id.attr("id");

    if (id != "company" && $id.val() == "") {
      isSuccess = false;
    }

    if (id == "mail" && !mail_validation($id.val())) {
      isSuccess = false;
    }

    if (id == "mail_confirm" && $id.val() !== $("#mail").val()) {
      isSuccess = false;
    }

    if (isSuccess) {
      remove_error($id);
    } else {
      add_error($id);
    }
  }

  function add_error($id)
  {
    $id.parent('.customer-info').addClass('has-error');
  }

  function remove_error($id)
  {
    $id.parent('.customer-info').removeClass('has-error');
  }

  function mail_validation(mail)
  {
     var pattern = /^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&\'*+\\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&\'*+\\/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&\'*+\\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&\'*+\\/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/;

     return pattern.test(mail);
  }

  function confirm_action()
  {
    $(document).on("click", ".confirm", function()
    {
      init_input_validate();
      if (do_confirm()) {
         confirm_animation();
      }
    });
    $(document).on("click", ".back", function()
    {
      return_animation();
    });
  }

  function do_confirm()
  {
    var is_confirm = true;
    $(".customer-info").each(function()
    {
      if($(this).hasClass('has-error')) {
        is_confirm = false;
      }
    });
    return is_confirm;
  }

  function confirm_animation()
  {
    $(".form-wrapper").addClass("check");
    $("#contact input, #contact textarea").attr("disabled", "disabled");
  }

  function return_animation()
  {
    $(".form-wrapper").removeClass("check");
    $("#contact input, #contact textarea").removeAttr("disabled");
  }

  function submit_action()
  {
    $(document).on("click", ".submit", function()
    {
      console.log('submit');
      submit();
    });
  }


  function submit()
  {
    if (is_submit) {
      return;
    }
    is_submit = true;

    var data
    = {"name": $("#name").val(),
      "company": $("#company").val(),
      "mail": $("#mail").val(),
      "mail_confirm": $("#mail_confirm").val(),
      "message": $("#message").val(),
    };

    $.ajax({
      url: "/contact",
      type: "POST",
      data: data
    }).done(function(data){

      data = JSON.parse(data);

      if(data.status == "error") {
        for (var key in data.errors) {
          add_error(key);
        }
        return_animation();
      } else if(data.status == "success") {
        ga_send();
        close_animation();
      }

      is_submit = false;
    });
  }

  function ga_send()
  {
     var location = window.location.pathname + window.location.search;
     if(ga) {
        ga('send', {
            'hitType': 'pageview',
            'page': '/contact/thanks',
            'title': 'contact/thanks'
        });
     }
  }


  function close_button()
  {
    $(".close").on("click", function()
    {
      setTimeout(function()
      {
          $(".send-request, .check, .has-error").removeClass("send-request check has-error");
          $("#contact input, #contact textarea").val("").removeAttr("disabled");
      }, 800);
    });
  }

  function close_animation()
  {
     $(".form-wrapper, .thanks-wrapper").addClass("send-request");
  }
});
