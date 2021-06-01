import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import CoursesWrapper from "./components/CoursesWrapper";
import CourseItem from "./components/CourseItem";
import axios from "axios";

function App() {
  const [courses, setCourses] = useState([]);

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
      });
  }, []);

  return (
    <React.Fragment>
      <Header />
      <CoursesWrapper>
        {courses.map((course) => {
          return (
            <CourseItem
              courseName={course.courseName}
              courseNum={course.courseNum}
              unit={course.unit}
            />
          );
        })}
      </CoursesWrapper>
    </React.Fragment>
  );
}

export default App;
