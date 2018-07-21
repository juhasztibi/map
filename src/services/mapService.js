import React from "react";
import ReactDOMServer from "react-dom/server";
import foursquare from "./foursquare";

class mapService {

  constructor(mapElement, callback, placeObject, radius) {
    this.mapElement = mapElement;
    this.callback = callback;
    this.placeObject = placeObject;
    this.radius = radius;
    this.map = null;
    this.markers = [];
    this.infowindows = [];
    this.foursquare = new foursquare();
  }

  dispatchResult = (result, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      this.displayMarkers(result);
      this.callback(result);
    }
  }

  createMap = () => {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.initWithLocation, this.initDefaultMap);
    }
  }

  initWithLocation = (position) => {
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
  }

  initDefaultMap = () => {
    this.map = new window.google.maps.Map(this.mapElement, {
      center: {lat: 40.758896, lng: -73.985130},
      zoom: 14
    });

    let userLocation = new window.google.maps.LatLng(40.758896, -73.985130);

    let request = {
      location: userLocation,
      radius: this.radius,
      type: [this.placeObject]
    };

    let service = new window.google.maps.places.PlacesService(this.map);
    service.nearbySearch(request, this.dispatchResult);
  }

  displayMarkers = (markers) => {

    this.deleteMarkers();

    if (markers.length) {
      markers.forEach((place) => {

        let infowindow = new window.google.maps.InfoWindow({
          content: place.name
        });

        let marker = new window.google.maps.Marker({
          position: place.geometry.location,
          id: place.id,
          map: this.map
        });

        marker.addListener('click', function() {
          this.closeInfoWindows();

          infowindow.setContent("Loading...");

          this.createContent(place.geometry.location).then(response => {
            if (response.meta.code === 200) {
              infowindow.setContent(this.renderInfowindowView(response));
            } else {
              infowindow.setContent("An error occured, please try it again later.");
            }
          }).catch(err => {
            infowindow.setContent("An error occured, please try it again later.");
          });

          infowindow.open(this.mapElement, marker);
          this.map.panTo(marker.getPosition());

        }.bind(this));

        this.infowindows.push(infowindow);
        this.markers.push(marker);
      });
    }

    if (this.markers.length) {
      this.map.panTo(this.markers[0].getPosition());
    }

  }

  deleteMarkers = () => {
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];
  }

  closeInfoWindows = () => {
    this.infowindows.map(infowindow => infowindow.close());
  }

  openInfoWindow = (placeId) => {
    let currentMarker = this.markers.find(element => element.id === placeId);

    if (currentMarker) {
      this.map.panTo(currentMarker.getPosition());
      window.google.maps.event.trigger(currentMarker, 'click');
    }
  }

  createContent = async (placeCoordinates) => {
    const placeDetails = await this.foursquare.getPlaceInfo(placeCoordinates);
    const placeDetailsJson = await placeDetails.json();
    return placeDetailsJson;
  }

  renderInfowindowView = (placeDetails) => {

    const title = placeDetails.response.venues["0"].name;
    const category = placeDetails.response.venues["0"].categories["0"].name;
    const address = placeDetails.response.venues["0"].location.formattedAddress;
    const {checkinsCount, tipCount, usersCount, visitsCount} = placeDetails.response.venues["0"].stats;
    const verified = placeDetails.response.venues["0"].verified;
    const hereNow = placeDetails.response.venues["0"].hereNow.summary;

    return (
      ReactDOMServer.renderToString(
        <div className="infowindow">
          <h1 className="infowindow__title">{title}</h1>
          <div className="infowindow__row">{hereNow} now</div>
          <div className="infowindow__row">
            <strong>Category:</strong> {category}
          </div>
          <div className="infowindow__row">
            <strong>Address:</strong>
            {address.map((addressline, index) => {
              return (
                <div key={index}>{addressline}</div>
              )
            })}
          </div>
          <div className="infowindow__row">
            <strong>Stats</strong>
            <div>Check-ins: {checkinsCount}</div>
            <div>Tips: {tipCount}</div>
            <div>Users: {usersCount}</div>
            <div>Visits: {visitsCount}</div>
          </div>
          <div className="infowindow__row">{verified ? "Verified place!" : "Not verified place!"}</div>
          <div className="infowindow__row infowindow__row--isLast"><img src="Powered-by-Foursquare-full-color-300.png" alt="Powered by Foursquare" /></div>
        </div>
      )
    )
  }

}

export default mapService;
