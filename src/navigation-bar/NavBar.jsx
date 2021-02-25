import React, { useState } from 'react';
import NavigationIcon from './NavigationIcon';

const NavBar = ({ pages, selected, setSelected }) => {

  const [displayMenu, setDisplayMenu] = useState(false);

  const navigationIcons = Object.values(pages).map((page, i) =>
    <NavigationIcon page={page} value={i} selected={selected === page} setSelected={setSelected}/>);

  const mouseOver = () => setDisplayMenu(true);
  const mouseOut = () => setDisplayMenu(false);


  return (

    <div className="nav-bar">
      <div className={`navigation-icons-container ${displayMenu ? 'display' : 'hide'}`}>
        {navigationIcons}
      </div>
    </div>
  );
}

export default NavBar;
