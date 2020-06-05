import React from "react";
import ArrayInput from "./Components/ArrayInput";

const PTtool = () => {
  return (
    <div>
      <form>
        <ArrayInput type={"Player Names"} numberOfInputs={8} />
        <ArrayInput type={"Decks"} numberOfInputs={8} />
        <ArrayInput type={"Seed"} numberOfInputs={8} />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default PTtool;