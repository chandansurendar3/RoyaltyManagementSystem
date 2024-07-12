import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta, dataportfolio, artistfolio } from "../../content_option";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"; 

export const Home = () => {
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
            style={{ backgroundImage: `url(${introdata.your_img_url_one})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
                <h2 className="mb-1x">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className="mb-1x">{introdata.description}</p>
                <div className="intro_btn-action pb-5">
                  <Link to="/portfolio" className="text_2">
                    <div id="button_p" className="ac_btn btn ">
                      Login
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
 
                </div>
              </div>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>

        <div className="intro_sec d-block d-lg-flex align-items-center">
          <div
            className="h_bg-image order-1 order-lg-1 h-100"
            style={{ backgroundImage: `url(${introdata.your_img_url_two})` }}
          ></div>
          <div className="text order-2 order-lg-2 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center">
              <div className="intro mx-auto">
                <h2 className="mb-1x">About Us</h2>
                <br></br>

                <p className="mb-1x">{introdata.description_two}</p>
                <p className="mb-1x">{introdata.description_three}</p>
                <p className="mb-1x">{introdata.description_four}</p>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <Row className="mb-5 mt-3 pt-md-3 justify-content-center text-center">
          <Col lg="8">
            <h3 className="display-4 mb-4">Familia artists</h3>
            <hr className="t_border my-4 ml-0" />
          </Col>
        </Row>

<div className="mb-5 po_items_ho">
  {artistfolio.map((data, i) => {
    return (
      <div key={i} className="po_item">
        <img src={data.img} alt="" className="bw-image" />
        <div className="content">
          <h3>{data.name}</h3>
          <p>{data.description}</p>
        </div>
      </div>
    );
  })}
</div>
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
