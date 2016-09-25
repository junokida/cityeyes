// Author: Renato Jun Okida
//GLOBAL Vars
var loc = {};

//CONSTANTS
var GEOCODER,
	DEFAULT_STATUS = "@governosp",
	DEFAULT_PROFILES = "jun_okida",
	SUB_PREFEITURAS = [
		['Casa Verde','@SubCasaVerde'],
		['Cachoeirinha','@SubCasaVerde'],
		['Limão','@SubCasaVerde'],
		['Freguesia do Ó','@SubprefeituraFO'],
		['Brasilândia','@SubprefeituraFO'],
		['Santo Amaro','@SubSantoAmaro'],
		['Sé','@subprefeiturase'],
		['Centro','@subprefeiturase'],
		['Vila Maria','@Sub_MG'],
		['Vila Guilherme','@Sub_MG'],
		['Jabaquara','@subjabaquara'],
		['Vila Mariana','@subvilamariana'],
		['Jaçanã','@subjt'],
		['Tremembé','@subjt'],
		['Lapa','@SubLapa'],
		['Vila Prudente','@subpsb'],
		['Parque São Lucas','@subpsb'],
		['Sapopemba','@subpsb']
	],
	MAX_CHARACTERS = 140,
	PIC_CHARACTERS = 23;

//FUNCTIONS----------------------------------------------
function initialize() {
	navigator.geolocation.getCurrentPosition(function(event){
		GEOCODER = new google.maps.Geocoder();
		
		loc.lat = event.coords.latitude;
		loc.lng = event.coords.longitude;

		//LOCATION BY LAT/LON
		// var latlng = new google.maps.LatLng(loc.lat, loc.lng);
		
		// document.getElementById('lat').value = loc.lat;
		// document.getElementById('lon').value = loc.lng;
		
		// GEOCODER.geocode({'latLng': latlng}, function(results, status) {
		// 	if(status == google.maps.GeocoderStatus.OK) {
		// 		document.getElementById('address_field').value = results[0].address_components[1].short_name + ", " + results[0].address_components[0].short_name +", "+ results[0].address_components[2].short_name +" - "+ results[0].address_components[5].short_name;
				
		// 		document.getElementById('status').value = DEFAULT_STATUS;
				
		// 		$('#at_profilles_field').html(DEFAULT_PROFILES);
				
		// 		console.log(results[0]);
		// 		for(var i=0; i<SUB_PREFEITURAS.length; i++){
		// 			if(results[0].address_components[2].long_name == SUB_PREFEITURAS[i][0]){
		// 				document.getElementById('status').value += " "+SUB_PREFEITURAS[i][1];
		// 			}
		// 		}
		// 	};
		// });

		// CONSTRUCT MAP VIEW
		var map = new google.maps.Map(document.getElementById('map_wrapper'), {
			center: {lat: loc.lat, lng: loc.lng},
			scrollwheel: true,
			zoom: 18
		});
	})	
}

function relocalize(){
	var new_address = document.getElementById('address_field').value;
	
	GEOCODER.geocode({'address': new_address}, function(results, status) {
		if(status == google.maps.GeocoderStatus.OK) {
			
			document.getElementById('lat').value = results[0].geometry.location.k;
			document.getElementById('lon').value = results[0].geometry.location.D;
			
			document.getElementById('address_field').value = results[0].address_components[1].short_name + ", " + results[0].address_components[0].short_name +", "+ results[0].address_components[2].short_name +" - "+ results[0].address_components[5].short_name;
			for(var i=0; i<SUB_PREFEITURAS.length; i++){
				if(results[0].address_components[2].long_name == SUB_PREFEITURAS[i][0]){
					document.getElementById('status').value += " "+SUB_PREFEITURAS[i][1];
				}
			}
		};
	});
}

function caracterCount(){
	var charactersRemaining = MAX_CHARACTERS - PIC_CHARACTERS - document.getElementById('status').value.length;
	$("#char_remaining").html(charactersRemaining);
}

function showPostView(evt){
	$('#post_view').fadeIn('medium');
	
	var files = evt.target.files;
	
	for (var i = 0, f; f = files[i]; i++) {
	
	if (!f.type.match('image.*')) {
		continue;
	}
	
	var reader = new FileReader();
	reader.readAsDataURL(f);
	
	reader.onload = function(e){
		$("#uploaded_photo").attr('src',e.target.result);
	}
	
	}
}

function showMapView(e){
	$('#post_view').fadeOut('medium', function(){
		$('#map_view').fadeIn('medium');
	});

	return false;
}

function photoTouch(e){
	$('#welcome_view').fadeOut('medium');
}

alert("OAuth");

// var oauth_keys = {};
// 	OAuth.initialize('APNp5ytCrR-jFkmNX-Q8ekK19Ms');

function initOauth(){

	//Example with Twitter with the cache option enabled
	// OAuth.popup('twitter', {cache: true}).done(function(result) {
	// 	//make API calls with `result`

	// 	oauth_keys = result;

	// 	result.me().done(function(data) {
	// 		console.log(data);
	// 	})


	// }).fail(function(err) {
	//   //todo when the OAuth flow failed
	//   console.log(err);
	//   alert(err);
	// })
	alert("touched");
}

function tweet(text){
	post = "https://api.twitter.com/1.1/statuses/update.json";
	
	// oauth_keys.post('/1.1/statuses/update.json', {
	// 	data: {
	// 		status: text
	// 	}
	// })
}

// google.load("maps", "3.x", {other_params: "sensor=false", callback:initialize});