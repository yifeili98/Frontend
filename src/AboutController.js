import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import ContactForm from './ContactForm';
import About from './About';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class AboutController extends React.Component {
  constructor(props) {
    super(props);
    const orginial = this.setState;     
    this.setState = function() {
        let arguments0 = arguments[0];
        let arguments1 = () => (arguments[1], localStorage.setItem('state', JSON.stringify(this.state)));
        orginial.bind(this)(arguments0, arguments1);
    };

    this.state = JSON.parse(localStorage.getItem('state'))
        ? JSON.parse(localStorage.getItem('state'))
        : {currentPage: 'about', seen: false};

    this.NavTop = this.NavTop.bind(this);
    this.Contact = this.Contact.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.togglePop = this.togglePop.bind(this);
  }

  handleNavClick(event) {
    this.setState({currentPage: event.target.name});
  }

  togglePop() {
    this.setState({
      currentPage: this.state.currentPage==='about' ? 'contact' : 'about'
     });
  }

  NavTop() {
    return(
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Other Pages</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link name="about" onClick={this.handleNavClick}>About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  Contact() {
    const currentPage = this.state.currentPage;
    if (currentPage === 'about') {
      return <About currentPage={this.state.currentPage} />
    } else {
      return (
        <div>
          <ContactForm toggle={this.togglePop} />
        </div>
      )
    }
  }

  render() {
    return (
        <div>
            <div>
                <this.NavTop />
            </div>
            <div>
                <this.Contact />
            </div>
        </div>
    );
  }
}

export default AboutController;