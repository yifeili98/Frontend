import React from "react";

const CourseItem = (props) => {
  return (
    <div className="card h-auto" style={{ width: "25rem" }}>
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
