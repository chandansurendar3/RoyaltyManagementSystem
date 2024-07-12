import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta, dataportfolio, artistfolio } from "../../content_option";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"; 
import { Cards } from "../cards";
import Table from "../table";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { Cardsadmin } from "../cardsadmin";
import {
  dataabout,
  skills,
  services,
  tabletitle,
  ArtistDetails,
} from "../../content_option";

export const ManagerDetailss = () => {
  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>


        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div
            className="h_bg-image order-1 order-lg-2 h-100 "
            style={{ backgroundImage: `url(${introdata.your_img_url_four})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
                {/* <h2 className="mb-1x">{introdata.title}</h2> */}
                <h2 className="mb-1x"><b>J Cole</b></h2>
                <br></br>
                <h3 className="mb-1x">Manager By: </h3>
                <h2 className="mb-1x">GOD</h2>
                <h1 className="fluidz-48 mb-1x">

                </h1>
                <p className="mb-1x">J. Cole is a critically acclaimed artist known for his introspective lyrics and storytelling ability. His music often delves into personal experiences, societal issues, and the complexities of human emotions, resonating deeply with fans. Combining soulful beats with thoughtful wordplay, his work bridges the gap between mainstream appeal and profound, reflective content. With a reputation for authenticity and a commitment to his craft, he continues to influence and inspire a diverse audience, leaving a lasting impact on the music industry.</p>

              </div>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>

        <div className="intro_sec d-block d-lg-flex align-items-center">
          <div
            className="h_bg-image order-1 order-lg-1 h-100"
            
          >        
            <div className="App">
              <div className="AppGlass">
                <div className="MainDash">
                  <br></br>

                  <h1>Dashboard</h1>
                  <br></br>

                  <br></br>
                  <Cardsadmin/>

                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  {/* <Table /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="text order-2 order-lg-2 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center">
              <div className="intro mx-auto">
                <h2 className="mb-1x">Songs Revenue</h2>
                <br></br>
                <Row className="sec_sp">
                  <Col lg="7">
                    <table className="table caption-top">
                      <tbody>
                        {tabletitle.map((data, i) => {
                          return (
                            <tr key={i}>
                              <th scope="row">{data.ArtistNumber}</th>
                              <th className="text-red">{data.ArtistName}</th>
                              <th className="text-red">{data.Manager}</th>
                              <th className="text-red">{data.Stream}</th>
                              <th className="text-red">{data.Genre}</th>
                              <th className="text-red">{data.Country}</th>
                              <th className="text-red">{data.Revenue}</th>
                            </tr>
                          );
                        })} 
                        {ArtistDetails.map((data, i) => {
                          return (
                            <tr key={i}>
                              <td scope="row">{data.ArtistNumber}</td>
                              <td>{data.ArtistName}</td>
                              <td>{data.Manager}</td>
                              <td>{data.Stream}</td>
                              <td>{data.Genre}</td>
                              <td>{data.Country}</td>
                              <td>{data.Revenue}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Col>
                </Row>    
              </div>
            </div>
          </div>
        </div>
        <br></br>
        
        <hr className="t_border my-4 ml-0" />
        <footer className="footer">
          <Container>
            <Row>
              <Col lg="4" md="6">
                <h5 className="footer-heading">Explore</h5>
                <ul className="list-unstyled footer-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/portfolio">Portfolio</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </Col>
              <Col lg="4" md="6">
                <h5 className="footer-heading">Connect</h5>
                <ul className="list-unstyled footer-social-links">
                  <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                  <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                </ul>
              </Col>
              <Col lg="4" md="12">
                <h5 className="footer-heading">Contact Us</h5>
                <ul className="list-unstyled footer-contact-info">
                  <li><i className="fas fa-envelope"></i> info@example.com</li>
                  <li><i className="fas fa-phone"></i> +1234567890</li>
                  <li><i className="fas fa-map-marker-alt"></i> 123 Street, City, Country</li>
                </ul>
              </Col>
            </Row>
          </Container>
        </footer>

      </section>
    </HelmetProvider>
  );
};
