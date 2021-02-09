var cpage = 1;
$(function(){
	
	$('#whatsapp').click(function(){
		window.open("https://wa.me/919392161934?text=Hi");
	})
	
	$('.whatsapp_red').click(function(){
		window.open("https://wa.me/919392161934?text=Hi");
	})

	
	$('.treeview-colorful').mdbTreeview();
	display_projects_preivew(projectId)
	
	
	$('#internships_search').submit(function(){
		get_records(1);
	})
	
	
	$("body").on("click",'.pagination li',function(){
		cpage = $(this).attr('page');
		get_records(cpage);
    });
	$('#CancelBtn').click(function(){
		reset();
	});
	$('#SearchBtn').click(function(){
		get_records(cpage);
	});
	$('#AddBtn').click(function(){
		$('#myModal').modal('show');
	});
});

function get_records(page)
{
	var category = $.trim($('#category').val());
    var subcategory = $.trim($('#subcategory').val());
    var complexity = $.trim($('#complexity').val()); 
    
	$.ajax({
		url : base_url+"Student_API/guided_projects",
		method : "POST",
		data:{'Role':'records','page':page,'category':category,'subcategory':subcategory,'complexity':complexity},
		success:function(data){
			data = $.parseJSON(data);
			var html='';
			if(data.records!='')
			{
				var n = 1 ;
				$.each(data.records, function(i){
					var row = data.records[i];
					if(row.logo == ''){
						var image_url = base_url+'/assets/default-cmpny.jpg';
					}
					else{
						var image_url = base_url+row.logo;
					}
                    

					html += '<div class="col-md-6">';
					html += '<a  href="'+base_url+'guided-project/'+row.projectId+'" class="guide-list mt-4">';
					html += '<div class="row"> ';                                   
					html += '<div class="col-md-3 col-3"><img style="width: 100%;" src="'+image_url+'" alt="big-badge-ibm"></div>';
					html += '<div class="col-md-9 col-9">';
					var pro_tile = row.projectTitle;
					html += '<h6 class="pro_title">'+pro_tile.toLowerCase()+'</h6>';
					html += '<p>For what reason would it be advisable for me to think about business content?</p>';
					var skills = row.skills;
					var res = skills.split(",");
					for(z=0; z<res.length; z++){
						html += '<button class="btn mt-3 res_ss">'+res[z]+'</button> &nbsp;';
					}
					html += '<ul class="star-ul mt-3">';
					html += '<li class="mr-1"><h6 class="star-p">4.5</h6></li>';
					html += '<li><img class="star-li px-1" src="'+base_url+'assets/guided_projects/images/star-fill.png" alt="star-ratting"></li>';
					html += '<li><img class="star-li px-1" src="'+base_url+'assets/guided_projects/images/star-fill.png" alt="star-ratting"></li>';
					html += '<li><img class="star-li px-1" src="'+base_url+'assets/guided_projects/images/star-fill.png" alt="star-ratting"></li>';
					html += '<li><img class="star-li px-1" src="'+base_url+'assets/guided_projects/images/star-fill.png" alt="star-ratting"></li>';
					html += '<li><img class="star-li px-1" src="'+base_url+'assets/guided_projects/images/star-fill.png" alt="star-ratting"></li>';
					html += '<span style="color: #666;" class="star-span px-1 ">(3200)</span><br>';
					html += '</ul>';


					html += '<br><br>';
					html += '<p class="mt-2">';
					html += '<span class="mr-2"><img class="mr-1" src="'+base_url+'assets/guided_projects/images/guided-icons3.png" alt="arrow-right">'+row.duration+' Hrs.</span>';
					html += '<span class="mr-2"><img class="mr-1" src="'+base_url+'assets/guided_projects/images/guided-level.png" alt="arrow-right">'+row.complexity+'</span>';
					html += '<span class="mr-2"><img class="mr-1" src="'+base_url+'assets/guided_projects/images/guided-icons1.png" alt="arrow-right">'+row.Currency+' '+row.approves_price+'</span>';
					html += '</p>';
					html += '</div>';
					html += '</div>';
					html += '</a>';
					html += '</div>';
					
						
				}); 
			}
			else
				html+="<tr><td>No Results Found..</td></tr>";
			$('#show_data').html(html);
			$('#pagination').html(data.pagination);
		}
	});
}


