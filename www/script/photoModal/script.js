
// ภาพทีจะให้สุ่มแสดง
var imgBg = [];
imgBg[0] = 'http://www.rodlover.com/graphic/cover/cover-bg-1.jpg';
imgBg[1] = 'http://www.rodlover.com/graphic/cover/cover-bg-2.jpg';
imgBg[2] = 'http://www.rodlover.com/graphic/cover/cover-bg-3.jpg';
imgBg[3] = 'http://www.rodlover.com/graphic/cover/cover-bg-4.jpg';

// **************************************************** //

var photoModalAniIn = 'zoomIn animatedFast';
var photoModalAniOut = 'zoomOut animated';

$(document).ready(function(){

photoModalAdd();

$(document).on('click', '.photoModalOpen', function(){  photoModalStart(this);  }); // เปิด modal แบบไม่มีเนื้อหา
$(document).on('click', '.photoModalClose, .photoModalBg', function(){ photoModalClose(); });	// ปิด modal
$(document).on('click', '.photoModalChange', function(){  photoModalChange(this);  }); // เปลี่ยนเนื้อหา modal จาก data-page
$(document).on('click', '.photoModalLoad', function(){  photoModalLoad(page);  }); // เรียก modal จากการกำหนด page ไปเลย

$(document).keyup(function(e) { if (e.keyCode == 27) { photoModalClose();  } });

if ( modalTest == 'photoModal' ) { photoModalLoad(modalTestPage); }

});

function photoModalAdd()
{
	var htmlInsert = '<div class="photoModalBg"></div><div class="photoModalBgImg"></div><div class="photoModal" data-status="0" ><div class="photoModalClose"></div><div class="photoModalContent"></div></div>';
	$('body').prepend(htmlInsert);
}

function photoModalStart(t)
{
	if ($(document).height() > $(window).height()) {
    	haveScrollbar = 1;  /* alert('Scrollbar'); */
	} else { haveScrollbar = 0; /* alert('No Scrollbar'); */ }

		// ตรวจว่าปิด หรือเปิด
		var nowStatus = $('.photoModal').attr('data-status');		// alert(nowStatus);
		if ( nowStatus == 0 )
		{
			// alert('TEST');
			
			if (( screenW > 1300 ) && ( haveScrollbar == 1)) {	$('body').css('margin-right', '17px');	$('#topMenuArea').css('padding-right', '17px');	}
			$('body').css('overflow', 'hidden');
			
			$('.photoModalBg').fadeIn(300);
			if ( screenW > 1000 )
			{
				var numPhoto = imgBg.length; // จำนวนรูปที่จะสุ่ม
				var ran = Math.floor(Math.random() * numPhoto );
				$('.photoModalBgImg').css('background-image', 'url(' + imgBg[ran] + ')' );
				$('.photoModalBgImg').css('background-size', 'cover');
				$('.photoModalBgImg').fadeIn(500);
			}
			
			$('.photoModal').attr('data-status','1');
			$('.photoModal').removeClass(photoModalAniOut);
			$('.photoModal').addClass(photoModalAniIn);
			setTimeout( function() { $('.photoModal').css('display', 'inline'); }, 150);
			
			// เปิด page อะไร
			var p = $(t).attr('data-page'); // alert(p);
			if ( p === 'undefined' ) { }
			else 
			{
					$('.photoModalContent').hide().load(p, function(){
							setTimeout( function() {  $('.photoModal').removeClass(photoModalAniIn);  }, 510);
							$(this).fadeIn(300);
					 });
			}
			
		} 
		else { photoModalClose(); setTimeout( function() { $('.photoModalContent').html(''); }, 600);  }
}

function photoModalClose()
{
	$('.photoModalBg').fadeOut(500);
	
	if ( screenW > 1000 ) { $('.photoModalBgImg').fadeOut(500); }
	
	$('.photoModal').removeClass(photoModalAniIn);
	$('.photoModal').addClass(photoModalAniOut);
	$('.photoModal').attr('data-status','0');
	setTimeout( function() { 
		$('.photoModalContent').html('');
		$('.photoModal').hide(50);
	}, 600);
	
	setTimeout( function() {
		if (( screenW > 1300 ) && ( haveScrollbar == 1)) {	$('body').css('margin-right', 'auto');	$('#topMenuArea').css('padding-right', '0px');	}
		$('body').css('overflow', '');
	}, 600);
	
	// alert(modalCSSW);
	
}


/* ซ่อนป้าย modal ไปก่อน แต่ background ยังอยู่ */
function photoModalHide()
{
	$('.photoModal').fadeOut(300);
	// setTimeout( function() { $('.photoModalContent').html('');  }, 1000);
}

/* แสดงป้าย modal หลังจาก hide */
function photoModalShow()
{
	$('.photoModal').fadeIn(300);
}

/* เปลี่ยนเนื้อหาใน Modal จาก data-page */
function photoModalChange(t)
{
	var p = $(t).attr('data-page'); // alert(p);
	if ( p === 'undefined' ) { }
	else 
	{
		var h = $('.photoModal').height(); // alert(h);
		$('.photoModal').css('height', h);
		$('.photoModalContent').hide().load(p, function(){
				$(this).fadeIn(300);
				$('.photoModal').css('height', 'auto');
		});
	}	
}

/* เปลี่ยนเนื้อหาใน Modal จากการกำหนด type (1=load, 2=content) ตามด้วย page หรือ content */
function photoModalChangeNow(type, p)
{
		var h = $('.photoModal').height(); // alert(h);
		$('.photoModal').css('height', h);
		
		if ( type == 1 ) // load
		{
			$('.photoModalContent').hide().load(p, function(){
					$(this).fadeIn(300);
					$('.photoModal').css('height', 'auto');
			});
		}
		
		if ( type == 2 ) // content
		{
			$('.photoModalContent').hide().html(p);
			$('.photoModalContent').fadeIn(300);
			setTimeout( function() {  $('.photoModal').css('height', 'auto');  }, 10);
		}
		
}

/* เรียก Modal จากการกำหนด page ไปเลย */
function photoModalLoad(p)
{	// alert(p);
	photoModalStart('');
	$('.photoModalContent').hide().load(p, function(){
				$(this).fadeIn(300);
	});
}