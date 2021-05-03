import React from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const SearchResult = (discoveredPrice) => {

  const {name, logo, title, price, stock, imgSrc, productRef, expansion} = discoveredPrice;

  const onClickLink = () => window.open(productRef, "_blank");

  return (
    <div className="discovered-price" data-in-stock={stock.value > 0}>

      <div className="details">
        <img className="logo" src={logo} alt={name}/>
        <div className="name">{title}</div>
        <div className="expansion">{expansion}</div>
      </div>

      <div className="img-container">
        <img className="discovered-price-img" src={imgSrc} alt={name}/>
      </div>

      <div className="stock-info">
        <div className="price">{price.text}</div>
        <div className="stock-count">{stock.text}</div>
        <div className="product-link">
          <ShoppingCartIcon onClick={onClickLink}/>
        </div>
      </div>

    </div>
  )
};

export default SearchResult;
