import React, { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  meta,
  tabletitleartist,
  tabletitleartistData,
} from "../../content_option";
import { Link, useParams, useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { Bar } from 'react-chartjs-2';
import { Chart, BarController, CategoryScale, LinearScale, PointElement, BarElement, Tooltip, Legend } from 'chart.js';
import LineChartArtist from "../linechartartist";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Headermain from "../../header";
import axios from "axios";

// Register the required components
Chart.register(BarController, CategoryScale, LinearScale, PointElement, BarElement, Tooltip, Legend);

export const ArtistDash = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    artistId: userid,
    collabed: true,
    collaborationPct: 100,
    country: '',
    genre: '',
    releaseDate: '',
    title: '',
    collaborationArtistId: '',
    artist2Pct: 0
  });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [songData, setSongData] = useState([]);
  
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tabletitleartistData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.artistId = userid;
      const response = await axios.post('http://localhost:8088/api/songs', formData);
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      let newValue = value;
      if (name === 'collaborationPct') {
        newValue = value > 100 ? 100 : value;
        return {
          ...prevData,
          [name]: newValue,
          artist2Pct: 100 - newValue
        };
      }
      if (name === 'artist2Pct') {
        newValue = value > 100 ? 100 : value;
        return {
          ...prevData,
          [name]: newValue,
          collaborationPct: 100 - newValue
        };
      }
      return { ...prevData, [name]: newValue };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/dashboard/artist/top5-by-artist/${userid}`);
        setSongData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userid]);

  const handleButtonClick = () => {
    navigate(`/account/${userid}`);
  };

  const handleButtonClickTransaction = () => {
    navigate(`/transaction/${userid}`);
  };

  return (
    <HelmetProvider>
      <Headermain page="artistDash" />
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        
        <h1>Artist Dashboard</h1>
        <div className="Appss">
          <div className="AppGlass">
            <div className="MainDashss">
              <br />
              <LineChartArtist userid={userid} />
              <br />
              
              <br />
              <br />
            </div>
          </div>
        </div>
        <div className="card-containeroo">
                <div className="cardoo" onClick={handleButtonClick}>
                  <div className="card-bodyoo">
                    <h5 className="card-title">Go to Account</h5>
                  </div>
                </div>
                <div className="cardoo" onClick={handleButtonClickTransaction}>
                  <div className="card-bodyoo">
                    <h5 className="card-title">Go to Transaction History</h5>
                  </div>
                </div>
              </div>

        <br />
        <br />
        <Row className="sec_sp">
          <Col lg="3">
            <h3 className="color_sec py-3 px-3">Your Songs</h3>
          </Col>
          <Col lg="7">
            <table className="table caption-top">
              <tbody>
                {tabletitleartist.map((data, i) => (
                  <tr key={i}>
                    <th scope="row">{data.Songid}</th>
                    <th className="text-red">{data.SongName}</th>
                    <th className="text-red">{data.Collabarator}</th>
                    <th className="text-red">{data.Stream}</th>
                    <th className="text-red">{data.Revenue}</th>
                  </tr>
                ))}
                {songData.map((data, i) => (
                  <tr key={i}>
                    <td scope="row">{data.Songid}</td>
                    <td>{data.SongName}</td>
                    <td>{data.Collab}</td>
                    <td>{data.Stream}</td>
                    <td>{parseFloat(data.Revenue).toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination>
              {Array.from({ length: Math.ceil(tabletitleartistData.length / itemsPerPage) }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePaginationClick(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
            <>
              <Button className="ac_btn" variant="primary" onClick={handleShow}>
                Add
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Song</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                      <Form.Label>Song Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGenre">
                      <Form.Label>Genre</Form.Label>
                      <Form.Control
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Accordion defaultActiveKey={formData.collabed === true ? "0" : "1"}>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Featured song?</Accordion.Header>
                        <Accordion.Body>
                          <Form.Group className="mb-3" controlId="formCollabArtist">
                            <Form.Label>Collaborator Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="collaborationArtistId"
                              value={formData.collaborationArtistId}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formCollabPct">
                            <Form.Label>Collaboration Percentage</Form.Label>
                            <Form.Control
                              type="number"
                              name="collaborationPct"
                              value={formData.collaborationPct}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Modal>
            </>
          </Col>
        </Row>

        <br />
        <hr />
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
      </Container>
    </HelmetProvider>
  );
};

export default ArtistDash;