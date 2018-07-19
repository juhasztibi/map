import React from 'react';

const ListView = (props) => {

  const clickHandler = (clickedItem) => {
    props.mapService.openInfoWindow(clickedItem.target.dataset.id);
  }

  return (
    <div className="list-view">
      <ul className="list-view__list" onClick={clickHandler}>
        {props.places && props.places.map(item => {
          if (item.name.indexOf(props.filterText) === -1) {
            return null;
          }
          return (
            <li className="list-view__list-item" key={item.id} data-id={item.id}>{item.name}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default ListView;
