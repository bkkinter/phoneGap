// ======================== Login ========================== //

$(document).ready(function(){
	// if ( $('#tabRegister').is(':checked') ) { alert("it's checked"); }
	$('.photoModal').on('click', 'input[type="radio"]', function (){
		var val = $("input[name=loginRegister]:radio:checked").val();
		// alert( val );
		if ( val == 2 ) { $('#divForget').fadeOut(200);  }
		else { $('#divForget').fadeIn(200);  }
	});
});

// function loginScript() {
// alert('Log In NOW');
// alert(DOMAIN);

// =========== jQuery Validate =========== //

// $(document).ready(function(){
// alert('TEST');

    $("#loginForm").validate({
        rules: {
            email: { email:true, required: true },
            password: { required: true }
        },
        messages: {
           // example5: "Just check the box<h5 class='text-error'>You aren't going to read the EULA</h5>"
        },
        tooltip_options: {
            email: { trigger:'focus' },
            // password: { placement:'right',html:true }
			password: { trigger:'focus' }
        },


showErrors: function(errorMap, errorList) {

// Clean up any tooltips for valid elements
$.each(this.validElements(), function (index, element) {
var $element = $(element);
$element.data("title", "") // Clear the title - there is no error associated anymore
.removeClass("error")
.tooltip("destroy");
});

// Create new tooltips for invalid elements
$.each(errorList, function (index, error) {
var $element = $(error.element);
$element.tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
.data("title", error.message)
.addClass("error")
.tooltip(); // Create a new tooltip based on the error messsage we just set in the title
});
},

		submitHandler: function(form) {
			
			// $('#loadingInModal').fadeIn(100);
				
			//	$('body').modalmanager('loading');
				
						// alert('TEST');
						// $("#loginForm").submit();

						// loader
						// $(".modal-content").fadeOut(300);
						// $(".photoModalContent").fadeOut(300);
						photoModalHide();
						$('.loader').fadeIn(300);
						$('.loadicon').fadeIn(300);
						
						// alert('TEST');
						// alert( DOMAIN );
						
						$.post( DOMAIN + '/member/loginCheck.php', $('#loginForm').serialize(), function(data) {
								setTimeout( function() {
								// photoModalShow();
								photoModalChangeNow(2, data);
								// $('.photoModalContent').hide().html(data).fadeIn(300);
								$('.loadicon').fadeOut(100); 
								
								} , 500);	
						});

			},
			invalidHandler: function(form, validator) {
				// $("#validity_label").html('<div class="alert alert-error">There be '+validator.numberOfInvalids()+' error'+(validator.numberOfInvalids()>1?'s':'')+' here.  OH NOES!!!!!</div>');
				// alert('NO !!');
			}

    });

// }); // จบ ready

// ========== จบ jQuery Validation ============ //

$('#fbClickArea').on('click', '#fbClick', function() {
// $(document).on('click', '#fbClick', function() {

	// $(".photoModalContent").fadeOut(300);
	photoModalHide();
	$('.loader').fadeIn(300);
	$('.loadicon').fadeIn(300);
	$.ajaxSetup({ cache: true });
	  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
		FB.init({
		  appId: '210727809351630',
		  version: 'v2.7' // or v2.1, v2.2, v2.3, ...
		});     
		FB.getLoginStatus(function(response) {
					debugger;
					statusChangeCallback(response);
					setTimeout( function() { $('.photoModalContent').html(response).fadeIn(300); }, 300 );
				});
	  });
	/* (function(d, s, id) {
		debugger;
	var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/th_TH/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	window.fbAsyncInit = function() {
			FB.init({
				appId      : '210727809351630',
				cookie     : true,
				xfbml      : true,
				version    : 'v2.3'
			});

			FB.getLoginStatus(function(response) {
				debugger;
				statusChangeCallback(response);
				setTimeout( function() { $('.photoModalContent').html(response).fadeIn(300); }, 300 );
			});

		}; */

	
	// var dateNow = dateNowFilename();
	// alert(dateNow);
	// $.post( '/member/loginSocialFacebook.php' + '#' + dateNow, '', function(data) {
	/* $.post( DOMAIN + '/member/loginSocialFacebook.php' , '', function(data) {
		debugger;
		window.fbAsyncInit = function() {
			FB.init({
				appId      : '210727809351630',
				cookie     : true,
				xfbml      : true,
				version    : 'v2.3'
			});
			FB.getLoginStatus(function(response) {
				statusChangeCallback(response);
			});
		};
		setTimeout( function() { $('.photoModalContent').html(data).fadeIn(300); }, 300 );
	});	 */
	
	/* $('.modal-content').hide().html('<script src="/script/loginFacebook.js">\x3C/script>').fadeIn(300); */
	
});

//Start Facebook Login

function statusChangeCallback(response) {
	if (response.status === 'connected') {
	  fbLoginAPI();
	} else if (response.status === 'not_authorized') {
	  pleaseLogin( fbText1 );
	} else {
	  pleaseLogin( fbText1 );
	}
}
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

function fbLoginAPI() {
   	FB.api('/me?fields=id,name,email,gender,locale,link', function(response) {
		var userData = response;
		var photoJSON = 'https://graph.facebook.com/' + response.id + '/picture?width=600&redirect=false';
		var photoData;
		$.getJSON(photoJSON, function(json){
			photoData = json;
				$.post(DOMAIN + '/member/loginSocialDB.php?social=1', {'data':userData, 'photo':photoData}, function(data) {
				setTimeout( function() {
				$(".photoModal").fadeIn(300);
				$('.photoModalContent').hide().html(data).fadeIn(300); 
				$('.loadicon').fadeOut(300); 
				$('.loader').fadeOut(300); } , 300);
				});	
				
		});
    });
}

function fblogin() {	  
	$('#bt').hide().html('<img src="' + DOMAIN + '/graphic/loading/08.gif">').fadeIn(300);
	FB.login(
	  function(response) {
		checkLoginState();
	  },
	  { scope: 'public_profile,email', auth_type: 'rerequest' }
	);
}

function pleaseLogin( text )
{
	
	var t = '<div style="font-size:2.2em; color:#000;"><b>facebook Connect</b></div>';
	 t = t + '<div style="font-size:2em; margin-top:30px;">' + text + '</div>';
	 t = t + '<div id="bt" style="margin-top:50px;"><a onclick="fblogin(); return false;" style="cursor:pointer"><img src="' + DOMAIN + '/graphic/icon/login_facebook.png" class="img-responsive"></a></div>';
	$(".photoModal").fadeIn(300);
	$('.photoModalContent').hide().html(t).fadeIn(300);
	$('.loader').fadeOut(100);
	$('.loadicon').fadeOut(100);
}

//End Facebook Login





// } // จบ loginScript()