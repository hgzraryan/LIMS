import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Form, FormProvider, useForm,Controller } from 'react-hook-form'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { RESEARCHLISTS_URL } from '../../utils/constants'
import makeAnimated from "react-select/animated";
import Select from "react-select";
import ErrorSvg from "../../dist/svg/error.svg";

function ActivityModal({overlayIsOpen,setOverlayIsOpen,selectedItem,setSelectedItem}) {
  const axiosPrivate = useAxiosPrivate();
    const [openModal,setOpenModal]=useState(false)
    const [researchesArray, setResearchesArray] = useState([]);
    const [researcheList, setResearcheList] = useState([]);
    const [selectedResearch, setSelectedResearch] = useState([]);
    const animatedComponents = makeAnimated();
    const handleResearchChange = (selectedOption) => {
      setSelectedResearch(selectedOption);
      
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
    const methods  = useForm({
      mode: "onChange",
    });
    useEffect(() => {
      setTimeout(() => {
        axiosPrivate
          .get(RESEARCHLISTS_URL)
          .then((resp) => {
            setResearcheList(resp?.data?.jsonString);
            // setIsLoading(false);
          }).catch((err) => {
            console.log(err);
          });
      }, 500);
    }, []);
    const handleCloseModal = () => {
        setOverlayIsOpen(false);
    };
    
    const handleNewResearch = async () => {
      console.log('selectedItem', selectedItem);
  
      const updatedSelectedItem = { ...selectedItem };
  
      if (
        updatedSelectedItem?.statusBoard?.length > 1 &&
        updatedSelectedItem.statusBoard[1]?.researches
      ) {
        updatedSelectedItem.statusBoard[1].researches.push({
          id: selectedResearch?.id || '',
          name: selectedResearch?.name || '',
          partnerCode: selectedResearch.partnerCode || '',
          laboratoryService: selectedResearch.laboratoryService || '',
          categoryName: selectedResearch.categoryName || '',
          price: selectedResearch.price || ''
        });
      }
  
      setSelectedItem(updatedSelectedItem);
      
      try {
        const response = await axiosPrivate.post(
          "./updateStatusBoard",
          JSON.stringify({
            statusBoard: updatedSelectedItem?.statusBoard,
            diagnosticsId: updatedSelectedItem?.diagnosticsId
          })
        );
        console.log(response.data); // Assuming backend responds with data
        // Optionally, you can update state after successful backend response
        setSelectedItem(updatedSelectedItem);
      } catch (err) {
        console.log(err);
        // Handle errors here
      }
    };
    const onResearchSelect = (data) => {
      console.log('data',data)
      let researchesArr = [];
      //let researchesPrice = [];
      for (let research of data) {
        researchesArr.push(research?.researchListId.toString());
        // researchesPrice.push(research?.researchListPrice);
      }
      //researchesPrice = researchesPrice.reduce((acc, el) => (acc += el), 0);
      setResearchesArray((prev) => (prev = researchesArr));
      // setResearchesPrice((prev) => (prev = researchesPrice));
    };
    const onResearchDelete = (data) => {
      let researchesArr = [];
      for (let research of data) {
        researchesArr.push(research?.researchListId.toString());
      }
      setResearchesArray((prev) => (prev = researchesArr));
    };
    
  return (
    <>
    <Modal
 show={overlayIsOpen}
 size="xl"
 onHide={() => setOverlayIsOpen(false)}
>
 <Modal.Header closeButton>
   <Modal.Title style={{ width: "100%", textAlign: "center" }}>
     ՀԵՏԱԶՈՏՈՒԹՅԱՆ ԱՆՎԱՆՈՒՄ
   </Modal.Title>
 </Modal.Header>
 <Modal.Body>
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
               <div className="card">
                 <div className="card-header">
                   <a href="#">տվյալներ</a>
                   <button
                     className="btn btn-xs btn-icon btn-rounded btn-light"
                     data-bs-toggle="tooltip"
                     data-bs-placement="top"
                     title=""
                     data-bs-original-title="Edit"
                   >
                     <span
                       className="icon"
                       data-bs-toggle="modal"
                       data-bs-target="#editInfo"
                     >
                       <span class="feather-icon">
                         <FeatherIcon icon="edit-2" />
                       </span>
                     </span>
                   </button>
                 </div>
                 <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3">
                                                        
                          <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="research"
                                      placeholder={"Ընտրել"}
                                    >
                                      Ընտրել հետազոտություն
                                    </label>
                                    {methods.formState.errors.research && (
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
                                      name="research"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={null}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          value={selectedResearch}

                                          closeMenuOnSelect={false}
                                          components={animatedComponents}
                                                    onChange={handleResearchChange}

                                          options={researcheList.map((res) => ({
                                            value: res.researchListId,
                                            label: `${res?.researchName}`,
                                          }))}
                                          styles={colourStyles}
                                          placeholder={"Հետազոտություններ"}
                                        />
                                      )}
                                    />
                                  </div>
                                                       
                          </div>
                        </div>
                      </div>
               </div>
               <div className="separator-full"></div>
               
               <div className="separator-full"></div>

               <div className="modal-footer align-items-center">
                 <button
                   type="button"
                   className="btn btn-secondary"
                   onClick={handleCloseModal} 
                   >
                   Չեղարկել
                 </button>
                 <button
                   type="button"
                   onClick={handleNewResearch}
                   className="btn btn-primary"
                   data-bs-dismiss="modal"
                 >
                   Ավելացնել
                 </button>
               </div>
             </Form>
           </div>
         </div>
       </div>
     </div>
   </FormProvider>
 </Modal.Body>
</Modal>
</>
  )
}

export default ActivityModal
