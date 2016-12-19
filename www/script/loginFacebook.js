// alert('TEST');
// ==================== facebook ======================= //

/* function fbStart()
{ */
// alert('TEST2.3');
// $(document).ready(function () {
	
 // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().

// alert( authResponse );

    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      fbLoginAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      // document.getElementById('status').innerHTML = 'Please log into this app.';
	  
	  pleaseLogin( fbText1 );
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      // document.getElementById('status').innerHTML = 'Please log into Facebook.';
	  pleaseLogin( fbText1 );
    }
	
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
	appId      : '210727809351630',
	// appId      : '899580390077360',  // TEST APP
    cookie     : true,   // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.3' // use version 2.2
  });
  
  
  /*
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '164057233960758',
      xfbml      : true,
      version    : 'v2.5'
    });
  };
  
    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   
   */
   

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };
 

  // Load the SDK asynchronously
  /*
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  */
  
  (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/th_TH/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



// ----------- Login แล้ว (กดรับ App แล้ว)  ------------- //
// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function fbLoginAPI() {
    // console.log('Welcome!  Fetching your information.... ');
   	FB.api('/me?fields=id,name,email,gender,locale,link', function(response) {
		
		var userData = response;
		// alert( response.name );
		
		console.log(response);
    	console.log(response.email);
		
		/*
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';	//
		*/
		var photoJSON = 'https://graph.facebook.com/' + response.id + '/picture?width=600&redirect=false';
		var photoData;
		$.getJSON(photoJSON, function(json){
			photoData = json;
			// var photoURL = json["data"]["url"];
			// var photoURL = photoData["data"]["url"];
			// alert( photoURL );
			
			// ส่งข้อมูลล่าสุดไปเก็บที่ DB (ถ้ายังไม่มีก็ insert / ถ้ามีแล้วก็ update)
				// alert( 'fb e-mail = ' + userData.email );
				// alert( 'fb name = ' + userData.name );
				$.post(DOMAIN + '/member/loginSocialDB.php?social=1', {'data':userData, 'photo':photoData}, function(data) {
				setTimeout( function() {
				$(".photoModal").fadeIn(300);
				$('.photoModalContent').hide().html(data).fadeIn(300); 
				$('.loadicon').fadeOut(300); 
				$('.loader').fadeOut(300); } , 300);
				
				});	
				
		});
		
		// alert( userData.name );
		// var photoURL = photoData["data"]["url"];
		// alert( photoURL );
		
				
    });
}

function fblogin() {	  

$('#bt').hide().html('<img src="' + DOMAIN + '/graphic/loading/08.gif">').fadeIn(300);

FB.login(
  function(response) {
    // console.log(response);  
	checkLoginState();
  },
  { scope: 'public_profile,email', auth_type: 'rerequest' }
);

}

// ----------- ยังไม่ Login หรือ ยังไม่กดรับ ------------- //
function pleaseLogin( text )
{
	var t = '<div style="font-size:2.2em; color:#000;"><b>facebook Connect</b></div>';
	 t = t + '<div style="font-size:2em; margin-top:30px;">' + text + '</div>';
	 t = t + '<div id="bt" style="margin-top:50px;"><a onclick="fblogin(); return false;" style="cursor:pointer"><img src="' + DOMAIN + '/graphic/icon/login_facebook.png" class="img-responsive"></a></div>';
	$(".photoModal").fadeIn(300);
	// $('.modal-content').html('')
	$('.photoModalContent').hide().html(t).fadeIn(300);
	$('.loader').fadeOut(100);
	$('.loadicon').fadeOut(100);
	
	console.log(t);
	
 	// $('#bt').trigger('click');
	// fblogin();
	
	// alert( 'Please Login' );
}

// });


// }