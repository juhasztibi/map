import React from 'react';

const Map = props => {
  return (
    <div className="map__wrapper">
      {props.mapIsLoading && <div>hello</div>}
      <div ref={props.mapElement} className="map" id="map" />
    </div>
  )
}

export default Map;
