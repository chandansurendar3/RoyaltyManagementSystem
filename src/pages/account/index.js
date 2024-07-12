import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useParams } from "react-router-dom";
import {
  dataabout,
  meta,

  skills,
  services,
  introdata
} from "../../content_option";
import Modal from 'react-bootstrap/Modal';
import {Button, Form} from "react-bootstrap";


export const Account = () => {
  const { userid } = useParams();
  console.log(userid)
  const userId = userid;
  const [show, setShow] = useState(false);
  const [showone, setShowone] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [artists, setArtists] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');
  const [managerPercentage, setManagerPercentage] = useState('');
  const [artistPercentage, setArtistPercentage] = useState('');
  const [contractStartDate, setContractStartDate] = useState('');
  const [contractEndDate, setContractEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const manager_useid = userId;
  const handleCloseone = () => {
    setShowone(false);
    setShow(false); // Ensure the first modal also closes
  };
  const navigate = useNavigate();
  const handleShowone = () => setShowone(true);
  const [userDetails, setUserDetails] = useState({});
  
    const [artistDetails, setArtistDetails] = useState({});
    const [managerDetails, setManagerDetails] = useState({});
    const [emailForm, setEmailForm] = useState({});
    const [countryForm, setCountryForm] = useState({});
    const [companyForm, setCompanyForm] = useState({});
    const [phoneForm, setPhoneForm] = useState({});
    const [userType, setUserType] = useState('');
    const [username, setUsername] = useState('');
    const [artistIds, setArtistIds] = useState([]);
    const [managerName, setManagerName] = useState([]);
    const [editing, setEditing] = useState({ email: false, country: false, phone_no: false });
 
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response =   await axios.get(` http://localhost:8095/api/user-details/${userId}`);
                setUserDetails(response.data.user);
                console.log(response.data);
                setEmailForm({ emailid: response.data.user.emailid });
                console.log(emailForm)
                // console.log(response.data.manager.manager_name)
                const userType = response.data.user.userType;
                setUserType(userType);
                setUsername(response.data.user.username);
 
                if (userType === 'ARTIST') {
                  
                    setArtistDetails(response.data.artist);
                    setCountryForm({ country: response.data.artist.country });
                    setPhoneForm({ phone_no: response.data.artist.phone_no });
                    setManagerName(response.data.managerName);
                   // setManagerDetails({ managerName: response.data.artist.managerid})
                } else if (userType === 'MANAGER') {
                    setManagerDetails(response.data.manager);
                    setCompanyForm({company: response.data.manager.company });
                    console.log( response.data.manager.company)
                    //setPhoneForm({ phone: response.data.manager.phone });
                    
 
                    // const artistIdsResponse = await axios.get(`http://localhost:8095/api/user-details/getArtists/${userId}`);
                    // setArtistIds(artistIdsResponse.data);
                    // console.log(artistIdsResponse);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserDetails();
    }, [userId]);
 
    const handleEmailFormChange = (e) => {
        const { name, value } = e.target;
        setEmailForm({ ...emailForm, [name]: value });
    };
 
    const handleCountryFormChange = (e) => {
        const { name, value } = e.target;
        setCountryForm({ ...countryForm, [name]: value });
    };
 
    const handleCompanyFormChange = (e) => {
        const { name, value } = e.target;
        setCompanyForm({ ...companyForm, [name]: value });
    };

 
    const handlePhoneFormChange = (e) => {
        const { name, value } = e.target;
        setPhoneForm({ ...phoneForm, [name]: value });
    };
 
    const handleEmailFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8095/api/user-details/${userId}/email`, emailForm);
            setUserDetails({ ...userDetails, emailid: emailForm.emailid });
            setEditing({ ...editing, email: false });
        } catch (error) {
            console.error("Error updating email:", error);
        }
    };
 
    const handleCountryFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userType === 'ARTIST') {
                await axios.put(`http://localhost:8095/api/user-details/artists/${userId}`, countryForm);
                setArtistDetails({ ...artistDetails, country: countryForm.country });
            }
             else if (userType === 'manager') {
                await axios.put(`http://localhost:8095/api/user-details/managers/${userId}`, companyForm);
                setManagerDetails({ ...managerDetails, company: companyForm.company });
            }
            setEditing({ ...editing, company: false });
        } catch (error) {
            console.error("Error updating country:", error);
        }
    };
 
    const handleCompanyFormSubmit = async (e) => {
        e.preventDefault();
        try {
          
             if (userType === 'MANAGER') {
                await axios.put(`http://localhost:8095/api/user-details/managers/${userId}`, companyForm);
                setManagerDetails({ ...managerDetails, company: companyForm.company });
            }
            setEditing({ ...editing, country: false });
        } catch (error) {
            console.error("Error updating company:", error);
        }
    };
   
 
    const handlePhoneFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userType === 'ARTIST') {
                await axios.put(`http://localhost:8095/api/user-details/artists/${userId}`, phoneForm);
                setArtistDetails({ ...artistDetails, phone_no: phoneForm.phone_no });
            } //else if (userType === 'manager') {
            //     await axios.put(`http://localhost:8095/api/user-details/managers/${userId}`, phoneForm);
            //     setManagerDetails({ ...managerDetails, phone: phoneForm.phone });
            // }
            setEditing({ ...editing, phone_no: false});
        } catch (error) {
            console.error("Error updating phone number:", error);
        }
    };


    const handlepass = () => {
      navigate(`/change-password/${userid}/${username}/${userType}`);
    };

    useEffect(() => {
      const fetchArtists = async () => {
          try {
              const response = await axios.get('http://localhost:8084/contracts/managers/allManagers');

              setManagers(response.data);
          } catch (error) {
              console.error('Error fetching artists:', error);
          }
      };

      fetchArtists();
  }, []);

  const handleManagerPercentageChange = (e) => {
      let value = e.target.value;
      // Restrict input to two digits
      if (value.length > 2) {
          value = value.slice(0, 2);
      }
      setManagerPercentage(value);
      // Update artist percentage
      setArtistPercentage(value ? (100 - parseInt(value)).toString() : '');
  };

  const handleArtistPercentageChange = (e) => {
      let value = e.target.value;
      // Restrict input to two digits
      if (value.length > 2) {
          value = value.slice(0, 2);
      }
      setArtistPercentage(value);
      // Update manager percentage
      setManagerPercentage(value ? (100 - parseInt(value)).toString() : '');
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      setContractStartDate(contractStartDate.split('T')[0]);
      setContractEndDate(contractEndDate.split('T')[0]);
      console.log(contractStartDate)
      const formData = {
          managerId: selectedManager, // example manager ID
          artistId: userid,
          contractStartDate: contractStartDate,
          contractEndDate: contractEndDate,
          managerPercentageOfRoyalty: managerPercentage,
          artistPercentageOfRoyalty: artistPercentage,
          approach: 'ARTIST'
      };
      axios.post('http://localhost:8084/contracts/save', formData)
          .then(response => {
              console.log(response.data);
              // Optionally reset the form values
              setSelectedManager('');
              setManagerPercentage('');
              setArtistPercentage('');
              setContractStartDate('');
              setContractEndDate('');
              handleCloseone();
          })
          .catch(error => console.error(error));
  };


  
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/dashboard/manager/top5-artists/${userId}`);
        setTableData(response.data);
        console.log (tableData.ArtistName)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Adjust as needed

  // Logic to calculate the index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Slice the array to get the current items
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle pagination item click
  const handlePaginationClick = (pageNumber) => {
      setCurrentPage(pageNumber);
  };
  
  const handleButtonClick = () => {
    console.log("Button clicked!");
    navigate(`/account/${userId}`);
  };

  
  const handleButtonClicktransaction = () => {
    console.log("Button clicked!");
    navigate(`/transaction/${userId}`);
  };

   

    

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          {/* Meta tags */}
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <div className="intro_sec d-block d-lg-flex align-items-center">
          <div
            className="h_bg-image order-1 order-lg-2 h-25 "
            style={{ backgroundImage: `url(${introdata.your_img_url_six})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
                <h2 className="mb-1x">Profile</h2>
                <br></br>
                <div>
            <h2>User Details</h2>
            <p>User ID: {userId}</p>
            <p>Username: {username}</p>
            {/* <p>Username: {userDetails.username}</p> */}
 
            <div>
                <h3>Email</h3>
                
                {!editing.email ? (
                    <div>
                        <h3>{userDetails.emailid}</h3>
                        <button onClick={() => setEditing({ ...editing, email: true })}>Edit Email</button>
                    </div>
                ) : (
                    <form onSubmit={handleEmailFormSubmit}>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="emailid"
                              //  value={emailForm.emailid || ""}
                                onChange={handleEmailFormChange}
                            />
                        </label>
                        <button type="submit">Update Email</button>
                        <button onClick={() => setEditing({ ...editing, email: false })}>Cancel</button>
                    </form>
                )}
            </div>
 
            {userType === 'ARTIST' && (
                <div>
                    <h2>Artist Details</h2>
                    <div>
                        <h3>Country</h3>
                        {!editing.country ? (
                            <div>
                                <p>{artistDetails.country}</p>
                                <button onClick={() => setEditing({ ...editing, country: true })}>Edit Country</button>
                            </div>
                        ) : (
                            <form onSubmit={handleCountryFormSubmit}>
                                <label>
                                    Country:
                                    <input
                                        type="text"
                                        name="country"
                                        value={countryForm.country || ""}
                                        onChange={handleCountryFormChange}
                                    />
                                </label>
                                <button type="submit">Update Country</button>
                                <button onClick={() => setEditing({ ...editing, country: false })}>Cancel</button>
                            </form>
                        )}
                    </div>
 
                    <div>
                        <h3>Phone Number</h3>
                        {!editing.phone_no ? (
                            <div>
                                <p>{phoneForm.phone_no}</p>
                                <button onClick={() => setEditing({ ...editing, phone_no: true })}>Edit Phone Number</button>
                            </div>
                        ) : (
                            <form onSubmit={handlePhoneFormSubmit}>
                                <label>
                                    Phone Number:
                                    <input
                                        type="text"
                                        name="phone_no"
                                        value={phoneForm.phone_no || ""}
                                        onChange={handlePhoneFormChange}
                                    />
                                </label>
                                <button type="submit">Update Phone Number</button>
                                <button onClick={() => setEditing({ ...editing, phone_no: false })}>Cancel</button>
                            </form>
                        )}
                    </div>
                    <div>
                    ManagerId :{artistDetails.managerid || "no manager associated"}
                    <p>Manager Name: {managerName || "No manager associated"}</p>
                        </div>
                        {artistDetails.managerid === null && (
                        <Button className="ac_btn" variant="primary" onClick={handleShow}>
                Add
              </Button>
            )}
              
      
      
                        
                </div>
                
               )}  
            
            
 
            {userType === 'MANAGER' && (
                <div>
                    <h2>Manager Details</h2>
                     <div>
                        <h3>Company</h3>
                        {!editing.company ? (
                            <div>
                                <p>{companyForm.company}</p>
                                <button onClick={() => setEditing({ ...editing, company: true })}>Edit Company</button>
                            </div>
                        ) : (
                            <form onSubmit={handleCompanyFormSubmit}>
                                <label>
                                    Company: 
                                    <input
                                        type="text"
                                        name="company"
                                        value={companyForm.company || ""}
                                        onChange={handleCompanyFormChange}
                                    />
                                </label>
                                <button type="submit">Update Company</button>
                                <button onClick={() => setEditing({ ...editing, company: false })}>Cancel</button>
                            </form>
                        )}
                    </div>
 
                   
                </div>
            )}
            <Button onClick={handlepass}>change password</Button>
        </div>
              </div>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
         

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Terms And Condition</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <div>
                    
                    <div>
                      <p>Donec pellentesque vulputate metus et varius. Curabitur congue ligula dolor, sed gravida ex vestibulum rutrum. Maecenas laoreet lectus et ligula accumsan rutrum. Curabitur laoreet lacus ac nunc consectetur, in pulvinar lacus volutpat. Cras dictum tincidunt tellus, quis auctor lacus consequat vitae. Pellentesque mattis dapibus turpis non fringilla. Quisque bibendum leo non nibh interdum mattis vehicula eu est. Aliquam eu bibendum felis.

