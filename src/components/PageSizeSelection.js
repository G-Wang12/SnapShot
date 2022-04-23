import React, { useEffect, useState, useLayoutEffect } from "react";
import Select from "react-select";

const options = [
  { value: 10, label: "10 per page" },
  { value: 20, label: "20 per page" },
  { value: 30, label: "30 per page" },
];
const PageSizeSelection = ({ pageAmount = 10, handlePageAmount }) => {
  const [currentSize, setCurrentSize] = useState(options[0].value);

  const handleChange = (selectedOption) => {
    setCurrentSize(selectedOption.value);
  };
  useLayoutEffect(() => {
    handlePageAmount(currentSize);
  }, [currentSize]);

  return (
    <Select
      className="sizeSelection-container"
      value={{ label: options.find((o) => o.value === currentSize).label }}
      options={options}
      isSearchable={false}
      onChange={handleChange}
    />
  );
};
export default PageSizeSelection;
