$(function(){
  //macとwindowsそれぞれにクラスを付加
  var a = window.navigator.userAgent.toLowerCase();
  if(a.indexOf("win") != -1) {
    $('html').addClass('windows');
  } else if(a.indexOf("mac") != -1) {
    $('html').addClass('mac');
  } else {
    // nop
  }
//  $('#contents').tinyscrollbar();
  $(".content").click(function(){
    $(this).toggleClass("animated");
  });
})

$(function()
{
  var _target = ".article"
      $target = $(_target);

  //画面がロードされ次第開始
  $(window).load(function(){
    var count = 0,
        duration = 300;

    $target.each(function(){
      var self = this;
      $(self).on('inview', function() {

        if($(self).hasClass('visible')){
          return false;
        }

        setTimeout(function(){
          $(self).addClass("visible");
        }, count * duration);

        console.log(count);
        count++

        setTimeout(function(){
          count--;
        }, count *duration);
      });
    })
  })
});


