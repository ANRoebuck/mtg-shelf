import React from 'react';

const ComparePricesViewIcon = ({option, selected, setSelected}) => {

  return (
    <div className="compare-prices-view-option" data-selected={selected} onClick={() => setSelected(option)}>
      {option}
    </div>
  )
}

export default ComparePricesViewIcon
