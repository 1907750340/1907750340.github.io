$(function(){
  // 表单验证
  $("#form").bootstrapValidator({
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"您输入的用户名不能为空"
          },
          stringLength:{
            min:2,
            max:6,
            message:"您输入的用户名必须是2-6位"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"您输入的密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"您输入的密码必须是6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }

  })
  //重置表单
  $('[type=reset]').click(function(){
    var validator = $("#form").data('bootstrapValidator').resetForm(); 
  })
    // 表单提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        if(info.success){
          location.href="index.html"
        }
        if(info.error===1000){
          // 用户名不存在
          $("#form").data('bootstrapValidator').updateStatus('username', "INVALID","callback")
        }
        if(info.error===1001){
          //密码错误
          $("#form").data('bootstrapValidator').updateStatus('password', "INVALID","callback")  
        }
      }
    })  
});
})