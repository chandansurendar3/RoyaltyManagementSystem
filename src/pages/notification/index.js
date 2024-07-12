// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Helmet, HelmetProvider } from "react-helmet-async";
// import { Link } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import './style.css';
// import Headermain from '../../header';

// const Notification = (notificationsLength) => {
//   const [notifications, setNotifications] = useState([]);
//   // const artistId = 252;
//   const { userid } = useParams();
//   const artistId = userid;

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8085/notifications/artist/${artistId}`);
//         const data = response.data;

//         // Flatten the notifications
//         let notificationArray = [];
//         let id = 0;

//         if (data.streams) {
//           notificationArray.push({ id: id++, type: 'streams', message: data.streams });
//         }

//         if (data.payout && Array.isArray(data.payout)) {
//           data.payout.forEach(msg => {
//             notificationArray.push({ id: id++, type: 'payout', message: msg });
//           });
//         }

//         if (data.request) {
//           notificationArray.push({ id: id++, type: 'royalty', message: data.request });
//         }

//         setNotifications(notificationArray);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     fetchNotifications();
//   }, [artistId]);

//   const handleCardClick = (id, type) => {
//     if (type === 'payout') {
//       // If it's a payout notification, remove it from the list
//       setNotifications(notifications.filter(notification => notification.id !== id));
//     } else {
//       // Otherwise, handle the click as before
//       try {
//         let endpoint = '';
//         if (type === 'streams') {
//           endpoint = `/artist/${artistId}/update-flags-streams`;
//         } else if (type === 'royalty') {
//           endpoint = `/artist/${artistId}/update-flags-royalty`;
//         }
  
//         if (endpoint) {
//           axios.patch(`http://localhost:8085/notifications${endpoint}`)
//             .then(() => {
//               // After successful patch request, remove the notification from the list
//               setNotifications(notifications.filter(notification => notification.id !== id));
//             })
//             .catch(error => {
//               console.error('Error updating notification flags:', error);
//             });
//         }
//       } catch (error) {
//         console.error('Error updating notification flags:', error);
//       }
//     }
//   };
  

//   const handleClearAll = async () => {
//     try {
//       await axios.patch(`http://localhost:8085/notifications/artist/${artistId}/update-flags-streams-payment`);
//       setNotifications([]);
//     } catch (error) {
//       console.error('Error clearing all notifications:', error);
//     }
//   };

//     const [contracts, setContracts] = useState([]);

//     const [refresh, setRefresh] = useState(false); // Add a refresh state

//     useEffect(() => {
//         const fetchContracts = async () => {
            
//             try {
//                 console.log(`Fetching contracts for user ID: ${artistId}`);
//                 const response = await axios.get(`http://localhost:8083/contracts/pending/${artistId}`);
//                 setContracts(response.data);
//                 console.log('Contracts fetched:', response.data);
//             } catch (error) {
//                 console.error('Error fetching contracts:', error);
//             }
//         };

//         fetchContracts();
//     }, [ refresh]); // Include user and refresh in the dependency array


//     const handleAccept = async (contract) => {
//         try {
//             console.log(contract.contractId)
//           // Update artist_id in the manager table
//           await axios.put(`http://localhost:8083/artists/${contract.artistId}`, {managerId : 3 });
     
//           // Update manager_id in the artist table
//         //  await axios.put(`http://localhost:8084/managers/${user.userid}`, { artistId: contract.artistId });
     
//           // Update contract status to accepted
//           await axios.put(`http://localhost:8083/contracts/${contract.contractId}`, { status: 'accepted' });
     
//           // Update the local state to reflect the changes
//           setContracts((prevContracts) => prevContracts.map((c) => (c.id === contract.contractId ? { ...c, status: 'accepted' } : c)));
//           setRefresh((prev) => !prev);
//         } catch (error) {
//           console.error('Error accepting contract:', error);
//         }
//       };

//       const handleReject = async (contractId) => {
//         try {
//           // Delete the contract
//           console.log(contractId)
//           await axios.delete(`http://localhost:8083/contracts/${contractId}`);
     
//           // Update the local state to remove the deleted contract
//           setContracts((prevContracts) => prevContracts.filter((contract) => contract.id !== contractId));
//           setRefresh((prev) => !prev);
//         } catch (error) {
//           console.error('Error rejecting contract:', error);
//         }
//       };

