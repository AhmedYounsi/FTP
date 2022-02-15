import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import CIcon from "@coreui/icons-react";
import {
  cibSuperuser,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilList,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUserPlus,
  cilFile,
  cilCalendar,
  cilNoteAdd,
  cilUser,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { useSelector } from 'react-redux';

export const AppSidebarNav = () => {
  const location = useLocation()
  const UserReducer = useSelector((state) => state.UserReducer)


  return (
    <React.Fragment>
     <ul className="navbar_new">
     {UserReducer && UserReducer.email == 'ahmed@zeta.com' &&
     <>
     <NavLink activeClassName='active_link' to="/liste_employee">
     <CIcon icon={cilUser} customClassName="nav-icon" />
       Liste Employee</NavLink>
     <NavLink activeClassName='active_link' to="/new_employee">
     <CIcon icon={cilUserPlus} customClassName="nav-icon" />
       Add Employee</NavLink>
     </>}
     <NavLink activeClassName='active_link' to="/file_manager">
     <CIcon icon={cilFile} customClassName="nav-icon" />
       FILE MANAGER</NavLink>
  
     </ul>
      {/* {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))} */}
    </React.Fragment>
  )
}
 
