import React from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const SearchResult = (discoveredPrice) => {

  const {name, logo, title, price, stock, imgSrc, productRef, expansion} = discoveredPrice;

  const onClickLink = () => window.open(productRef, "_blank");

  return (
    <div className="discovered-price" data-in-stock={stock.value > 0}>
      <div className="seller">
        <img className="logo" src={logo} alt={name}/>
        {/*<div>{price.value}</div>*/}
        {/*<div>{stock.value}</div>*/}
      </div>
      <div className="details">
        <div className="name">{title}</div>
        <div className="expansion">{expansion}</div>
      </div>
      <div className="stock">
        <div>{stock.text}</div>
      </div>
      <div className="price">
        <div>{price.text}</div>
      </div>
      <div className="img-container">
        <img className="discovered-price-img" src={imgSrc} alt={name}/>
        <ShoppingCartIcon onClick={onClickLink} />
      </div>
    </div>
  )
};

export default SearchResult;