//   return (
//     <HelmetProvider>
//       <section id="home" className="home">
//         <Helmet>
//           <meta charSet="utf-8" />
//           <title>Notification</title>
//         </Helmet>

//         <div className="notifications-list">
//           {notifications.map(notification => (
//             <div
//               key={notification.id}
//               className="notification-card"
//               onClick={() => handleCardClick(notification.id, notification.type)}
//             >
//               <h5>{notification.type}</h5>
//               <p>{notification.message}</p>
//             </div>
//           ))}
//         </div>

//         <div>
//             <div>
//             <h2>Contracts for Artist ID: {artistId}</h2>
//             <table>
            
//                 <thead>
//                 <tr>
//                     <th>Contract ID</th>
//                     <th>Artist ID</th>
//                     <th>Manager Percentage</th>
//                     <th>Artist Percentage</th>
//                     <th>Contract Start Date</th>
//                     <th>Contract End Date</th>
//                     <th>Status</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {contracts.map((contract) => (
//     <tr key={contract.id}>
//         <td>{contract.contractId}</td>
//         <td>{contract.artistId}</td>
//         <td>{contract.managerPercentageOfRoyalty}</td>
//         <td>{contract.artistPercentageOfRoyalty}</td>
//         <td>{contract.contractStartDate}</td>
//         <td>{contract.contractEndDate}</td>
//         <td>{contract.status}</td>
//         <td>
//             {contract.status !== 'accepted' && (  // Check if status is not 'accepted'
//                 <button onClick={() => handleAccept(contract)} disabled={contract.status === 'accepted'}>
//                     Accept
//                 </button>
//             )}
//             <button onClick={() => handleReject(contract.contractId)}>
//                 Reject
//             </button>
//         </td>
//     </tr>
// ))}
//                 </tbody>
//             </table>
//             </div>
//         </div>
        
//         {notifications.length > 0 && (
//           <button className="clear-all" onClick={handleClearAll}>
//             Clear All
//           </button>
//         )}
//                 <Headermain notificationsLength={notificationsLength} />
//       </section>
//     </HelmetProvider>
    
//   );
// };

// export default Notification;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { useParams } from 'react-router-dom';
// import './style.css';
// import Headermain from '../../header'; // Adjust the import path as necessary

// const Notification = ({ role }) => { // Role is passed as a prop
//     const { userid } = useParams();
//     const userId = userid;

//     const [notifications, setNotifications] = useState([]);
//     const [contracts, setContracts] = useState([]);
//     const [refresh, setRefresh] = useState(false);

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8085/notifications/artist/${userId}`);
//                 const data = response.data;

//                 let notificationArray = [];
//                 let id = 0;

//                 if (data.streams) {
//                     notificationArray.push({ id: id++, type: 'streams', message: data.streams });
//                 }

//                 if (data.payout && Array.isArray(data.payout)) {
//                     data.payout.forEach(msg => {
//                         notificationArray.push({ id: id++, type: 'payout', message: msg });
//                     });
//                 }

//                 if (data.request) {
//                     notificationArray.push({ id: id++, type: 'royalty', message: data.request });
//                 }

//                 setNotifications(notificationArray);
//             } catch (error) {
//                 console.error('Error fetching notifications:', error);
//             }
//         };

//         const fetchContracts = async () => {
//             try {
//                 let response;
//                 if (role === 'manager') {
//                     response = await axios.get(`http://localhost:8083/contracts/pending/manager/${userId}`);
//                 } else if (role === 'artist') {
//                     response = await axios.get(`http://localhost:8084/contracts/pending/artist/${userId}`);
//                 }

//                 if (response) {
//                     setContracts(response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching contracts:', error);
//             }
//         };

//         fetchNotifications();
//         fetchContracts();
//     }, [userId, role, refresh]);

//     const handleCardClick = (id, type) => {
//         if (type === 'payout') {
//             setNotifications(notifications.filter(notification => notification.id !== id));
//         } else {
//             let endpoint = '';
//             if (type === 'streams') {
//                 endpoint = `/artist/${userId}/update-flags-streams`;
//             } else if (type === 'royalty') {
//                 endpoint = `/artist/${userId}/update-flags-royalty`;
//             }

