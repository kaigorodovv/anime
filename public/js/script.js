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

	$.post("/addseries",form_data);
}


function addformseries() {
	var numberSeries = $("#animeseries").val();
	console.log(numberSeries);

	var a = "<p><label for=\"numberSeries\">Номер серии:</label></p>"+
		"<p><input id=\"numberSeries\" name=\"numberSeries\" size = \"80\" value\"\" type=\"text\"></p>"+

		"<p><label for=\"path\">Путь к видео:</label></p>"+
		"<p><input id=\"path\" name=\"path\" size = \"80\" value=\"\" type=\"text\"></p>"


	for(var i = 0; i<numberSeries; i++) {
	
	a+=a;

	console.log(a);

	}

	$("#form2").html(a);

}
