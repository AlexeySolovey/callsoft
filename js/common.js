;(function($){
	$(document).ready(function() {
		var block = '<div class="block"><div class="row"><div class="form"><div class="col-md-offset-1 col-md-2"><input type="checkbox" name="my-checkbox" data-on-text="PARCEL" data-off-text="PALLET" data-on-color="primary" data-off-color="primary" data-label-width="10" checked></div><div class="block__info parcel"><div class="col-md-2"><p>Weight:</p><div class="input-group"><input type="number" name="Parcel Weight" class="form-control"/><span class="input-group-addon">Kg</span></div></div><div class="col-md-2"><p>Length:</p><div class="input-group"><input type="number" name="Parcel Length" class="form-control" /><span class="input-group-addon">Cm</span></div></div><div class="col-md-2"><p>Width:</p><div class="input-group"><input type="number" name="Parcel Width" class="form-control"/><span class="input-group-addon">Cm</span></div></div><div class="col-md-2"><p>Height</p><div class="input-group"><input type="number" name="Parcel Height" class="form-control"/><span class="input-group-addon">Cm</span></div></div></div><div class="block__info pallet"><div class="col-md-2"><p>Number of pallets:</p><div class="input-group"><input type="number" name="Pallet Number" class="form-control"/><span class="input-group-addon">Pcs</span></div></div><div class="col-md-2"><p>Height</p><div class="input-group"><input type="number" name="Pallet Height" class="form-control"/><span class="input-group-addon">Cm</span></div></div><div class="col-md-2"><p>Weight for pallet:</p><div class="input-group"><input type="number" name="Pallet Weight" class="form-control" /><span class="input-group-addon">Kg</span></div></div></div></div></div></div>';
		//dropdown menu
		$('.town-group a').on('click', function(){
			var city = $(this).text();
			$(this).parents('.input-group').find('button').text(city).click();
			return false;
		});
		//checkbox
		function initCheck(){
			$("[name='my-checkbox']").bootstrapSwitch();
			$('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
				if(state){
					$(this).parents('.form').find('.parcel').css('display','block');
					$(this).parents('.form').find('.pallet').css('display','none')
				}else{
					$(this).parents('.form').find('.parcel').css('display','none');
					$(this).parents('.form').find('.pallet').css('display','block');
				}
			});
		};
		initCheck();
		//end checkbox
		//add and remove block
		$("#add").on('click', function(){
			$('.wrap').append(block);
			initCheck();
		})
		$("#remove").on("click", function(){
			if($('.block').length > 1){
				$('.block:last').remove();
			}
		});
		//end add and remove block
		//send
		$('#send').on('click', function(){
			var obj = {};
			var cityFrom = $("#city-from").text();
			var inputFrom = $("#from").val();
			var cityTo = $("#city-to").text();
			var inputTo = $("#to").val();

			if(!inputFrom || !inputTo){
				alert('Введите Адрес')
			}else{
				obj.city = {};
				obj.city['from: ' + cityFrom] = inputFrom;
				obj.city['to: ' + cityTo] = inputTo;

				var blockVal = $(".form");
				for(var y=0; y<blockVal.length; y++){
					var inputs = $(blockVal[y]).find("input[type='number']");
					obj['block'+ (y+1)] = {};
					
					for(var i=0; i<inputs.length; i++){
						obj['block'+(y+1)][inputs[i].name] = inputs[i].value;
					}
				}
				console.log(obj);
			}
		});
		// end send
	});
})(jQuery)