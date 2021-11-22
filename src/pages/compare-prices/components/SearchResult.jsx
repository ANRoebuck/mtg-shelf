import React from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FoilStar from "./FoilStar";

const SearchResult = (discoveredPrice, isSaved, addSavedPrice, removeSavedPrice) => {

  const {name, logo, title, price, stock, imgSrc, productRef, expansion, isFoil} = discoveredPrice;

  const onClickSaveWidget = () => {
    if (!isSaved) addSavedPrice(discoveredPrice);
    else removeSavedPrice(discoveredPrice);
  }

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

      <div className="stock-count">{stock.text}</div>

      <div className="price">{!isNaN(price.value) ? price.text + " : " + price.value : null}</div>

      <div className="widgets">
        <div className="bookmark">
          {isSaved
            ? <DeleteForeverIcon onClick={onClickSaveWidget} />
            : <SaveIcon onClick={onClickSaveWidget} />}
        </div>

        <div className="product-link">
          <ShoppingCartIcon onClick={onClickLink}/>
        </div>
      </div>

    </div>
  )
};

export default SearchResult;
