import React from "react";
import "../assets/css/courseItem.css";
import { Col } from "react-bootstrap";

const CoursesWrapper = (props) => {
  return (
    <Col className="courses-items">
      {props.children}
    </Col>
  );
};

export default CoursesWrapper;
