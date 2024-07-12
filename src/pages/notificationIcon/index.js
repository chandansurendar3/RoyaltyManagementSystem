import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState([]);
  // const artistId = 5;

  return (
    <div className="notification-icon">
      
      <i className="icon">🔔</i>
      {notifications.length > 0 && (
        <span className="notification-count">{notifications.length}</span>
        
      )}
    </div>
  );
};

export default NotificationIcon;
