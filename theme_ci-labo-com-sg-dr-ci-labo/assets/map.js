var map;
var service;
var store;
var polyline;
var directionsService;
var directionsDisplay;
var storeMarker;
function initMap() {
    var styledMapType = new google.maps.StyledMapType([{
        "elementType": "geometry",
        "stylers": [{
            "color": "#f5f5f5"
        }]
    }, {
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#616161"
        }]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#f5f5f5"
        }]
    }, {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#bdbdbd"
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#eeeeee"
        }]
    }, {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#757575"
        }]
    }, {
        "featureType": "poi.attraction",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.business",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "poi.business",
        "elementType": "labels.icon",
        "stylers": [{
            "saturation": -100
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "color": "#e5e5e5"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#9e9e9e"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ffffff"
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#757575"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
            "color": "#dadada"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#616161"
        }]
    }, {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#9e9e9e"
        }]
    }, {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
            "color": "#e5e5e5"
        }]
    }, {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
            "color": "#eeeeee"
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#c9c9c9"
        }]
    }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#9e9e9e"
        }]
    }],{
        name: 'Styled Map'
    });
    store = {
        lat: 1.304086,
        lng: 103.831912
    };
    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 16,
        center: store,
        disableDefaultUI: true
    });
    storeMarker = new google.maps.Marker({
        position: store,
        icon: 'https://cdn.shopify.com/s/files/1/2245/1865/t/9/assets/icon--black-location.png?2367389970378045577'
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    storeMarker.setMap(map);
    service = new google.maps.places.PlacesService(map);
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions( { suppressMarkers: true } );
		var locationInput =	document.getElementById('location')
		var searchBox = new google.maps.places.Autocomplete(locationInput, {
		  componentRestrictions: {country: 'SG'}
		});

    document.getElementById('search').addEventListener('click', function(){
    	var request = {
          location: store,
          radius: '500',
          query: locationInput.value
      };
      service.textSearch(request, searchPlace);
    });
    document.getElementById('getMyDirection').addEventListener('click', function(){
      getDirectionFromNavigator();
    });
}

function searchPlace(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        directionRouter(results[0].geometry.location.lat(), results[0].geometry.location.lng());
    } else {
      console.log(status);
      alert('Internet Error');
    }
}

function directionRouter(origin_lat, origin_lng){
	var request = {
    origin: new google.maps.LatLng({lat: origin_lat,lng: origin_lng}),
    destination: new google.maps.LatLng(store),
    travelMode: 'WALKING',
    region: 'SG'
  };

  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
    else {
      alert("Sorry, can't find route");
    }
  })
}

function getDirectionFromNavigator(){
	if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      directionRouter(position.coords.latitude, position.coords.longitude);

    }, function() {
      alert('Error: The Geolocation service failed.');
    });
  } else {
    // Browser doesn't support Geolocation
    alert("Error: Your browser doesn\'t support geolocation.");
  }
}


