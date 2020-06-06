import React from "react";

const ArrayInput = ({numberOfInputs, type, register}) => {

    let arrays = [];

    for(let i = 0; i < numberOfInputs; i++){
        arrays.push(<input class="" id={type+(i+1)} name={type} type="text" ref={register}/>)
    }   

  return (
    <div>
      <label class="" for="event-name">
        {type}
      </label>
      {arrays}
    </div>
  );
};

export default ArrayInput;
