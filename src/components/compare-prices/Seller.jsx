import React from "react";
import RadioButton from "./RadioButton";

const Seller = (seller, toggleSellerEnabled, setAsFavourite) => {

  const { loading, logo, name, enabled, results, inStock, favourite } = seller;

  return (
    <div className="seller">
      {loading ? <div>Loading...</div> : null}
      <RadioButton option={null} checked={favourite} onChange={() => setAsFavourite(name)}/>
      <img className="logo" src={logo} alt={name} onClick={() => toggleSellerEnabled(seller)}/>
      <div>{enabled ? 'enabled' : 'disabled'}</div>
      <div>{results !== '' ? `results: ${results}` : null}</div>
      <div>{inStock !== '' ? `inStock: ${inStock}` : null}</div>
    </div>
  )
};

export default Seller;