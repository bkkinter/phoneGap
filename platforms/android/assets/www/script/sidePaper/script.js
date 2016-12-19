$(document).ready(function(){

sidePaperAdd();
$(document).on('click', '.sidePaperOpen', function(){  sidePaperStart();  });
$(document).on('click', '.sidePaperClose', function(){ sidePaperClose(); });	
// $('.sidePaperClose').click( function(){ sidePaperClose(); });	

if ( modalTest == 'sidePaper' ) { sidePaperLoad(modalTestPage); }

});

function sidePaperAdd()
{
	var htmlInsert = '<div class="sidePaperBg"></div><div class="sidePaper slideInRight animatedFast" data-status="0" ><div class="sidePaperClose"></div><div class="sidePaperContent"></div></div>';
	$('body').prepend(htmlInsert);
}

function sidePaperStart(t)
{
		// ตรวจว่าปิด หรือเปิด
		var nowStatus = $('.sidePaper').attr('data-status');		 // alert(nowStatus);
		if ( nowStatus == 0 )
		{
			// alert('TEST');
			// $('.sidePaperFocus').css('z-index', '99');
			$('.sidePaperBg').fadeIn(300);
			$('.sidePaper').attr('data-status','1');
			$('.sidePaper').css('display', 'inline');
			$('.sidePaper').removeClass('slideOutRight');
			$('.sidePaper').addClass('slideInRight');
		} 
		else { sidePaperClose(); setTimeout( function() { $('.sidePaperContent').html(''); }, 600);  }
}

function sidePaperClose()
{
	$('.sidePaperBg').fadeOut(300);
	$('.sidePaper').removeClass('slideInRight');
	$('.sidePaper').addClass('slideOutRight');
	$('.sidePaper').attr('data-status','0');
	setTimeout( function() { 
		$('.sidePaperContent').html('');
		$('.sidePaper').hide(50);
		// $('.sidePaperFocus').css('z-index', '0');
		$('.sidePaperFocus').removeClass('sidePaperFocus');
	}, 500);
}

/* เรียก Modal จากการกำหนด page ไปเลย */
function sidePaperLoad(p)
{	// alert(p);
	sidePaperStart('');
	$('.sidePaperContent').hide().load(p, function(){
				$(this).fadeIn(200);
	});
}