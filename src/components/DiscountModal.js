import React, { Suspense, useState, useEffect, useRef } from "react";
import { Form, FormProvider, useForm, Controller } from "react-hook-form";
import ErrorSvg from "./../dist/svg/error.svg";
import { Modal } from "react-bootstrap";
import { Input } from "./Input";
import { toast } from "react-toastify";
import useAxiosPrivate from "./../hooks/useAxiosPrivate";
import LoadingSpinner from "./LoadingSpinner";
import { deleteNullProperties } from "./../utils/helper";
import { Editor } from "@tinymce/tinymce-react";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import { useLocation, useNavigate } from "react-router-dom";
import { DISCOUNTS_URL, REGISTER_AGENT, ROLES } from "../utils/constants";
import emptydiscountBG from "./../dist/img/discountBgC.jpg";
import goldCard from "./../dist/img/Gold.png";
import silverCard from "./../dist/img/Blue.png";

function DiscountModal({ diagData,setDiagData,refreshData}) {
    
    const navigate = useNavigate();
    const location = useLocation();
     const [discountId, setDiscountId] = useState(0);
     const [discounts, setDiscounts] = useState(0);
     const [imgBlur, setImgBlur] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const editorRef = useRef(null);
console.log(discounts)
    const methods = useForm({
      mode: "onChange",
    });
    const handleDiscountPercent = (value) =>{
        console.log(value)
        setDiscountId(value)
        setImgBlur(value)
    }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const discountsResp = await axiosPrivate.get(DISCOUNTS_URL);
        setDiscounts(discountsResp?.data?.jsonString);      

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    setTimeout(() => {
      fetchData();
    }, 500);
  }, [navigate]);
  // const { onSubmit, methods } = useSubmitForm(
  //   REGISTER_AGENT,
  //   editorRef,
  //   getAgents,
  //   setErrMsg,
  //   handleToggleCreateModal,
  //   additionalData
  // );
  const notify = (text) =>
  toast.success(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const onSubmit = methods.handleSubmit(async (data) => {
    const newAgent = {
        discountId:discountId?+discountId:null,
        diagnosticsId:diagData?.diagnosticsId?+diagData?.diagnosticsId:null,

    };

    console.log(newAgent);
    setDiagData(false)
    try {
      await axiosPrivate.post('setDiscount', newAgent, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      //handleToggleCreateModal(false);
      refreshData();
      notify(
        `Զեղչը ավելացված է`
      );
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      }  else {
        setErrMsg(" Failed");
      }
    }
  }); 
  return (
    <Modal show={() => true} size="xl" onHide={() => setDiagData(false)}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Զեղչ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Suspense fallback={<LoadingSpinner />}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
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
                            <a href="#">Ընտրել զեղչը</a>
                           
                          </div>
                          <div className="card-body">
                            <div className="modal-body">
                            <div className="showDiscounts_section" style={{ display: 'flex', marginBottom: '5px', flexWrap: 'wrap' }}>
  {isLoading ? (
    <div className="d-flex justify-content-center align-items-center ms-15">
      <LoadingSpinner />
    </div>
  ) : (
    <>
      {discounts.length > 0 ? (
        discounts.map((el) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>              
                 <div className="third_column d-flex justify-content-center align-items-center">
                 <div onClick={() => handleDiscountPercent(el?.discountId)}
                style={{border:imgBlur===el.discountId?'4px double #4eafcb':'',}}
                 className="new_discount-box d-flex justify-content-center align-items-center">
                   <img
                     src={+el?.percentage<50?silverCard:goldCard}
                     className="new_box-image"
                     alt="emptyCard"
                     style={{objectFit:'cover',maxHeight:'150px'}}
                     />
                   <div className="new_box-content ">
                     <div className="d-flex flex-row ">

                     <p  style={{fontStyle:'italic', fontSize:'40px',marginTop:0,paddingTop:0,   margin:'0 0 25px -10px'}}>
                       {" "}
                        {el?.percentage}%
                     </p>
                     </div>
                     <div style={{lineHeight:'16px'}}>

                     <p  style={{fontStyle:'italic',color:'linear-gradient(135deg, #000000, #ffffff)',fontSize:'14px'}}>
                       Սկիզբ : {el.discountStart}
                     </p>
                     <p  style={{fontStyle:'italic',color:'white',fontSize:'14px'}}>
                       Ավարտ : {el.discountEnd}
                     </p>
                     <p  style={{fontStyle:'italic',color:'white',fontSize:'14px'}}>
                       {" "}
                       Նկարագիր : {el.description}
                     </p>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          );
        })
      ) : (
        ''
      )}
    </>
  )}
</div>
                            </div>
                          </div>
                        </div>
                        <div className="separator-full"></div>
                        <div className="modal-footer align-items-center">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setDiagData(false)}
                          >
                            Չեղարկել
                          </button>
                          <button
                            type="button"
                            onClick={onSubmit}
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Հաստատել
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </FormProvider>
          )}
        </Suspense>
      </Modal.Body>
    </Modal>
  )
}

export default DiscountModal
