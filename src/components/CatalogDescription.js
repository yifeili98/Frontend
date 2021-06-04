import React from "react";

const CatalogDescription = (props) => {
  return (
    <div>
      <h1>{props.course["courseTitle"]}</h1>
      <p>{props.course["UID"]}</p>
      <p>{props.course["crn"]}</p>
      <p>{props.course["courseNum"]}</p>
      <p>{props.course["sectionNum"]}</p>
      <p>{props.course["campus"]}</p>
      <p>{props.course["numCredit"]}</p>
      <p>{props.course["days"]}</p>
      <p>{props.course["startTime"]}</p>
      <p>{props.course["endTime"]}</p>
      <p>{props.course["instructorName"]}</p>
      <p>{props.course["startDate"]}</p>
      <p>{props.course["endDate"]}</p>
      <p>{props.course["location"]}</p>
      <p>{props.course["attribute"]}</p>
      <p>{JSON.stringify(props.course["lab"])}</p>
    </div>
  );
};

export default CatalogDescription;
