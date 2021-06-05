import React, { useState, useCallback } from "react";
import Header from "../../components/Header";
import CoursesWrapper from "../../components/CoursesWrapper";
import CourseItem from "../../components/CourseItem";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Filter from "./Filter";
import CatalogDescription from "../../components/CatalogDescription";

function Catalog() {
  const [courses, setCourses] = useState([]);
  const [filtedCourses, setFiltedCourses] = useState([]);
  const [specificCourse, setSpecificCourse] = useState({});

  String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  };

  const fuzzyQuery = useCallback((courses, keyWord) => {
    var plus = [];
    for (let charIndex = 0; charIndex < keyWord.length; charIndex++) {
      if (keyWord[charIndex] === "+") {
        plus.push(charIndex);
      }
    }
    var reverseIndex = keyWord.length;
    //Finds case for ++, change it to \+\+
    while (reverseIndex > 0) {
      if (keyWord[reverseIndex] != "+") {
        reverseIndex--;
      } else {
        keyWord = keyWord.splice(reverseIndex, 0, "\\");
      }
    }
    let reg = new RegExp(keyWord, "i");
    let arr = [];
    for (let i = 0; i < courses.length; i++) {
      if (reg.test(courses[i].courseName)) {
        arr.push(courses[i]);
      }
    }
    return arr;
  }, []);

  const coursesFilter = (input) => {
    const keyWord = input.trim().replace(" ", "").replace(/[\\]/g, "");
    const filteredClasses = fuzzyQuery(courses, keyWord);
    setFiltedCourses(filteredClasses);
  };

  const filterHandler = (filter_key, filter_value) => {
    var allCourses = [];
    const cache = JSON.parse(localStorage.getItem(JSON.stringify(filter_key)));
    if (!cache) {
      for (const key in filter_value.data) {
        const courseObj = filter_value.data[key];
        let course = {
          key: parseInt(key),
          courseName: courseObj.courseTitle,
          courseNum: courseObj.courseNum,
          unit: +courseObj.numCredit,
        };
        allCourses.push(course);
      }
      localStorage.setItem(JSON.stringify(filter_key), JSON.stringify(allCourses));
      var cache_list = JSON.parse(localStorage.getItem("cache_list"));
      cache_list.push(filter_key);
      localStorage.setItem("cache_list", JSON.stringify(cache_list));
    } else {

      allCourses = JSON.parse(localStorage.getItem(JSON.stringify(filter_key)));
    }
    
    setCourses(allCourses);
    setFiltedCourses(allCourses);
    setSpecificCourse({});
  }; // can be refactored

  const searchCourseHandler = (event) => {
    coursesFilter(event.target.value);
  };

  const clickCourseItemHandler = (key) => {
    let courseString = localStorage.getItem(key);
    let course = JSON.parse(courseString);
    setSpecificCourse(course);
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <CoursesWrapper>
            <Filter
              filterHandler={filterHandler}
              searchCourseHandler={searchCourseHandler}
            />
          </CoursesWrapper>
          <CoursesWrapper>
            {filtedCourses.map((course) => {
              return (
                <CourseItem
                  key={course.key}
                  uid={course.key}
                  courseName={course.courseName}
                  courseNum={course.courseNum}
                  unit={course.unit}
                  handlerClick={clickCourseItemHandler}
                />
              );
            })}
          </CoursesWrapper>
          <CoursesWrapper>
            {Object.keys(specificCourse).length !== 0 && (
              <CatalogDescription course={specificCourse} />
            )}
          </CoursesWrapper>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Catalog;
