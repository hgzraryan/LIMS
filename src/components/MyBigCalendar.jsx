import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, Form, FormProvider, useForm  } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ErrorSvg from "../dist/svg/error.svg";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { MEDICALSERVICES_URL, PATIENTS_URL } from "../utils/constants";
import { deleteNullProperties } from "../utils/helper";
const DnDCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);
const custom =[
  {  

    box
    : 
    [],
    clientId
    : 
    241222,
    createdAt
    : 
    "2024-10-04T18:27:54.281Z",
    doctorId
    : 
    98,
    doctorsEventId
    : 
    40,
    end
    : 
    "2024-10-04T14:27:54.280Z",
    id
    : 
    "66fffb6ae3bc4943a402d6cb",
    medicalServices
    : 
    [9],
    slots
    : 
    [],
    start
    : 
    "2024-10-04T14:27:54.280Z",
    updatedAt
    : 
    "2024-10-04T18:27:54.281Z",
    __v
    : 
    0,
    title:'Անդրանիկ Կիրակոսյան',
    _id
    : 
    "66fffb6ae3bc4943a402d6cb",
}
]
const MyBigCalendar = () => {
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
  const [userData, setUserData] = useState("");
  const animatedComponents = makeAnimated();
  const [medicalServicePrice, setMedicalServicePrice] = useState(0);
  const [patients, setPatients] = useState([]);
  const [medicalServiceSelected, setMedicalServiceSelected] = useState([]);
  const [patientsSelected, setPatientSelected] = useState([]);
  const [medicalServicePriceSelected, setMedicalServicePriceSelected] = useState(0);

  const [medicalServices,setMedicalServices] = useState([])

  const onMedServiceSelect = (data) => {
    console.log(data);
    const calcPrice = data.reduce((acc, el) => {
      return (acc += el.price);
    }, 0);
    setMedicalServicePrice(calcPrice);
  };
  const colourStyles = {
    control: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: "#fff",
      borderColor: isFocused ? "#fff" : "#e8e3e3",
      boxShadow: "#e8e3e3",
      ":hover": {
        borderColor: "#fff",
      },
    }),

    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#4eafcb",
      color: "#000",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#4eafcb",
      color: "#e8e3e3",
      ":hover": {
        backgroundColor: "#4eafcb",
        color: "#eb3434",
      },
    }),
  };
  const methods = useForm({
    mode: "onChange",
  });
  useEffect(() => {
    setTimeout(() => {
      axiosPrivate
        .get(PATIENTS_URL)
        .then((resp) => {
          setPatients(resp?.data?.jsonString);
          setIsLoading(false);
        })
        .then((resp) => {
          axiosPrivate.get(MEDICALSERVICES_URL).then((resp) => {
            setMedicalServices(resp?.data?.jsonString);
            setIsLoading(false);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }, []);
  useEffect(() => {
    //debugger
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      setUserData(storedData);
      fetchData(storedData?.doctorId);
    }
  }, []);
  useEffect(() => {
    moment.tz.setDefault("Armenia/Yerevan");
  }, []);

  const fetchData = async (doctorId) => {
    try {
      //const response = await axiosPrivate.get('/bigCalendar');
      const response = await axiosPrivate.get(`/doctorEvents/${doctorId}`);
      const asd = response?.data?.jsonString?.map((el)=>{
        console.log(el.clientId)
        return{...el,end:new Date(el.end),start:new Date(el.end),title:el.doctorsEventId}})
        
      setEvents(asd);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  const handleDeleteEvent = async (eventId) => {
    debugger
    console.log(methods) 
    try {
      await axiosPrivate.delete(`/updateBigCalendar/${userData?.doctorId}/${eventId}`);
      const updatedEvents = events.filter((el) => el.doctorsEventId !== eventId);
      setEvents(updatedEvents);
      setShowCheckModal(false);
    } catch (error) {
      console.error("Error deleting event:", error);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  const createEvent = async (event) => {
    const newEventId = Math.max(...events.map((event) => event.id), 0) + 1;
    const newEvent = { ...selectedEvent, id: newEventId };
    console.log(selectedEvent);
    console.log(newEvent);
    setEvents([...events, newEvent]);

    const onSubmit = methods.handleSubmit(async (data) => {
      console.log(methods)
      debugger
      const newDoctorsVisit = {
        clientId: data.client?.value,
        medicalServices: data?.medicalServices
          ? data?.medicalServices?.map((el) => el.value)
          : null,
      };
      const updatedData = deleteNullProperties(newDoctorsVisit);
      const additionalData = {
        doctorId: `${userData?.doctorId}`,
        ...updatedData,
      };
      debugger;
      try {
        const response = await axiosPrivate.post(`/createDoctorEvent`, {
          ...additionalData,
          newEvent,
        });
        methods.reset({medicalServices:'',client:''})
        setMedicalServicePrice(0)
        const createdEvent = response.data;
        setEvents([...events, createdEvent]);
        setEvents([...events, newEvent]);

        console.log(newEvent);
        setShowModal(false);
      } catch (error) {
        console.error("Error creating event:", error);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    });
    onSubmit();
  };
  const handleDayClick = (slotInfo) => {
    setNewEventStart(slotInfo.start);
    setNewEventEnd(moment(slotInfo.start).add(1, "hour"));
    setEventName("");
    setShowModal(true);
    setSelectedEvent(slotInfo);
    console.log(slotInfo);
  };
  const updateEvent = async (updatedEvent) => {
    // console.log(updatedEvent)
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    setShowModal(false);
    try {
      await axiosPrivate.put(
        `/updateBigCalendar/${updatedEvent.id}`,
        updatedEvent
      );
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
    console.log(selectedEvent);
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
    console.log(event);
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
  const handleDragAndDrop = async ({ event, start, end }) => {
    console.log(event);
    console.log(start);
    console.log(end);
    const updatedEvent = { ...event, start, end };

    console.log("updatedEvent", updatedEvent);
    debugger;
    const asd = events.map((el) => {
      if (el.id === event.id) {
        el = updatedEvent;
        return el;
      }
      return el;
    });

    setEvents((prev) => asd);
    //await axios.put(`/api/events/${event.id}`, updatedEvent);
    //fetchEvents();
  };

  return (
    <div className="calendar-container " style={{ height: 500 }}>
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={handleDragAndDrop}
        onEventResize={handleDragAndDrop} // Add support for resizing
        resizable
        popup
        selectable
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => handleEditModalOpen(event)}
        onSelectSlot={(slotInfo) => handleDayClick(slotInfo)}
        draggableAccessor={() => true} // Enable dragging
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            localizer.format(date, "HH:mm", culture),
        }}
      />
      <Modal show={showModal} onHide={handleModalClose} size="mm">
        <FormProvider {...methods}>
          <div className="contact-body contact-detail-body">
            <div data-simplebar className="nicescroll-bar">
              <div className="d-flex flex-xxl-nowrap flex-wrap">
                <div className="contact-info w-100">
                  <Form
                    onSubmit={(e) => e.preventDefault()}
                    noValidate
                    autoComplete="off"
                    className="container"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {selectedEvent?.id ? "Փոփոխել" : "Ստեղծել"}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <div className="d-flex justify-content-between me-2">
                            <label className="form-label" htmlFor="patient">
                              Այցելուներ
                            </label>
                            {methods.formState.errors.client && (
                              <span className="error text-red">
                                <span>
                                  <img src={ErrorSvg} alt="errorSvg" />
                                </span>{" "}
                                պարտադիր
                              </span>
                            )}
                          </div>
                          <div className="form-control">
                            <Controller
                              name="client"
                              control={methods.control}
                              isClearable={true}
                              defaultValue={null}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  // onChange={(val) => {
                                  //   field.onChange(
                                  //     val ? val.value : null
                                  //   ); // Ensure you pass null when no patient is selected
                                  //   //onPatientSelect(val);
                                  // }}
                                  options={patients.map((client) => ({
                                    value: client.patientId,
                                    label: `${client?.patientId}․  ${client?.lastName} ${client?.firstName} ${client?.midName}`,
                                  }))}
                                  placeholder={"Ընտրել"}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <div className="d-flex justify-content-between me-2">
                              <div className="d-flex flex-row-reverse">
                                <p style={{ color: "#4eafcb" }}>
                                  Ընդհանուր արժեք։{" "}
                                  <span style={{ fontWeight: "bold" }}>
                                    {medicalServicePrice}
                                  </span>
                                  դր․
                                </p>
                              </div>
                        
                            <label
                              className="form-label"
                              htmlFor="research"
                              placeholder={"Ընտրել"}
                            >
                              Ընտրել ծառայությունը
                            </label>
                            {methods.formState.errors.medicalServices && (
                              <span className="error text-red">
                                <span>
                                  <img src={ErrorSvg} alt="errorSvg" />
                                </span>{" "}
                                պարտադիր
                              </span>
                            )}
                          </div>
                          <div className="form-control">
                            <Controller
                              name="medicalServices"
                              control={methods.control}
                              isClearable={true}
                              defaultValue={null}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <div style={{ zIndex: 9999 }}>
                                  {" "}
                                  {/* Set zIndex for the wrapper div */}
                                  <Select
                                    {...field}
                                    isMulti
                                    components={animatedComponents}
                                    closeMenuOnSelect={false}
                                    options={medicalServices.map((res) => ({
                                      value: res.medServiceId,
                                      label: `${res?.medServiceId}. ${res?.serviceName}`,
                                      price: res?.price,
                                    }))}
                                    // styles={colourStyles}
                                    menuPortalTarget={document.body}
                                    styles={{
                                      ...colourStyles,
                                      menuPortal: (base) => ({
                                        ...base,
                                        zIndex: 9999,
                                      }),
                                    }}
                                    placeholder={"Բժշկական ծառայություններ"}
                                    onChange={(val) => {
                                      field.onChange(val);
                                      onMedServiceSelect(val);
                                    }}
                                    value={field.value}
                                  />
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="d-flex flex-column"
                        style={{ position: "relative" }}
                      >
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
                        <div className="row gx-3">
                          <div className="col-sm-12 ">
                            <div className=" m-2">
                              <div>
                                <label className="form-label" htmlFor="patient">
                                  Սկիզբ
                                </label>
                              </div>

                              <input
                                type="datetime-local"
                                placeholder="Սկիզբ"
                                value={
                                  newEventStart
                                    ? moment(newEventStart).format(
                                        "YYYY-MM-DDTHH:mm"
                                      )
                                    : ""
                                }
                                onChange={(e) => {
                                  setNewEventStart(
                                    moment(e.target.value).toDate()
                                  );
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    start: e.target.value,
                                  });
                                }}
                                style={{
                                  margin: "2px",
                                  padding: "5px",
                                  border: "none",
                                  borderRadius: "5px",
                                  backgroundColor: "#e3e5e8",
                                  width: "100%",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row gx-3">
                          <div className="col-sm-12 ">
                            <div className=" m-2">
                              <div>
                                <label className="form-label" htmlFor="patient">
                                  Սկիզբ
                                </label>
                              </div>
                              <input
                                type="datetime-local"
                                placeholder="Ավարտ"
                                value={
                                  newEventStart
                                    ? moment(newEventEnd).format(
                                        "YYYY-MM-DDTHH:mm"
                                      )
                                    : ""
                                }
                                onChange={(e) => {
                                  setNewEventEnd(
                                    moment(e.target.value).toDate()
                                  );
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    end: e.target.value,
                                  });
                                  console.log(e.target.value);
                                }}
                                style={{
                                  margin: "2px",
                                  padding: "5px",
                                  border: "none",
                                  borderRadius: "5px",
                                  backgroundColor: "#e3e5e8",
                                  width: "100%",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row gx-3">
                          <div className="col-sm-12 ">
                            <div className=" m-2">
                              <div>
                                <label className="form-label" htmlFor="patient">
                                  Անվանում
                                </label>
                              </div>
                              <input
                                placeholder="Անվանում"
                                //defaultValue={selectedEvent?.title}
                                defaultValue={eventName ? eventName : ""}
                                onChange={(e) =>
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    title: e.target.value,
                                  })
                                }
                                style={{
                                  margin: "2px",
                                  padding: "5px",
                                  border: "none",
                                  borderRadius: "5px",
                                  backgroundColor: "#e3e5e8",
                                  width: "100%",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleModalClose}>
                        Չեղարկել
                      </Button>
                      {/* {console.log(selectedEvent)} */}
                      {selectedEvent?.id ? (
                        <>
                        <Button variant="primary" onClick={handleModalSave}>
                          Հաստատել
                        </Button>
                          <Button
                          variant="danger"
                          onClick={() => handleDeleteEvent(selectedEvent.doctorsEventId)}
                          >
                          Ջնջել
                        </Button>
                          </>
                      ) : (
                        <Button variant="primary" onClick={handleModalSave}>
                          Ստեղծել
                        </Button>
                      )}
                    </Modal.Footer>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </FormProvider>
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
