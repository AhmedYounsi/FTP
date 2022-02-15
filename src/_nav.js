import React from "react";
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


const _nav = () => {
  return [
    // {
    //   component: CNavItem,
    //   name: "Dashboard",
    //   to: "/dashboard",
    //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    //   badge: {
    //     color: "info",
    //     text: "NEW",
    //   },
    // },
    // {
    //   component: CNavTitle,
    //   name: "Employee",
    // },
    // {
    //   component: CNavItem,
    //   name: "Ajout employee",
    //   to: "/new_employee",
    //   icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    // },
  
    // {
    //   component: CNavItem,
    //   name: "Liste employees",
    //   to: "/liste_employee",
    //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavTitle,
    //   name: "Events",
    // },
    // {
    //   component: CNavItem,
    //   name: "Add events",
    //   to: "/ajout_event",
    //   icon: <CIcon icon={cilNoteAdd} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavItem,
    //   name: "Calendar",
    //   to: "/calendar",
    //   icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavItem,
    //   name: "Display Events",
    //   to: "/display_events",
    //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    // },
  
    {
      component: CNavTitle,
      name: "FTP",
    },
    {
      component: CNavItem,
      name: "File Manager",
      to: "/file_manager",
      icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
    },
    // {
    //   component: CNavTitle,
    //   name: "INBOX",
    // },
    // {
    //   component: CNavItem,
    //   name: "Inbox",
    //   to: "/inbox",
    //   icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
    // },
    
  ];
}


 

export default _nav;
