import React from "react";

const Finance = ({ finance }) => {

  return (
    <div className="single-stat">
      FINANCE {JSON.stringify(finance)}
    </div>
  );
};

export default Finance;