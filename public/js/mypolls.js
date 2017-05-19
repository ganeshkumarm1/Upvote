$(document).ready(function() {
	loadNavbar();
	$('#nav-polls').addClass('active');

	var token = getToken();
	$.ajax({
		url: '/polls/mypolls',
		method: 'GET',
		headers: {
			'x-access-token': token
		},
		success: function(response) {
			//alert(JSON.stringify(response));
			renderPolls(response, '#mypolls');
		},
		failure: function(response) {
			if(response.status == 401 || response.status == 403)
			{
				window.location.href = "/users/logout";
			}
		}
	});

	$(document).on('click', '.delete', function() {
		var pollID = $(this).parent().children('input').val();
		$.ajax({
			url: '/polls',
			method: 'DELETE',
			headers: {
				'x-access-token': getToken()
			},
			data: {pollID: pollID},
			success: function(response) {
				alert(response);
				window.location.href = "/pollspage";
			},
			error: function(response) {
				if(response.status == 401 || response.status == 403)
				{
					window.location.href = "/users/logout";
				}
			}
		})
	});
});