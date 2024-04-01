import React, { useState } from "react";

const NumTextInput = () => {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Remove any non-digit characters from the input value
    const numericValue = inputValue.replace(/\D/g, "");

    // Update the state with the numeric value
    setValue(numericValue);
  };

  return <input type="text" value={value} onChange={handleInputChange} />;
};

export default NumTextInput;
