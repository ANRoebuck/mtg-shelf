import React from "react";
import ModelMadHouse from "./components/compare-prices/model-madhouse";

const base = 'https://cors-anywhere.herokuapp.com/';
const madhouse = 'https://www.magicmadhouse.co.uk/search/raven-familiar';
const troll = 'https://www.trolltradercards.com/products/search?q=raven+familiar';


const ComparePrices = () => {

  const parser = new DOMParser();
  const modelMadHouse = new ModelMadHouse();

  const handleClick = async () => {
    const results = await modelMadHouse.search('Raven Familiar');
    console.log(results);
  }

  return (
    <div onClick={handleClick}>fixed search for <br/> Raven Familiar <br/> from MagicMadhouse </div>
  );
};

export default ComparePrices;