import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React, { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { desc_validation, email_validation, mobile_validation, name_validation } from '../../utils/inputValidations'
import { Input } from '../Input'
import { useSelector } from 'react-redux'
import { selectResearches } from '../../redux/features/researches/researchesSlice'
import Multiselect from 'multiselect-react-dropdown'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function ActivityModal({overlayIsOpen,setOverlayIsOpen,selectedItem,setSelectedItem}) {
  const axiosPrivate = useAxiosPrivate();
  const researchState= useSelector(selectResearches)
    const [openModal,setOpenModal]=useState(false)
    const [researchesArray, setResearchesArray] = useState([]);
    const multiselectRef = useRef("");
    const methods  = useForm({
      mode: "onChange",
    });
    const handleCloseModal = () => {
        setOverlayIsOpen(false);
    };
    
    const handleNewResearch = async()=>{

    
      const updatedSelectedItem = { ...selectedItem };
  if (
    updatedSelectedItem?.statusBoard?.length > 1 &&
    updatedSelectedItem.statusBoard[1]?.researches
  ) {   
    updatedSelectedItem.statusBoard[1].researches.push({
      id: Math.random(),
      name: `Հետազոտություն ${Math.random()}`
    });}
      handleCloseModal()
      try {
        const response = await axiosPrivate.post("./updateStatusBoard", JSON.stringify({
          statusBoard: selectedItem?.statusBoard,
          diagnosticsId:selectedItem?.diagnosticsId
        }));
        setSelectedItem(updatedSelectedItem);
      } catch (err) {
        console.log(err)
        // if (!err?.response) {
        //   setErrMsg("No Server Response");
        // }  else {
        //   setErrMsg(" Failed");
        // }
      }
        setOpenModal(false)
    }
    const onResearchSelect = (data) => {
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
                                                        
                         
                              <label className="form-label" htmlFor="doctor">
                                Հետազոտություններ
                              </label>
                              <Multiselect
                                    options={researchState}
                                    displayValue="researchName"
                                    onSelect={onResearchSelect}
                                    onRemove={onResearchDelete}
                                    closeOnSelect={true}
                                    id="input_tags_3"
                                    className="form-control"
                                    ref={multiselectRef}
                                    hidePlaceholder={true}
                                    placeholder="Հետազոտություններ"
                                    groupBy="category"
                                    style={{
                                      height: "10rem",
                                      overflow: "hidden",
                                    }}
                                  />
                                                       
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
