import React, { useEffect, useState } from "react";
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Calendar, momentLocalizer } from "react-big-calendar";
// import CustomToolbar from './toolbar';
// import Input from './input';
import moment from "moment";
// import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../actions';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button } from "react-bootstrap";

const localizer = momentLocalizer(moment);

const MyBigCalendar = ({ events, setEvents }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
        updateEvents(selectedEvent);
      } else {
        // Generate a new id for the new event
        const newEventId = Math.max(...events.map(event => event.id), 0) + 1;
        const newEvent = { ...selectedEvent, id: newEventId };
        setEvents([...events, newEvent]); 
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
  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    setShowModal(false);
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
{/* Check Edit Modal */}
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