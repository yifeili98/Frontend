import React from "react";
import "../assets/css/courseItem.css";

const CourseItem = (props) => {
  const clickHandler = () => {
    props.handlerClick(props.uid);
  };

  return (
    <div
      className="card h-auto course-item"
      style={{ width: "80%", marginBottom: "5px" }}
      onClick={clickHandler}
    >
      <div className="card-body">
        <h5 className="card-title">{props.courseName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.courseNum}</h6>
        <p className="card-text">45% enrolled</p>
        <p className="card-text">{`${props.unit} Units`}</p>
      </div>
    </div>
  );
};

export default CourseItem;
