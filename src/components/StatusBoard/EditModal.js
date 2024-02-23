import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React, { useState } from 'react'

import { Modal } from 'react-bootstrap'
import { Form, FormProvider, useForm } from 'react-hook-form'
function EditModal({overlayIsOpen,setOverlayIsOpen,activity}) {
  const [value, setValue] = useState(activity.name);

  console.log('selectedItem',activity)
  const methods  = useForm({
    mode: "onChange",
  });
  const handleCloseModal = () => {
    setOverlayIsOpen(false);
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
                                Հետազոտության անվանում
                              </label>
                             <input type='text' value={value} onChange={(e)=>setValue(e.target.value)}/>
                                                       
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
                   //onClick={handleNewResearch}
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

export default EditModal
