$(function(){
	//showDiv("first","second",1); // hide show nextIndex

	//确认报名  显示填写信息
	$("#applybtn").click(function(){
		var checkVal = $("input[type='checkbox']").is(':checked') ;
		if(!checkVal){
			$.common.showToast("请勾选并同意",1000);
			return;
		}

		showDiv("first","second",1); // hide show nextIndex

	});
	$("#submitBtn").click(function(){
		//showDiv("second","third",2); // hide show nextIndex

		var originName = $("#originName").val(); //姓名
		var originAge = $("#originAge").val();//年龄
		var mobile = $("#mobile").val();//手机号
		var email = $("#email").val(); // 邮箱
		var wechat = $("#wechat").val(); //微信
		var projectName = $("#projectName").val(); //项目名称
		var pojectDesc = $("#pojectDesc").val(); //项目描述
		
		
		
		if(!originName){
			$.common.showMsg("nameError","姓名不能为空");
		    return ;
		}else{
			$("#nameError").hide();
		}
		if(!originAge){
			$.common.showMsg("ageError","年龄不能为空");
		    return ;
		}else{
			$("#ageError").hide();
		}

		if(!mobile){
			$.common.showMsg("mobileError","手机号不能为空");
		    return;
		}else{
			$("#mobileError").hide();
		}
		if(!email){
			$.common.showMsg("emailError","邮箱不能为空");
		    return;
		}else{
			$("#emailError").hide();
		}
		if(!wechat){
			$.common.showMsg("wechatError","微信不能为空");
		    return;
		}else{
			$("#wechatError").hide();
		}


	});
	//年龄事件
	$(".sex").click(function(){
		$(this).addClass('selected').siblings().removeClass("selected");
		console.log(this.textContent);
	})




	
})
function showDiv(hideDiv,showDiv,nextIndex){
	$("."+hideDiv).hide();
	$("."+showDiv).show();
	$(".top .nav-tabs >li").eq(nextIndex).addClass('active').siblings().removeClass("active");
}