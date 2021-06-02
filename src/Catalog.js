import React, { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import CoursesWrapper from "./components/CoursesWrapper";
import CourseItem from "./components/CourseItem";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Filter from "./components/Filter";
import CatalogDescription from "./components/CatalogDescription";

function Catalog() {
  const [courses, setCourses] = useState([]);
  const [filtedCourses, setFiltedCourses] = useState([]);

  const fuzzyQuery = useCallback((courses, keyWord) => {
    console.log(typeof keyWord);
    let reg = new RegExp(keyWord, "i");
    let arr = [];
    for (let i = 0; i < courses.length; i++) {
      if (reg.test(courses[i].courseName)) {
        arr.push(courses[i]);
      }
    }
    return arr;
  }, []);

  const searchChangeHandler = (event) => {
    const keyWord = event.target.value
      .trim()
      .replace(" ", "")
      .replace(/[\\]/g, "");
    const filteredClasses = fuzzyQuery(courses, keyWord);
    console.log(filteredClasses);
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
          let course = {
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

  return (
    <React.Fragment>
      <Header />
      <Container fluid>
        <Row>
          <CoursesWrapper>
            {filtedCourses.map((course) => {
              return (
                <CourseItem
                  key={Math.random()} //for debug purpose
                  courseName={course.courseName}
                  courseNum={course.courseNum}
                  unit={course.unit}
                />
              );
            })}
          </CoursesWrapper>
          <CoursesWrapper>
            <Filter searchChangeHandler={searchChangeHandler} />
          </CoursesWrapper>
          <CoursesWrapper>
            <CatalogDescription />
          </CoursesWrapper>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Catalog;
