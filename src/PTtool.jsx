import React from "react";
import { useForm } from "react-hook-form";
import ArrayInput from "./Components/ArrayInput"

const PTtool = () => {
  const { handleSubmit, register } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>

        <ArrayInput type={"Player Names"} numberOfInputs={8} register={register} />
        <ArrayInput type={"Decks"} numberOfInputs={8} register={register}/>
        <ArrayInput type={"Seed"} numberOfInputs={8} register={register}/>

      <input type="submit"/>
    </form>
    </div>
  );
};

export default PTtool;