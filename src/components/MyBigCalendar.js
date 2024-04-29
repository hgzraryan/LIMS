import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

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
  
    // useEffect(() => {
    //   fetchData();
    // }, [axiosPrivate, navigate, location]);
  
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get('/bigCalendar');
        setEvents(response?.data?.jsonString || []);
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
    const createEvent = async (newEvent) => {
      try {
        const response = await axiosPrivate.post(`/createEvent`, newEvent);
        const createdEvent = response.data;
        setEvents([...events, createdEvent]);
        setShowModal(false);
      } catch (error) {
        console.error("Error creating event:", error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
  
    const updateEvent = async (updatedEvent) => {
      try {
        await axiosPrivate.put(`/updateBigCalendar/${updatedEvent.id}`, updatedEvent);
        const updatedEvents = events.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        );
        setEvents(updatedEvents);
        setShowModal(false);
      } catch (error) {
        console.error("Error updating event:", error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
  
    const deleteEvent = async (eventId) => {
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
  
    const handleModalClose = () => {
      setShowModal(false);
    };
  
    const handleCheckModalClose = () => {
      setShowCheckModal(false);
    };
  
    const updateEvents = (values) => {
      const updatedEvents = events.map((event) =>
        event.id === values.id ? { ...event, ...values } : event
      );
      setEvents(updatedEvents);
    };
  
    const handleModalSave = () => {
      if (selectedEvent) {
        if (selectedEvent.id) {
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
      slotInfo?.id ? setShowCheckModal(slotInfo) : setShowModal(true);
      setSelectedEvent(slotInfo);
    };
  
    const handleEditModalOpen = () => {
      setShowModal(true);
      setShowCheckModal(false);
    };
  
    const eventStyleGetter = (event, start, end, isSelected) => {
      let current_time = moment.utc().format("YYYY MM DD HH:mm");
      let event_time = moment.utc(event.start).format("YYYY MM DD HH:mm");
      let background = current_time > event_time ? "#DE6987" : "#8CBD4C";
      return {
        style: {
          backgroundColor: background,
        },
      };
    };
  return (
    <div className="calendar-container">
      <Calendar
        popup
        selectable
        localizer={localizer}
        style={{ height: 600 }}
        events={events}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(slotInfo) => handleModalOpen(slotInfo)}
        onSelectSlot={(slotInfo) => handleModalOpen(slotInfo)}
      />
      <Modal show={showModal} onHide={handleModalClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEvent?.id ? "Փոփոխել" : "Ստեղծել"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            <input
              placeholder="Անվանում"
              defaultValue={selectedEvent?.title}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, title: e.target.value })
              }
              style={{
                margin: "2px",
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
            <div><span>Սկիզբ: </span><span className="fw-bold">{moment.utc(showCheckModal.start).format("DD-MM-YYYY  HH:mm")}</span></div>
            <div> <span>Ավարտ: </span><span className="fw-bold">{moment.utc(showCheckModal.end).format("DD-MM-YYYY  HH:mm")}</span></div>
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