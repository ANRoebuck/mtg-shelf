import React, { useState } from 'react';
import './navigation-icon.scss';
import plains from './icon-images/plains_iceage 542x275.jpg';
import island from './icon-images/island_iceage 542x275.jpg';
import swamp from './icon-images/swamp_iceage 542x275.jpg';
import mountain from './icon-images/mountain_iceage 542x275.jpg';
import forest from './icon-images/forest_iceage 542x275.jpg';

const images = [plains, island, swamp, mountain, forest];

const getImg = (i) => images[i % 5];

const NavigationIcon = ({page, value, selected, setSelected}) => {

  const [displayMenu, setDisplayMenu] = useState(false);

  const mouseOver = () => setDisplayMenu(true);
  const mouseOut = () => setDisplayMenu(false);

  return (
    <div className={`menu-item ${displayMenu ? 'display' : 'hide'}`} data-active={selected} onClick={() => setSelected(page)} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
      <div style={{position: 'relative'}}>
        <img className="navigation-icon-image" src={getImg(value)} alt="theShelf"/>
        <div className="page-name">{page}</div>
      </div>
    </div>
  );
}

export default NavigationIcon;
