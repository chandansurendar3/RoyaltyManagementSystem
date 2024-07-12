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
import  { useState, useEffect } from "react";
import Pagination from 'react-bootstrap/Pagination';
import {
  dataabout,
  skills,
  services,
  tabletitle,
  ArtistDetails,
  tabletitlemanager,
  tabletitlemanagerData,
} from "../../content_option";
import Headermain from "../../header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ManagerDetailing = () => {
  const navigate = useNavigate();

  const { managerNumber } = useParams();
  console.log(managerNumber);

  const [tableData, setTableData] = useState([]);
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/dashboard/manager/top5-artists/${managerNumber}`);
        setTableData(response.data);
        console.log (tableData.ArtistName)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const [userData, setuserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/dashboard/manager-company/${managerNumber}`);
        setuserData(response.data);
       console.log("user",userData)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8082/dashboard/manager-company/${managerNumber}`);
  //       setTableData(response.data);
  //       console.log (userData)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

    // Define state for current page
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

    const handleDeleteUser = async (managerNumber) => {
      try {
        await axios.delete(`http://localhost:8082/user/register/delet/${managerNumber}`);
        // setUsers(users.filter(user => user.userid !== managerNumber));
        navigate(`/login`); 
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };



  return (
    <HelmetProvider>
     <Headermain  page="adminDash" /> 
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>


        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div
            className="h_bg-image order-1 order-lg-2 h-100 "
            style={{ backgroundImage: `url(${introdata.your_img_url_five})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
                {/* <h2 className="mb-1x">{introdata.title}</h2> */}
                <h1 className="mb-1x"><b>{userData.ManagerName}</b></h1>
                <br></br>
                <h2 >Company: </h2>
                <h1 className="fluidz-48 mb-1x">
                {userData.Company}
                </h1>
                <p className="mb-1x">Meet {userData.ManagerName} , a seasoned music manager whose name resonates within the industry for his adept guidance and strategic vision. As a prominent figure in the realm of artist management, Saleh's expertise extends beyond merely overseeing the careers of musicians; rather, he serves as a key architect, shaping the trajectories of artists' careers. With a keen eye for talent and a knack for navigating the ever-evolving landscape of the music industry, Saleh epitomizes the vital role played by a music manager in fostering the success of artists like never before.



</p>

              </div>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>

        <div className="intro_sec d-block d-lg-flex align-items-center">
          <div
            className="h_bg-image order-1 order-lg-1 h-100"
            
          >        <div className="Apps">
          <div className="AppGlass">
            <div className="MainDashs">
              <br></br>
 <h2> facts on pandaora</h2> 
 <p> As a royalty management company, Pandora would be responsible for collecting and distributing royalties to artists and rights holders for the use of their music on the platform. This involves negotiating licensing agreements, tracking usage data, and ensuring legal compliance. Using technology and data analytics, Pandora would calculate and distribute royalties transparently, maintaining relationships with industry stakeholders and operating on a global scale.
<br></br>
<br></br>
<p>Pandora, as a royalty management company, acts as the intermediary between music creators and users of their content. It negotiates licensing deals with record labels and publishers, ensuring legal compliance and fair compensation. Using advanced technology, Pandora tracks usage data to accurately calculate royalties owed to rights holders. It maintains transparent reporting practices and fosters relationships within the music industry to operate effectively on a global scale.</p>

</p>

              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              {/* <Table /> */}
            </div>
          </div>
        </div></div>
          <div className="text order-2 order-lg-2 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center">
              <div className="intro mx-auto">
                <h2 className="mb-1x">Songs Revenue</h2>
                <br></br>
                <Row className=" sec_sp">

          <Col lg="7">
            <table className="table caption-top">
              <tbody>
              {tabletitlemanager.map((data, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row" >{data.Artistid}</th>
                      <th className="text-red">{data.ArtistName}</th>
                      <th className="text-red">{data.Revenue}</th>
                      <th className="text-red">{data.Totalstream}</th>
                    </tr>

                  );
                })}
                  

                    
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
        {Array.from({ length: Math.ceil(tabletitlemanagerData.length / itemsPerPage) }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePaginationClick(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      <button className="text_2" onClick={() => handleDeleteUser(users.managerNumber)}  >
                      <div id="button_ppp" className="ac_btn btn ">
                        Delete the Manager
                        <div className="ring one"></div>
                        <div className="ring two"></div>
                        <div className="ring three"></div>
                      </div>
                    </button>
  
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
