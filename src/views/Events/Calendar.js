/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/ar-TN'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calender.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { GetAllEvent } from '../../actions/EventActions'

function Calender() {
  const TokenReducer = useSelector((state) => state.TokenReducer)

  const [locales, setlocales] = useState([])
  const [localizer, setlocalizer] = useState([])
  const [events, setevents] = useState([])
  const [Display, setDisplay] = useState(false)
  const [All_Events, setAll_Events] = useState([])
  const ConvertEvent = (data) => {
 
    let ev = data.map((el) => {
      
      var ST = new Date(el.start)
      var ED = new Date(el.end)
    
      return {
        ...el,
        start: new Date(
          ST.getFullYear(),
          ST.getMonth(),
          ST.getDate(),
          el.start_time[0].hour,
          el.start_time[0].minute,
        ),
        end: new Date(
          ED.getFullYear(),
          ED.getMonth(),
          ED.getDate(),
          el.end_time[0].hour,
          el.end_time[0].minute,
        ),
      }
    })
 
    return ev
  }
  const GetEvent = async () => {
    const all_event = await GetAllEvent(TokenReducer)
    setAll_Events(ConvertEvent(all_event))
  }

useEffect(() => {
   console.log(All_Events)
}, [All_Events])
  
  useEffect(() => {
    GetEvent()
    setlocales({
      'en-US': enUS,
    })
  }, [])

  useEffect(() => {
    const localizer_arr = dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
    })
    setlocalizer(localizer_arr)
  }, [locales])

  useEffect(() => {
     
  }, [localizer])

  useEffect(() => {
    setDisplay(true)
  }, [events])

  const eventStyleGetter = (event, start, end, isSelected) => {
    var color = ''
    switch (event.etat) {
      case 'completed':
        color = '#00a383'
        break
      case 'pendeing':
        color = '#f53c56'
        break

      case 'on schedule':
        color = '#7764e4'
        break

      default:
        break
    }

    var style = {
      backgroundColor: color,
      color: 'white',
      border: 1,
      fontSize: 15,
      fontWeight: '600',
    }
    return {
      style,
    }
  }

  return (
    <div className="container-perso">
      <div style={{ position: 'relative' }}>
        {Display && (
          <Calendar
            eventPropGetter={eventStyleGetter}
            localizer={localizer}
            events={All_Events}
            startAccessor="start"
            endAccessor="end"
            style={{ minHeight: 750 }}
            onSelectEvent={(e) =>console.log(e)}
          />
        )}
      </div>
    </div>
  )
}

export default Calender
