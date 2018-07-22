import React from 'react';

const Hamburger = (props) => {
  return (
    <div onClick={props.openMenu} className="hamburger" aria-label="Navigation" tabIndex="1">
      <span />
    </div>
  )
}

export default Hamburger;
