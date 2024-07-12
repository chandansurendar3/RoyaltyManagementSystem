import React from 'react'
import { Routes , Route} from 'react-router-dom'

export const Authenticated = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/artistdetailss/:artistNumber" element ={<ArtistDetailss />} />
        {/* <Route path = "/artistdash" element={<ArtistDash />} /> */}
        <Route path="/artistdash/:userid" element={<ArtistDash />} />
        <Route path="/managerdash/:userid" element={<ManagerDash />} />
       
        {/* <Route path="/artistdetails" element={<ArtistDetails />} /> */}
        <Route path="/managerdetails" element={<ManagerDetailss />} />
        <Route path="/account/:userid" element={<Account />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/offload" element={<Offload />} />
        <Route path="/managerdetailing/:managerNumber" element={<ManagerDetailing />} />
        <Route path="/transaction/:userid" element={<Transaction />} />
        <Route path="/forgotpass" element={<Forgotpass />} />
        <Route path="/resetpass" element={<Resetpass />} />
        <Route path="/change-password/:userid/:username/:role" element={<Changepass />} />
    </Routes>
  )
}
