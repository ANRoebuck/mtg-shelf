import React, { useEffect, useState } from 'react';
import './ContextMenu.scss';

const ContextMenu = ({containerRef, menuItems}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});

  const onContextMenu = (e) => {
    e.preventDefault();
    setPosition({
      x: containerRef.getBoundingClientRect().left + (e.pageX - containerRef.getBoundingClientRect().left),
      y: containerRef.getBoundingClientRect().top + (e.pageY - containerRef.getBoundingClientRect().top),
    });
    setVisible(true);
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
  }, [containerRef, onContextMenu]);

  const menuOnMouseLeave = () => setVisible(false);

  const renderMenuItems = (items) => {
    const style = {
      position: `absolute`,
      top: `${position.y -10}px`,
      left: `${position.x -10}px`
    }

    return (
      <div
        className="custom-context" style={style}
        onMouseLeave={menuOnMouseLeave}
      >
        {items.map((item, index, arr) => {
          return (
            <div
              className={`custom-context-item${index === arr.length - 1 ? '-last' : ''}`}
              onClick={(e) => {
                item.callback();
                setVisible(false);
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  }


  return (
    <div className="custom-context-menu">
      {visible ? renderMenuItems(menuItems) : null}
    </div>
  );
};

export default ContextMenu;
