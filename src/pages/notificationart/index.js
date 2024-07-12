import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import './style.css';
import Headermain from '../../header';

const Notificationart = ({ notificationsLength }) => {
  const [notifications, setNotifications] = useState([]);
  const { userid } = useParams(); // Get userid from URL parameters

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/notifications/artist/${userid}`);
        const data = response.data;

        // Flatten the notifications
        let notificationArray = [];
        let id = 0;

        if (data.streams) {
          notificationArray.push({ id: id++, type: 'streams', message: data.streams });
        }

        if (data.payout && Array.isArray(data.payout)) {
          data.payout.forEach(msg => {
            notificationArray.push({ id: id++, type: 'payout', message: msg });
          });
        }

        if (data.request) {
          notificationArray.push({ id: id++, type: 'royalty', message: data.request });
        }

        setNotifications(notificationArray);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userid]);

  const handleCardClick = (id, type) => {
    if (type === 'payout') {
      setNotifications(notifications.filter(notification => notification.id !== id));
    } else {
      try {
        let endpoint = '';
        if (type === 'streams') {
          endpoint = `/artist/${userid}/update-flags-streams`;
        } else if (type === 'royalty') {
          endpoint = `/artist/${userid}/update-flags-royalty`;
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
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.patch(`http://localhost:8085/notifications/artist/${userid}/update-flags-streams-payment`);
      setNotifications([]);
    } catch (error) {
      console.error('Error clearing all notifications:', error);
    }
  };

  const [contracts, setContracts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        console.log(`Fetching contracts for user ID: ${userid}`);
        const response = await axios.get(`http://localhost:8083/contracts/pending/${userid}`);
        setContracts(response.data);
        console.log('Contracts fetched:', response.data);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    fetchContracts();
  }, [userid, refresh]);

  const handleAccept = async (contract) => {
    try {
      console.log(contract.contractId);
      console.log(contract)
      await axios.post(`http://localhost:8083/contracts/artists/${contract.artistId}`, { artistId: userid });
      await axios.post(`http://localhost:8083/contracts/${contract.contractId}`, { status: 'accepted' });
      setContracts((prevContracts) => prevContracts.map((c) => (c.contractId === contract.contractId ? { ...c, status: 'accepted' } : c)));
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error('Error accepting contract:', error);
    }
  };

  const handleReject = async (contractId) => {
    try {
      console.log(contractId);
      await axios.delete(`http://localhost:8083/contracts/${contractId}`);
      setContracts((prevContracts) => prevContracts.filter((contract) => contract.contractId !== contractId));
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error('Error rejecting contract:', error);
    }
  };

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Notification</title>
        </Helmet>

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
          <div>
            <h2>Contracts for Artist ID: {userid}</h2>
            <table>
              <thead>
                <tr>
                  <th>Contract ID</th>
                  <th>Manager ID</th>
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
                    <td>{contract.managerId}</td>
                    <td>{contract.managerPercentageOfRoyalty}</td>
                    <td>{contract.artistPercentageOfRoyalty}</td>
                    <td>{contract.contractStartDate}</td>
                    <td>{contract.contractEndDate}</td>
                    <td>{contract.status}</td>
                    <td>
                      {contract.status !== 'accepted' && (
                        <button onClick={() => handleAccept(contract)} disabled={contract.status === 'accepted'}>
                          Accept
                        </button>
                      )}
                      <button onClick={() => handleReject(contract.contractId)}>
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {notifications.length > 0 && (
          <button className="clear-all" onClick={handleClearAll}>
            Clear All
          </button>
        )}

        <Headermain notificationsLength={notificationsLength} />
      </section>
    </HelmetProvider>
  );
};

export default Notificationart;
