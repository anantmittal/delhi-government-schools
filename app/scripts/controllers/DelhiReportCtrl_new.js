'use strict';

angular.module('socialcops').controller(
		'DelhiReportCtrl',
		function($scope, $state, $http) {

			$scope.$state = $state;
			
			

					var input = document.getElementById('locationTextField');
                	var autocomplete = new google.maps.places.Autocomplete(input);
                	autocomplete.addListener('place_changed', function() {
                			var place = autocomplete.getPlace();
                			var lat = place.geometry.location.lat();
        					var lng = place.geometry.location.lng();

                			console.log(place);
                			map.setView(new L.LatLng(lat, lng), 15);
                	});
					

					function style(feature) {
						return {
							fillColor : '#FFEDA0',
							weight : 2,
							opacity : 1,
							color : 'black',
							dashArray : '1',
							fillOpacity : 0.1
						};
					}

					function highlightFeature(e) {
						var layer = e.target;

						layer.setStyle({
							weight : 5,
							color : 'black',
							dashArray : '',
							fillOpacity : 0.7
						});

						if (!L.Browser.ie && !L.Browser.opera) {
							layer.bringToFront();
						}
						info.update(layer.feature.properties);
					}

					function resetHighlight(e) {
						var layer = e.target;

						layer.setStyle({
							fillColor : '#FFEDA0',
							weight : 2,
							opacity : 1,
							color : 'black',
							dashArray : '1',
							fillOpacity : 0.1
						});

						if (!L.Browser.ie && !L.Browser.opera) {
							layer.bringToFront();
						}
						info.update(layer.feature.properties);
					}

					function zoomToFeature(e) {
						//map.fitBounds(e.target.getBounds());

						var layer = e.target;
						console.log(layer.feature.properties);

						info.update(layer.feature.properties);

					}


					function onEachFeature(feature, layer) {

						layer.on({
							mouseover : highlightFeature,
							mouseout : resetHighlight,
							click : zoomToFeature
						});

						
					}
					

					var geojson;

					var info = L.control();
					

					info.onAdd = function(map) {
						this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
						this.update();
						return this._div;
					};

					// method that we will use to update the control based on feature properties passed
					info.update = function(props) {
						this._div.innerHTML = '<h4>Delhi</h4>'
								+ (props ? '<b>' + props.Name + '</b><br />'
										: 'Hover over a district');
					};
					
					
					
					var map = L.map('map', {
						center : [28.6456024, 77.21110499999998 ],
						zoom : 10,
						zoomControl : true,
						scrollWheelZoom : true,
						dragging : true,
						touchZoom : false,
						doubleClickZoom : true
						//layers: [delhimap]
					});

					map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));
					
					info.addTo(map);
					
					$http.get("../../data/AllAC.json")
				    .then(function(response) {
				        var ac_data = response.data;
				        
				      


				        var acjson = L.geoJson(ac_data, {
							style : style,
							onEachFeature : onEachFeature
						}).addTo(map);

						

				       	/*var overlayMaps = {
						    "Schools":schooljson,
						    "MCD": geojson,
						    "AC": acjson
						    
						};*/

				        //L.control.layers(baseMaps, overlayMaps).addTo(map);
				    });
					
				

		});
