 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams,useNavigate } from "react-router-dom";
import './style.css';
import Headermain from '../../header';

const Notificationman = ({ notificationsLength }) => {
  const [notifications, setNotifications] = useState([]);
  const { userid } = useParams();
  const managerId = userid;
  const navigate = useNavigate(); // Initialize navigate


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/notifications/manager/${managerId}`);
        const data = response.data;

        let notificationArray = [];
        let id = 0;

        if (data.request) {
          notificationArray.push({ id: id++, type: 'royalty', message: data.request });
        }

        setNotifications(notificationArray);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [managerId]);

  const handleCardClick = (id, type) => {
    try {
      let endpoint = '';
      if (type === 'royalty') {
        endpoint = `/manager/${managerId}/update-flags`;
      }

      if (endpoint) {
        axios.patch(`http://localhost:8085/notifications${endpoint}`)
          .then(() => {
            setNotifications(notifications.filter(notification => notification.id !== id));
          })
          .catch(error => {
            console.error('Error updating notification flags:', error);
          });
      }
    } catch (error) {
      console.error('Error updating notification flags:', error);
    }
  };

  const [contracts, setContracts] = useState([]);
  const [refresh, setRefresh] = useState(false); // Add a refresh state

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        console.log(`Fetching contracts for user ID: ${managerId}`);
        const response = await axios.get(`http://localhost:8084/contracts/pending/${managerId}`);
        setContracts(response.data);
        console.log('Contracts fetched:', response.data);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    fetchContracts();
  }, [managerId, refresh]); // Include managerId and refresh in the dependency array

  const handleAccept = async (contract) => {
    try {
      console.log(contract.contractId);
      // Update artist_id in the manager table
      await axios.put(`http://localhost:8084/contracts/artists/${contract.artistId}`, { managerId });

      // Update contract status to accepted
      await axios.put(`http://localhost:8084/contracts/${contract.contractId}`, { status: 'accepted' });

      // Update the local state to reflect the changes
      setContracts((prevContracts) => 
        prevContracts.map((c) => 
          c.contractId === contract.contractId ? { ...c, status: 'accepted' } : c
        )
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error('Error accepting contract:', error);
    }
  };

  const handleReject = async (contractId) => {
    try {
      console.log(contractId);
      // Delete the contract
      await axios.delete(`http://localhost:8084/contracts/${contractId}`);

      // Update the local state to remove the deleted contract
      setContracts((prevContracts) => 
        prevContracts.filter((contract) => contract.contractId !== contractId)
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error('Error rejecting contract:', error);
    }
  };
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Notification</title>
        </Helmet>

         {/* Back Button */}
         <button onClick={handleBack} >
          Back
        </button>

        <div className="notifications-list">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="notification-card"
              onClick={() => handleCardClick(notification.id, notification.type)}
            >
              <h5>{notification.type}</h5>
              <p>{notification.message}</p>
            </div>
          ))}
        </div>

        <div>
          <h2>Contracts for Manager ID: {managerId}</h2>
          <table>
            <thead>
              <tr>
                <th>Contract ID</th>
                <th>Artist ID</th>
                <th>Manager Percentage</th>
                <th>Artist Percentage</th>
                <th>Contract Start Date</th>
                <th>Contract End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.contractId}>
                  <td>{contract.contractId}</td>
                  <td>{contract.artistId}</td>
                  <td>{contract.managerPercentageOfRoyalty}</td>
                  <td>{contract.artistPercentageOfRoyalty}</td>
                  <td>{contract.contractStartDate}</td>
                  <td>{contract.contractEndDate}</td>
                  <td>{contract.status}</td>
                  <td>
                    {contract.status !== 'accepted' && (
                      <>
                        <button onClick={() => handleAccept(contract)} disabled={contract.status === 'accepted'}>
                          Accept
                        </button>
                        <button onClick={() => handleReject(contract.contractId)}>
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Headermain notificationsLength={notificationsLength} />
      </section>
    </HelmetProvider>
  );
};

export default Notificationman;
