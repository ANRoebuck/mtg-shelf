import React from 'react';
import './navigation-icon.scss';
import plains from './icon-images/plains_iceage 542x275.jpg';
import island from './icon-images/island_iceage 542x275.jpg';
import swamp from './icon-images/swamp_iceage 542x275.jpg';
import mountain from './icon-images/mountain_iceage 542x275.jpg';
import forest from './icon-images/forest_iceage 542x275.jpg';

const images = [plains, island, swamp, mountain, forest];

const getImg = (i) => images[i % 5];

const NavigationIcon = ({page, value, active, setDisplay}) => {

  return (
    <div className="menu-item" data-active={active} onClick={() => setDisplay(page)}>
      <img className="navigation-icon-image" src={getImg(value)} alt="theShelf"/>
      <div className="page-name">{page}</div>
    </div>
  );
}

export default NavigationIcon;