function display_projects_preivew(last_id){
	
	$.ajax({
		url : base_url+"Welcome_API/get_project_view",
		type : "POST",
		data : {'projectId': last_id},
		success : function(data){
			
			var data = $.parseJSON(data);
			
			if(data.err == 1){ //fruits.length
				var data_details = data.project;
				var project_details = data_details[0];
				var projectTitle = project_details.projectTitle;
				var projectId = project_details.projectId;
				var html = '';
				var milestones = data_details[1];
				
				html += '<div class="treeview-colorful w-20 border border-secondary mx-4 my-4">';
				html += '<ul class="treeview-colorful-list mb-3">';
				html += '<li class="treeview-colorful-items">';
				html += '<a class="treeview-colorful-items-header">';
				html += '<i class="fa fa-plus-circle"></i>';
				html += ' <button class="btn tree_btn tree_project" onClick="get_project_data('+projectId+')">'+projectTitle+'</button>';
				html += '</a>';		  
							  
				if(milestones.length != 0){
					html += '<ul class="nested">';
					$.each(milestones, function(i){
						var miles = milestones[i];
						var miels_1 = miles[0];
						var miels_2 = miles[1];
							
						html += '<li class="treeview-colorful-items">';	
						html += '<a class="treeview-colorful-items-header">';
						if(miels_2.length > 0){	
							/*html += '<i class="fa fa-plus-circle"></i>';	*/
						}
						html += ' <button class="btn  tree_btn tree_mile_stone" onClick="get_mile_stone_data('+miels_1.miilestoneId+','+projectId+')">'+miels_1.milestonetitle+'</span></button>';	
							/*if(miels_2.length > 0){	
								html += '<ul class="nested">';	
								var xxx = 0;
								$.each(miels_2, function(i){
									var act = miels_2[i];
									var act_details = act[0];
									var refrences = act[1];									
									
									html += '<li class="treeview-colorful-items">';
									html += '<a class="treeview-colorful-items-header">';
									if(refrences.length > 0){
										html += '<i class="fa fa-plus-circle"></i>';
									}

									if(xxx == 0){
										html += ' <button class="btn  tree_btn tree_activities" id="open_trigger" onClick="get_activity_details('+act_details.actvityId+')" >'+act_details.activity_title+' </button></a>';
									}
									else{
										html += ' <button class="btn  tree_btn tree_activities" onClick="get_activity_details('+act_details.actvityId+')" >'+act_details.activity_title+' </button></a>';
									}
									xxx = xxx + 1;
										if(refrences.length > 0){
											html += '<ul class="nested">';
											$.each(refrences, function(i){
												var reff = refrences[i];
												html += '<li>';
												html += ' <button class="btn  tree_btn tree_refrences" onClick="get_refrences('+reff.referenceId+')"  > '+reff.refrencetitle+'</button>';
												html += '</li>';
											});	
											html += '<li>';
											html += '</li>';
											html += '</ul>';		
										}									
									html += '</li>';
									
									
								});
								
							
								html += '</ul>';
							} */
						html += '</li>';	
												
					})	 

					html += '</ul>';					
				}
				
				html += '</li>'; 
				html += '</ul>';
				html += '</div>';
				
				$('#tree_view_display').html(html);
				$('#section_project').show();
				
				//$('.treeview-colorful').mdbTreeview();
				//common_actions();
			}
			else{
				alertify.notify('Something went wrong ..'); 
			}
		}
	})	
	
			
	$('#project_creation_form').show();
	$('#cancel_project_btn').show();	
	get_project_data(projectId);	
	 
}




