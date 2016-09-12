$(function() {
	/*
	 * 
	 * 主页轮播
	 * 
	 * */
	var slideShow = $('.slide-show'),
		ul = slideShow.find('ul'),
		nav = slideShow.find('.slide-nav span'),
		onewidth = $('ul').find('.slide-panel').eq(0).width(),
		timer = null,
		iNow = 0;
	nav.on('click', function() {
		var me = $(this),
			index = me.index();
		iNow = index;
		ul.animate({
			'left': -onewidth * iNow
		});
		nav.removeClass('active');
		me.addClass('active');

	});

	autoPlay();

	function autoPlay() {
		timer = setInterval(function() {
			iNow++;
			if(iNow > nav.length - 1) {
				iNow = 0;
			}
			nav.eq(iNow).trigger('click');

		}, 2000);
	}

	slideShow.hover(function() {
		clearInterval(timer);
	}, autoPlay);
	
	/*
	 * 
	 * 
	 * 主页搜索区
	 * 
	 * 
	 * */
	$('#searchTxt').on('focus',function(){
		$(this).css('color','rgb(51,51,51)');
		$(this).attr('placeholder','');
	}).on('blur',function(){
		$(this).css('color','rgb(153,153.153)');
		$(this).attr('placeholder','二合一平板');
	});
	
	/*
	 * 
	 * 主页导航栏下拉菜单
	 * 
	 * 
	 * */
	//	$('.item-sub').hide();
	$('.item').each(function() {
		var index = null;
		$(this).mouseover(function() {
			$('.dd-inner').find('.item').removeClass('hover');
			$(this).addClass('hover');
			//获取索引
			index = parseInt($(this).attr('class').slice(9));
			//显示菜单面板
			$('.dropdown-layer').show();
			$('.item-sub').hide();
			$('#category-item-' + index).show();
		});
		$(this).mouseout(function() {
			$(this).removeClass('hover');
			$('.item-sub').hide();
		});
	});

	$('.item-sub').each(function() {
		var index = null;
		$(this).mouseover(function(event) {
			$('.item').removeClass('hover');
			//获取索引
			index = parseInt($(this).attr('id').slice(14));
			$('.fore' + index).addClass('hover');
			$('.item-sub').hide();
			$('#category-item-' + index).show();
		});
		$(this).mouseout(function(event) {
			$(this).hide();
			$('.fore' + index).removeClass('hover');
//			$('.dropdown-layer').hide();
		});
	});
	
	
	
	
	
	
	
	/*
	 * 
	 * 图片延迟加载
	 * 
	 * */
	$("img.lazy").lazyload({
		effect: "fadeIn"
	});
	
	/*
	 
	 * 放大镜
	 * 
	 * */
	//小图片容器
	var $smBox = $('#sm-box');
	//大图片容器
	var $bgBox = $('#bg-box');
	//放大镜层
	var $glBox = $('#glass-box');
	//大图片
	var $bgImg = $('#big-img');

	//鼠标移入小容器
	$smBox.mouseover(function() {
		$glBox.show();
		$bgBox.show();
	});

	//鼠标移出小容器
	$smBox.mouseout(function() {
		$glBox.hide();
		$bgBox.hide();
	});

	//鼠标移动
	$smBox.mousemove(function(ev) {
		var _ev = ev;
		var sl = document.documentElement.scrollLeft || document.body.scrollLeft;
		var st = document.documentElement.scrollTop || document.body.scrollTop;
		var posX = _ev.clientX + sl;
		var posY = _ev.clientY + st;
		//鼠标在小图片容器的偏移
		var l = posX - $smBox.offset().left; // X-346.5
		var t = posY - $smBox.offset().top; //Y-229
		//设置放大镜的偏移
		var left = l - $glBox.width() / 2;
		var top = t - $glBox.height() / 2;

		//		console.log(top);
		if(left < 0) {
			left = 0;
		} else if(left > ($smBox.width() - $glBox.width())) {
			left = $smBox.width() - $glBox.width();
		}

		if(top < 0) {
			top = 0;
		} else if(top > ($smBox.height() - $glBox.height())) {
			top = $smBox.height() - $glBox.height();
		}

		//设置放大镜遮罩层的style:left,top
		$glBox.css({
			'left': left + 'px',
			'top': top + 'px'
		});

		var percentX = left / ($smBox.width() - $glBox.width());
		var percentY = top / ($smBox.height() - $glBox.height());
		//设置大图片的style:left,top
		$bgImg.css({
			'left': -percentX * ($bgImg.width() - $bgBox.width()) + 'px',
			'top': -percentY * ($bgImg.height() - $bgBox.height()) + 'px'
		});
	});
	
	
	
	
	
	
	
	
	
	/*
	 * 回到顶部功能
	 * 
	 * */
	//获取回到顶部的按钮
	var $btn = $('#btn');

	window.onscroll = function() {
		showAndHide($btn,1500,300);
	}

	$btn.on('click', function() {
		$('body,html').animate({
			scrollTop: 0
		}, 600);
		return false;
	});
	//当点击跳转链接后，回到页面顶部位置
	function getScrollTop() {
		return document.body.scrollTop || document.documentElement.scrollTop;
	}
	function showAndHide(obj,top,speed){
		var osTop = getScrollTop();
		if(osTop >= top) {
			if(!speed){
				obj.show();
			}else{
				obj.fadeIn(speed);
			}
		} else if(osTop < top) {
			if(!speed){
				obj.hide();
			}else{
				obj.fadeOut(speed);
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	/*
	 * 左侧电梯导航
	 * 
	 * */
	//获取电梯容器
	var $elv = $('#elevator');
	$(window).on('scroll',function(){
	//	showAndHide($elv,800,300);
		showAndHide($elv,800);
	});
	$('.etitle').css('background', 'rgb(200,22,35)');
	var firstWidth = $(window).width();
	var maxLeft = (firstWidth - 1210) / 2 - 33;
	var maxTop = ($(window).height() - $elv.height()) / 2;
	$elv.css({
		'left': maxLeft + 'px',
		'top': maxTop + 'px'
	});
	//添加屏幕变化事件
	//看看还有没有别的事件需要添加
	$(window).on('resize', function() {
		var left = ($(window).width() - firstWidth)/2 + maxLeft;
		var top = ($(window).height() - $elv.height()) / 2;
		$elv.css({
			'left': left + 'px',
			'top': top + 'px'
		});
	});
});