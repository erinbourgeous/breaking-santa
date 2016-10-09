$(document).ready(function(){


  	$.ajax({url:'api/getOutstandingGivers', async:false, dataType: 'json', success:function(jsonGivers){
  		var outstandingGivers = '';
  		$.each(jsonGivers.outstanding, function(index, person){
    		outstandingGivers += "<li id=\"" + person.id + "\">" + person.name + "</li>";
		});
		$("#giversList").append(outstandingGivers);
  	}});

    $.ajax({url:'api/getOutstandingReceivers', async:false, dataType: 'json', success:function(jsonReceivers){
  		var outstandingReceivers = '';
  		$.each(jsonReceivers.outstanding, function(index, person){
    		outstandingReceivers += "<li id=\"" + person.id + "\">" + person.name + "</li>";
		});
		$("#receiversList").append(outstandingReceivers);
  	}});

    /*$.getJSON('api/getOutstandingReceivers', function(jsonReceivers) {
  		var outstandingReceivers = '';
  		$.each(jsonReceivers.outstanding, function(index, person){
    		outstandingReceivers += "<li id=\"" + person.id + "\">" + person.name + "</li>";
		});
		$("#receiversList").append(outstandingReceivers);
    });*/

    $("#formSubmitButton").click(function(){
    	var giver_name = $('#giversList .selected').text();
    	var confirmMessage = giver_name + ", ";
    	if (receiver_id == 0 ) {
    		confirmMessage += "you have chosen to have your recipient be randomly selected, do you wish to proceed?";
    	} else {
    		confirmMessage += "you have selected " + $('#receiversList .selected').text() + ", do you wish to proceed?";
    	}

    	if (confirm(confirmMessage) == true) {
        	$.post("api/submitSelection", { 'giver_id': giver_id, 'receiver_id': receiver_id } , function(data) {
 				$("#selectionArea").html("<p>You have selected <b>" + data.receiver_name + "<b/></p>");

    			//alert("You have selected " + data.receiver_name);
    	});
    		} else {}
	});

	var giver_id, receiver_id;

	//Radio Buttons
	$(function(){

		$('#giversList li').click(function(){
			giver_id = this.id;
			$('#giverID').val(this.id);
			$('#giversList li').removeClass('selected');
			$(this).addClass('selected');
			
			$('#receiversList li').show();
        		$('#receiversList').children('#'+giver_id).hide();
        		$.ajax({url:'api/getSpouseId', data: {'giver_id':giver_id}, async:false, dataType: 'json', success:function(spouseId){
        			$('#receiversList').children('#'+spouseId.spouse_id).hide();
			}});
		});

		$('#receiversList li').click(function(){
			receiver_id = this.id;
			$('#receiverID').val(this.id);
			$('#receiversList li').removeClass('selected');
      		$(this).addClass('selected');
		});


      	$('#selectionArea ul li').mouseover(function(){
      		$(this).addClass('over');
      	});

      	$('#selectionArea ul li').mouseout(function(){
      		$(this).removeClass('over');
    	});

  	}); //end function

});
