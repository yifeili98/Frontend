import React from "react";
import axios from "axios";
import {
  Modal,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Row,
  Col,
} from "react-bootstrap";
import "../../assets/css/column.css";

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campus: "DeAnza",
      quarter: "Summer",
      year: "2021",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    const selectKey = event.substring(0, event.indexOf(":"));
    const selectValue = event.substring(event.indexOf(":") + 1);
    this.setState(
      {
        [`${selectKey}`]: selectValue,
      },
      () => {
        axios
          .get("https://fhda-api-test.azurewebsites.net/course_list", {
            params: {
              year: this.state.year,
              quarter: this.state.quarter,
            },
          })
          .then(
            function (response) {
              //Perform action based on response
              this.props.filterHandler(response);
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error);
            //Perform action based on error
          });
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .get("https://fhda-api-test.azurewebsites.net/course_list", {
        year: this.state.year,
        quarter: this.state.quarter,
      })
      .then(function (response) {
        console.log(response);
        //Perform action based on response
      })
      .catch(function (error) {
        console.log(error);
        //Perform action based on error
      });
  }

  render() {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title className="center_title">Course Filter</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col className="select-bar">
              <h5>Campus: </h5>
            </Col>
            <Col className="select-bar">
              <DropdownButton
                as={ButtonGroup}
                title={this.state.campus}
                onSelect={this.handleSelect}
              >
                <Dropdown.Item eventKey="campus:DeAnza">DeAnza</Dropdown.Item>
                <Dropdown.Item eventKey="campus:Foothill">
                  Foothill (Coming Soon)
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col className="select-bar">
              <h5>Year: </h5>
            </Col>
            <Col className="select-bar">
              <DropdownButton
                as={ButtonGroup}
                title={this.state.year}
                onSelect={this.handleSelect}
              >
                <Dropdown.Item eventKey="year:2021">
                  2021 (Usable)
                </Dropdown.Item>
                <Dropdown.Item eventKey="year:1998">
                  1998 (Not Available)
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col className="select-bar">
              <h5>Quarter: </h5>
            </Col>
            <Col className="select-bar">
              <DropdownButton
                as={ButtonGroup}
                title={this.state.quarter}
                onSelect={this.handleSelect}
              >
                <Dropdown.Item eventKey="quarter:Fall">Fall</Dropdown.Item>
                <Dropdown.Item eventKey="quarter:Winter">Winter</Dropdown.Item>
                <Dropdown.Item eventKey="quarter:Spring">Spring</Dropdown.Item>
                <Dropdown.Item eventKey="quarter:Summer">Summer</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <div>
              <label className="form-label" htmlFor="courseSearch">
                <h5>Search Course</h5>
              </label>
              <input
                type="text"
                id="courseSearch"
                className="form-control"
                onChange={this.props.searchCourseHandler}
              />
            </div>
          </Row>
        </Modal.Body>
      </Modal.Dialog>
    );
  }
}

export default Filter;
