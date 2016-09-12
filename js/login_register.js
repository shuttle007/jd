/*登录模块*/
var login = {};

/**
 * 直接登录
 */
function skipDiv() {
	$("#login").trigger("click");
}

/**
 * 校验用户名
 */
login.validUserName = function() {
	var username = $.trim($("#username").val());
	var user_name_input = $("#username");
	var valid_username_span = $("#validUserName");
	$(".name").css('opacity', 0.15);
	if(username == '') {
		valid_username_span.html("请输入登录账号");
		valid_username_span.show();
		user_name_input.addClass("border");
		return false;
	} else {
		valid_username_span.html("");
		valid_username_span.hide();
		user_name_input.removeClass("border");
	}

	//后台验证用户名是否合法
	$.ajax({
		url: "control/login/username.php",
		type: "post",
		data: {
			username: username,
		},
		success: function(data) {
			if(data !== '1') {
				valid_username_span.show();
				$("#validUserName").html("用户名不存在");
				user_name_input.addClass("border");
				return false;
			} else {
				valid_username_span.html("");
				valid_username_span.hide();
				user_name_input.removeClass("border");
			}
		}
	});
	return true;
};

/**
 * 校验密码
 */
login.validPassword = function() {
	var valid_password_span = $("#validPassword");
	var password_input = $("#password");
	var password = $.trim($("#password").val());
	$(".password").css('opacity', 0.15);
	//valid_password_span.show();
	if(password == '') {
		password_input.addClass("border");
		valid_password_span.html("  "); //请输入密码
		return false;
	} else if(!/^.{6,26}$/.test(password)) {
		password_input.addClass("border");
		valid_password_span.html("  "); //密码长度6-16位，支持数字、字母、字符
		return false;
	} else {
		$("#validPassword").html("");
		$("#validPassword").hide();
		password_input.removeClass("border");
	}
	return true;
};

/**
 * 当光标聚集到用户名框时,取消登录结果信息
 */
login.focusUsername = function() {
		$("#validUserName").hide();
		$("#validUserName").html("");
		$(".name").css('opacity', 1);
	}
	/**
	 * 当光标聚集到密码框时,取消登录结果信息
	 */
login.focusPwd = function() {
	$("#validPassword").hide();
	$("#validPassword").html("");
	$(".password").css('opacity', 1);
}

/**
 * 提交
 */

login.validSubmit = function() {
	//提交前校验用户名、密码、验证码有效性
	login.validUserName();
	login.validPassword();
	var username = $.trim($("#username").val());
	var password = $.trim($("#password").val());
	var password_input = $("#password");
	var valid_password_span = $("#validPassword");
	//后台验证用户名是否合法
	$.ajax({
		url: "control/login/login.php",
		type: "post",
		data: {
			"username": username,
			"password": password
		},
		success: function(data) {
			if(data == 1) {
				console.log(data);
				if($("#validUserName").html() == '' && $("#validPassword").html() == '') {
					valid_password_span.html("");
					valid_password_span.hide();
					password_input.removeClass("border");
					//$("#fm1").submit();
					window.location.href="index.html";
				}

			} else {
				valid_password_span.show();
				$("#validPassword").html("帐号密码错误");
				password_input.addClass("border");
				return false;
			}
		}
	});

}

/*
 
 * 忘记密码
 * */
//function forget_psd(){
//	window.location.href = '/forget';
//}

/**
 * 回车事件
 *
 * @param evt
 */
login.enterLogin = function enterLogin(evt) {
	var evt = evt ? evt : (window.event ? window.event : null); // 兼容IE和FF
	if(evt.keyCode == 13) {
		login.validSubmit();
	}
};

/*注册模块*/
var register = {};

/**
 * 直接登录
 */
function skipDiv() {
	$("#login").trigger("click");
}

/**
 * 校验用户名
 */
