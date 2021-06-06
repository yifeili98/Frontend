import React from 'react'
import '../../assets/css/home.css';
import { Link } from "react-router-dom";
import districtLogo from '../../assets/pic/logo_district.png';

export default function Home() {
    return (
        <div className="home">
            <div className="container">
                <div className="left">
                    <img
                        src={districtLogo}
                        alt="" 
                    />
                </div>
                <div className="right">
                    <h1>FHDA Time</h1>
                    <p className="description">Some description here</p>
                    <div className="divider"></div>
                    <p className="content">
                        More about this project. asdasdasdsa asdasdasd. 
                        skasdkasldasdasdamsdlmas;dmas;dmas;ldm;asmdsa/ 
                        askdaksd;asmda;sdm .asdlkasndasd;sa 
                        More about this project. asdasdasdsa asdasdasd. 
                        skasdkasldasdasdamsdlmas;dmas;dmas;ldm;asmdsa/ 
                        askdaksd;asmda;sdm .asdlkasndasd;sa 
                    </p>
                    <Link className="searchbutton" to="/catalog">Catalog</Link>
                </div>
            </div>
            
        </div>
    )
}
