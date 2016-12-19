$(document).ready(function(){
calPriceAll();
// alert( "TEST 222" );

	// $('.deleteNow').click( function(){
	$('.buyList').on('click', '.deleteNow', function(){
	// $(body).delegate('.buyList .deleteNow', 'click', function() {
	// alert( "TEST 333" );

		var checkstr = showAlertBox( 2, text1 );
		// var checkstr = confirm( text1 );
		if ( checkstr == true)
		{
			var delid = $(this).attr('id');
			var cookieName = $(this).attr('data-rel');
			$.post(DOMAIN + '/object/buylistAdjust.php?mode=del', {'id':delid, 'cookieName':cookieName }, function(data) {
				$('[id=box_'+ delid + ']').fadeOut(500, function (){ $(this).remove();
				
				calPriceAll(); 
	
				});
			});
		}
		else { return false; }
	});
	
});

function calPriceAll()
{
	var priceSum = 0;
	$('.buyList').each(function(i){
		var price = parseFloat( $(this).attr('data-rel') ); // alert( price );
		
		priceSum = priceSum + price; // alert( priceSum );
	});
	
	var priceText = numberWithCommas(priceSum);
	$('#priceSummary').html(priceText);
	
	if ( priceSum > 0 )
	{
		// เปลี่ยนค่าเงินต่างประเทศโดยประมาณ
		$.post(DOMAIN + '/object/showMoney.php?money=' + priceSum , '' , function(data) { 
			$('#moneyInter').html(data);
		});
	} else { $('#moneyInter').html(''); }
	
	// $.post('/object/basketUpdate.php', '' , function(data) { });
	
	// ถ้ามี basket ให้ updateBasket
	var myBasket = $('#basket');
	if ( myBasket.length){ updateBasket(); }

}