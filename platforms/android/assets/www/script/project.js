$(document).ready(function(){

closeAlertModal();

});


$(function () {
	  $('[data-toggle="tooltip"]').tooltip();
});
	
// $(document).delegate('.hideMenu', 'click', function(e) {
// $(document).on('click', '.hideMenu', function() {
$(document).on('click', '.hideMenu', function() {
  if ( $('.navbar-toggle').css('display') !='none'){
			// $(".navbar-toggle").click();
			$('#menuTop').removeClass('in');
			$('#menuTop').attr({'aria-expanded':'false'});
			$('#menuTop').css('height','1px');
			// $('#modal').modal('toggle');
    }
	// $(".navbar-toggle").attr({'data-toggle':'collapsed'});
	// $('.navLeft').animate({marginLeft:-250});
});


$(document).on('click', '.hideModal', function() {
	photoModalClose();
});
	
/*
$(document).on('hidden.bs.modal', '.modal', function () {
	// alert('clear');
  	$(this).removeData('bs.modal');
	
	// $(".modal-dialog").fadeOut(100);
	$(".modal-content").fadeOut(100, function(){ $('.modal-content').html(''); });
	// $('.modal-content').html('');
});
*/

/*
$(document).on('show.bs.modal', '.modal', function () {
	// alert('show');
	// $(".modal-dialog").fadeIn(100);
  	$(".modal-content").fadeIn(100);
});
*/


$(document).on('click', '#backToLogin', function() {
	$('.photoModalContent').load(DOMAIN + '/member/login.php', function(e){ });
});


/* ===== click load content ====== */

$(document).on('click', '.loadContentNew', function(e) {
		e.preventDefault();
		
		// $('.loader').fadeIn(100);
		$('#footer').fadeOut(200);
		$('#contentAll').fadeOut(300, function(){
			$(this).html('');
		});
		$('.hideContent').fadeOut(500);

		$('#contentAnimate').animate({marginLeft:'100%'}, function(){
			$('#animateArea').html('');
			$('#contentAnimate').fadeOut(200);
		});
		
		// var fileContent = $(this).attr('href');
		var fileContent = $(this).attr('data-rel');
		
		$('#contentAll').fadeIn(100, function(){
				$('#contentAll').load(fileContent, function (){ 
					setTimeout( function() { $('#footer').fadeIn(200); }, 300);
					$('#contentAll').css('padding-bottom','50px');
					});
			// $('.loader').fadeOut(100);
			// เปลี่ยน link ภาษา
		});
		
		// setTimeout( function() {  $('#footer').fadeIn(300); } , 2000);
		// alert(fileContent);
});


// ใช้ load Content ใหม่ หลังจากทำงานบางอย่างเสร็จแล้ว ซึ่งจะ ล้าง(ปิด) modal, content เดิม, animation ทั้งหมดก่อน
// ต้องใส่ e.preventDefault(); เมื่อคลิก
function loadContentNOW ( page )
{

		// var page = $(object).attr('data-rel'); // alert( page );
		// alert( page );
		$('#footer').fadeOut(200);
		// $('#myModal').modal('hide');
		$('.hideContent').fadeOut(500);
		// $(".modal-content").fadeOut(300, function(){ $('.modal-content').html(''); $('.modal').css({'display':'none'}); });
		
		/* $('#contentAll').fadeOut(200, function(){
			$('#contentAll').html('');
		}); */
		
		$('#contentAnimate').animate({marginLeft:'100%'}, function(){
			$('#animateArea').html('');
			$('#contentAnimate').fadeOut(200);
		});
		
		$('#contentAll').fadeOut(200, function(){
		$('#contentAll').html('');
		$('#contentAll').fadeIn(200, function(){
			$('#contentAll').load(page);
			setTimeout( function() { $('#footer').fadeIn(200); }, 300);
			$('#contentAll').css('padding-bottom','50px');
			// เปลี่ยน link ภาษา
		});
		});
		
		$('.loader').fadeOut(200, function(){ });
}

function hideContent( mode, color )
{
	if ( mode == 1 )
	{	$('.hideContent').css({'background-color': color }).fadeIn(300); }
	else { $('.hideContent').fadeOut(500); }
}

/* ===================== ALERT ========================= */

	
var timer = null;
// alert(timer);

function startAlert( style )
{
	if (timer == null)
	{
		// alert( 'TEST 115' );
		// ถ้า style เป็น 1 คือ ให้เริ่ม alert แบบไม่ต้องเรียกมาทันที เช่น การปิดป้าย Alert
		if ( style == 0 ) { setTimeout(function() { loadAlert(); }, 1000); }
		timer = setInterval(function () { loadAlert(); }, 10000);
	}

	// return timer;
}
	
