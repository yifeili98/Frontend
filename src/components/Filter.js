import React from "react";

const Filter = (props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor="searchBox">Search for a class</label>
        <input
          id="searchBox"
          type="text"
          onChange={props.searchChangeHandler}
        />
      </div>
    </form>
  );
};

export default Filter;
