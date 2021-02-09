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
    var internship_role = $.trim($('#internship_role').val());
    var challenge_type = $.trim($('#type').val()); 
    var Location = $.trim($('#Location').val());
    
	$.ajax({
		url : base_url+"Student_API/get_challenges_pagination",
		method : "POST",
		data:{'Role':'records','skey':search,'page':page,'internship_role':internship_role,'challenge_type':challenge_type,'Location':Location},
		success:function(data){
			data = $.parseJSON(data);
			var html='';
			if(data.records!='')
			{
				var n = 1 ;
				$.each(data.records, function(i){
					var row = data.records[i];
					
                    //var image_url = base_url+row.logo;
                    
					if(row.InternshipId == 24){
						image_url = base_url+'images/company_logos/thumbs/1588652456Untitled_design.png';
						row.enrollments = 12196;
					}
					else if(row.InternshipId == 35){
						//html += '<a class="btn btn-deafult btn-km" href="'+base_url+'godaddy-web-build-a-thon">Know More';
						var image_url = base_url+'assets/godaddyAcademia.png'; //blueprism.png
						row.enrollments = 7329;
					}
					else if(row.InternshipId == 34){
						image_url = base_url+'images/company_logos/thumbs/1588652456Untitled_design.png';
						row.enrollments = 12196;
					}
					else if(row.InternshipId == 36){
						//html += '<a class="btn btn-deafult btn-km" href="https://smartinternz.com/rpa-build-a-thon">Know More';
						var image_url = base_url+'assets/blueprism.png'; //blueprism.png
						row.enrollments = 680;
					}
					else{
						if(row.logo == ""){
							var image_url = base_url+'/assets/default-cmpny.jpg';
						}
						else{
							var image_url = base_url+row.logo;
						}
					}


                    html += '<div class="col-sm-12 col-md-6 col-lg-4">';
                    html += '<div class="internship_card">';
                    html += '<div class="row">';
                    html += '<div class="col-4 col-sm-4">';
                    html += ' <div class="company_logo_div"><a class="internship_company" href="'+row.website+'" targte="_blank"><img class="company_logo"';
                    html += ' src="'+image_url+'"';
                    html += 'alt="'+row.CompanyName+'"></a></div>';
                    html += '</div>';
                    html += '<div class="col-8  col-sm-8" style="padding-left: 0px;">';
                    html += ' <div class="internhip_div">';
                    html += '<h3 class="internship_title">'+row.Internship_title+'</h3>';
                    html += '<span class="com-name"><a href="'+row.website+'">'+row.CompanyName+'</a></span><br>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += ' <div class="row">';
                    html += '<div class="col-sm-12">';
                    html += '<div class="skill_badges_divs">';
                    if(row.Location == ''){ row.Location = "Remote"}
                    html += ' <p><span>Location(s)</span> '+row.Location+'</p><br>';
                    html += '</div> ';
                    html += '<div class="skill_badges_divs">';
                    html += ' <p><span>Enrollment:</span> '+row.enrollments+'</p><br>';
                    html += '</div>';
                    html += '<div class="skill_badges_divs">';
                    html += ' <p><span>Apply By:</span> '+row.apply_by+'</p><br>';
					html += '</div>';
					if(row.InternshipId == 24){
						html += '<a class="btn btn-deafult btn-km" href="'+base_url+'ibm-hack-challenge-2020">Know More';
					}
					else if(row.InternshipId == 35){
						html += '<a class="btn btn-deafult btn-km" href="'+base_url+'godaddy-web-build-a-thon">Know More';
					}
					else if(row.InternshipId == 34){
						html += '<a class="btn btn-deafult btn-km" href="'+base_url+'gurucool">Know More';
					}
					else if(row.InternshipId == 36){
						html += '<a class="btn btn-deafult btn-km" href="https://smartinternz.com/rpa-build-a-thon">Know More';
					}
					else{
						html += '<a class="btn btn-deafult btn-km" href="'+base_url+'challenge/'+row.InternshipId+'">Know More';
					}
                   
                    html += ' <img src="'+base_url+'assets/us_assets/new/code/images/arrow-right.png" alt="arrow-right"></a>';
                    html += '</div>';
                    html += ' </div>';
                    html += '</div>';
                    html += ' </div>';
                    			
				});
			}
			else
				html+="<tr><td>No Results Found..</td></tr>";
			$('#show_data').html(html);
			$('#pagination').html(data.pagination);
		}
	});
}

