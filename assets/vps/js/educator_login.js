console.log(document.referrer);
$(function(){
	blur_functions();

	$( window ).on( "load", function() {
        $('#country_code').val('91');
	});

	$('#country_code').change(function(){
		var country_code = $('#country_code').val();
		$('#c_code').html('+'+country_code);
	})

	$('#login_tabs').click(function(){
		$('.login-tab-color').attr('class','login-tab-color');
		$('#login_tabs').attr('class','login-tab-color login-active');
		$('#login_form').show();
		$('#forgot_form').hide();
		$('#registration_from').hide();
		$('#otp_forgot_form').hide();
		
	})

	$('#registration_tabs').click(function(){
		$('.login-tab-color').attr('class','login-tab-color');
		$('#registration_tabs').attr('class','login-tab-color login-active');
		$('#login_form').hide();
		$('#forgot_form').hide();
		$('#registration_from').show();
		$('#otp_forgot_form').hide();		
		ressting_form();
	})

	$('#forgotpassword_tabs').click(function(){
		$('#login_form').hide();
		$('#forgot_form').show();
		$('#registration_from').hide();
		$('#otp_forgot_form').hide();
						
	})
	
	$("#otp_forgot_form").submit(function(){
		var otp_text = $('#otp_text').val();
		var otp_email = $('#otp_email').val();
		if(otp_text == ""){
			$('#otp_text').css('border','1px solid red');
		}
		else{
			$.ajax({
				url: "",
				data: new FormData(this),
				type: 'POST',
				processData : false,
				contentType : false,
				success: function(data){
					var data = $.parseJSON(data);
					if(data.err == 1){
						$('#otp_text').css('border','');
						$('#otp_text').val('');
						$('#otp_email').val('');
						
						$('#login_form').show();
						$('#forgot_form').hide();
						$('#registration_from').hide();
						$('#otp_forgot_form').hide();
						
						alertify.notify("Your account is activated ..");
					}
				}
			});
		}		
	})
	
	//$('#login_form').submit(function(){
	$('#login_form').on('submit', function(e) {
		var validatons = 1 ;
		$('.login_form_text').each(function(){
			var valuee  = $(this).val();
			if(valuee  == ''){
				$(this).css('border-color','red');
				validatons = 0;
			}
			else{
				$(this).css('border','');
			}
		})
		var login_password = $('#login_password').val();
		if(login_password == ''){ $('#flexx').css('border','1px solid red'); validatons=0;} else{ $('#flexx').css('border',''); }
		
		if(grecaptcha.getResponse() == "") {
			e.preventDefault();
			validatons = 0;
			$('#alert_recaptcha').html('<p style="color:red">Please confirm the Captcha</p>');
		  } else {
			$('#alert_recaptcha').html('');
		  }


		
		if(validatons == 1){
			$.ajax({
					url: "",
					data: new FormData(this),
					type: 'POST',
					processData : false,
					contentType : false,
					success: function(data){
						var data = $.parseJSON(data);
						if(data.err == 1){
							$('.login_form_text').each(function(){
								$(this).css('border-color','');
								$('#flexx').css('border','');
								$(this).val('');
							});
							$('#login_password').val('');
							alertify.notify("You are redirecting to the dashboard..");
							var previouse_link = document.referrer;
							window.location.replace(base_url+"Student/educator_onboarding");
							
						}
						else if(data.err == 2){
							alertify.notify("Your email/password are not matched..");
						}
						else if(data.err == 3){
							alertify.notify("This account is not activated..");
						}
						else{
							alertify.notify("Please check your Internet connection");
						}
					}
				})	
			
		}
	});	
			
	
	$('#forgot_form').submit(function(){
		var validatons = 1 ;
		
		var activation_username = $('#activation_username').val();
		if(activation_username == ''){ $('#activation_username').css('border','1px solid red'); validatons=0;} else{ $('#activation_username').css('border',''); }
		
		
		if(validatons == 1){
			$.ajax({
					url: "",
					data: new FormData(this),
					type: 'POST',
					processData : false,
					contentType : false,
					success: function(data){
						var data = $.parseJSON(data);
						if(data.err == 1){
							$('#activation_username').css('border',''); 
							$('#activation_username').val('');
							alertify.notify("Please check your email or mobile for temporary password");
						}
						else if(data.err == 2){
							alertify.notify("This email id is not matched ..");
						}
						else{
							alertify.notify("Please check your Internet connection");
						}
					}
				})	
			
		}
	});	
	
			
			

	$('#registration_from').submit(function(){
		var validatons = 1 ;
		$('.validation_forms').each(function(){
			
			var valuee  = $(this).val();
			if(valuee  == ''){
				$(this).css('border','1px solid red');
				validatons = 0;
			}
			else{
				$(this).css('border','');
			}
		})
		
		var email = $('#email').val();
		var password_value = $('#password').val();
		var confirm_password = $('#confirm_password').val();
		if(password_value != confirm_password){
			$('#password').css('border','1px solid red');
			$('#confirm_password').css('border','1px solid red');
			$('#alert_divs').html('<p style="color:red">Password & Confirm Password are not matched</p>');
			validatons = 0;
		}
		
		
		if(validatons == 1){
			
			$.ajax({
				url: "",
				data: new FormData(this),
				type: 'POST',
				processData : false,
				contentType : false,
				success: function(data){
					var data = $.parseJSON(data);
					if(data.err == 1){
						$('.validation_forms').each(function(){
							$(this).css('border','');
							$(this).val('');
						});
						$('#otp_email').val(email);
						$('#login_form').hide();
						$('#forgot_form').hide();
						$('#registration_from').hide();
						$('#otp_forgot_form').show();
						
						alertify.notify('You are Successfully registered ...');
					}
					else if(data.err == 2){
						alertify.notify('Your email id is already registered');
					}
					else if(data.err == 3){
						alertify.notify('Your acccount is not activated');
					}
					else{
						alertify.notify('Please check your Internet connection');
					}
				}
			})			
		}
	})
	
})

