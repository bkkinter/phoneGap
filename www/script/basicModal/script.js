var basicModalAniIn = 'zoomIn animatedFast';
var basicModalAniOut = 'zoomOut animatedFast';

$(document).ready(function(){

basicModalAdd();

$(document).on('click', '.basicModalOpen', function(){  basicModalStart(this);  }); // เปิด modal แบบไม่มีเนื้อหา
$(document).on('click', '.basicModalClose, .basicModalBg', function(){ basicModalClose(); });	// ปิด modal
$(document).on('click', '.basicModalChange', function(){  basicModalChange(this);  }); // เปลี่ยนเนื้อหา modal จาก data-page
$(document).on('click', '.basicModalLoad', function(){  basicModalLoad(page);  }); // เรียก modal จากการกำหนด page ไปเลย

$(document).keyup(function(e) { if (e.keyCode == 27) { basicModalClose();  } });

if ( modalTest == 'basicModal' ) { basicModalLoad(modalTestPage); }

});

function basicModalAdd()
{
	var htmlInsert = '<div class="basicModalBg"></div><div class="basicModal" data-status="0" ><div class="basicModalClose"></div><div class="basicModalContent"></div></div>';
	$('body').prepend(htmlInsert);
}

function basicModalStart(t)
{
	if ($(document).height() > $(window).height()) {
    	haveScrollbar = 1;  /* alert('Scrollbar'); */
	} else { haveScrollbar = 0; /* alert('No Scrollbar'); */ }

		// ตรวจว่าปิด หรือเปิด
		var nowStatus = $('.basicModal').attr('data-status');		// alert(nowStatus);
		if ( nowStatus == 0 )
		{
			// alert('TEST');
			
			if (( screenW > 1300 ) && ( haveScrollbar == 1)) {	$('body').css('margin-right', '17px');	$('#topMenuArea').css('padding-right', '17px');	}
			$('body').css('overflow', 'hidden');
			
			$('.basicModalBg').fadeIn(300);
			
			$('.basicModal').attr('data-status','1');
			$('.basicModal').removeClass(basicModalAniOut);
			$('.basicModal').addClass(basicModalAniIn);
			setTimeout( function() { $('.basicModal').css('display', 'block'); }, 10);
			
			// เปิด page อะไร
			var p = $(t).attr('data-page'); // alert(p);
			if ( p === 'undefined' ) { }
			else 
			{
					$('.basicModalContent').hide().load(p, function(){
							setTimeout( function() {  $('.basicModal').removeClass(basicModalAniIn);  }, 510);
							$(this).fadeIn(300);
							$('.basicModal').scrollTop(0);
					 });
			}
			
		} 
		else { basicModalClose(); setTimeout( function() { $('.basicModalContent').html(''); }, 600);  }
}

function basicModalClose()
{
	$('.basicModalBg').fadeOut(600);
	
	$('.basicModal').removeClass(basicModalAniIn);
	$('.basicModal').addClass(basicModalAniOut);
	$('.basicModal').attr('data-status','0');
	setTimeout( function() { 
		$('.basicModalContent').html('');
		$('.basicModal').hide(50);
	}, 600);
	
	setTimeout( function() {
		if (( screenW > 1300 ) && ( haveScrollbar == 1)) {	$('body').css('margin-right', 'auto');	$('#topMenuArea').css('padding-right', '0px');	}
		$('body').css('overflow', '');
	}, 200);
}


/* ซ่อนป้าย modal ไปก่อน แต่ background ยังอยู่ */
function basicModalHide()
{
	$('.basicModal').fadeOut(300);
	setTimeout( function() { $('.basicModalContent').html('');  }, 500);
}

/* แสดงป้าย modal หลังจาก hide */
function basicModalShow()
{
	$('.basicModal').fadeIn(300);
}

/* เปลี่ยนเนื้อหาใน Modal จาก data-page */
function basicModalChange(t)
{
	var p = $(t).attr('data-page'); // alert(p);
	if ( p === 'undefined' ) { }
	else 
	{
		var h = $('.basicModal').height(); // alert(h);
		$('.basicModal').css('height', h);
		$('.basicModalContent').hide().load(p, function(){
				$(this).fadeIn(300);
				$('.basicModal').css('height', 'auto');
		});
	}	
}

/* เปลี่ยนเนื้อหาใน Modal จากการกำหนด type (1=load, 2=content) ตามด้วย page หรือ content */
function basicModalChangeNow(type, p)
{
		var h = $('.basicModal').height(); // alert(h);
		$('.basicModal').css('height', h);
		
		if ( type == 1 ) // load
		{
			$('.basicModalContent').hide().load(p, function(){
					$(this).fadeIn(300);
					$('.basicModal').css('height', 'auto');
			});
		}
		
		if ( type == 2 ) // content
		{
			$('.basicModalContent').hide().html(p);
			$('.basicModalContent').fadeIn(300);
			setTimeout( function() {  $('.basicModal').css('height', 'auto');  }, 10);
		}
		
}

/* เรียก Modal จากการกำหนด page ไปเลย */
function basicModalLoad(p)
{	// alert(p);
	basicModalStart('');
	$('.basicModalContent').hide().load(p, function(){
				$(this).fadeIn(300);
	});
}