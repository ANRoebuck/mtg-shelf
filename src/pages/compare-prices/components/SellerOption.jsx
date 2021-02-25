import React from "react";
import './seller-option.scss';
import CheckBox from "./CheckBox";

const SellerOption = (seller, toggleSellerEnabled, assignFavourite) => {

  const { loading, logo, name, enabled, results, inStock, favourite } = seller;

  return (
    <div className="seller-options" data-seller-enabled={enabled} data-seller-favourite={favourite}>
      <div className="logo-container">
        {loading
          ? <div className="loading">Loading...</div>
          : <img className="logo" src={logo} alt={name} />}
      </div>
      <div className="widgets">
        <CheckBox option={null} checked={enabled} onChange={() => toggleSellerEnabled(seller)}/>
        <CheckBox option={null} checked={favourite} onChange={() => assignFavourite(seller)}/>
        {/*<input className="star" type="checkbox" checked={favourite} onChange={() => assignFavourite(seller)} />*/}
        <div className="stock">{results !== '' ? `${inStock} / ${results}` : '* / *'}</div>
      </div>
    </div>
  )
};

export default SellerOption;
