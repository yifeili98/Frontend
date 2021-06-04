import React from 'react';
import axios from 'axios';
import '../../assets/css/App.css';
import {Modal, Button, Form, Container, Row, Col} from 'react-bootstrap';


class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      form_body: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    if (target.name === 'name') {
      this.setState({
        name: target.value
      });
    } else if (target.name === 'email') {
      this.setState({
        email: target.value
      });
    } else {
      this.setState({
        form_body: target.value
      });
    }
  }

  handleClick = () => {
    this.props.toggle();
  }

  handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: this.state.name, email: this.state.email, form_body: this.state.form_body})
    };
    axios.post('https://fhda-api-test.azurewebsites.net/contact', {name: this.state.name, email: this.state.email, form_body: this.state.form_body})
            .then(function(response){
                console.log(response);
       //Perform action based on response
        })
        .catch(function(error){
            console.log(error);
       //Perform action based on error
        });
        this.setState({
          name: '',
          email: '',
          form_body: ''
        });
    
  }


  render() {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title className="contact_title">Contact Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form>
            <Container>
              <Row>
                <Col>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                  name="name"
                  type="text"
                  value={this.state.name}
                  placeholder="Name"
                  onChange={this.handleInputChange}>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                  name="email"
                  type="email"
                  value={this.state.email}
                  placeholder="Email Address"
                  onChange={this.handleInputChange}>
                  </Form.Control>
                </Col>
              </Row>
            </Container>
            <Form.Group className="form_group">
              <Form.Label>Message</Form.Label>
              <br />
              <Form.Control 
              as="textarea" 
              value={this.state.form_body}
              onChange={this.handleInputChange}
              rows={5}
              className="contact_textarea">
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal.Dialog>



    );
  }
}

export default ContactForm;