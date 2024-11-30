// import React, { useEffect, useState } from "react";
// import { RiNotification2Line } from "react-icons/ri";
// // import { useHistory } from "react-router-dom";
// import { WiMoonAltWaningCrescent4 } from "react-icons/wi";
// import { useNavigate } from "react-router-dom";
// const NotificationIcono = () => {
//   const [theme, setTheme] = useState(localStorage.getItem("theme"));
//   // const history = useHistory();
//   const navigate = useNavigate();

//   const themeToggle = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   const redirectToDifferentPage = () => {
//     // Redirect to a different page here
//     // history.push("/different-page");
//     navigate('/notification'); 
//   };

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <div>
//       <div className="nav_ac" onClick={redirectToDifferentPage}>
//         <RiNotification2Line />
//       </div>
//     </div>
//   );
// };

// export default NotificationIcono;

import React, { useEffect, useState } from "react";
import { RiNotification2Line } from "react-icons/ri";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"; // Example back icon

const NotificationIcono = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const navigate = useNavigate();

  const themeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const redirectToDifferentPage = () => {
    navigate("/notification");
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      {/* Back Button */}
      <button onClick={goBack} className="back-button">
        <IoArrowBack size={20} /> Back
      </button>

      <div className="nav_ac" onClick={redirectToDifferentPage}>
        <RiNotification2Line />
      </div>
    </div>
  );
};

export default NotificationIcono;

