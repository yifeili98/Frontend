import React from 'react';
import axios from 'axios';
import './assets/css/App.css';
import './vendors/css/bootstrap.min.css'
import './vendors/css/bootstrap-grid.min.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class NameForm extends React.Component {
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
          <Modal.Title className="contact-title">Contact Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <form>
            <div className="row">
              <div className="col">
                <label>Name</label>
                <input
                name="name"
                type="text"
                value={this.state.name}
                placeholder="Name"
                className="form-control"
                onChange={this.handleInputChange} />
              </div>
              <div className="col">
                <label>Email Address</label>
                <input
                name="email"
                type="email"
                value={this.state.email}
                placeholder="Email Address"
                className="form-control"
                onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="form-group" style={{textAlign: 'center'}}>
              <label>Message</label>
              <br />
              <textarea
              name="form_body"
              type="form_body"
              value={this.state.form_body}
              onChange={this.handleInputChange}
              rows="5"
              style={{width: '70%'}}></textarea>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          {/* <Button variant="secondary" onClick={this.handleClick}>Close</Button> */}
          <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal.Dialog>



    );
  }
}

export default NameForm;