import React from "react";
import "../assets/css/courseItem.css";

const CoursesWrapper = (props) => {
  return <div className="courses-items">{props.children}</div>;
};

export default CoursesWrapper;
