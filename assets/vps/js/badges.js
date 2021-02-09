var cpage = 1;
$(function(){
	get_records(cpage);

	$("body").on("click",'.pagination li',function(){
		cpage = $(this).attr('page');
		get_records(cpage);
	});
	
	$('#badge_search_btn').click(function(){
		get_records(cpage);
	});

	$('#badge_type').change(function(){
		get_records(cpage);
	});
	$('#tech_role').change(function(){
		get_records(cpage);
	});
	$('#tech_type').change(function(){
		get_records(cpage);
	});
	$('#price_type').change(function(){
		get_records(cpage);
	});
})

function get_records(page)
{
	var badge_type = $.trim($('#badge_type').val());
    var tech_role = $.trim($('#tech_role').val());
    var tech_type = $.trim($('#tech_type').val()); 
    var price_type = $.trim($('#price_type').val());
	var search = $.trim($('#search').val());

	$.ajax({
		url : base_url+"Welcome_API/get_all_badges",
		method : "POST",
		data:{'badge_type':badge_type,'tech_role':tech_role,'tech_type':tech_type,'price_type':price_type,'search':search,'page':page},
		success:function(data){
			data = $.parseJSON(data);
			var html='';
			if(data.records!='')
			{
				$.each(data.records, function(i){
					var row = data.records[i];
                    var badge_logo = base_url+row.badge_logo;
					var price_type = row.price_type;
					var fee = ''
					if(price_type == 'Free'){ fee = 'Free'} else{ fee = row.price+' '+row.price_currency};


					html += '<div class="col-sm-12 col-md-6 col-lg-4">';
					html += ' <div class="badge_card">';
					html += ' <div class="py-4 px-3 row">';
					html += '    <div class="col-4 col-sm-4">';
					html += '        <div class="company_logo_div"><a class="internship_company"';
					html += '                 targte="_blank"><img class="company_logo"';
					html += '                     src="'+badge_logo+'" alt="'+row.badge_title+'"></a></div>';
					html += '    </div>';
					html += '    <div class="col-8  col-sm-8" style="padding-left: 0px;">';
					html += '        <div class="internhip_div">';
					html += '       <h3 class="badge_title">'+row.badge_title+'</h3>';
					html += '       <h5 class="badge_title2">'+row.badge_type+'</h5>';
					html += '            <ul class="star-ul">';
					html += '       <ul class="star-ul">';
					html += '           <li><img class="star-li" src="'+base_url+'assets/badges/images/star-fill.png" alt="star-ratting"></a></li>';
					html += '           <li><img class="star-li" src="'+base_url+'assets/badges/images/star-fill.png" alt="star-ratting"></a></li>';
					html += '           <li><img class="star-li" src="'+base_url+'assets/badges/images/star-fill.png" alt="star-ratting"></a></li>';
					html += '           <li><img class="star-li" src="'+base_url+'assets/badges/images/star-fill.png" alt="star-ratting"></a></li>';
					html += '<li><img class="star-li" src="'+base_url+'assets/badges/images/star-fill.png" alt="star-ratting"></a></li>';
					/*html += '<span class="star-span">3200 Ratted</span><br>'; */
					html += '       </ul>';
					html += '   </div>';
					html += '</div>';
					html += '</div>';
					html += '<div class="badge-btm">';
					html += '<div class="row">';
					html += '   <div class="col-sm-12">';
					html += '       <div class="badge-pad">';
					html += '           <ul class="badges-inn">';
					html += '               <li><span><img class="star-li" src="'+base_url+'assets/badges/images/stipend.png"';
					html += '               <li><span></span> '+fee+'</li>';
					html += '               <li><span><img class="star-li" src="'+base_url+'assets/badges/images/badge-inn2.png"';
					html += '                           alt="star-ratting"></span> '+row.duration+' Hrs</li>';
					html += '           </ul>';
					html += '           <ul class="badges-inn">';
					html += '               <li><span><img class="star-li" src="'+base_url+'assets/badges/images/badge-inn3.png"';
					html += '                           alt="star-ratting"></span> 1 Project</li>';
					html += '               <li><span><img class="star-li" src="'+base_url+'assets/badges/images/badge-inn4.png"';
					html += '                           alt="star-ratting"></span> Certificate</li>';
					html += '           </ul>';
					html += '       </div>';
					html += '   </div>';
					html += '</div>';
					html += '<div class="badge-btm2">';
					html += '   <div class="row">';
					html += '       <div class="col">';
					html += '           <span><img class="px-1" src="'+base_url+'assets/badges/images/badge-inn5.png"';
					html += '                   alt="arrow-right">Tech Stack - '+row.tech_stack+'</span>';
					html += '       </div>';
					html += '       <div class="col">';
					html += '           <a class="btn btn-deafult badge-btn" ';
					html += '               href="'+base_url+'badge/'+row.badge_id+'">Know More ';
					html += '               <img src="'+base_url+'assets/badges/images/arrow-right.png" alt="arrow-right"></a>';
					html += '       </div>';
					html += '   </div>';
					html += ' </div>';
					html += '</div>';
                    html += '</div>';
					html += '</div>';


				});
			}
			else{
			html+="<b>No Badges Found</b>";
			}
			$('#show_data_append').html(html);
			$('#pagination').html(data.pagination);
		}
	});


}
