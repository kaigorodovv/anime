function addanime() {
	var form_data = $("#form").serialize();
	console.log("add animeid");

	$.post("/addanime",form_data, function(data) {
		console.log("get data");

		$(".results").html(data);
		location="/admin";
	});
}


function dropanime(animeID) {
	if (confirm("Вы действительно хотите удалить это аниме?")) {
		$.post("/dropanime", {animeID : animeID}, function(data) {
			$("#" + animeID).html(data);
		});
	}
	
	
}

function addseries(animeID) {
	var form_data = $("#form").serialize();

	$.post("/addseries",form_data, function(data) {
		console.log("get data");

		$(".results").html(data);
		location="/admin/" + animeID;
	});
}

function addseason(animeID) {
	var form_data = $("#form").serialize();

	$.post("/addseason",form_data, function(data) {
		console.log("get data");

		$(".results").html(data);
		location="/admin/" + animeID;
	});
}

function dropseries(animeID,seriesID) {
	$.post("/dropseries", {seriesID : seriesID, animeID : animeID});

}

function addFavorites (animeID, seriesID) {
	$.post("/addFavoritesSerials", {animeID : animeID, seriesID : seriesID}, function(data) {
		$("#buttonFavorits").html(data);
	});
}

function dropFavorites (animeID,seriesID) {
	$.post("/dropFavoritesSerials", {animeID : animeID, seriesID : seriesID}, function(data) {
		$("#buttonFavorits").html(data);
	});
}

function addSeen (animeID, seriesID) {
	$.post("/addSeen", {animeID : animeID, seriesID : seriesID}, function(data) {
		$("#buttonSeen").html(data);
	});
}

function dropSeen (animeID,seriesID) {
	$.post("/dropSeen", {animeID : animeID, seriesID : seriesID}, function(data) {
		$("#buttonSeen").html(data);
	});
}



function addWatchLater (animeID, seriesID) {
	$.post("/addWatchLater", {animeID : animeID, seriesID : seriesID}, function(data) {
		$("#buttonWatchLater").html(data);
	});
}

function dropWatchLater (animeID,seriesID) {
	$.post("/dropWatchLater", {animeID : animeID, seriesID : seriesID}, function(data) {
		$("#buttonWatchLater").html(data);
	});
}