function getPolls() {
	$.ajax({
		url: '/polls',
		method: 'GET',
		headers: {
			'x-access-token': getToken()
		},
		success: function(response) {
			//alert(JSON.stringify(response));
			renderPolls(response, '#home');
		},
		error: function(response) {
			if(response.status == 401 || response.status == 403)
			{
				window.location.href = "/users/logout";
			}
		}
	});
}


$(document).ready(function() {
    loadNavbar();
    $('#nav-home').addClass('active');
	//alert(getToken());
	getPolls();
	
	$(document).on('submit', '#vote-form', function(e) {
		e.preventDefault();
		var pollID = $(this).find('input').val();
		var option = $('#select-' + pollID + ' option:selected').val();
		var data = {pollID: pollID, option: option};
		//alert(JSON.stringify(data));
		$.ajax({
			url: '/vote',
			method: 'POST',
			data: data,
			headers: {
				'x-access-token': getToken()
			},
			success: function(response)
			{
				alert(response);
				window.location.href = "/homepage";
			},
			error: function(response)
			{
				if(response.status == 401 || res.status == 403)
				{
					window.location.href = "/users/logut";
				}
			}
		});
	});
});
