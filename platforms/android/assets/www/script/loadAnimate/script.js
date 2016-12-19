/* เพิ่มส่วนนี้เข้าไปใน body ก่อน */
// $(".wrapper").append('<div id="contentAnimate"></div>');


/* เรียกป้ายแบบ animate */
$(document).on('click', '.loadContentAnimate', function(e) {
	
	e.preventDefault();
	
	var fileContent = $(this).attr('data-rel');
	var paperH = $('#animatePaper').css('height'); // alert( paperH );
	var pH = parseInt( paperH.substring( -2) ); // alert( pH );
	if ( pH < 50 ) // loadContentAnimate ยังไม่ได้เปิด
	{
		hideContent(1, '#CCCCCC');
		$('#footer').fadeOut(500);
		// $('#contentAnimate').html('');
		// $('#animateArea').html('');
		
		$('#contentAnimate').fadeIn(10, function(){
				$('#animateArea').load(fileContent, function(){
					$('#contentAnimate').animate({marginLeft:0});
					$('#footer').fadeIn(500);
				});
		});
	}
	else // แสดงว่า loadContentAnimate กำลังเปิดอยู่
	{
		$('.contentAnimateClose').fadeOut(200);
		$('#animatePaper').css('height',pH);
		$('#animateArea').fadeOut(200, function(){
			$('#animateArea').load(fileContent, function(){
				$('#animateArea').fadeIn(200);
				$('.contentAnimateClose').fadeIn(200);
				$('#animatePaper').css('height', '');
				$('#footer').fadeIn(500);
			});
		});
	}

});


// ========================================= //

/* เรียกป้ายแบบ animate แต่ตรวจรูปก่อน */
$(document).on('click', '.loadContentAnimateCheckImg', function(e) {
	
		e.preventDefault();
		hideContent(1, '#CCCCCC');
		// $('#contentAnimate').html('');
		// $('#animateArea').html('');
		// $('.loaderTop').fadeIn(100);
		// $("html body").css({ 'background-color':'#CCCCCC !important' });

		// $('#contentAll').fadeOut(500, function(){ });
		$('#footer').fadeOut(500);

			var fileContent = $(this).attr('data-rel');
			
			$('#contentAnimate').fadeIn(10, function(){
				$('#animateArea').load(fileContent, function(){

					$('#contentAnimate').animate({marginLeft:0});
					$('#detailLeft').fadeTo(10, 0);
					checkImgLoad2( '#detailLeft' );
				
				});
				
			});
		
});


function checkImgLoad( divImg )
{
	// alert( divImg.length );
	var divName = divImg.length;
	if (  divName > 1 )
	{

    var imgLength = $( divImg + ' img' ).length; // alert( imgLength ); // หาจำนวนรูปทั้งหมด  
    var countImg=0; // สำหรับนับจำนวนรูปภาพที่โหลดแล้ว  
    $( divImg + ' img' ).each(function(){  
        // var IndexID=$("img").index(this); // สำหรับทดสอบ ลบออกได้  
        $( divImg + ' img' ).load(function(){
            countImg++;  
            // $("#loadPage").append("<br>loaded img "+IndexID); // สำหรับทดสอบ ลบออกได้  
            // console.log("loaded img "+IndexID); // สำหรับทดสอบ ลบออกได้  
            if ( countImg == imgLength ){ // เมื่อโหลดรูปทั้งหมดแล้วปิดตัว loading  

				$('.loaderTop').fadeOut(100);
				$('#contentAnimate').animate({marginLeft:0});
				$( divImg ).fadeTo(200, 1);
            }             
        });  
        // เมื่อเกิดข้อผิดพลาดในการโหลดให้ปิด loading เลย  
        $(this).error(function(){
             
			 $('.loaderTop').fadeOut(100);
			$('#contentAnimate').animate({marginLeft:0});
			$(divImg).fadeTo(200, 1);  
			
        });  
          
    });	
	
	} else { 
					$('.loaderTop').fadeOut(100);
					$('#contentAnimate').animate({marginLeft:0});
					$(divImg).fadeTo(200, 1);
				}
	
}

function checkImgLoad2( divImg )
{
	// alert( divImg.length );
	var divName = divImg.length;
	if (  divName > 1 )
	{

    var imgLength = $( divImg + ' img' ).length; // alert( imgLength ); // หาจำนวนรูปทั้งหมด  
    var countImg=0; // สำหรับนับจำนวนรูปภาพที่โหลดแล้ว  
    $( divImg + ' img' ).each(function(){  
        // var IndexID=$("img").index(this); // สำหรับทดสอบ ลบออกได้  
        $( divImg + ' img' ).load(function(){
            countImg++;  
            // $("#loadPage").append("<br>loaded img "+IndexID); // สำหรับทดสอบ ลบออกได้  
            // console.log("loaded img "+IndexID); // สำหรับทดสอบ ลบออกได้  
            if ( countImg == imgLength ){ // เมื่อโหลดรูปทั้งหมดแล้วปิดตัว loading  
				$( divImg ).fadeTo(200, 1);
            }             
        });  
        // เมื่อเกิดข้อผิดพลาดในการโหลดให้ปิด loading เลย  
        $(this).error(function(){

			$(divImg).fadeTo(200, 1);  
			
        });  
          
    });	
	
	} else {
					$(divImg).fadeTo(200, 1);
				}
	
}
// ========================================= //

/* เปลี่ยนเนื้อหาในป้าย animate */
function loadAnimateContent ( object )
{
		var page = $(object).attr('data-rel'); // alert( page );
		
		var divH = $('#animatePaper').height(); // alert ( divH );
		$('#animatePaper').css('height', divH + 'px' );
		
		/* $('#animateArea').fadeOut(200, function(){
			$('#animateArea').html('');
		}); */
		
		$('#animateArea').html('');
		$('#animateArea').fadeIn(200, function(){
			$('#animateArea').load(page);
			$('#animatePaper').css('height', '' );
			// เปลี่ยน link ภาษา
		});
}

$(document).on('click', '.loadAnimateContent', function(e) {
			e.preventDefault();
			loadAnimateContent( this );
});


$(document).on('click', '.closeContentAnimate', function(e) {
		e.preventDefault();
		hideContent(0,'');
			$('#contentAll').fadeIn(500, function (){ $('#footer').fadeIn(200); });
			$('#contentAnimate').animate({marginLeft:'100%'}, function(){
				$('#animateArea').html('');
				$('body').css({'overflow':''});
				$('#contentAnimate').css('display', 'none');
			});
});