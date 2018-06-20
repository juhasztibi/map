import React from 'react';

const ListView = (props) => {
  return (
    <div className="list-view">
      <ul className="list-view__list">
        {props.result.map(item => {
          return (
            <li className="list-view__list-item" key={item.id}>{item.name}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default ListView;
