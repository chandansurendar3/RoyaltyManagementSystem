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
  tabletitleartist,
  tabletitleartistData,
} from "../../content_option";
import Headermain from "../../header";
import { useParams } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const ArtistDetailss = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [songData, setSongData] = useState([]); 
  const itemsPerPage = 5; // Adjust as needed
  const navigate = useNavigate();

  const totalPages = Math.ceil(songData.length / itemsPerPage);   
  // Logic to calculate the index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = songData.slice(indexOfFirstItem, indexOfLastItem);
  const { artistNumber } = useParams();

// Get the artistNumber from URL params

  // Now you can log or use the artistNumber as needed


  // Function to handle pagination item click
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePageChange = (pageNumber) => {    
setCurrentPage(pageNumber); 
};



  console.log(artistNumber);
 
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/dashboard/artist/${artistNumber}`);
        setTableData(response.data);
        console.log (tableData)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {    
     const fetchSongData = async () => {      
       try {         
        const response = await axios.get(`http://localhost:8082/dashboard/artist/top5-by-artist/${artistNumber}`);        
         setSongData(response.data);  // Assuming response.data is directly the array     
         } catch (error) {         
          console.error('Failed to fetch song data:', error); } };
           fetchSongData(); },
            [artistNumber]);

            // Calculate total pages


  // const [users, setUsers] = useState([]);
  const handleDeleteUser = async (artistNumber) => {
    try {
      await axios.delete(`http://localhost:8900/user/register/delet/${artistNumber}`);
      // setUsers(users.filter(user => user.userid !== artistNumber));
      navigate(`/login`); 

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const [userData, setuserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/dashboard/artist-manager/${artistNumber}`);
        setuserData(response.data);
       console.log("user",userData)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);






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
            style={{ backgroundImage: `url(${introdata.your_img_url_four})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
                {/* <h2 className="mb-1x">{introdata.title}</h2> */}
                <h2 className="mb-1x"><b>{userData.ArtistName}</b></h2>
                <br></br>
                <h3 className="mb-1x">Managed By:  </h3>
                <h2 className="mb-1x">{userData.ManagerName}</h2>
                <h1 className="fluidz-48 mb-1x">

                </h1>
                <p className="mb-1x">{userData.ArtistName} is a critically acclaimed artist known for his introspective lyrics and storytelling ability. His music often delves into personal experiences, societal issues, and the complexities of human emotions, resonating deeply with fans. Combining soulful beats with thoughtful wordplay, his work bridges the gap between mainstream appeal and profound, reflective content. With a reputation for authenticity and a commitment to his craft, he continues to influence and inspire a diverse audience, leaving a lasting impact on the music industry.</p>

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

              <h1>Coming In Future</h1>
              <br></br>

              <br></br>
              < Cardsadmin/>

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
                <h2 className="mb-1x">Songs Lists</h2>
                <br></br>
                <Row className=" sec_sp">

          <Col lg="7">
          <div>
     
      <table className ="table caption-top">
        <thead>
          <tr>
            <th>#</th>
            <th>Song Name</th>
            <th>Collaborator</th>
            <th>Streams</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.Songid}</td>
              <td>{item.SongName}</td>
              <td>{item.Collab}</td>
              <td>{item.Stream}</td>
              <td>{item.Revenue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
      
      <br></br>
      <button className="text_2" onClick={() => handleDeleteUser(artistNumber)}>
                      <div id="button_pp" className="ac_btn btn ">
                        Delete the Artist
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
