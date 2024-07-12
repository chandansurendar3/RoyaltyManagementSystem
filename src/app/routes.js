import React from "react";
import { Route, Routes} from "react-router-dom";
import withRouter from "../hooks/withRouter"
import { Home } from "../pages/home";
import { Portfolio } from "../pages/portfolio";
import { ContactUs } from "../pages/contact";
import { About } from "../pages/about";
import { Socialicons } from "../components/socialicons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {Login} from "../pages/login";
import { ArtistDash } from "../pages/artistdash";

import { ArtistDetails } from "../content_option";
import { ArtistDetailss } from "../pages/artistdetailss";
import { ManagerDetailss } from "../pages/managerdetails";
import { Account } from "../pages/account";
import Notification from "../pages/notification";
import  Offload  from "../pages/offload";
import { ManagerDash } from "../pages/managerdash";
import { ManagerDetailing } from "../pages/managerdetailing";
import { Transaction } from "../pages/transaction";
import { Forgotpass } from "../pages/forgotpass";
import { Resetpass } from "../pages/resetpass";
import { Changepass } from "../pages/changepass";
import { AuthGuard } from "../pages/auth";
// import Notificationmanger from "../pages/notificationmanger";
import Notificationman from "../pages/notificationman";
import Notificationart from "../pages/notificationart";

//import { ArtistDash } from "../pages/artistDash";

const AnimatedRoutes = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition
      key={location.key}
      timeout={{
        enter: 400,
        exit: 400,
      }}
      classNames="page"
      unmountOnExit
    >
      <AuthGuard>
      <Routes location={location}>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/artistdetailss" element={<ArtistDetailss/>} /> */}
        <Route path="/artistdetailss/:artistNumber" element ={<ArtistDetailss />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path = "/artistdash" element={<ArtistDash />} /> */}
        <Route path="/artistdash/:userid" element={<ArtistDash />} />
        <Route path="/managerdash/:userid" element={<ManagerDash />} />
       
        {/* <Route path="/artistdetails" element={<ArtistDetails />} /> */}
        <Route path="/managerdetails" element={<ManagerDetailss />} />
        <Route path="/account/:userid" element={<Account />} />
        <Route path="/notificationman/:userid" element={<Notificationman/>} />
        <Route path="/notificationart/:userid" element={<Notificationart/>} /> 
        <Route path="*" element={<Offload />} />
        <Route path="/managerdetailing/:managerNumber" element={<ManagerDetailing />} />
        <Route path="/transaction/:userid" element={<Transaction />} />
        <Route path="/forgotpass" element={<Forgotpass />} />
        <Route path="/resetpass" element={<Resetpass />} />
        <Route path="/change-password/:userid/:username/:role" element={<Changepass />} />

        

       

       
      </Routes>
      </AuthGuard>
    </CSSTransition>
  </TransitionGroup>
));

function AppRoutes() {
  return (
    <div className="s_c">
      <AnimatedRoutes />
      <Socialicons />
    </div>
  );
}

export default AppRoutes;
