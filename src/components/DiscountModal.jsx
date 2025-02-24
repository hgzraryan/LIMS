import  { Suspense, useState, useEffect, useRef } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import LoadingSpinner from "./LoadingSpinner";

import { useLocation, useNavigate } from "react-router-dom";
import { DISCOUNTS_URL} from "../utils/constants";
import blueCard from "../dist/img/Blue.png";
import goldCard from "../dist/img/Gold.png";
import greenCard from "../dist/img/Green.png";
import silverCard from "../dist/img/Silver.png";
import { deleteNullProperties } from "../utils/helper";

function DiscountModal({ discountData,setDiscountData,refreshData}) {
    
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
  console.log(discountData)
  const onSubmit = methods.handleSubmit(async (data) => {
    const newDiscount = {
        discountId:discountId?+discountId:null,
        diagnosticsId:discountData?.diagnosticsId?+discountData?.diagnosticsId:null,
        doctorVisitId:discountData?.doctorsVisitId?+discountData?.doctorsVisitId:null,
        radiologyId:discountData?.radiologyId?+discountData?.radiologyId:null,

    };
 const updatedData = deleteNullProperties(newDiscount)

    console.log(updatedData);
    setDiscountData(false)
    try {
      await axiosPrivate.post('setDiscount', updatedData, {
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
    <Modal show={() => true} size="xl" onHide={() => setDiscountData(false)}>
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
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      {discounts.length > 0 ? (
        discounts.map((el,i) => {
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>              
                 <div className="third_column d-flex justify-content-center align-items-center">
                 <div onClick={() => handleDiscountPercent(el?.discountId)}
                style={{border:imgBlur===el.discountId?'4px double #4eafcb':'',}}
                 className="new_discount-box d-flex justify-content-center align-items-center">
                         <img
                                            src={
                                              +el?.percentage<=10
                                              ?blueCard
                                              :+el?.percentage>10 && +el?.percentage<=20
                                              ?greenCard
                                              :+el?.percentage>20 && +el?.percentage<=50
                                              ?silverCard
                                              :+el?.percentage>50
                                              ?goldCard:''}
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
    </div>
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
                            onClick={() => setDiscountData(false)}
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