//             if (endpoint) {
//                 axios.patch(`http://localhost:8085/notifications${endpoint}`)
//                     .then(() => {
//                         setNotifications(notifications.filter(notification => notification.id !== id));
//                     })
//                     .catch(error => {
//                         console.error('Error updating notification flags:', error);
//                     });
//             }
//         }
//     };

//     const handleClearAll = async () => {
//         try {
//             await axios.patch(`http://localhost:8085/notifications/artist/${userId}/update-flags-streams-payment`);
//             setNotifications([]);
//         } catch (error) {
//             console.error('Error clearing all notifications:', error);
//         }
//     };

//     const handleAccept = async (contract) => {
//         try {
//             if (role === 'manager') {
//                 await axios.put(`http://localhost:8084/artists/${contract.artistId}`, { managerId: userId });
//             }
//             await axios.put(`http://localhost:8083/contracts/${contract.contractId}`, { status: 'accepted' });
//             setRefresh(prev => !prev);
//         } catch (error) {
//             console.error('Error accepting contract:', error);
//         }
//     };

//     const handleReject = async (contractId) => {
//         try {
//             await axios.delete(`http://localhost:8083/contracts/${contractId}`);
//             setRefresh(prev => !prev);
//         } catch (error) {
//             console.error('Error rejecting contract:', error);
//         }
//     };

//     return (
//         <HelmetProvider>
//             <section id="home" className="home">
//                 <Helmet>
//                     <meta charSet="utf-8" />
//                     <title>Notification</title>
//                 </Helmet>

//                 <div className="notifications-list">
//                     {notifications.map(notification => (
//                         <div
//                             key={notification.id}
//                             className="notification-card"
//                             onClick={() => handleCardClick(notification.id, notification.type)}
//                         >
//                             <h5>{notification.type}</h5>
//                             <p>{notification.message}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {role === 'manager' && (
//                     <div>
//                         <h2>Contracts for Manager ID: {userId}</h2>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Contract ID</th>
//                                     <th>Artist ID</th>
//                                     <th>Manager Percentage</th>
//                                     <th>Artist Percentage</th>
//                                     <th>Contract Start Date</th>
//                                     <th>Contract End Date</th>
//                                     <th>Status</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {contracts.map(contract => (
//                                     <tr key={contract.contractId}>
//                                         <td>{contract.contractId}</td>
//                                         <td>{contract.artistId}</td>
//                                         <td>{contract.managerPercentageOfRoyalty}</td>
//                                         <td>{contract.artistPercentageOfRoyalty}</td>
//                                         <td>{contract.contractStartDate}</td>
//                                         <td>{contract.contractEndDate}</td>
//                                         <td>{contract.status}</td>
//                                         <td>
//                                             <button onClick={() => handleAccept(contract)} disabled={contract.status === 'accepted'}>
//                                                 Accept
//                                             </button>
//                                             <button onClick={() => handleReject(contract.contractId)}>Reject</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}

//                 {role === 'artist' && (
//                     <div>
//                         <h2>Contracts for Artist ID: {userId}</h2>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Contract ID</th>
//                                     <th>Artist ID</th>
//                                     <th>Manager Percentage</th>
//                                     <th>Artist Percentage</th>
//                                     <th>Contract Start Date</th>
//                                     <th>Contract End Date</th>
//                                     <th>Status</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {contracts.map(contract => (
//                                     <tr key={contract.contractId}>
//                                         <td>{contract.contractId}</td>
//                                         <td>{contract.artistId}</td>
//                                         <td>{contract.managerPercentageOfRoyalty}</td>
//                                         <td>{contract.artistPercentageOfRoyalty}</td>
//                                         <td>{contract.contractStartDate}</td>
//                                         <td>{contract.contractEndDate}</td>
//                                         <td>{contract.status}</td>
//                                         <td>
//                                             <button onClick={() => handleAccept(contract)} disabled={contract.status === 'accepted'}>
//                                                 Accept
//                                             </button>
//                                             <button onClick={() => handleReject(contract.contractId)}>Reject</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}

//                 {notifications.length > 0 && (
//                     <button className="clear-all" onClick={handleClearAll}>
//                         Clear All
//                     </button>
//                 )}
//                 <Headermain notificationsLength={notifications.length} />
//             </section>
//         </HelmetProvider>
//     );
// };

// export default Notification;
