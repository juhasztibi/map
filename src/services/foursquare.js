import fetch from 'unfetch';

class foursquare {

  constructor() {
    this.clientId = "WDWY2G5BYDZMCC15I1W5JO0TIFYA4FBEIKQ2S5CZV0QYFQMW";
    this.clientSecret = "R4L0F22W4B054MZXZSXJ1CU0MBALGT3IHC4BFWQIMCDT4D12";
  }

  getPlaceInfo = (coordinates) => {
    return fetch(`https://api.foursquare.com/v2/venues/search?client_id=${this.clientId}&client_secret=${this.clientSecret}&ll=${coordinates.lat()},${coordinates.lng()}&v=20140815&limit=1`);
    /*.then( r => r.json() )
    .then( data => {
      return this.getPlaceDetails(data);
    });*/
  }

  getPlaceDetails = (place) => {
    return fetch(`https://api.foursquare.com/v2/venues/${place.response.venues["0"].id}?client_id=${this.clientId}&client_secret=${this.clientSecret}&v=20180721&limit=1`);
  }
}

export default foursquare;
