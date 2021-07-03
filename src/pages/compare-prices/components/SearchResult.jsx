import React from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FoilStar from "./FoilStar";

const SearchResult = (discoveredPrice) => {

  const {name, logo, title, price, stock, imgSrc, productRef, expansion, isFoil} = discoveredPrice;

  const onClickLink = () => window.open(productRef, "_blank");

  return (
    <div className="discovered-price" data-in-stock={stock.value > 0}>

      <img className="logo" src={logo} alt={name}/>
      {isFoil ? <FoilStar/> : null}
      <div className="name">{title}</div>
      <div className="expansion">{expansion}</div>

      <div className="discovered-price-img-container">
        <img className="discovered-price-img" src={imgSrc} alt={name}/>
      </div>

      <div className="price">{price.text}</div>
      <div className="stock-count">{stock.text}</div>

      <div className="product-link">
        <ShoppingCartIcon onClick={onClickLink}/>
      </div>

    </div>
  )
};

export default SearchResult;
