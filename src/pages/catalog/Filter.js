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

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campus: "DeAnza",
      quarter: "Summer",
      year: "2021",
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    this.props.clearCardsHandler();
    var event = event.target.id;
    const selectKey = event.substring(0, event.indexOf(":"));
    const selectValue = event.substring(event.indexOf(":") + 1);
    this.setState(
      {
        [`${selectKey}`]: selectValue,
      },
      function () {
        var cache_list = localStorage.getItem("cache_list");
        if (cache_list) {
          cache_list = JSON.parse(cache_list);
          if (cache_list.length > 8) {
            localStorage.removeItem(cache_list[0]);
            cache_list = cache_list.shift();
          }
        } else {
          cache_list = [];
          localStorage.setItem("cache_list", JSON.stringify(cache_list));
        }
        const cache = JSON.parse(
          localStorage.getItem(JSON.stringify(this.state))
        );
        if (cache) {
          this.props.filterHandler(this.state, cache);
        } else {
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
                //console.log(response);
                this.props.filterHandler(this.state, response);
              }.bind(this)
            )
            .catch(function (error) {
              console.log(error);
              //Perform action based on error
            });
        }
      }
    );
  }

  render() {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title className="center_title">Course Filter</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="modal_item">
            <Col>
              <h5>Campus: </h5>
            </Col>
            <Col>
              <DropdownButton as={ButtonGroup} title={this.state.campus}>
                <Dropdown.Item onClick={this.handleSelect} id="campus:DeAnza">
                  DeAnza
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handleSelect} id="campus:Foothill">
                  Foothill (Coming Soon)
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row className="modal_item">
            <Col>
              <h5>Year: </h5>
            </Col>
            <Col>
              <DropdownButton as={ButtonGroup} title={this.state.year}>
                <Dropdown.Item onClick={this.handleSelect} id="year:2021">
                  2021 (Usable)
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handleSelect} id="year:1998">
                  1998 (Not Available)
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row className="modal_item">
            <Col>
              <h5>Quarter: </h5>
            </Col>
            <Col>
              <DropdownButton as={ButtonGroup} title={this.state.quarter}>
                <Dropdown.Item onClick={this.handleSelect} id="quarter:Fall">
                  Fall
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handleSelect} id="quarter:Winter">
                  Winter
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handleSelect} id="quarter:Spring">
                  Spring
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handleSelect} id="quarter:Summer">
                  Summer
                </Dropdown.Item>
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
