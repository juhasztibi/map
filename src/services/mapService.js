class mapService {

  constructor(mapElement, callback, placeObject, radius) {
    this.mapElement = mapElement;
    this.callback = callback;
    this.placeObject = placeObject;
    this.radius = radius;
    this.map;
    this.markers = [];
    this.infowindows = [];
  }

  dispatchResult = (result, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      this.displayMarkers(result);
      this.callback(result);
    }
  }

  createMap = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        let userLocation = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        this.map = new window.google.maps.Map(this.mapElement, {
          center: {lat: position.coords.latitude, lng: position.coords.longitude},
          zoom: 14
        });

        let request = {
          location: userLocation,
          radius: this.radius,
          type: [this.placeObject]
        };

        let service = new window.google.maps.places.PlacesService(this.map);
        service.nearbySearch(request, this.dispatchResult);

      });
    } else {
      new window.google.maps.Map(this.mapElement, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 14
      });
    }
  }

  displayMarkers = (markers) => {
    this.deleteMarkers();
    markers.forEach((place) => {
      let infowindow = new window.google.maps.InfoWindow({
        content: place.title
      });
      let marker = new window.google.maps.Marker({
        position: place.geometry.location,
        map: this.map,
        title: 'Click to zoom'
      });
      marker.addListener('click', function() {
        this.closeInfoWindows();
        infowindow.open(this.mapElement, marker);
      }.bind(this));
      this.infowindows.push(infowindow);
      this.markers.push(marker);
    });
  }

  deleteMarkers = () => {
    this.markers.map(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  closeInfoWindows = () => {
    this.infowindows.map(infowindow => {
      infowindow.close();
    });
  }

}

export default mapService;
