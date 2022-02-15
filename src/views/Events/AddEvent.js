import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { AddEventAction } from "../../actions/EventActions";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
} from "@coreui/react";
import {
  DateSingleInput,
  DateRangeInput,
  Datepicker,
  START_DATE,
} from "@datepicker-react/styled";
import { min } from "date-fns/esm";

function AddEvent(props) {
  const UserReducer = useSelector((state) => state.UserReducer);
  const TokenReducer = useSelector((state) => state.TokenReducer);
  const history = useHistory();

  const [EventName, setEventName] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [DescEvent, setDescEvent] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Adress, setAdress] = useState("");
  const [Type, setType] = useState("");
  const [StartTime, setStartTime] = useState({
    hour: "00",
    minute: "00",
  });
  const [EndTime, setEndTime] = useState({
    hour: "23",
    minute: "59",
  });

  const SetTime_Start = (time) => {
    const hour = time.substring(0, 2);
    const minute = time.slice(-2);
    setStartTime({
      hour,
      minute,
    });
  };

  const SetTime_End = (time) => {
    const hour = time.substring(0, 2);
    const minute = time.slice(-2);
    setEndTime({
      hour,
      minute,
    });
  };

  const Add_Event = async () => {
    
    const data = {
      user: UserReducer._id,
      title: EventName,
      adress: Adress,
      type: Type,
      desc: DescEvent,
      start: state.startDate.toString(),
      end: state.endDate.toString(),
      start_time: StartTime,
      end_time: EndTime,
      etat: "on schedule",
      likes: [],
      comments: [],
    };
    AddEventAction(data, TokenReducer, history);
  };

  const [state, setState] = useState({
    startDate: null,
    endDate: null,
    focusedInput: START_DATE,
  });

  function handleDatesChange(data) {
    if (!data.focusedInput) {
      setState({ ...data, focusedInput: START_DATE });
    } else {
      setState(data);
    }
  }
 
  return (
    <>
      <div className="">
        <CForm className="row g-3">
          <div className="mb-3">
            <CFormLabel>Email address</CFormLabel>
            <CFormInput
              type="email"
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <CCol md={5}>
            <CFormLabel>Description</CFormLabel>
            <CFormTextarea
              onChange={(e) => setDescEvent(e.target.value)}
              rows="2"
            ></CFormTextarea>
          </CCol>
          <CCol md={5}>
            <CFormLabel>Adresse</CFormLabel>
            <CFormTextarea
              onChange={(e) => setAdress(e.target.value)}
              rows="2"
            ></CFormTextarea>
          </CCol>

          <CCol md={2}>
            <CFormLabel>Type</CFormLabel>
            <CFormSelect aria-label="Default select example">
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
            </CFormSelect>
          </CCol>

          <div className="date-container">
            <CFormLabel>Select Date </CFormLabel>
            <Datepicker
              minBookingDate={new Date()}
              showResetDates={false}
              showClose={false}
              displayFormat="dd/MM/yyyy"
              onDatesChange={handleDatesChange}
              startDate={state.startDate} // Date or null
              endDate={state.endDate} // Date or null
              focusedInput={state.focusedInput} // START_DATE, END_DATE or null
            />
            <div className="date-container">
              <CCol md={3}>
                <CFormLabel>Start Time</CFormLabel>
                <CFormInput
                  type="time"
                  onChange={(e) => SetTime_Start(e.target.value)}
                />
              </CCol>

              <CCol md={3}>
                <CFormLabel>End Time</CFormLabel>
                <CFormInput
                  type="time"
                  onChange={(e) => SetTime_End(e.target.value)}
                />
              </CCol>
            </div>
          </div>
        </CForm>
        <div style={{ textAlign: "right" }}>
          <CButton onClick={() => Add_Event()} color="primary">
            {" "}
            ADD EVENT
          </CButton>
        </div>
      </div>
    </>
  );
}

export default AddEvent;
