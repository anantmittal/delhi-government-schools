'use strict';

angular.module('socialcops').controller(
		'DelhiReportCtrl',
		function($scope, $state, $http) {

		$scope.$state = $state;

		$http.get("../../data/list-of-schools.json").then(function(response) {

			var input = document.getElementById('locationTextField');
        	var autocomplete = new google.maps.places.Autocomplete(input);
        	autocomplete.addListener('place_changed', function() {
        			var place = autocomplete.getPlace();
        			var lat = place.geometry.location.lat();
					var lng = place.geometry.location.lng();
					map.setView(new L.LatLng(lat, lng), 15);
        	});
			
			var school_data = response.data;

			function onEachFeatureSchool(feature, layer) {
				
				var html_for_popup = '<div>'
					+'<p>'+layer.feature.properties.SchoolName +'</p>'
					+'<p><button type="button" ng-click="getSchoolIdForPrashant('+layer.feature.properties.SchoolID+')" class="btn btn-success">Interested in Volunteering?</button></p>'
				+ '</div>';

				var link = $(html_for_popup).click(function() {
				    console.log("School ID"+layer.feature.properties.SchoolID);
				})[0];
				
				layer.bindPopup(link,{keepInView:true});
			}

			var geojson;

			var school = L.control();

			var map = L.map('map', {
				center : [28.6456024, 77.21110499999998 ],
				zoom : 10,
				zoomControl : true,
				scrollWheelZoom : true,
				dragging : true,
				touchZoom : false,
				doubleClickZoom : true
			});

			map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));
			
		
			var schooljson = L.geoJson(school_data, {
				onEachFeature : onEachFeatureSchool
			}).addTo(map);

		});
});