Vestibulum suscipit, ante in posuere ullamcorper, sapien risus aliquet quam, in aliquam quam ipsum ut nulla. Donec vulputate sapien ut iaculis fringilla. Sed commodo nibh id lorem finibus, sed rhoncus urna imperdiet. Integer eget dignissim augue. Suspendisse pellentesque magna odio, eget tempus libero ultricies sed. Pellentesque hendrerit sapien condimentum justo fringilla semper ut ut lacus. Duis dictum, nunc ut sollicitudin dapibus, augue augue efficitur eros, vitae volutpat velit ligula in massa. Vivamus ut condimentum sem, eget laoreet magna.</p>
                    </div>
                  </div>




                </Modal.Body>
                <Modal.Footer>
                  <>
                    <Button className="ac_btn" variant="primary" onClick={handleShowone} >
                      Accept
                    </Button>

                    <Modal show={showone} onHide={handleCloseone}>
                      <Modal.Header closeButton>
                        <Modal.Title>term and condition</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Form className="contract-form" onSubmit={handleSubmit}>
                        <label>Manager</label>
                        <select value={selectedManager} onChange={e => setSelectedManager(e.target.value)}>
                            <option value="">Select an Manager</option>
                            {managers.map(manager => (
                                <option key={manager.managerid} value={manager.managerid}>
                                    {manager.managerid}
                                    {manager.managerName}
                                </option>
                            ))}
                        </select>
                        <p>artist_id {userId}</p>
                        ?
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
