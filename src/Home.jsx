import React from "react";
import theShelf from './the_shelf 750x655.jpg';

const Home = () => {

  return (
    <div >
      <img className="the-shelf-img" src={theShelf} alt="theShelf"/>
    </div>
  );
};

export default Home;
