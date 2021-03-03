import React, { useState } from "react";

const OptionSetRadio = ({ title, options, selectOption, defaultOption = 0 }) => {

  const [selectedOption, setSelectedOption] = useState(options[defaultOption]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    selectOption(e.target.value);
  };

  const optionsToRender = options.map(option => {
    return (
      <div className="radio">
        <label>
          <input
            type="radio"
            value={option}
            checked={option === selectedOption}
            onChange={handleChange}/>
          {option}
        </label>
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

export default OptionSetRadio;