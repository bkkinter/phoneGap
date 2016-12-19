var aniIn = 'zoomIn animatedFast';
var aniOut = 'zoomOut animated';

$(document).ready(function(){

animateModalAdd();

$(document).on('click', '.animateModalOpen', function(){  animateModalStart();  });
$(document).on('click', '.animateModalClose, .animateModalBg', function(){ animateModalClose(); });	
// $('.animateModalClose').click( function(){ animateModalClose(); });	

$(document).keyup(function(e) { if (e.keyCode == 27) { animateModalClose();  } });

});

function animateModalAdd()
{
	var htmlInsert = '<div class="animateModalBg"></div><div class="animateModal" data-status="0" ><div class="animateModalClose"></div><div class="animateModalContent"></div></div>';
	$('body').prepend(htmlInsert);
}

function animateModalStart()
{
		// ตรวจว่าปิด หรือเปิด
		var nowStatus = $('.animateModal').attr('data-status');		 // alert(nowStatus);
		if ( nowStatus == 0 )
		{
			// alert('TEST');

			$('.animateModalBg').fadeIn(300);
			$('.animateModal').attr('data-status','1');
			$('.animateModal').css('display', 'inline');
			$('.animateModal').removeClass(aniOut);
			$('.animateModal').addClass(aniIn);
		} 
		else { animateModalClose(); setTimeout( function() { $('.animateModalContent').html(''); }, 600);  }
}

function animateModalClose()
{
	$('.animateModalBg').fadeOut(500);
	$('.animateModal').removeClass(aniIn);
	$('.animateModal').addClass(aniOut);
	$('.animateModal').attr('data-status','0');
	setTimeout( function() { 
		$('.animateModalContent').html('');
		$('.animateModal').hide(50);
	}, 600);
}