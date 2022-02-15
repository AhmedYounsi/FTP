import React, { useEffect,useState } from "react";
import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CRow,
  CCol,
  CCardHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import IMG from "../../assets/images/react.jpg";
import "./Event.scss";
import { cilThumbUp } from "@coreui/icons";
import { GetAllEvent } from "../../actions/EventActions";
import { useSelector } from "react-redux";
import { GetUsersId } from "../../actions/UserActions";
function DisplayEvent() {

    const TokenReducer = useSelector(state => state.TokenReducer)
const [Events, setEvents] = useState([])
    const GetEvent = async () => {
        const all_event = await GetAllEvent(TokenReducer)
        setEvents(all_event)
      }
    
      useEffect(() => {
        GetEvent()
       
      }, [])


      const userName =  (id) => {
      GetUsersId(id)
       return "ahmed"
      }
  return (
    <CRow>
      {
         Events.map((el,index) =>
            <CCol key={index} className="events" xs={12} md={6} xl={6}>
            <CCard>
              <CCardHeader>
                  <b> rtert</b>
              </CCardHeader>
              <CCardImage orientation="top" src={IMG} />
              <CCardBody>
                <CCardTitle><b>{el.title}</b></CCardTitle>
                <CCardText>
                {el.desc} 
                </CCardText>
                <CButton className="like-btn" href="#">
                  <CIcon icon={cilThumbUp} customClassName="nav-icon" />
                 {el.likes.length}
                </CButton>
                 
              </CCardBody>
            </CCard>
          </CCol>
            )
      }
    </CRow>
  );
}

export default DisplayEvent;
