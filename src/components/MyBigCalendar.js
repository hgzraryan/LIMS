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
  const [selectedEvent, setSelectedEvent] = useState(null);

  // useEffect(() => {
  //   fetchEvents();
  // }, [fetchEvents]);

  const renderEventContent = (slotInfo) => {
    const date = moment(slotInfo.start).format("MMMM D, YYYY");
    return (
      <div>
        <p>
          Date: <strong>{date}</strong>
        </p>
        <p>Location: {slotInfo.location}</p>
      </div>
    );
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const updateEvents = (values) => {
    // console.log(values);
    // console.log(events);

    const index = events.findIndex(event => event.id === values.id);
    if (index !== -1) {
    const updatedevents = [...events];
    updatedevents[index] = values;
    setEvents(updatedevents);
    //console.log(updatedevents);
  } else {
    //console.log("Event with specified id not found.",index);
  }
  };
  const handleModalSave = () => {
    if (selectedEvent) {
      //console.log(selectedEvent);
      //setEvents(selectedEvent)
      updateEvents(selectedEvent);
    } else {
      //createEvent(selectedEvent);
    }
    setShowModal(false);
  };

  const handleModalOpen = (slotInfo) => {
    //console.log("data",slotInfo)
    setSelectedEvent(slotInfo);
    setShowModal(true);
  };

  const handleDeleteEvent = (eventId) => {
    // deleteEvent(eventId);
    setShowModal(false);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {

    let current_time = moment().format("YYYY MM DD");
    let event_time = moment(event.start).format("YYYY MM DD");
    let background = current_time > event_time ? "#DE6987" : "#8CBD4C";
    return {
      style: {
        backgroundColor: background,
      },
    };
  };
  //console.log(Calendar)
  return (
    <div className="calendar-container">
      <Calendar
        popup
        selectable
        localizer={localizer}
        //defaultView={Views.MONTH}
        //components={{ toolbar: CustomToolbar }}
        //views={["month"]}
        style={{ height: 600 }}
        events={events}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(slotInfo) => handleModalOpen(slotInfo)}
        onSelectSlot={(slotInfo) => handleModalOpen(slotInfo)}
      />
      <Modal show={showModal} onHide={handleModalClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEvent ? "Update Event" : "Create Event"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            <input
              placeholder="Event Title"
              defaultValue={selectedEvent?.title}
              onChange={(e)=>setSelectedEvent(e.target.value)}
              style={{
                margin: "2px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#e3e5e8",
              }}
            />
            <input
              placeholder="Event Location"
              defaultValue={selectedEvent?.location}
              onChange={(e)=>setSelectedEvent(e.target.value)}

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
          {selectedEvent && (
            <Button
              variant="danger"
              onClick={() => handleDeleteEvent(selectedEvent.id)}
            >
              Delete
            </Button>
          )}
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: state.events,
});

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   fetchEvents,
//   createEvent,
//   updateEvent,
//   deleteEvent
// }, dispatch);

export default MyBigCalendar;
