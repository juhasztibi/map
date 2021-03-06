import React from 'react';

const Map = props => {
  return (
    <div className="map__wrapper">
      {props.loading && <div className="loader__wrapper"><div className="loader" /></div>}
      <div ref={props.mapElement} className="map" id="map" />
    </div>
  )
}

export default Map;