function ressting_form(){
	$('.validation_forms').each(function(){
		$(this).css('border','');
		$(this).val('');
	});
	$('#country_code').val('91');
}



function blur_functions(){

	
	$('.password_valid').blur(function(){
		var valds = '';
		var append_html  = '';
		$(".password_valid").each(function () {
			var validated =  true;
			if(this.value.length < 8){
				valds = 1;
				append_html += 'Should contain at least 8 characters<br>';
			}
			if(!/\d/.test(this.value)){
				valds = 1;
				append_html += 'Should contain at least one digit<br>';
			}
			if(!/[a-z]/.test(this.value)){
				valds = 1;
				append_html += 'Should contain at least one lower case<br>';
			}
			if(!/[A-Z]/.test(this.value)){
				valds = 1;
				append_html += 'Should contain at least one upper case<br>';
			}
			if(valds == 1){
				valds = 1;
				$(".password_valid").val('');
				$(".password_valid").css("border","1px solid red");
				$("#password_pattern").html(append_html);
			}else{
				$(".password_valid").css("border","");
				$("#password_pattern").html('');
			}
		});
	});


	$('.password_valid').keyup(function(){
		var valds = '';
		var append_html  = '';
		$(".password_valid").each(function () {
			var validated =  true;
			if(this.value.length < 8){
				valds = 1;
				append_html += 'Should contain at least 8 characters<br>';
			}
			if(!/\d/.test(this.value)){
				valds = 1;
				append_html += 'Should contain at least one digit<br>';
			}
			if(!/[a-z]/.test(this.value)){
				valds = 1;
				append_html += 'Should contain at least one lower case<br>';
			}
			if(!/[A-Z]/.test(this.value)){
				valds = 1;
				append_html += 'Should contain at least one upper case<br>';
			}

			if(valds == 1){
				valds = 1;
				$("#password_pattern").html(append_html);
			}else{
				$(".password_valid").css("border","");
				$("#password_pattern").html('');
			}
		});
	});
 

	
	$('.email_validation').blur(function(){
		var name=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i ;
		if(!name.test($(".email_validation").val())){
			$(".email_validation").val('');
			$(".email_validation").css("border","1px solid red");
		}
		else{
			$(".email_validation").css("border","");
		}
	});
	/*$('.mobile_validation').blur(function(){
		var name=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if(!name.test($(".mobile_validation").val())){
			$('.mobile_validation').val('');
			$(".mobile_validation").css({"border":"1px solid red"});
		}else{
			$(".mobile_validation").css("border","");	
		}
	});*/
	$('.required_fields').blur(function(){
		var value = $.trim($(this).val());
		if(value == ''){
			$(this).val('');
			$(this).css({"border":"1px solid red"});
		}
		else{
			$(this).css("border","");
		}
	});
}



