// ====================================== //

//	$(function(){
		
		/*
		$(document).on('swipedown', '#top', function(){
			// alert('swipe Down');
		  $('.navTop').animate({marginTop:0});
		  $('.navLeft').animate({marginLeft:-200})
		});
		
		$(document).on('swipeup', '.navTop', function(){
			// alert('swipe Up');
		  $('.navTop').animate({marginTop:-100});
		});
		*/
		

		// $('#swipeSideArea').on('swiperight',function(){
		// $(document).delegate('#swipeSideArea', 'swiperight', function() {
			$(document).on('swiperight', '#swipeSideArea', function(){
			// $('.navTop').animate({marginTop:-100});
		  	$('.navLeft').animate({'marginLeft':'0px'}, function() {
      						// $('.navLeft').css('left','0px');
   							});
		});
		
		$(document).on('swipeleft', '#swipeMenuSide', function(){
		// $('#swipeMenuSide').on('swipeleft', '.navLeft', function(){
		// $('#swipeMenuSide').on('swipeleft',function(){
		  $('.navLeft').animate({'marginLeft':'-250px'}, function() {
      						// $('.navLeft').css('left','-250px');
   							});
		});

		// $('#contentAnimate').on('swiperight',function(){
		$(document).on('swiperight', '#contentAnimate', function(){
			hideContent(0, '');
			$('#contentAll').fadeIn(500);
			$('#baseArea').fadeIn(500);

			$('#contentAnimate').animate({marginLeft:'100%'}, function(){
				$('#animateArea').html('');
				$('body').css({'overflow':''});
				$('#contentAnimate').css('display', 'none');
			});
			
		});

//	})