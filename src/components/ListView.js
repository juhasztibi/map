import React from 'react';

const ListView = (props) => {
  return (
    <div className="list-view">
      <ul className="list-view__list">
        {props.places && props.places.map(item => {
          if (item.name.indexOf(props.filterText) === -1) {
            return;
          }
          return (
            <li className="list-view__list-item" key={item.id}>{item.name}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default ListView;
