
import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Button, Modal, Form, Pagination } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import LineChartManager from "../linechartmanager";
import Headermain from "../../header";
import "./style.css";




export const ManagerDash = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [managerPercentage, setManagerPercentage] = useState('');
  const [artistPercentage, setArtistPercentage] = useState('');
  const [contractStartDate, setContractStartDate] = useState('');
  const [contractEndDate, setContractEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [showone, setShowone] = useState(false);
  const [role, setRole] = useState(''); // Role state

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseone = () => {
    setShowone(false);
    setShow(false); // Ensure the first modal also closes
  };
  const handleShowone = () => setShowone(true);
  const navigate = useNavigate();
  const { userid } = useParams();

  console.log('User ID:', userid);

  const manager_useid = userid;

  useEffect(() => {
    // Fetch the role here, assuming the role is fetched from the backend
    // const fetchRole = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:8083/role/${userid}`);
    //     setRole(response.data.role);
    //   } catch (error) {
    //     console.error('Error fetching role:', error);
    //   }
    // };

    // fetchRole();

    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:8083/contracts/artists/nullManagerId');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, [userid]);

  const handleManagerPercentageChange = (e) => {
    let value = e.target.value;
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    setManagerPercentage(value);
    setArtistPercentage(value ? (100 - parseInt(value)).toString() : '');
  };

  const handleArtistPercentageChange = (e) => {
    let value = e.target.value;
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    setArtistPercentage(value);
    setManagerPercentage(value ? (100 - parseInt(value)).toString() : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContractStartDate(contractStartDate.split('T')[0]);
    setContractEndDate(contractEndDate.split('T')[0]);
    console.log(contractStartDate);
    const formData = {
      managerId: manager_useid,
      artistId: selectedArtist,
      contractStartDate: contractStartDate,
      contractEndDate: contractEndDate,
      managerPercentageOfRoyalty: managerPercentage,
      artistPercentageOfRoyalty: artistPercentage,
      approach: 'MANAGER'
    };
    axios.post('http://localhost:8083/contracts/save', formData)
      .then(response => {
        console.log(response.data);
        setSelectedArtist('');
        setManagerPercentage('');
        setArtistPercentage('');
        setContractStartDate('');
        setContractEndDate('');
        handleCloseone(); // Close the modals after submitting
      })
      .catch(error => console.error(error));
  };

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/dashboard/manager/top5-artists/${userid}`);
        setTableData(response.data);
        console.log(tableData.ArtistName);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userid]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleButtonClick = () => {
    console.log("Button clicked!");
    navigate(`/account/${userid}`);
  };

  const handleButtonClickTransaction = () => {
    console.log("Button clicked!");
    navigate(`/transaction/${userid}`);
  };

  return (
    <HelmetProvider>
      <Headermain page="managerDash" />
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Manager Dashboard</title>
          <meta name="description" content="Manager Dashboard" />
        </Helmet>

        <div className="Appss">
          <div className="AppGlass">
            <div className="MainDashss">
              <br></br>
              <h1>Manager Dashboard</h1>
              <br></br>
              <LineChartManager userid={userid} />
              <br></br>
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

        <br></br>
        <br></br>
        <Row className="sec_sp">
          <Col lg="3">
            <h3 className="color_sec py-3 px-3">Your Artist</h3>
          </Col>
          <Col lg="7">
            <table className="table caption-top">
              <tbody>
                {currentItems.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td scope="row">{data.Artistid}</td>
                      <td>{data.ArtistName}</td>
                      <td>{data.Revenue}</td>
                      <td>{data.Totalstream}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination>
              {Array.from({ length: Math.ceil(tableData.length / itemsPerPage) }).map((_, index) => (
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
                  <Modal.Title>Terms And Condition</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <div>
                      <p>
                        Donec pellentesque vulputate metus et varius. Curabitur congue ligula dolor, sed gravida ex vestibulum rutrum. Maecenas laoreet lectus et ligula accumsan rutrum. Curabitur laoreet lacus ac nunc consectetur, in pulvinar lacus volutpat. Cras dictum tincidunt tellus, quis auctor lacus consequat vitae. Pellentesque mattis dapibus turpis non fringilla. Quisque bibendum leo non nibh interdum mattis vehicula eu est. Aliquam eu bibendum felis.
                        Vestibulum suscipit, ante in posuere ullamcorper, sapien risus aliquet quam, in aliquam quam ipsum ut nulla. Donec vulputate sapien ut iaculis fringilla. Sed commodo nibh id lorem finibus, sed rhoncus urna imperdiet. Integer eget dignissim augue. Suspendisse pellentesque magna odio, eget tempus libero ultricies sed. Pellentesque hendrerit sapien condimentum justo fringilla semper ut ut lacus. Duis dictum, nunc ut sollicitudin dapibus, augue augue efficitur eros, vitae volutpat velit ligula in massa. Vivamus ut condimentum sem, eget laoreet magna.
                      </p>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <>
                    <Button className="ac_btn" variant="primary" onClick={handleShowone}>
                      Accept
                    </Button>

                    <Modal show={showone} onHide={handleCloseone}>
                      <Modal.Header closeButton>
                        <Modal.Title>Contract</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form className="contract-form" onSubmit={handleSubmit}>
                          <label>Artist</label>
                          <select value={selectedArtist} onChange={e => setSelectedArtist(e.target.value)}>
                            <option value="">Select an artist</option>
                            {artists.map(artist => (
                              <option key={artist.artistid} value={artist.artistid}>
                                {artist.artistid} - {artist.realName}
                              </option>
                            ))}
                          </select>
                          <p>Manager ID: {userid}</p>
                          <label>Manager Percentage</label>
                          <input type="number" value={managerPercentage} onChange={handleManagerPercentageChange} max="100" />
                          <label>Artist Percentage</label>
                          <input type="number" value={artistPercentage} onChange={handleArtistPercentageChange} max="100" />
                          <label>Contract Start Date</label>
                          <input type="date" value={contractStartDate} onChange={e => setContractStartDate(e.target.value)} />
                          <label>Contract End Date</label>
                          <input type="date" value={contractEndDate} onChange={e => setContractEndDate(e.target.value)} />
                          <button type="submit">Submit</button>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        {/* <Button variant="secondary" onClick={handleCloseone}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseone}>
                          Save Changes
                        </Button> */}
                      </Modal.Footer>
                    </Modal>
                  </>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
