function addanime() {
	var form_data = $("#form").serialize();
	console.log("add animeid");

	$.post("/addanime",form_data, function(data) {
		console.log("get data");

		$(".results").html(data);
	});
}


function dropanime(animeid) {
	$.post("/dropanime", {animeid : animeid});
}

function addseries() {
	var form_data = $("#form").serialize();

	$.post("/addseries",form_data, function(data) {
		console.log("get data");

		$(".results").html(data);
	});
}

function addseason() {
	var form_data = $("#form").serialize();

	console.log("lol");

	$.post("/addseason",form_data, function(data) {
		console.log("get data");

		$(".results").html(data);
	});
}

function dropseries(animeid,seriesid) {
	$.post("/dropseries", {seriesid : seriesid, animeid : animeid});
}

function season(animeid,numberSeason) {
	$(".refrash").html("");	
	$.post("/animeserials", {numberSeason : numberSeason, animeid : animeid}, function(series) {
		if(series[0] == undefined) {
      var text = "<h3>Сезон " + numberSeason + "</h3><p>В сезоне нет серий!</p>";
     } else {
        var buttons = "<li><a onclick=\"selectionseries(\'" + series[0].path +"\'," + series[0].numberSeries + ", " + series[0].numberSeason + ")\">Серия " + series[0].numberSeries + "</a></li>";

        for(var i = 1; i<series.length; i++) {
            buttons = buttons + "<li><a onclick=\"selectionseries(\'" + series[i].path +"\'," + series[i].numberSeries + ", " + series[i].numberSeason + ")\">Серия " + series[i].numberSeries + "</a></li>";
        }


        $("#" + numberSeason).html(buttons);


        var text = "<h3 id=\"titleanime\">Сезон " + numberSeason +  " Серия " + series[0].numberSeries + "</h3>" +
     "<div><div id=\"video\">" + "<iframe src=\"" + series[0].path + "\" width=\"607\" height=\"360\" frameborder=\"0\" allowfullscreen></iframe>" +"</div>" + 
     "</div>" + "<div id=\"buttons\"><a class=\"button\" onclick=\"season()\">Добавить в избранное</a></div>";
 }

		$(".results").html(text);
	});
}

function selectionseries(puth, numberSeries, numberSeason) {
	var data = "<iframe src=\"" + puth + "\" width=\"607\" height=\"360\" frameborder=\"0\" allowfullscreen></iframe>";
	$("#video").html(data);

	var titleanime = "Сезон " + numberSeason + " Серия " + numberSeries;
	$("#titleanime").html(titleanime);
}