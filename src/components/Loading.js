import React from "react";
import ReactLoading from "react-loading";
import "../assets/css/courseItem.css";

const Loading = (props) => {
  return (
    <ReactLoading
      type={props.type}
      color={props.color}
      height={props.height}
      width={props.width}
      className="loading"
    />
  );
};

export default Loading;
