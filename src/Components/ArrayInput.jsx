import React from "react";

const ArrayInput = ({numberOfInputs, type, register}) => {

    let arrays = [];

    for(let i = 0; i < numberOfInputs; i++){
      let defValue = "";
      if(type==="Seed"){
        defValue=i+1;
      }
      arrays.push(<input class="" id={type+(i+1)} name={type+(i+1)} type="text" ref={register} defaultValue={defValue}/>)
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
