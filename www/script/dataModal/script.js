var dataModalAniIn = 'fadeIn animatedFast';
var dataModalAniOut = 'fadeOut animatedFast';

$(document).ready(function(){

dataModalAdd();

$(document).on('click', '.dataModalOpen', function(){  dataModalStart(this);  }); // เปิด modal แบบไม่มีเนื้อหา
// $(document).on('click', '.dataModalClose, .dataModalBg', function(){ dataModalClose(); });	// ปิด modal
$(document).on('click', '.dataModalClose', function(){ dataModalClose(); });	// ปิด modal
$(document).on('click', '.dataModalChange', function(){  dataModalChange(this);  }); // เปลี่ยนเนื้อหา modal จาก data-page
$(document).on('click', '.dataModalLoad', function(){  dataModalLoad(page);  }); // เรียก modal จากการกำหนด page ไปเลย

// $(document).keyup(function(e) { if (e.keyCode == 27) { dataModalClose();  } });

if ( modalTest == 'dataModal' ) { dataModalLoad(modalTestPage); }

});

function dataModalAdd()
{
	var htmlInsert = '<div class="dataModalBg" ></div><div class="dataModal" data-status="0" ><div class="dataModalClose"></div><div class="dataModalContent"></div></div>';
	$('body').prepend(htmlInsert);
}

function dataModalStart(t)
{
	if ($(document).height() > $(window).height()) {
    	haveScrollbar = 1;  /* alert('Scrollbar'); */
	} else { haveScrollbar = 0; /* alert('No Scrollbar'); */ }

		// ตรวจว่าปิด หรือเปิด
		var nowStatus = $('.dataModal').attr('data-status');		// alert(nowStatus);
		if ( nowStatus == 0 )
		{
			// alert('TEST');
			
			if (( screenW > 1300 ) && ( haveScrollbar == 1)) {	$('body').css('margin-right', '17px');	$('#topMenuArea').css('padding-right', '17px');	}
			$('body').css('overflow', 'hidden');
			
			$('.dataModalBg').fadeIn(200);
			
			$('.dataModal').attr('data-status','1');
			$('.dataModal').removeClass(dataModalAniOut);
			$('.dataModal').addClass(dataModalAniIn);
			setTimeout( function() { $('.dataModal').css('display', 'inline'); }, 10);
			
			// เปิด page อะไร
			var p = $(t).attr('data-page'); // alert(p);
			if ( p === 'undefined' ) { }
			else 
			{
					$('.dataModalContent').hide().load(p, function(){
							setTimeout( function() {  $('.dataModal').removeClass(dataModalAniIn);  }, 210);
							$(this).fadeIn(200);
					 });
			}
			
		} 
		else { dataModalClose(); setTimeout( function() { $('.dataModalContent').html(''); }, 100);  }
}

function dataModalClose()
{
	$('.dataModalBg').fadeOut(200);
	
	$('.dataModal').removeClass(dataModalAniIn);
	$('.dataModal').addClass(dataModalAniOut);
	$('.dataModal').attr('data-status','0');
	setTimeout( function() { 
		$('.dataModalContent').html('');
		$('.dataModal').hide(50);
	}, 200);
	
	setTimeout( function() {
		if (( screenW > 1300 ) && ( haveScrollbar == 1)) {	$('body').css('margin-right', 'auto');	$('#topMenuArea').css('padding-right', '0px');	}
		$('body').css('overflow', '');
	}, 200);
	
	
}


/* ซ่อนป้าย modal ไปก่อน แต่ background ยังอยู่ */
function dataModalHide()
{
	$('.dataModal').fadeOut(200);
	setTimeout( function() { $('.dataModalContent').html('');  }, 300);
}

/* แสดงป้าย modal หลังจาก hide */
function dataModalShow()
{
	$('.dataModal').fadeIn(200);
}

/* เปลี่ยนเนื้อหาใน Modal จาก data-page */
function dataModalChange(t)
{
	var p = $(t).attr('data-page'); // alert(p);
	if ( p === 'undefined' ) { }
	else 
	{
		var h = $('.dataModal').height(); // alert(h);
		$('.dataModal').css('height', h);
		$('.dataModalContent').hide().load(p, function(){
				$(this).fadeIn(200);
				$('.dataModal').css('height', 'auto');
		});
	}	
}

/* เปลี่ยนเนื้อหาใน Modal จากการกำหนด type (1=load, 2=content) ตามด้วย page หรือ content */
function dataModalChangeNow(type, p)
{
		var h = $('.dataModal').height(); // alert(h);
		$('.dataModal').css('height', h);
		
		if ( type == 1 ) // load
		{
			$('.dataModalContent').hide().load(p, function(){
					$(this).fadeIn(200);
					$('.dataModal').css('height', 'auto');
			});
		}
		
		if ( type == 2 ) // content
		{
			$('.dataModalContent').hide().html(p);
			$('.dataModalContent').fadeIn(200);
			setTimeout( function() {  $('.dataModal').css('height', 'auto');  }, 10);
		}
		
}

/* เรียก Modal จากการกำหนด page ไปเลย */
function dataModalLoad(p)
{	// alert(p);
	dataModalStart('');
	$('.dataModalContent').hide().load(p, function(){
				$(this).fadeIn(200);
	});
}