function stopAlert( style )
{
	clearInterval(timer);
    timer = null;
    if ( style == 0 ) // 0=ให้ปิดป้ายด้วย, 1=ไม่ต้องปิดป้าย
	{
		$('.Alert1').fadeOut(500);
		$('.Alert2').fadeOut(500);
	}
	
	return timer;
}

function loadAlert()
{
	// alert( 'DOMAIN' );
	// alert( DOMAIN );
	// alert( screenW );
	$.post(DOMAIN + '/member/alert.php', '', function(data) {
	// var screenW = $(window).width();
	if ( screenW < 768 ) { $('.Alert1').fadeIn(500, function(){ $('.Alert1').html(data); }); $('.Alert2').html(''); }
	else { $('.Alert2').fadeIn(500, function(){ $('.Alert2').html(data); }); $('.Alert1').html(''); }
	});
}

$(document).on('click', '.alertObject', function(e) {
		// e.preventDefault();
		
		var t = $(this).attr('data-rel'); // alert(t);
		var onoff = $('#alertObject' + t).attr('data-onoff'); // alert(onoff);
		
		$('#alertObject1').attr('data-onoff', '0');
		$('#alertObject2').attr('data-onoff', '0');
		$('#alertObject3').attr('data-onoff', '0');
		
		if ( onoff == 0 )
		{
			var urlAlertDetail = DOMAIN + '/member/alert_list.php';
			$.post(urlAlertDetail, { 't':t}, function(data)
			{
				stopAlert(1);
				$('.alertBox').remove();
				$('#alertObject' + t).attr('data-onoff', '1');
				// $('#alertObject1').attr('data-onoff', '1');
				$('#alertObject' + t).after(data);
			});
		}
		else
		{
			$('.alertBox').remove();
			$('#alertObject' + t).attr('data-onoff', '0');
			startAlert(1);
		}
		// alert( t );
});

$(document).on('click', '.alertList', function(e) {
		// e.preventDefault();
		// stopAlert(1);
		var id = $(this).attr('data-rel'); // alert( id );
		var style = $(this).attr('data-style'); // alert( style );

		// Modal
		if ( style <= 1 )
		{ 
			var urlDetail = DOMAIN + '/member/alert_modal.php?id=' + id;
			basicModalLoad( urlDetail );
		}
			
		// ### Chat
			
		// ### Load Page
		// alert( t );
});


$(document).on('click', '#closeAlertModal', function(e) {
	
	var id = $(this).attr('data-rel');
	alertFadeOut( id );
});

function alertFadeOut( id )
{
	// คลิกเปิดอ่านแล้วก็ fade ออก
	$('#alertList-' + id).hide(500, function(){ 
			$(this).remove();
			// ถ้าไม่มีให้อ่านแล้ว ก็ startAlert ใหม่
			var numList = $('.alertList').length;
			if ( numList < 1 ) { $('.alertBox').fadeOut(100);  startAlert(0); }
	});
}

function closeAlertModal()
{
	$(document).on('click', '.basicModalClose, .basicModalBg', function(){ 
	var id = $('.modal-alert-title').attr('data-id'); // alert(id);
	alertFadeOut( id );
	});
}

// ===================================== //

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ป้ายแจ้งเตือน+confirm ต่างๆ
function showAlertBox( style, text )
{
	if ( style == 1 ) { var output = alert( text ); } // Alert เฉยๆ
	if ( style == 2 ) { var output = confirm( text ); } // Confirm Yes/No
	return output;
}

/*
var page = $('.loginAfterAnimation').attr('data-rel');
// var page = '123';
if ( page === undefined ) { alert('1'); } else { alert('2'); }
*/
	
// ==================================== //

function checkAfterLoginAnimation( )
{
	var page = $('.loginAfterAnimation').attr('data-rel');
	if ( page === undefined ) { }
	else
	{
		setTimeout( function() {    
		loadAnimateContent( '.loginAfterAnimation' );
		
		} , 1000);
	}
}

