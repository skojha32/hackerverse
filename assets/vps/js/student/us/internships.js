var cpage = 1;
var cpage1 = 1;
$(function(){
	
	get_records(cpage);
    get_records_redieact(cpage1)
	$('#internships_search').submit(function(){
        get_records(1);
        get_records_redieact(1);
	})
	
	

	$("#remonneded_internships").on("click",'.pagination li',function(){
		cpage = $(this).attr('page');
		get_records(cpage);
    });

    $("#latest_internships").on("click",'.pagination li',function(){
        cpage1 = $(this).attr('page');
        get_records_redieact(cpage1);
    });
    

	$('#CancelBtn').click(function(){
		reset();
	});
	$('#SearchBtn').click(function(){
		get_records(cpage);
		get_records_redieact(cpage1);
	});
	$('#AddBtn').click(function(){
		$('#myModal').modal('show');
	});
});

function get_records(page)
{
	var search = $.trim($('#search').val());
    var internship_type = $.trim($('#type').val());
    var Location = $.trim($('#Location').val());
    var stipend = $.trim($('#stipend').val());
    var duration = $.trim($('#duration').val());
    

	$.ajax({
		url : base_url+"Student_API/get_internships_pagination_us",
		method : "POST",
		data:{'Role':'records','skey':search,'page':page,'internship_type':internship_type,'Location':Location,'stipend':stipend,'duration':duration},
		success:function(data){
			data = $.parseJSON(data);
			var html='';

            html += '<div class="col-sm-12 col-md-6 col-lg-4">';
            html += '<div class="internship_card">';
            html += '<div class="row">';
            html += '<div class="col-5 col-sm-5">';
            html += ' <div class="company_logo_div"><a class="internship_company" href="https://www.thesmartbridge.com" targte="_blank"><img class="company_logo"';
            html += ' src="https://smartinternz.com/images/company_logos/thumbs/1581348858SmartBridge_Logo_W_BG.png"';
            html += 'alt="SmartBridge Educational Services Private Limited"></a></div>';
            html += '</div>';
            html += '<div class="col-7  col-sm-7" style="padding-left: 0px;">';
            html += ' <div class="internhip_div">';
            html += '<h3 class="internship_title">Global Remote Internship Program</h3>';
            html += '<span class="com-name"><a href="https://thesmartbridge.com/">SmartBridge Educational Services Private Limited</a></span><br>';
            html += '</div>'; 
            html += '</div>';
            html += '</div>';
            html += ' <div class="row">';
            html += '<div class="col-sm-12">';
            html += '<div class="skill_badges_divs">';
            html += ' <p><span>Location(s)</span> Remote</p><br>';
            html += '</div> ';
            html += '<div class="skill_badges_divs">';
            html += ' <p><span>Apply By:</span> 02/03/2021</p><br>';
            html += '</div>';
            html += '<a class="btn btn-deafult btn-km" href="'+base_url+'global-remote-internship-program">Know More';
            html += ' <img src="'+base_url+'assets/us_assets/new/code/images/arrow-right.png" alt="arrow-right"></a>';
            html += '</div>';
            html += ' </div>';
            html += '</div>';
            html += ' </div>';
			
			if(data.records!='')
			{
				var n = 1 ;
				$.each(data.records, function(i){
					var row = data.records[i];

					
                    if(row.logo == ''){
                        row.logo = 'assets/company-logo.png';
                    }
                    var image_url = base_url+row.logo;
                    
                    if(row.re_redirect_link != ''){
                        row.website = row.re_website;
                        row.CompanyName = row.re_company_name;
                    }

                    html += '<div class="col-sm-12 col-md-6 col-lg-4">';
                    html += '<div class="internship_card">';
                    html += '<div class="row">';
                    html += '<div class="col-5 col-sm-5">';
                    html += ' <div class="company_logo_div"><a class="internship_company" href="'+row.website+'" targte="_blank"><img class="company_logo"';
                    html += ' src="'+image_url+'"';
                    html += 'alt="'+row.CompanyName+'"></a></div>';
                    html += '</div>';
                    html += '<div class="col-7  col-sm-7" style="padding-left: 0px;">';
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
                    var apply_by = new Date(row.apply_by);
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                    ];
                    
                    const d = new Date(apply_by);
                    var month = monthNames[d.getMonth()];
                    var date = d.getDate();
                    var Year = d.getFullYear();
                    var final_date_formate = date+' '+month+', '+Year;

                    html += ' <p><span>Apply By:</span> '+final_date_formate+'</p><br>';
                    html += '</div>';
                    var date1 = new Date(row.apply_by);
                    var date2 = new Date();
                    if(date1 < date2){
                        html += '<a class="btn btn-deafult btn-km" href="'+base_url+'internship/'+row.InternshipId+'">Know More';
                        html += ' <img src="'+base_url+'assets/us_assets/new/code/images/arrow-right.png" alt="arrow-right"></a>';
                    }else{
                        html += '<a class="btn btn-deafult btn-km" href="'+base_url+'internship/'+row.InternshipId+'">Know More';
                        html += ' <img src="'+base_url+'assets/us_assets/new/code/images/arrow-right.png" alt="arrow-right"></a>';
                    }
                   
                    html += '</div>';
                    html += ' </div>';
                    html += '</div>';
                    html += ' </div>';



			
			
				});
			}
			else
				html+="";
			$('#show_data').html(html);
            $('#pagination').html(data.pagination);
          
		}
	});
}



function get_records_redieact(page)
{
	var search = $.trim($('#search').val());
    var internship_type = $.trim($('#type').val());
    var Location = $.trim($('#Location').val());
    var stipend = $.trim($('#stipend').val());
    var duration = $.trim($('#duration').val());
    

	$.ajax({
		url : base_url+"Student_API/get_internships_pagination_us_rediestcts",
		method : "POST",
		data:{'Role':'records','skey':search,'page':page,'internship_type':internship_type,'Location':Location,'stipend':stipend,'duration':duration},
		success:function(data){
			data = $.parseJSON(data);
			var html='';

            
			
			if(data.records!='')
			{
				var n = 1 ;
				$.each(data.records, function(i){
					var row = data.records[i];

					
                    if(row.logo == ''){
                        row.logo = 'assets/company-logo.png';
                    }
                    var image_url = base_url+row.logo;
                    
                    if(row.re_redirect_link != ''){
                        row.website = row.re_website;
                        row.CompanyName = row.re_company_name;
                    }

                    html += '<div class="col-sm-12 col-md-6 col-lg-4">';
                    html += '<div class="internship_card">';
                    html += '<div class="row">';
                    html += '<div class="col-5 col-sm-5">';
                    html += ' <div class="company_logo_div"><a class="internship_company" href="'+row.website+'" targte="_blank"><img class="company_logo"';
                    html += ' src="'+image_url+'"';
                    html += 'alt="'+row.CompanyName+'"></a></div>';
                    html += '</div>';
                    html += '<div class="col-7  col-sm-7" style="padding-left: 0px;">';
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
                    var apply_by = new Date(row.apply_by);
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                    ];
                    
                    const d = new Date(apply_by);
                    var month = monthNames[d.getMonth()];
                    var date = d.getDate();
                    var Year = d.getFullYear();
                    var final_date_formate = date+' '+month+', '+Year;

                    html += ' <p><span>Apply By:</span> '+final_date_formate+'</p><br>';
                    html += '</div>';
                    var date1 = new Date(row.apply_by);
                    var date2 = new Date();
                    if(date1 < date2){
                        html += '<a class="btn btn-deafult btn-km" href="'+base_url+'internship/'+row.InternshipId+'">Know More';
                        html += ' <img src="'+base_url+'assets/us_assets/new/code/images/arrow-right.png" alt="arrow-right"></a>';
                    }else{
                        html += '<a class="btn btn-deafult btn-km" href="'+base_url+'internship/'+row.InternshipId+'">Know More';
                        html += ' <img src="'+base_url+'assets/us_assets/new/code/images/arrow-right.png" alt="arrow-right"></a>';
                    }
                   
                    html += '</div>';
                    html += ' </div>';
                    html += '</div>';
                    html += ' </div>';



			
			
				});
			}
			else
				html+="";
            $('#show_data1').html(html);
            $('#pagination1').html(data.pagination);
		}
	});
}
