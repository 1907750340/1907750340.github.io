
$(function(){
  // 模拟加载
  jiaZai();
  function jiaZai(){
    $(document).ajaxStart(function(){
      NProgress.start();
    })
    $(document).ajaxStop(function(){
        NProgress.done();
    })
  }
  // 左边隐藏
  asideHide();
  function asideHide(){
   $("#aside-hide").on("click",function(){
     $(".aside").toggleClass("aside-hide");
     $(".right-aside").toggleClass("right-p0");
   })
  }
  //分类管理折叠
  zheDie();
  function zheDie(){
    $(".fenlei").click(function(){
      $(".fenlei .child").slideToggle()
    })
  }
  //退出登录
  logOut();
  function logOut(){
    $("#logout").click(function(){
      $('.modal').modal('show');
    })
    $("#logout-yes").click(function(){
      $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        dataType:"json",
        success:function(info){
        if(info.success){
          location.href="login.html";
        }
        }
      })
    })
  }
  //登录拦截
  lanJie();
  function lanJie(){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      dataType:"json",
      success:function(info){
        if(location.href.indexOf("login.html")===-1){
          if(info.error===400){
            location.href='login.html';
          }
        }
      }
    })
  }
})