register.validUserName = function() {
	var username = $.trim($("#register_userName").val());
	//var phoneReg = /^0{0,1}(13[0-9]|15[0-9]|14[5|7|9]|17[0-9]|18[0-9])[0-9]{8}$/;
	var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

	var flag = false;
	if(username == '') {
		$("#register_userName").addClass("border");
		$("#register_valid_username").html("请输入邮箱").show();
		return false;
	}

	if(emailReg.test(username)) {
		if(!emailReg.test(username)) {
			$("#register_userName").addClass("border");
			$("#register_valid_username").html("请输入正确的邮箱");
			flag = false;
		} else {
			flag = true;
		}
	} else {
		$("#register_userName").addClass("border");
		$("#register_valid_username").html("请输入正确的邮箱");
		flag = false;
	}

	if(flag) {
		$("#register_userName").removeClass("border");
		$("#register_valid_username").html("").hide()
	} else {
		$("#register_valid_username").show();
		return false;
	}

	$.ajax({
		url: "control/register/username.php",
		type: "post",
		data: {
			username: username
		},
		//dataType : 'json',
		success: function(data) {
			if(data == "1") {
				$("#register_userName").addClass("border");
				$("#register_valid_username").html("该邮箱已被注册,请<a href='../'>直接登录</a>");
				$("#register_valid_username").show();
			} else {
				$("#register_userName").removeClass("border");
				$("#register_valid_username").html("").hide();
			}
		}
	});
};

/**
 * 获取焦点时清空用户名输入框,并改变该框背景颜色
 */
register.clearUserName = function() {
	register.clearAllValid("register_valid_username");
};

/**
 * 校验密码
 */
register.validPassword = function() {
	var passWord = $.trim($("#register_password").val());

	if(passWord == '' || passWord == null || passWord == undefined) {
		$("#register_password").addClass('border');
		$("#register_valid_password").html('').hide();
		return;
	} else if((/[\u4E00-\u9FA5]/i.test(passWord) || countStrLength(passWord) > 16 || countStrLength(passWord) < 6)) {
		$("#register_password").addClass('border');
		$("#register_valid_password").html("支持6-16位数字、字母、字符").show();
		return;
	} else {
		$("#register_password").removeClass('border');
		$("#register_valid_password").html('').hide();
	}
};

/**
 * 校验确认密码
 */
register.validPasswordConfirm = function() {
	var passWordConfirm = $.trim($("#register_password_confirm").val());
	var passWord = $.trim($("#register_password").val());
	if(passWordConfirm == '' || passWordConfirm == null || passWordConfirm == undefined) {
		$("#register_password_confirm").addClass('border');
		$("#register_valid_password_confirm").html('').hide();
		return;
	} else if(passWordConfirm !== passWord) {
		$("#register_password_confirm").val('');
		$("#register_password_confirm").addClass('border');
		$("#register_valid_password_confirm").html("两次密码输入不一致").show();
		return;
	} else {
		$("#register_password_confirm").removeClass('border');
		$("#register_valid_password_confirm").html('').hide();
	}
};

/**
 * 清除密码校验提示
 */
register.clearPassword = function() {
	register.clearAllValid("register_valid_password");
};

/**
 * 清除密码确认校验提示
 */
register.clearPasswordConfirm = function() {
	register.clearAllValid("register_valid_password_confirm");
};

/**
 * 清除所有非法提示的信息/或指定的
 */
register.clearAllValid = function(par) {
	if(par == 'all') {
		$('.txt input').val("").removeClass('border');
		$('.txt span').html("").hide();
	} else if(par != '' && par != null && par != undefined) {
		$("#" + par).html("").hide();
	}
};

/**
 * 回车事件
 *
 * @param evt
 */
register.enterLogin = function enterLogin(evt) {
	var evt = evt ? evt : (window.event ? window.event : null); // 兼容IE和FF
	if(evt.keyCode == 13) {
		register.validSubmit();
	}
};

//function GetRequest(url) {
//
//	var theRequest = new Object();
//	if(url.indexOf("?") != -1) {
//		var str = url.substr(1);
//		strs = str.split("&");
//		for(var i = 0; i < strs.length; i++) {
//			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
//		}
//	}
//	return theRequest;
//}

/**
 * 提交
 */
register.validSubmit = function validSubmit() {
	// 提交前校用户名、密码有效性
	register.validUserName();
	if($("#register_userName").is('.border')) {
		return;
	}

	register.validPassword();
	if($("#register_password").is('.border')) {
		return;
	}

	register.validPasswordConfirm();
	if($("#register_password_confirm").is('.border')) {
		return;
	}

	if(!$("#agreement_check").is(':checked')) {
		return;
	}
	var action_url = "control/register/register.php";
	//设置form表单的action
	document.fm2.action = action_url;
	//表单提交
	$("#register_fm").submit();
};

/**
 * 计算字符串的长度
 * 
 */
function countStrLength(str) {
	var byteLen = 0;
	for(var i = 0; i < str.length; i++) {
		if(str.charCodeAt(i) > 255) {
			byteLen += 2;
		} else {
			byteLen++;
		}
	}
	//console.log("strByteLen: "+ byteLen);
	return byteLen;
}