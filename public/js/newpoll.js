
function validate(optionArray)
{
	var len = 0;
	for(var i = 0; i < optionArray.length; i ++)
	{
		if(optionArray[i] != "")
			len ++;
	}
	if(len <= 1)
	{
		alert("Add atleast two options");
		return false;
	}
	return true;
}

function removeEmptyOptions(optionArray)
{
	var list = [];
	for(var i = 0; i < optionArray.length; i ++)
	{
		if(optionArray[i] != "")
			list.push({option:optionArray[i].trim(), votes: 0});
	}
	return list;
}

function containsDuplicate(optionArray)
{
	optionArray = String.prototype.toLowerCase.apply(optionArray).split(",");
	var optionArray = optionArray.slice().sort();
	for(var i = 0; i < optionArray.length - 1; i ++)
	{
		if(optionArray[i] == optionArray[i + 1])
		{
			alert('Options cannot contain duplicate values');
			return true;
		}
	}
	return false;
}

function addPoll()
{
	$('#newpoll-form').on('submit', function(e) {
		e.preventDefault();
		var title = $('#title').val();
		var options = $('#options').val();
		var isValid = validate(options.split(','));
		var hasDuplicate = containsDuplicate(options.split(','))
		if(isValid && !hasDuplicate)
		{
			var data = {
				question: title,
				pollOptions: JSON.stringify(removeEmptyOptions(options.split(',')))
			};
			$.ajax({
				url: '/polls',
				method: 'POST',
				data: data,
				headers: {
					'x-access-token': getToken()
				},
				success: function(response)
				{
					alert(response);
					window.location.href="/newpoll";
				},
				error: function(response)
				{
					if(response.status == 401 || response.status == 403)
					{
						window.location.href = "/users/logout";
					}
				}
			});
		}
	});
}

$(document).ready(function() {
	loadNavbar();
	$('#nav-newpoll').addClass('active');
	addPoll();
})