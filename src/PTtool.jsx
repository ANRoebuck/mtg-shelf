import React from "react";
import { useForm } from "react-hook-form";
import ArrayInput from "./Components/ArrayInput"

const assignment = [];

const PTtool = () => {
  const { handleSubmit, register } = useForm();
  const onSubmit = values => {
        
        const arrayOfPlayers = [values.PlayerName1,values.PlayerName2,values.PlayerName3,values.PlayerName4,values.PlayerName5,values.PlayerName6,values.PlayerName7,values.PlayerName8,];
        const arrayOfSeedNumbers = [values.Seed1,values.Seed2,values.Seed3,values.Seed4,values.Seed5,values.Seed6,values.Seed7,values.Seed8,];
        const arrayOfDecks = [values.Deck1,values.Deck2,values.Deck3,values.Deck4,values.Deck5,values.Deck6,values.Deck7,values.Deck8,];

        for (let i = arrayOfPlayers.length - 1; i >= 0; i--) {
            const randomPlayerArray = arrayOfPlayers.splice(Math.floor(Math.random() * arrayOfPlayers.length), 1);
            const randomSeedArray = arrayOfSeedNumbers.splice(Math.floor(Math.random() * arrayOfSeedNumbers.length), 1);
            const randomDeckArray = arrayOfDecks.splice(Math.floor(Math.random() * arrayOfDecks.length), 1);

            assignment.push({
                player: randomPlayerArray[0],
                deck: randomDeckArray[0],
                seed: randomSeedArray[0],
            })
        }
        
        console.log(assignment);
  }

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>

        <ArrayInput type={"PlayerName"} numberOfInputs={8} register={register} />
        <ArrayInput type={"Deck"} numberOfInputs={8} register={register}/>
        <ArrayInput type={"Seed"} numberOfInputs={8} register={register}/>

      <input type="submit"/>
    </form>
    </div>
  );
};

export default PTtool;