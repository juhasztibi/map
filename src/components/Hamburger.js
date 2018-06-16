import React from 'react';

const Hamburger = (props) => {
  return (
    <div onClick={props.openMenu} className="hamburger">
      <span />
    </div>
  )
}

export default Hamburger;