// ใช้ load Content ใหม่ ภายใน DIV หนึ่งๆ ซึ่งจะแสดง loading ให้พร้อมเลย
// ถ้าคลิกเป็น tag a ให้ใส่ e.preventDefault(); ไว้ก่อนเรียกใช้งาน function นี้
// type 1=load page , 2=load data
function loadingInDiv(type, divRefresh, divFixH, icon, data)
{
	// alert(divName);
	
	var fixLenght = divFixH.length; // alert(fixLenght);
	if ( fixLenght > 1 ) { var H = $(divFixH).height();  // alert(H);
	$(divFixH).css('height', H + 'px'); }
	
		$(divRefresh).fadeOut(100, function(){
			
			var iconLenght = icon.length; // alert( iconLenght );
			if ( iconLenght > 5 ) { $(divRefresh).html('<div id="loadingDiv"><img src="' + icon + '" ></div>'); }
			else { $(divRefresh).html(''); }
			
			$(divRefresh).fadeIn(100, function(){
				
				if ( type == 1 ) { $(divRefresh).load(data); $(divFixH).css('height', ''); }
				if ( type == 2 ) { $(divRefresh).html(data); $(divFixH).css('height', ''); }
				
				$(divRefresh + ' #loadingDiv').fadeOut(300);
			});
		});
}


function logoutNow()
{

	// $("#myModal").modal("hide");
	setTimeout( function() {  $('#process').html(''); photoModalClose(); } , 1500);	
	
	setTimeout( function() {
		
		// // เปลี่ยนเป็นสมัครสมาชิก
		var memberText = logoutText1; 
		// alert(memberText);
		stopAlert(0);
		$('#registerText').fadeOut(500, function(){
		$('#registerText').html(memberText);
		// alert(memberText);
		$('#registerText').fadeIn(500);
		});
		
		// เอาภาพ Mobile Top ออก
		$('#memberPhotoMobileArea').fadeOut(500, function(){ 
		$('#memberPhotoMobileArea').html('');
		});
		
		// โหลด menuSide ใหม่
		/*
		$('#swipeMenuSide').fadeOut(500, function(){
				$('#swipeMenuSide').load(DOMAIN + '/object/navLeft.php?mode=reload', function () {
						$('#swipeMenuSide').fadeIn(500);
				});
		});
		*/

		$('.loader').fadeOut(500);
		
	} , 1500);	
	
		// $('#process').html('');
		// $("#myModal").modal("hide");
	// });
	
	// ถ้ามี object ที่ต้องการ Login ก่อน
	if ( $( ".refreshLoginLogout" ).length )
	{	
		// var refreshLoginLogoutLenght = $( ".refreshLoginLogout" ).length;
		// console.log('refreshLoginLogoutLenght = ' + refreshLoginLogoutLenght);
		var urlLoad = $(".refreshLoginLogout").attr('data-logout');	// alert( urlLoad);
		setTimeout( function() {  loadContentNOW( urlLoad ); } , 1000);
	}
	
	
setTimeout( function() {
// ถ้ามี basket ให้ updateBasket
var myBasket = $('#basket');
if ( myBasket.length){ updateBasket(); }
}, 1500);

} // จบ logoutNow();

/* =============== ถ้ายังไม่ login แสดงป้าย Modal ให้ Login ก่อน =============== */
function pleaseLogin()
{
	/* var page = DOMAIN + '/page/welcome.php';
	loadContentNOW ( page ); */
	
	// $('#top').css({'opacity':'0.3'});
	// $('#contentAll').css({'opacity':'0.3'});
	
	photoModalStart();
	$('.photoModalContent').load(DOMAIN + '/member/login.php');
	
}

function loadMenuAll()
{
	// โหลด RegisterArea (Member) ใหม่
	var p = DOMAIN + '/member/loadMemberTop.php';
	$('#registerText').hide().load(p, function(){
			$(this).fadeIn(1000);
	});
				
	// โหลดภาพ Top Mobile
	// ถ้าไม่ใช่ Mobile ให้โหลดแต่ไม่ต้องแสดงผล
	// var screenW = $( window ).width(); // 
	// alert(screenW);
	var p = DOMAIN + '/member/loadMemberTopMobile.php';
	$('#memberPhotoMobileArea').hide().load(p, function () {
			if ( screenW > 700 ) { $(this).hide();  } else { $(this).fadeIn(500); }
	});	
	
	// โหลด menuSide ใหม่
	/*
	$('#swipeMenuSide').fadeOut(500, function(){
		$(this).html('');
		$(this).load(DOMAIN + '/object/navLeft.php?mode=reload', function () {
			$(this).fadeIn(500);
		});
	});
	*/
	
}

