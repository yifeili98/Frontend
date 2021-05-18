import React from 'react';
import './assets/css/App.css';
import './assets/css/About.css';
import './assets/css/home.css';
import Carousel from 'react-bootstrap/Carousel';
import NameForm from './ContactForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentPage: 'about'};
    this.handleContactClick = this.handleContactClick.bind(this);
  }

  handleContactClick(event) {
    this.setState({currentPage: 'contact'});
  }

  render() {
    return (
        <div className="App">
          <div className="about-project">
            <h3 className="bt-h3 bt-bold mb-2 about-header">About FHDA Times</h3>
            <p className="bt-p mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Placerat vestibulum lectus mauris ultrices eros in cursus turpis massa.</p>
          </div>
          <Carousel className="project-carousel">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + '/logo-placeholder-png.png'}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + '/logo-placeholder-png.png'}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + '/logo-placeholder-png.png'}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + '/logo-placeholder-png.png'}
                alt="Forth slide"
              />
            </Carousel.Item>
          </Carousel>

          <div className="about-project">
            <h3 className="bt-h3 bt-bold mb-2 about-header">About Us</h3>
            <p className="bt-p mb-3">Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. 
              Enim facilisis gravida neque convallis a cras. Nunc eget lorem dolor sed viverra ipsum nunc. 
              Tristique senectus et netus et malesuada fames ac turpis egestas. Risus quis varius quam quisque id diam. </p>
          </div>

          <div className="about-value">
            <h3 className="bt-h3 bt-bold mb-2 about-header">Our Values</h3>
            <Row>
              <Col className="value-col">
                <div className="value">
                  <div className="value-content">
                    <img src={process.env.PUBLIC_URL + '/logo-placeholder-png.png'}></img>
                    <h6>test v1</h6>
                    <p>Mauris rhoncus aenean vel elit scelerisque. Consectetur adipiscing elit duis tristique.
                    Enim facilisis gravida neque convallis a cras.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="value-col">
                <div className="value">
                  <div className="value-content">
                    <img src={process.env.PUBLIC_URL + '/logo-placeholder-png.png'}></img>
                    <h6>test v2</h6>
                    <p>Aliquam malesuada bibendum arcu vitae elementum. Tortor dignissim convallis aenean et tortor at risus.
                    Nunc aliquet bibendum enim facilisis gravida neque.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="value-col">
                <div className="value">
                  <div className="value-content">
                    <img src={process.env.PUBLIC_URL + '/logo-placeholder-png.png'}></img>
                    <h6>test v3</h6>
                    <p>Mauris vitae ultricies leo integer. Pellentesque habitant morbi tristique senectus.
                    Integer quis auctor elit sed vulputate. Nibh tellus molestie nunc non blandit massa enim.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <NameForm/>
          </div>
        </div>
    );
  }
}

export default About;