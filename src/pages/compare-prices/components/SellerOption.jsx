import React, { useEffect } from 'react';
import './seller-option.scss';
import CheckBox from './CheckBox';
import StarCheckBox from './StarCheckBox';
import useLocalStorage from '../../../common/custom-hooks/useLocalStorage';

const SellerOption = (seller, setSellerEnabled, assignFavourite) => {

  const { loading, logo, name, enabled: defaultEnabled, favourite } = seller;

  const [enabled, setEnabled] = useLocalStorage('seller-enabled-' + name, defaultEnabled);
  useEffect(() => setSellerEnabled(seller, enabled), [enabled]);

  return (
    <div className="seller-options" data-seller-enabled={enabled} data-seller-favourite={favourite}>
      <div className="logo-container">
        {loading
          ? <div className="loading">Loading...</div>
          : <img className="logo" src={logo} alt={name} />}
      </div>
      <div className="widgets">
        <CheckBox option={null} checked={enabled} onChange={() => setEnabled((prev) => !prev)}/>
        <StarCheckBox option={null} checked={favourite} onChange={() => assignFavourite(seller)}/>
      </div>
    </div>
  )
};

export default SellerOption;
