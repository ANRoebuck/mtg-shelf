import React, { useState } from "react";
import './option-set-images.scss';

const OptionSetImages = ({ title, options, sources, selectOption, defaultOption = 0 }) => {

  const [selectedOption, setSelectedOption] = useState(options[defaultOption]);

  const handleChange = (option) => {
    setSelectedOption(option);
    selectOption(option);
  };

  const optionsToRender = options.map(option => {
    return (
      <div className={option === selectedOption ? 'icon selected' : 'icon'}>
        <img className="icon-img"
             src={sources[option]}
             alt={option}
             onClick={() => handleChange(option)}
        />
      </div>
    );
  });

  return (
      <div className={"option-set"}>
        {title ? <div>{title}</div> : null}
        {optionsToRender}
      </div>
  );
}

export default OptionSetImages;