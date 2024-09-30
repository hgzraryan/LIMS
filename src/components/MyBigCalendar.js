import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import 'moment-timezone'
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const localizer = momentLocalizer(moment);


  const MyBigCalendar = ({ doctorId }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showCheckModal, setShowCheckModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newEventStart, setNewEventStart] = useState(null);
    const [newEventEnd, setNewEventEnd] = useState(null);
    const [eventName, setEventName] = useState("");
    useEffect(() => {
      moment.tz.setDefault('Armenia/Yerevan');
     // fetchData()
    }, []);

    
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get('/bigCalendar');
        setEvents(response?.data?.jsonString);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    const handleDeleteEvent = async (eventId) => {
      try {
        await axiosPrivate.delete(`/updateBigCalendar/${eventId}`);
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
        setShowCheckModal(false);
      } catch (error) {
        console.error("Error deleting event:", error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    const createEvent = async (event) => {
      const newEventId = Math.max(...events.map(event => event.id), 0) + 1;
      const newEvent = { ...selectedEvent, id: newEventId };
      console.log(selectedEvent)
      console.log(newEvent)
      setEvents([...events, newEvent]); 

      try {
        const response = await axiosPrivate.post(`/createEvent`, {id:doctorId,newEvent});
        const createdEvent = response.data;
        setEvents([...events, createdEvent]);
        setEvents([...events, newEvent]); 

        console.log(newEvent)
        setShowModal(false);
      } catch (error) {
        console.error("Error creating event:", error);
       // navigate("/login", { state: { from: location }, replace: true });
      }
    };
    const handleDayClick = (slotInfo) => {
      setNewEventStart(slotInfo.start);
      setNewEventEnd(moment(slotInfo.start).add(1, "hour"));
      setEventName("");
      setShowModal(true);
      setSelectedEvent(slotInfo);
console.log(slotInfo)
    };
    const updateEvent = async (updatedEvent) => {
     // console.log(updatedEvent)
     const updatedEvents = events.map((event) =>
       event.id === updatedEvent.id ? updatedEvent : event
     );
     setEvents(updatedEvents);
     setShowModal(false);
      try {
        await axiosPrivate.put(`/updateBigCalendar/${updatedEvent.id}`, updatedEvent);
      } catch (error) {
        console.error("Error updating event:", error);
        //navigate("/login", { state: { from: location }, replace: true });
      }
    };
  
    const handleModalClose = () => {
      setShowModal(false);
    };
  
    const handleCheckModalClose = () => {
      setShowCheckModal(false);
    };
  
    const handleModalSave = () => {
      console.log(selectedEvent)
      if (selectedEvent) {
        if (selectedEvent?.id) {
          // Update existing event
          updateEvent(selectedEvent);
        } else {
          // Create new event
          createEvent(selectedEvent);
        }
      }
      setShowModal(false);
    };
    const handleModalOpen = (slotInfo) => {
      // slotInfo?.id ? setShowCheckModal(slotInfo) : setShowModal(true);
      
      // setSelectedEvent(slotInfo);
    };
  
    const handleEditModalOpen = (event) => {
      console.log(event)
      setSelectedEvent(event);
      setNewEventStart(event.start);
      setNewEventEnd(event.end);
      setEventName(event.title);
      setShowModal(true);

      //setShowCheckModal(false);
    };
  
    const eventStyleGetter = (event, start, end, isSelected) => {
      let current_time = moment().format("YYYY-MM-DD HH:mm");
      let event_time = moment(event.start).format("YYYY-MM-DD HH:mm");
      let background = current_time > event_time ? "#DE6987" : "#8CBD4C";
      return {
        style: {
          backgroundColor: background,
        },
      };
    };
    console.log(events)
  return (
    <div className="calendar-container " style={{ height: 500 }}>
      <Calendar
        popup
        selectable
        localizer={localizer}
        style={{ height: 600 }}
        events={events}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => handleEditModalOpen(event)}
        onSelectSlot={(slotInfo) => handleDayClick(slotInfo)}
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            localizer.format(date, "HH:mm", culture), 
        }}
      />
      <Modal show={showModal} onHide={handleModalClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEvent?.id ? "Փոփոխել" : "Ստեղծել"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column" style={{position:'relative'}}>
            {/* <DatePicker 
            selected={newEventStart ? newEventStart : ''}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            timeIntervals={15}
            timeCaption="time"

            onChange={(e) =>{
              setNewEventStart(moment(e).toDate())
              setSelectedEvent({ ...selectedEvent, start: e })
    }}
 
    /> */}
                        <input
            type="datetime-local"
              placeholder="Սկիզբ"
              value={newEventStart ? moment(newEventStart).format("YYYY-MM-DDTHH:mm") : ''}
              onChange={(e) =>{
                setNewEventStart(moment(e.target.value).toDate())
                setSelectedEvent({ ...selectedEvent, start: e.target.value })
      }
              }
              style={{
                margin: "2px",
                padding:'5px',
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#e3e5e8",
              }}
            />
            <input
            type="datetime-local"
              placeholder="Ավարտ"
              value={newEventStart ? moment(newEventEnd).format("YYYY-MM-DDTHH:mm") : ''}
              onChange={(e) =>{
                setNewEventEnd(moment(e.target.value).toDate())
                setSelectedEvent({ ...selectedEvent, end: e.target.value })
                console.log(e.target.value)
                }
              }
              style={{
                margin: "2px",
                padding:'5px',
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#e3e5e8",
              }}
            />
            <input

              placeholder="Անվանում"
              //defaultValue={selectedEvent?.title}
              defaultValue={eventName ? eventName : ''}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, title: e.target.value })
              }
              style={{
                margin: "2px",
                padding:'5px',
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#e3e5e8",
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Չեղարկել
          </Button>
          {console.log(selectedEvent)}
          {selectedEvent?.id 
          ? 
          <Button variant="primary" onClick={handleModalSave}>
            Հաստատել
          </Button> 
          : 
          <Button variant="primary" onClick={handleModalSave}>
          Ստեղծել
          </Button>}
        </Modal.Footer>
      </Modal>
      <Modal show={showCheckModal} onHide={handleCheckModalClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>
            {showCheckModal.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            <div><span>Սկիզբ: </span><span className="fw-bold">{showCheckModal?.start && moment.utc(showCheckModal.start).format("DD-MM-YYYY  HH:mm")}</span></div>
            <div> <span>Ավարտ: </span><span className="fw-bold">{showCheckModal?.end && moment.utc(showCheckModal.end).format("DD-MM-YYYY  HH:mm")}</span></div>
          </div>
        </Modal.Body>
        <Modal.Footer>          
          <Button variant="secondary" onClick={()=>handleEditModalOpen(selectedEvent)}>
            Փոփոխել
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteEvent(showCheckModal.id)}
          >
            Ջնջել
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyBigCalendar;