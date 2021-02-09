var cpage = 1;
$(function(){
	
	get_records(cpage);
	
	$('#internships_search').click(function(){
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
		url : base_url+"Welcome_API/get_gurucool_projects",
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

                    html += '<div class="col-sm-12 col-md-6 col-lg-4">';
                    html += '<div class="internship_card">';
                    html += '<div class="row">';
                    html += '<div class="col-12 col-sm-12">';
                    html += '<div class="internhip_div">';
                    html += '<h3 class="internship_title mb-3">'+row.projectTitle+'</h3>';
                    html += '<span class="com-name"><a href="#">'+row.complexity+'</a></span><br>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '<div class="row">';
                    html += '<div class="col-sm-12">';
                    html += '<div class="skill_badges_divs">';
                    html += '<p><span>Technology: </span> '+row.category+'</p><br>';
                    html += '</div>';
                    html += '<div class="skill_badges_divs">';
                    html += '<p><span>Business Sector: </span> '+row.subcategory+'</p><br>';
                    html += '</div>';
                    html += '<div class="btn-class"><a href="#"><button class="btn btn-aws btn-km" >Enroll</button> <img class="know-btn" src="'+base_url+'aws/images/know-more.png" alt="know-more"></a></div>';
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

