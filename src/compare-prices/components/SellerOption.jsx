import React from "react";
import './seller-option.scss';
import CheckBox from "./CheckBox";

const SellerOption = (seller, toggleSellerEnabled, assignFavourite) => {

  const { loading, logo, name, enabled, results, inStock, favourite } = seller;

  return (
    <div className="seller-options" data-seller-enabled={enabled} data-seller-favourite={favourite}>
      {loading ? <div>Loading...</div> : null}
      <img className="logo" src={logo} alt={name} onClick={() => toggleSellerEnabled(seller)}/>
      <CheckBox option={null} checked={favourite} onChange={() => assignFavourite(seller)}/>
      {/*<div>{enabled ? 'enabled' : 'disabled'}</div>*/}
      {/*<div>{results !== '' ? `results: ${results}` : null}</div>*/}
      {/*<div>{inStock !== '' ? `inStock: ${inStock}` : null}</div>*/}
      <div className="stock-p-t">{results !== '' ? `${inStock} / ${results}` : null}</div>
    </div>
  )
};

export default SellerOption;