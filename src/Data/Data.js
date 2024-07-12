// Sidebar imports
import { UilReact } from '@iconscout/react-unicons';


import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
  } from "@iconscout/react-unicons";
  
  // Analytics Cards imports
  import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
  // import { keyboard } from "@testing-library/user-event/dist/keyboard";
  import axios from 'axios';

  export const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get('http://localhost:8082/dashboard/admin/daily-revenue');
      console.log (response.data)
      return response.data;
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  
  
  // Sidebar Data
  export const SidebarData = [
    {
      icon: UilEstate,
      heading: "Dashboard",
    },
    {
      icon: UilClipboardAlt,
      heading: "Orders",
    },
    {
      icon: UilUsersAlt,
      heading: "Customers",
    },
    {
      icon: UilPackage,
      heading: 'Products'
    },
    {
      icon: UilChart,
      heading: 'Analytics'
    },
  ];
  
  // Analytics Cards Data
  export const cardsData = [
    {
      title: "External Collab",
      color: {
        backGround: "linear-gradient(180deg, #000000 0%, #434343 100%)",
        boxShadow: "0px 10px 20px 0px rgba(67, 67, 67, 0.5)",
      },
      barValue: 70,
      value: "25,970",
      png: UilUsdSquare,
      series: [
        {
          name: "Sales",
          data: [ 42, 109, 100,31, 40, 28, 51],
        },
      ],
    },
    {
      title: "Revenue",
      color: {
        backGround: "linear-gradient(180deg, #1c1c1c 0%, #595959 100%)",
        boxShadow: "0px 10px 20px 0px rgba(89, 89, 89, 0.5)",
      },
      barValue: 80,
      value: "14,270",
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Revenue",
          data: fetchDataFromAPI,
        },
      ],
    },
    {
      title: "Expenses",
      color: {
        backGround: "linear-gradient(180deg, #333333 0%, #737373 100%)",
        boxShadow: "0px 10px 20px 0px rgba(115, 115, 115, 0.5)",
      },
      barValue: 60,
      value: "4,270",
      png: UilClipboardAlt,
      series: [
        {
          name: "Expenses",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
  ];

  export const admincardsData = [
    {
      title: "External Collab",
      color: {
        backGround: "linear-gradient(180deg, #000000 0%, #434343 100%)",
        boxShadow: "0px 10px 20px 0px rgba(67, 67, 67, 0.5)",
      },
      barValue: 70,
      value: "25,970",
      png: UilUsdSquare,
      series: [
        {
          name: "Sales",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
    },
    {
      title: "External Plays",
      color: {
        backGround: "linear-gradient(180deg, #1c1c1c 0%, #595959 100%)",
        boxShadow: "0px 10px 20px 0px rgba(89, 89, 89, 0.5)",
      },
      barValue: 80,
      value: "14,270",
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Revenue",
          data: [10, 100, 50, 70, 80, 30, 40]

        },
      ],
    },

  ];
  
  
  // Recent Update Card Data
  export const UpdatesData = [
    {
     // img: img1,
      name: "Andrew Thomas",
      noti: "has ordered Apple smart watch 2500mh battery.",
      time: "25 seconds ago",
    },
    {
      //img: img2,
      name: "James Bond",
      noti: "has received Samsung gadget for charging battery.",
      time: "30 minutes ago",
    },
    {
      //img: img3,
      name: "Iron Man",
      noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
      time: "2 hours ago",
    },
  ];
  