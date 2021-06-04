import React from 'react'
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Story from './pages/story/Story';
import About from './pages/about/About';
import {Route, Link} from "react-browser-router";
import './assets/css/App.css';
import {Nav, Navbar} from 'react-bootstrap';
import da_logo from './assets/pic/fhdalogo.jpg';

export default function App() {
    return (
        <div className="App">
            <Navbar bg="red" variant="dark" className="navbar">
                <Navbar.Brand href="/" className="navbar-brand">
                    <img className="navbar-img" src={da_logo} alt=""/>
                    {' '}FHDATime
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/search">Search</Nav.Link>
                    <Nav.Link href="/story">Story</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
            </Navbar>


            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/story" component={Story} />
            <Route exact path="/about" component={About} />
        </div>
        
    )
}
