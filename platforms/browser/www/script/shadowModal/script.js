// =========== Shadow Modal=============== //

$(document).on('click', '.shadowModal', function(e) {
		e.preventDefault();
		
		$('body, html').css('overflow-y', 'hidden');
		$('#contentAll').fadeTo(300, 0.15);
		$('.navbar .container').fadeTo(300, 0.15);
		$('#baseArea').fadeTo(300, 0.15);
		$('.cnShadow').fadeIn(300);
			
		var page = $(this).attr('data-page'); // alert( page );
		thisLinkType = '';
			
		var linkVdo = $(this).attr('data-vdo');	// alert( linkVdo );
		if ( linkVdo.length > 5 )
		{
			var divVDO = '<div class="video-container"><iframe src="' + linkVdo + '" frameborder="0" allowfullscreen></iframe></div>';
			var thisLinkType = 'vdo';
		}
		

			
			if ( thisLinkType == 'vdo' )
			{	
				$('.cnShadowVdo').fadeIn(300); 
				$('#shadowModalVdo').fadeIn(300, function(){
					$('#shadowModalVdo').html(divVDO);
				});
			}
			else
			{	
				$('.cnShadowBox').fadeIn(300);	
				// $('#shadowModalContent').html('');
				$('#shadowModalContent').fadeIn(300, function(){
					$('#shadowModalContent').load(page);
				});
			}
});

$(document).on('click', '.shadowModalClose, .cnShadow', function(e) {
		e.preventDefault();
		$('body, html').css('overflow-y', '');
		$('#contentAll').fadeTo(300, 1);
		$('.navbar .container').fadeTo(300, 1);
		$('#baseArea').fadeTo(300, 1);
		
		$('.cnShadowBox').fadeOut(300);
		$('.cnShadowVdo').fadeOut(300);
		
		$('.cnShadow').fadeOut(300, function(){
			$('#shadowModalContent').html('');
			$('#shadowModalVdo').html('');
		});
		
});