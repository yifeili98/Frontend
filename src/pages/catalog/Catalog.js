import React, { useEffect, useState, useCallback } from "react";
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
    //console.log(filteredClasses);
    setFiltedCourses(filteredClasses);
  };

  useEffect(async () => {
    //do https requrest
    const allCourses = [];
    axios
      .get(
        "https://fhda-api-test.azurewebsites.net/course_list?year=2021&quarter=Summer"
      )
      .then((res) => {
        for (const key in res.data) {
          const courseObj = res.data[key];
          localStorage.setItem(key, JSON.stringify(courseObj));
          let course = {
            key: parseInt(key),
            courseName: courseObj.courseTitle,
            courseNum: courseObj.courseNum,
            unit: +courseObj.numCredit,
          };
          allCourses.push(course);
        }
        setCourses(allCourses);
        setFiltedCourses(allCourses);
      });
  }, []);

  const filterHandler = (responseFromFilter) => {
    localStorage.clear();
    const allCourses = [];
    for (const key in responseFromFilter.data) {
      const courseObj = responseFromFilter.data[key];
      localStorage.setItem(key, JSON.stringify(courseObj));
      let course = {
        key: parseInt(key),
        courseName: courseObj.courseTitle,
        courseNum: courseObj.courseNum,
        unit: +courseObj.numCredit,
      };
      allCourses.push(course);
    }
    setCourses(allCourses);
    setFiltedCourses(allCourses);
    setSpecificCourse({});
  }; // can be refactored

  const searchCourseHandler = (event) => {
    coursesFilter(event.target.value);
    //console.log(event.target.value);
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
