function loadNavbar() {
	var content = document.querySelector('link[rel="import"]').import;
    var element = content.querySelector('.navbar');
    document.querySelector('#header').appendChild(element.cloneNode(true));

}

function getToken() {
    return $.cookie("x-access-token");
}

function getSelect(poll)
{
	var selectList = '';
	for(var i = 0; i < poll.pollOptions.length; i ++)
	{
		selectList += `<option value="${poll.pollOptions[i].option}">${poll.pollOptions[i].option}</option>`
	}
	var Select = `<div class="form-group">
						<label for="select-${poll.pollID}">Choose an option</label>
					    <select class="form-control options" required="true" id="select-${poll.pollID}">
					    ${selectList}
					    </select>
					</div>`
	return Select;
	
}

function getPanel(poll, div)
{
	var deleteButton = '';
	if(div == '#mypolls')
	{
		deleteButton = '<button type="button" class="btn btn-danger btn-block delete"><i class="fa fa-trash"></i> Delete Poll</button>'
	}
	var Select = getSelect(poll);
	var Panel = `<div class="panel panel-default">
    				<div class="panel-heading">
      					<a class="title-link" data-toggle="collapse" data-parent="#accordion" href="#${poll.pollID}">
      					<h2 class="panel-title">${poll.question}</h2>
      					</a>
    				</div>
    				<div id="${poll.pollID}" class="panel-collapse collapse row">
    					<div class="col-md-4">
							<form method="POST" class="form" id="vote-form">
								<input class="pollID" type="hidden" value="${poll.pollID}" />
								${Select}
								<button type="submit" class="btn btn-success btn-block"><i class="fa fa-hand-o-up"></i> Vote</button>
								${deleteButton}
							</form>
    					</div>
    					<div class="col-md-4 col-md-offset-2">
							<div id="chart-${poll.pollID}" class="chart"></div>
    					</div>
    				</div>
  				</div>`
  	return Panel
}


var pollsGlobal = [];

function drawChart() {
		//alert(JSON.stringify(pollsGlobal));
        for(var i = 0; i < pollsGlobal.length; i ++)
        {
        	var id = 'chart-' + pollsGlobal[i].pollID;
        	var chartData = [];
        	chartData.push(['Title', 'Votes']);
        	for(var j = 0; j < pollsGlobal[i].pollOptions.length; j ++)
        	{
        		//alert(pollsGlobal[i].pollOptions[j].votes);
        		var temp = []
        		temp.push(pollsGlobal[i].pollOptions[j].option);
        		temp.push(pollsGlobal[i].pollOptions[j].votes);
        		chartData.push(temp);
        	}
        	//alert(JSON.stringify(charData));
        	var data = google.visualization.arrayToDataTable(chartData);

	        var options = {
	          'title': pollsGlobal[i].question
	        };

	        var chart = new google.visualization.PieChart(document.getElementById(id));
	        chart.draw(data, options);
        }
}

function displayChart(polls) {
		google.charts.load("current", {packages:["corechart"]});
      	google.charts.setOnLoadCallback(drawChart);
}


function renderPolls(polls, div)
{
	pollsGlobal = polls;
	var Accordion = '<div class="panel-group row" id="accordion">'
	for(var i = 0; i < polls.length; i ++)
	{
		Accordion += getPanel(polls[i], div);
	}
	Accordion += '</div>';
	$(div).append(Accordion);
	displayChart(polls);
}
