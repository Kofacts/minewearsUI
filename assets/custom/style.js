$('.car_text').hide();
$('.aboutParticipant').hide();
$('.errorField').hide();

$(document).ready(function()
{
	$('.slickify').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
});
	$('.slickify2').slick({
		dots: true,
		arrow: false
	});
	$('.page-loader-wrapper').hide();
	 $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  }); 
	 $('.datepicker').pickadate();
	function shakeElement(element){
    element.addClass('shake');
    setTimeout(function(){
        element.removeClass('shake');
    },2100);
};
	//done function

	//Add participants click function
	$('#section_body').on("click", "#add-part2", function(e){
		e.preventDefault();
		
		//send request and reset form
		console.log('Making Request to Ajax')
		$partName= $('.part_name').val();
		$partDesc= $('.part_desc').val();
		$partManifesto= $('.part_manifesto').val();
		
		//make the ajax call
		$.ajax({
		        url: "test.php",
		        type: "post",
		        data: {'part_name': $partName,'part_desc': $partDesc} ,
		        success: function (response) {
		           // you will get response from your php page (what you echo or print) 
		           console.log('success'); 
		           //move the user to the next step
		           // see the commented code in the error part for it   
		                       

		        },
		        error: function(jqXHR, textStatus, errorThrown) {
		           console.log(textStatus, errorThrown);
		           $('#create-poll').attr('value',`NEXT STEP`);
		           $('.successField').show();
					$('.errorText').text('Error : Please Try Again');

					//success
					$(document).scrollTop(0);
					$('#add_').trigger('reset');
					//append the Done button
					$('#done_adding').show();

		        }
		    });


	});

	$('.step-2').on('click',function(){
		
		$('.aboutPoll').fadeOut('slow');
		$('.aboutParticipant').fadeOut('slow').show();
	});
	$('#create_').submit(function(e)
	{
		e.preventDefault();
		//check if the inputs are not empty
		var $pollName= $('.poll_name').val();
		var $pollDesc= $('.poll_desc').val();
		var $pollPassCode= $('.poll_passcode').val();
		var $pollRange= $('.poll_range :selected').text();
		var $pollType= $('.poll_type :selected').text();
		var $pollStartTime= $('.poll_start_time').val();
		var $pollEndTime= $('.poll_end_time').val();
		var $pollStartDate= $('.poll_start_date').val();
		var $pollEndDate= $('.poll_end_date').val();
		console.log($pollRange);
		if($pollName!=="" && $pollDesc!=="")
		{
			//run the ajax func.
			//first add the spinner
			$('#create-poll').attr('value',`Creating Poll..`);

			 $.ajax({
		        url: "test.php",
		        type: "post",
		        data: {'poll_name': $pollName,'pollDesc': $pollDesc} ,
		        success: function (response) {
		           // you will get response from your php page (what you echo or print) 
		           console.log('success'); 
		           //move the user to the next step
		           // see the commented code in the error part for it               

		        },
		        error: function(jqXHR, textStatus, errorThrown) {
		           console.log(textStatus, errorThrown);
		           $('#create-poll').attr('value',`NEXT STEP`);
		           $('.errorField').fadeOut().show();
					$('.errorText').text('Error : Please Try Again');

					//success
					$(document).scrollTop(0);
					$('#section_body').html(`<div id="background_section" style="height: 200px;">
			<div class="container valign-wrapper padd-20 font-big-light">
	  			<h4 class="light-b">Add Poll Participants</h4>
			</div>
		</div>



		<div class="container" style="margin-top: -70px;">


		<div class="card-panel green alert_box successField" style="display:none">
				          <span class="white-text "> Participants, Added. Add More Participants or Click Done to Finish!
				          </span>
				          <span id="close_button" class="white-text right-align" style="font-size: 12px; float: right !important; cursor: pointer;">[ Close ]
				          </span>
			</div>


			<div class="card horizontal hide-on-med-and-down dividname" style="height: 150px">
				<div class="card-stacked">
						<ul class="progressbar">
					          <li class="">ABOUT POLL</li>
					          <li class="active">ADD PARTICIPANTS</li>
					          <li>SHARE POLL</li>
					          
					  	</ul>
				</div>
			</div>
			<div class="card horizontal" style="height:90vh; margin-top: 20px; margin-bottom: 160px">
				<div class="card-stacked">
			        <div class="card-content">
			        	<div class="row">
			      

			        		<div class="col s12 l4 poll_cta">
				        		<div class="margin_offset">
				        			<center>
				        				<i class="material-icons center icon-3x">group_add</i>
				        				<br>
				        				<span>Poll Participants</span>
				        				<br><br>
				        			
				        				<span style="font-size: 10px; float: left">Steps to Creating a Poll.</span><br>
				        				<span style="float: left;font-size: 10px;">*****</span><br>
				        				<span style="float: left;font-size: 10px;">Select Your Preferred Poll Name</span><br>
				        				<span style="float: left;font-size: 10px;">Describe What your Poll is about</span>
				        			</center>
				        		</div>	
			        		</div>

			        		<div class="col s12 l7 poll_main" style="position: absolute; top: 0; right: 0; height: 90vh; background-size: cover; background-position: center center; background-repeat: no-repeat; margin-left: 20px !important ">
			        			
			        			<div class="poll_content">
			        				<div class="row">
									    <form class="col s12" id="add_">
									    <div class="row">
									        <div class="input-field input-field2 col s12">
									          <i class="material-icons prefix" style="color: white">verified_user</i>
									          <input id="icon_prefix" type="text" class="validate poll_form part_name" required>
									          <label for="icon_prefix">Enter Name of Participant</label>
									        </div>

									        <div class="input-field input-field2 col s12">
									          <i class="material-icons prefix" style="color: white">info</i>
									          <textarea id="icon_prefix" class="materialize-textarea poll_form part_desc" required></textarea>
									          <label for="icon_prefix2">Enter Participant's Description</label>
									        </div>

									        <div class="input-field input-field2 col s12">
									          <i class="material-icons prefix" style="color: white">more_vert</i>
									          <textarea id="icon_prefix" class="materialize-textarea poll_form part_manifesto" required></textarea>
									          <label for="icon_prefix2">Manifestor of Participant</label>
									        </div>

									       

												<div class="col s12 " style="margin-top: 40px; margin-bottom: 40px">

											        
											        <input type="submit" value="Add Participant " id="add-part2"  class="btn right white-btn" >
											        <input type="submit" value="Done " id="done_adding"  class="btn btn-primary"  style="display:none"/>
											    </div>


											</div>
									     
									    </form>
									</div>

									</div>       
			        			</div>
			        		</div>
			        	</div>
			        </div>
			    </div>

			</div>
		</div>`).slideDown('slow');

		        }
		    });


		}
		else
		{
			//shakeElement('.full-form');

			var e = document.getElementById('dividname');
			e.style.marginLeft='8px';
			setTimeout(function(){e.style.marginLeft='0px';},100);
			setTimeout(function(){e.style.marginLeft='8px';},200);
			setTimeout(function(){e.style.marginLeft='0px';},300);
			$('.errorField').fadeOut().show();
			$('.errorText').text('No Field Should be Left Empty - Fill all Fields!');
		}
		console.log('Clicked');
	});

	
	$('.step-1-prev').on('click',function(){
		$('.aboutParticipant').fadeOut('slow');
		$('.aboutPoll').fadeOut('slow').show();
	})
	$('.push-vote').click(function(){
		$('ul.tabs').tabs('select_tab', 'test-swipe-2');
	});
	$(".dropdown-button").dropdown();
	$('.car_text').slideDown('slow',function(){
		//done
	}).show();
	$(".button-collapse").sideNav();
	$('.collapsible').collapsible();
	$('select').material_select();
	$('#close_button').on('click',function()
	{
		$('.alert_box').fadeOut();
	});
	
	$('.nt').hover(function(){
		//remove the original class
		$(this).addClass('wed');
	},
	function(){
		$(this).removeClass('wed');
	});

	

$('.responsive').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

    

});