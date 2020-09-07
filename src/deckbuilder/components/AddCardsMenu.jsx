import React, { useState } from "react";
import CardSearch from "./CardSearch";
import CardImport from "./CardImport";
import { nextInArray } from "../../common/utils";

const AddCardsMenu = () => {

  const [displaySearchOrImport, setDisplaySearchOrImport] = useState('search');

  const displayOptions = ['search', 'import'];
  const toggleDisplaySearchOrImport = () =>
    setDisplaySearchOrImport(display => nextInArray(displayOptions, display));

  return (
    <div className="search-container">
      <button type="button" onClick={toggleDisplaySearchOrImport}>Search / Import</button>
      {displaySearchOrImport === 'search' ? <CardSearch /> : <CardImport />}
    </div>
  );
}

export default AddCardsMenu;