function common_actions(){
	
	$('.tree_project').click(function(){
		$('#project_creation_form').fadeIn();
		$('#milestones_creation_form').hide();
		$('#activity_creation_form').hide();
		$('#refrence_creation_form').hide();
		scroll_top();	
	})
	$('.tree_mile_stone').click(function(){
		$('#activity_creation_form').hide();
		$('#project_creation_form').hide();
		$('#refrence_creation_form').hide();
		$('#milestones_creation_form').fadeIn();
		scroll_top();	
	})
	$('.tree_activities').click(function(){
		$('#project_creation_form').hide();
		$('#milestones_creation_form').hide();
		$('#refrence_creation_form').hide();
		$('#activity_creation_form').fadeIn();
		scroll_top();	
	})
	
	$('.tree_refrences').click(function(){
		$('#project_creation_form').hide();
		$('#milestones_creation_form').hide();
		$('#activity_creation_form').hide();
		$('#refrence_creation_form').fadeIn();
		$('#preview_cards_div').hide();
		scroll_top();	
	})
	
	$('.tree_project').trigger('click');
	$('.tree_mile_stone').trigger('click');
	$('#open_trigger').trigger('click');
	$('.tree_project').trigger('click');
	$('.tree_project').trigger('click');
	get_project_data(projectId);	
}

function scroll_top(){
	//$('#project_template').animate({ scrollTop: 0 }, 'slow', function () {
    //});
}

function show_delete(){
	$('.common_delete_btn').each(function(){
		$(this).show();
	})
}



function get_project_data(projectId){
	$.ajax({
		url : base_url+"Welcome_API/get_project_data_by_id",
		type : "POST",
		data : {'projectId': projectId},
		success : function(data){
		var data = $.parseJSON(data);
		$('#projectTitle').html(data.projectTitle);
		//$('#complexity').html(data.complexity);
		//$('#category').html(data.category);
		$('#skills').html(data.skills);
		$('#project_description').html(data.project_description);
		}
	});	
}


function get_mile_stone_data(milestone_data, projectId){
	$.ajax({
		url : base_url+"Welcome_API/get_mile_stone_data",
		type : "POST",
		data : {'milestone_data': milestone_data},
		success : function(data){
		var data = $.parseJSON(data);
		$('#m_milestonetitle').html(data.milestonetitle);
		$("#m_description").html(data.description);
		}
	});
}

function get_activity_details(actvityId){
	$.ajax({
			url : base_url+"Welcome_API/get_activity_data",
			type : "POST",
			data : {'actvityId': actvityId},
			success : function(data){
			var data = $.parseJSON(data);
			$('#a_activity_title').html(data.activity_title);
			$('#a_duration').html(data.duration);
			$('#a_months_weeks_days').html(data.months_weeks_days);
			$('#a_tags').html(data.tags);
			$("#a_description").html(data.description);
			}
		});
}

function get_refrences(referenceId){
			
	$.ajax({
			url : base_url+"Welcome_API/get_refrence_data",
			type : "POST",
			data : {'referenceId': referenceId},
			success : function(data){
			var data = $.parseJSON(data);	
			var target = data.refrence_link;
			$.ajax({
			  url: "https://api.linkpreview.net",
			  dataType: 'jsonp',
			  data: {q: target, key: '5a2e292e7d25bb63a2d3b4c63524cd10abe39420dc68c'},
			  success: function (response) {
				  
				var html = '';
				html += '<div class="row">';
				html += '<div class="col-md-4">	';
				html += '<img src="'+response.image+'" class="preview_img">';
				html += '</div>';
				html += '<div class="col-md-8">';	
				var des = response.description;
				var substr = des.substring(0, 75);
				var para_substr = des.substring(0, 30);
				html += '<h3 class="preivew_title">'+substr+'..</h3>';	
				html += '<p class="preivew_para">'+para_substr+'..</p>	';
				html += '<a  class="preivew_link" href="'+response.url+'">';
				html += ''+response.url+'</a>';
				html += '</div>';

				html += '</div>';
									
				$('#preivew_cards').html(html);
				$('#preview_cards_div').show();
			  }
			});
		
		
			}
		});
		//$('#preview_cards_div').hide();

}