/* tab menu */
function tabNow(divRefresh, icon, addStyle)
{
	$(document).on('click', '.tabNow', function(e)
	{
		e.stopImmediatePropagation();
		
		$('.tabNow').removeClass(addStyle);
		$(this).addClass(addStyle);
		
		var page = $(this).attr('data-rel'); // alert( page );
		$(divRefresh).fadeOut(200, function(){
			$(divRefresh).html('<div id="loadingDiv"><img src="' + icon + '" ></div>');
					
			$(divRefresh).fadeIn(200, function(){
				$(divRefresh).load(page);
				$(divRefresh + ' #loadingDiv').fadeOut(200);
			});
		});
	});
}

/* ใช้กับ tab menu ย่อย ที่อยู่ในหน้าเดียวกับ tab menu หลัก */
function tabNow2(divRefresh, icon, addStyle)
{
	$(document).on('click', '.tabNow2', function(e)
	{
		e.stopImmediatePropagation();
		
		$('.tabNow2').removeClass(addStyle2);
		$(this).addClass(addStyle2);
		
		var page = $(this).attr('data-rel'); // alert( page );
		$(divRefresh).fadeOut(200, function(){
			$(divRefresh).html('<div id="loadingDiv"><img src="' + icon2 + '" ></div>');
					
			$(divRefresh).fadeIn(200, function(){
				$(divRefresh).load(page);
				$(divRefresh + ' #loadingDiv').fadeOut(200);
			});
		});
	});
}

function loadingIn(icon, text, color, style)
{
	
	var msg = '<div style="padding:40px; text-align:center;" class="' + style + '"><img src="' + icon + '" style="margin-right:20px; vertical-align:middle; margin-top:-7px;"><span style="color:' + color + '; font-size:1.5em; line-height:1.2;">' + text + '</span></div>';
	$('#process').hide().html(msg).fadeIn(100);
	$('.loadicon').hide();
	$('.loader').fadeIn(500);
}

function loadingOut(t)
{
	setTimeout( function() { $('.loader').fadeOut(500); $('#process').fadeOut(500); }, t);		
}

function dateNowFilename()
{
	var d = new Date();
	var month = d.getMonth()+1;	if ( month.length < 2 ) { month = '0' + month; }
	var day = d.getDate(); if ( day.length < 2 ) { day = '0' + day; }
	var h = d.getHours(); if ( h.length < 2 ) { h = '0' + h; }
	var m = d.getMinutes(); if ( m.length < 2 ) { m = '0' + m; }
	var s = d.getSeconds(); if ( s.length < 2 ) { s = '0' + s; }
	var t = d.getFullYear() + '-' + month  + '-' + day + '_' + h + '-' + m + '-' + s;
	return ( t );
}


// ------------------------------------ ส่วนเลือก จังหวัด อำเภอ ตำบล ------------------------------------- //
//-------- เลือกอำเภอ by AJAX ---------------//
function	SelectDistrict(ProvinceID)
{
			var	xScript;
			xScript = document.createElement('SCRIPT');
			xScript.setAttribute('type','text/javascript');
			xScript.setAttribute('id','JSAJAXStaffGroupCheckData');
			xScript.setAttribute('src',DOMAIN + '/inc/ajaxProvince.php?Action=ListDistrict&ProvinceID='+ProvinceID+'&Rand='+Math.random());
			document.getElementsByTagName('BODY')[0].appendChild(xScript);
}
		
//-------- เลือกตำบล by AJAX ---------------//
function	SelectSubDistrict(DistrictID)
{
			var	xScript;
			xScript = document.createElement('SCRIPT');
			xScript.setAttribute('type','text/javascript');
			xScript.setAttribute('id','JSAJAXStaffGroupCheckData');
			xScript.setAttribute('src',DOMAIN + '/inc/ajaxProvince.php?Action=ListSubDistrict&DistrictID='+DistrictID+'&Rand='+Math.random());
			document.getElementsByTagName('BODY')[0].appendChild(xScript);
}
		
//-------- Loading Message -----------------------//
function loading()
{
			var selectName = window.document.getElementById('list_district');
			var length = selectName.length;
			for (var i=0; i < length; ++i){
				selectName[i] = null;
			}
			selectName.length = 0;
			selectName[0] = new Option('Loading...','loading');
			selectName.disabled=true;
}
		
//-------- Loading Message for subdistrict -----------------------//
function loading_subdistrict()
{
			var selectName = window.document.getElementById('list_subdistrict');
			var length = selectName.length;
			for (var i=0; i < length; ++i){
				selectName[i] = null;
			}
			selectName.length = 0;
			selectName[0] = new Option('Loading...','loading');
			selectName.disabled=true;
}