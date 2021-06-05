import React from "react";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Story from "./pages/story/Story";
import About from "./pages/about/About";
import { Route, Link } from "react-router-dom";
import "./assets/css/App.css";
import { Nav, Navbar } from "react-bootstrap";
import da_logo from "./assets/pic/fhdalogo.jpg";

export default function App() {
  return (
    <div className="App">
      <Navbar bg="red" variant="dark" className="navbar">
        <Navbar.Brand href="/" className="navbar-brand">
          <img className="navbar-img" src={da_logo} alt="" /> FHDATime
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/catalog">Catalog</Link>
          <Link className="nav-link" to="/story">Story</Link>
          <Link className="nav-link" to="/about">About</Link>
        </Nav>
      </Navbar>

      <Route exact path="/" render={ (routerProps) => < Home routerProps={routerProps} />} />
      <Route exact path="/catalog" render={ (routerProps) => < Catalog routerProps={routerProps} />} />
      <Route exact path="/story" render={ (routerProps) => < Story routerProps={routerProps} />} />
      <Route exact path="/about" render={ (routerProps) => < About routerProps={routerProps} />} />
    </div>
  );
}
