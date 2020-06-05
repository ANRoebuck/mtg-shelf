import React from "react";

const ArrayInput = ({numberOfInputs, type}) => {

    let arrays = [];

    for(let i = 0; i < numberOfInputs; i++){
        arrays.push(<input class="" id={type} name={type + "-name"} type="text"></input>)
    }
   

  return (
    <div>
      <label class="govuk-label" for="event-name">
        {type}
      </label>
      {arrays}
    </div>
  );
};

export default ArrayInput;
