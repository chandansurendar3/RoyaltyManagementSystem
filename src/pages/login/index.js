import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta, introdata, tabletitle, ArtistDetails } from "../../content_option";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { Cards } from "../cards";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Headermain from "../../header";
import axios from "axios";
import LineChart from "../linechart";
import { useAuth } from "../auth";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [show, setShow] = useState(false);
  const [formType, setFormType] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ artist: [], manager: [] });
  const [filteredResults, setFilteredResults] = useState({ artist: [], manager: [] });

// fetching the data for input box and storing it in a variable serch reasult
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/dashboard/admin/artists-managers"
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    };

    fetchData();
  }, []);


  //to get the final out of input searched
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    const filteredResults = Object.entries(searchResults).reduce(
      (acc, [category, data]) => {
        const filteredData = Object.entries(data).filter(([id, name]) =>
          name.toLowerCase().includes(value.toLowerCase())
        );
        return { ...acc, [category]: filteredData };
      },
      {}
    );
    setFilteredResults(filteredResults);
  };

  const handleClose = () => setShow(false);
  const handleShow = (type) => {
    setFormType(type);
    setShow(true);
  };


// sharvya's module----------------------------------------------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log('Form Data:', data);
    console.log("company" in data);

    const endpoint = formType === 'manager' ? 'http://localhost:8900/user/register/manager' : 'http://localhost:8900/user/register/artist';
    
    try {
      const response = await axios.post(endpoint, data);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }

    handleClose();
  };

  //sharvya's module end--------------------------------------------------------------------------------



  //to showcase the top arstsist
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/dashboard/admin/top-artists');
        setTableData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  //to showcase the top manager
  const [managerData, setManagerData] = useState([]);
  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/dashboard/admin/top-managers');
        setManagerData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchManagerData();
  }, []);

  return (
    <HelmetProvider>
      <Headermain page="adminDash" />
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <h1 className="fontty">Admin Dashboard</h1>
        <div className="Appssss">
          <div className="AppGlassss">
            <div className="MainDashsss">
              <br />
             
              <br />
              <form>
                <div className="container al-c mt-3 d-flex">
                  <input
                     className={`form__field me-3 ${searchQuery.length > 0 ? 'active' : ''}`}
                    type="text"
                    name="input"
                    placeholder="Search for Artist or Manager"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Dropdown>
                    <Dropdown.Toggle className="ac_btn" variant="success" id="dropdown-basic">
                      Add
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleShow('manager')}>Add Manager</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleShow('artist')}>Add Artist</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </form>
              {searchQuery.length > 0 && (
                <div className="container al-c mt-3 d-flex">
                  <div style={{ background: 'linear-gradient(to bottom, black, white)', color: 'black', padding: '10px', borderRadius: '5px', maxWidth: '200px', overflow: 'auto' }}>
                    {Object.entries(filteredResults).map(([category, data]) => (
                      <div key={category}>
                        <h2>{category.toUpperCase()}</h2>
                        <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                          {data.map(([id, name]) => (
                            <li key={id}>
                              <Link
                                to={`/${category === 'artist' ? 'artistdetailss' : 'managerdetailing'}/${id}`}
                              >
                                {name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <br />
              <LineChart />
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{formType === 'manager' ? 'Add Manager' : 'Add Artist'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>{formType === 'manager' ? 'Enter Manager Details' : 'Enter Artist Details'}</Form.Label>
                <Form.Control
                  className="form__field me-3"
                  type="text"
                  name="username"
                  placeholder={formType === 'manager' ? 'User name *' : 'User name *'}
                  required
                  autoFocus
                />
                <br />
                {formType !== 'Genre' && (
                  <Form.Control
                    className="form__field me-3"
                    type="password"
                    name="password"
                    placeholder={formType === 'manager' ? 'Password *' : 'Password *'}
                    required
                  />
                )}
                <br />
                <Form.Control
                  className="form__field me-3"
                  type="text"
                  name="country"
                  placeholder={formType === 'manager' ? 'Country *' : 'Country *'}
                  required
                />
                <br />
                <Form.Control
                  className="form__field me-3"
                  type="email"
                  name="emailid"
                  placeholder={formType === 'manager' ? 'email *' : 'email *'}
                  required
                />
                <br />
                <Form.Control
                  className="form__field me-3"
                  type="text"
                  name={formType === 'manager' ? 'managerName' : 'stageName'}
                  placeholder={formType === 'manager' ? 'Manager Name *' : 'Stage Name *'}
                  required
                />
                <br />
                <Form.Control
                  className="form__field me-3"
                  type="text"
                  name={formType === 'manager' ? 'company' : 'realName'}
                  placeholder={formType === 'manager' ? 'Company Name *' : 'Real Name *'}
                  required
                />
                <br />
                <Form.Control
                  className="form__field me-3"
                  type="text"
                  name="phoneNo"
                  placeholder={formType === 'manager' ? 'Phone Number *' : 'Phone Number'}
                  required
                />
              </Form.Group>
              <Button className="ac_btn" variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button className="ac_btn" variant="secondary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <br />
        <br />
        <Row className=" sec_sp">
          <Col lg="4">
            <h3 className="color_sec py-2">Top Artist For Today</h3>
          </Col>
          <Col lg="7">
            <table className="table caption-top">
              <tbody>
                {/* Render table title */}
                {tabletitle.map((data, i) => (
                  <tr key={i}>
                    <th scope="row">{data.ArtistNumber}</th>
                    <th className="text-red">{data.ArtistName}</th>
                    <th className="text-red">{data.Manager}</th>
                    <th className="text-red">{data.Stream}</th>
                    <th className="text-red">{data.Country}</th>
                    <th className="text-red">{data.Revenue}</th>
                  </tr>
                ))}
                {/* Render table data */}
                {tableData.map((data, i) => (
                  <tr key={i}>
                    <td scope="row">
                      <Link to={`/artistdetailss/${data.Artistid}`}>{data.Artistid}</Link>
                    </td>
                    <td>{data.ArtistName}</td>
                    <td>{data.Manager}</td>
                    <td>{data.Totalstream}</td>
                    <td>{data.Country}</td>
                    <td>{data.Revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>

        <Row className=" sec_sp">
          <Col lg="4">
            <h3 className="color_sec py-2">Top Manager For Today</h3>
          </Col>
          <Col lg="7">
            <table className="table caption-top">
              <tbody>
                {/* Render table title */}
                {tabletitle.map((data, i) => (
                  <tr key={i}>
                    <th scope="row">Manager ID</th>
                    <th className="text-red">Manager Name</th>
                    <th className="text-red">Company</th>
                    <th className="text-red">Total Streams</th>
                    <th className="text-red">Revenue</th>
                  </tr>
                ))}
                {/* Render table data */}
                {managerData.map((data, i) => (
                  <tr key={i}>
                    <td scope="row">
                      <Link to={`/managerdetailing/${data.Managerid}`}>{data.Managerid}</Link>
                    </td>
                    <td>{data.ManagerName}</td>
                    <td>{data.Company}</td>
                    <td>{data.Totalstream}</td>
                    <td>{data.Revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>

        {/* code for notification card    */}
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

export default Login;
