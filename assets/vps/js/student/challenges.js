var cpage = 1;
$(function(){
	
	get_records(cpage);
	
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
	var search = $.trim($('#search').val());
	var internship_role = $.trim($('#role').val());
	$.ajax({
		url : base_url+"Student_API/get_challenges_pagination",
		method : "POST",
		data:{'Role':'records','skey':search,'page':page,'internship_role':internship_role},
		success:function(data){
			data = $.parseJSON(data);
			var html='';
			if(data.records!='')
			{
				var n = 1 ;
				$.each(data.records, function(i){
					var row = data.records[i];
					if(row.logo == ""){
						var image_url = base_url+'/assets/default-cmpny.jpg';
					}
					else{
						var image_url = base_url+row.logo;
					}
					//var image_url = base_url+row.logo;
					html += '<div class="col-sm-4">';
					html += '<div class="internship_card">';
					html += '<div class="row">';
					html += '<div class="col-4 col-sm-4">';
					html += '<div class="company_logo_div">';
					html += '<a class="internship_company" href="'+row.website+'" targte="_blank">';	
					html += '<img class="company_logo" src="'+image_url+'" alt="Company Logo">';
					html += '</a>';
					html += '</div>';
					html += '</div>';
					html += '<div class="col-8 col-sm-8">';
					html += '<div class="internhip_div">';
					html += '<h3 class="internship_title">'+row.Internship_title+'</h3>';
					html += '</div>';
					 
					
					
					
					html += '</div>';
					html += '</div>';
					
					if(row.team_individula == "Team"){
						html += '<span class="team_individual">'+row.team_individula+'</span> <i class="badge badge_categories">'+row.category+'</i><br>';
					}
					else{
						html += '<span class="team_individual inidi">'+row.team_individula+'</span> <i class="badge badge_skills">'+row.category+'</i><br>';
					}
					
					
					html += '<div class="row">';
					html += '<div class="col-sm-12">';
					html += '<div class="skill_badges_divs">';
					html += '<p class="enrollments_stats">Enrollments: '+row.enrollments+' <br> Apply By: '+row.apply_by+'</p>';
					html += '<br></div>';
					if(row.InternshipId == 24){
						html += '<a class="btn btn-deafult btn-km" href="'+base_url+'ibm-hack-challenge-2020" >Know More</a>';
					}
					else{
						html += '<a class="btn btn-deafult btn-km" href="'+base_url+'challenge/'+row.InternshipId+'" >Know More</a>';
					}
					
					html += '</div>';
					html += '</div>';
					html += '</div>';
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

