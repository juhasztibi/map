import React from 'react';

const LocationFilter = (props) => {
  return (
    <div className="location-filter">
      <input type="text" className="location-filter__input" />
      <button type="button" className="location-filter__button">Filter</button>
    </div>
  )
}

export default LocationFilter;
