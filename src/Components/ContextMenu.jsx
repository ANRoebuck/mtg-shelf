import React, { useEffect, useState } from 'react';
import './ContextMenu.scss';

const ContextMenu = ({containerRef, menuItems}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});

  const onContextMenu = (e) => {
    e.preventDefault();
    setPosition({x: e.clientX, y: e.clientY});
    setVisible(true);
  }

  const renderMenuItems = (items) => {
    const style = {
      position: `absolute`,
      top: `${position.y}px`,
      left: `${position.x}px`
    }

    return (
      <div className="custom-context" style={style}>
        {items.map((item, index, arr) => {
          return <div className="custom-context-item-last" onClick={(e) => {
            item.callback()
            setVisible(false);
          }}>{item.label}</div>
          // else return <div className="custom-context-item">{item.label}</div>
        })}
      </div>
    )
  }

  useEffect(() => {
    if (containerRef) {
      containerRef.addEventListener('contextmenu', onContextMenu);
    }
    return () => {
      if (containerRef) {
        containerRef.removeEventListener('contextmenu', onContextMenu);
      }
    };
  }, [containerRef]);

  return (
    <div className="custom-context-menu">
      {visible ? renderMenuItems(menuItems) : null}
    </div>
  );
};

export default ContextMenu;