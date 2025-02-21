import React, { useEffect, useState, useRef, Suspense } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch} from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import blueCard from "../../dist/img/Blue.png";
import goldCard from "../../dist/img/Gold.png";
import greenCard from "../../dist/img/Green.png";
import silverCard from "../../dist/img/Silver.png";
import {
  createDiscount,
  savedUniqDiscounts,
  reserchesList,
} from "../../redux/features/researches/researchesSlice";
import {
  disValue,
  disUniqValue,
  deleteDisValue,
  deleteDisUniqValue,
} from "../../redux/features/discounts/discountValueSlice";
import "../../dist/css/style.css";
import { toast } from "react-toastify";
import ErrorSvg from "../../dist/svg/error.svg";

import { Form, FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  desc_validation,
  discount_validation,
} from "../../utils/inputValidations";
import { Input } from "../Input";
import CustomDateTimeComponent from "../CustomDateTimeComponent";
import { DISCOUNTS_URL, REGISTER_DISCOUNT, ROLES } from "../../utils/constants";
import LoadingSpinner from "../LoadingSpinner";
import { deleteNullProperties } from "../../utils/helper";
import DiscountModal from "../DiscountModal";
import moment from "moment";
import Teeth from "./Teeth";

const GET_RESEARCHES = "/researchLists";

export default function DiscountCards() {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [researchState, setResearchState] = useState([]);
  const [researchesArray, setResearchesArray] = useState([]);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountUniqValue, setDiscountUniqValue] = useState(0);
  const customDisRef = useRef(0);
  const customUniqDisRef = useRef(0);
  const formRef = useRef("");
  const formRefInd = useRef("");
  const multiselectRef = useRef(null);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [globalDiscountData, setGlobalDiscountData] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [activeLink, setActiveLink] = useState("tab_global");
  const [pageTab, setPageTab] = useState("tab_global");
  const storedUserRoles = JSON.parse(localStorage.getItem('userRoles'));
  const [superAdmin,setSuperAdmin]=useState(storedUserRoles.includes(ROLES?.SuperAdmin))
  
  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
    setPageTab(linkId);
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
  const {reset,...methods} = useForm({
    mode: "onChange",
  });

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
  // useEffect(() => {
  //   setResearchState(() => getResearchState);
  // }, [getResearchState]);

  // useEffect(() => {
  //   setDiscountValue(() => getDiscountValue);
  // }, [getDiscountValue]);

  // useEffect(() => {
  //   setDiscountUniqValue(() => getUniqDiscountValue);
  // }, [getUniqDiscountValue]);
  /*------------------------------------------------------------------Get Researches----------------------------------------------------*/
  useEffect(() => {
    setTimeout(() => {
      axiosPrivate
        .get(GET_RESEARCHES)
        .then((resp) => {
          setResearchState(resp?.data?.jsonString);
          //setIsLoading(false);
        })
        .then((resp) => {
          axiosPrivate.get(DISCOUNTS_URL).then((resp) => {
            setGlobalDiscountData(resp?.data?.jsonString);
            setIsLoading(false);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }, []);
  const onSubmit = methods.handleSubmit(
    async ({ startDate, endDate, description, discount }) => {
      const newDiscountData = {
        type: "global",
        percentage: discount,
        description: description,
        discountStart: startDate
          ? moment(startDate)
              .utcOffset(startDate.getTimezoneOffset() / -60) // Correctly apply timezone offset
              .format('YYYY-MM-DD HH:mm') // Format directly with moment
          : moment().format('YYYY-MM-DD HH:mm'), // Format current date with moment
      
        discountEnd: endDate
          ? moment(endDate)
              .utcOffset(endDate.getTimezoneOffset() / -60)
              .format('YYYY-MM-DD HH:mm')
          : null,
      };

      console.log(newDiscountData);
      const formatedDiscountCard= deleteNullProperties(newDiscountData)

      axiosPrivate
      .post(REGISTER_DISCOUNT, formatedDiscountCard, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((resp) => {
        notify(`Զեղչը ավելացված է`);
        reset()
      })
      .then((resp) => {
        axiosPrivate.get(DISCOUNTS_URL).then((resp) => {
          console.log(resp)
          setGlobalDiscountData(resp?.data?.jsonString);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  );
  const handleCancelDiscount = async(discountId) => {
   
    axiosPrivate
    .delete(DISCOUNTS_URL, {
      data: { id: discountId},
      })
    .then((resp) => {
      notify("Զեղչը հեռացված է");
    })
    .then((resp) => {
      axiosPrivate.get(DISCOUNTS_URL).then((resp) => {
        console.log(resp)
        setGlobalDiscountData(resp?.data?.jsonString);
        setIsLoading(false);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  /*--------------------------------------------------------------------------------------------------------------------*/
  const onResearchSelect = (data) => {
    let researchesArr = [];
    for (let research of data) {
      researchesArr.push(Object.values(research)[1]);
    }
    setResearchesArray((prev) => (prev = researchesArr));
  };
  const onResearchDelete = (data) => {
    let researchesArr = [];
    for (let research of data) {
      researchesArr.push(Object.values(research)[1]);
    }
    setResearchesArray((prev) => (prev = researchesArr));
  };
  const createNew = (discount) => {
    if (parseInt(discount) > 0 && !customUniqDisRef.current.length) {
      setDiscountValue(() => discount);
      // formRef.current.reset();
      dispatch(createDiscount(parseInt(discount)));
      dispatch(disValue(discount));
      notify(`Դուք ստեղծել եք ${discount}% զեղչ`);
    }

    if (
      researchesArray.length &&
      customUniqDisRef.current.length &&
      !customDisRef.current.length &&
      parseInt(discount) > 0
    ) {
      dispatch(disUniqValue(customUniqDisRef.current));
      dispatch(savedUniqDiscounts(researchesArray));
      const uniqState = researchState.map((el) => {
        if (researchesArray.includes(el.research))
          return {
            ...el,
            price: Math.ceil(el.price - (el.price / 100) * discountValue),
          };
        else {
          return el;
        }
      });
      dispatch(reserchesList(uniqState));
      multiselectRef.current.resetSelectedValues();
      notify(`Դուք ստեղծել եք ${customUniqDisRef.current}% զեղչ`);
    }
  };
  const deleteCommonDiscount = () => {
    formRef.current.reset();
    customDisRef.current = 0;
    dispatch(createDiscount(0));
    dispatch(deleteDisValue());
    multiselectRef.current.resetSelectedValues();
    notify(`Դուք ջնջել եք  զեղչը`);
  };
  const deleteUniqDiscount = () => {
    formRefInd.current.reset();
    customUniqDisRef.current = 0;
    setResearchesArray(() => []);
    dispatch(createDiscount(0));
    dispatch(deleteDisUniqValue());
    multiselectRef.current.resetSelectedValues();
    notify(`Դուք ջնջել եք  զեղչը`);
  };
  const refreshPage = () => {
    let paglink = document.querySelectorAll(".page-item");
    paglink[0].firstChild.click();
  };
  return (
    <>
    <div className="hk-pg-body py-0 " >
      <div className="taskboardapp-wrap"  style={{ height: '100%' }}>
        <div className="taskboardapp-content p-2">
          <div className="taskboardapp-detail-wrap">
          <div className="d-flex justify-content-center align-items-center"><h2>Զեղչային համակարգ</h2></div>
            <header className=" d-flex flex-column discount-header_section" >
              <ul className="nav nav-justified nav-light nav-tabs nav-segmented-tabs active-theme mx-auto ">
                <li className="nav-item">
                  <a
                    data-bs-toggle="tab"
                    href="#"
                    className={`nav-link ${
                      activeLink === "tab_global" ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick("tab_global")}
                    >
                    <span className="nav-link-text">Ընդհանուր</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-bs-toggle="tab"
                    href="#"
                    className={`nav-link ${
                      activeLink === "tab_researches" ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick("tab_researches")}
                    >
                    <span className="nav-link-text">Հետազոտություններ</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-bs-toggle="tab"
                    href="#"
                    className={`nav-link ${
                      activeLink === "tab_patients" ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick("tab_patients")}
                    >
                    <span className="nav-link-text badge-on-text">
                      Հաճախորդներ
                    </span>
                  </a>
                </li>
              </ul>
            </header>
            {pageTab === "tab_global" && (
              <main>
               
                
                <section className="discount-section min-vh-100">
                  <div
                    className="common_discount_container "
                    style={{ padding: "1rem" }}
                    >
                    <FormProvider {...methods}>
                      <div className="contact-body contact-detail-body">
                        <div data-simplebar className="nicescroll-bar">
                          <div className="d-flex flex-xxl-nowrap flex-wrap">
                            <div className="contact-info w-100 ">
                              <Form
                                onSubmit={(e) => e.preventDefault()}
                                noValidate
                                autoComplete="off"
                                className="containern"
                                >
                                <div className="card" >
                                  <div className="card-body">
                                    <div className="d-flex justify-content-between flex-column" >
                                      {!!superAdmin &&
                                      <div className=" setDiscount_section" style={{display:'flex',gap:'30px',marginBottom:'16px'}}>
                                      <div className="colomns_wrapper">
                                        <div className="first_column">
                                          <Input {...discount_validation} />
                                          <Input {...desc_validation} />
                                          
                                        </div>

                                        <div className="second_column">
                                          <div className="form-group">
                                            <div className="d-flex justify-content-between me-2">
                                              <label
                                                className="form-label"
                                                htmlFor="startDate"
                                                >
                                                Զեղչի սկիզբ
                                              </label>                                              
                                                 {(methods.formState.errors.startDate & !methods.formState.errors.notValidVisitDate?.message) ? (
                                                   <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                                  ):''}
                                  {methods.formState.errors.notValidVisitDate?.message && (
                                   
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> Սխալ ձևաչափ</span>
                                  )}
                                            </div>
                                            <div>
                                              <CustomDateTimeComponent
                                                name="startDate"
                                                control={methods.control}
                                                required={false}
                                                methods={methods}
                                                defaultValue={ moment().toDate()}
                                                  />
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <div className="d-flex justify-content-between me-2">
                                              <label
                                                className="form-label"
                                                htmlFor="endDate"
                                                >
                                                Զեղչի ավարտ
                                              </label>
                                              {(methods.formState.errors.endDate & !methods.formState.errors.notValidVisitDate?.message) ? (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                  ):''}
                                  {methods.formState.errors.notValidVisitDate?.message && (
                                   
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> Սխալ ձևաչափ</span>
                                  )}
                                            </div>
                                            <div>
                                              <CustomDateTimeComponent
                                                name="endDate"
                                                control={methods.control}
                                                required={false}
                                                methods={methods}
                                                />
                                            </div>
                                          </div>
                                        </div>
                                        </div>

                                        <div className="d-flex justify-content-center align-items-center">

                                        <button
                                      type="button"
                                      onClick={onSubmit}
                                      className="btn btn-primary"
                                      data-bs-dismiss="modal"
                                      style={{maxHeight:'3rem'}}
                                      >
                                      Ավելացնել
                                    </button>
                                      </div>
                                      </div>
                                        }
                                        <div className="showDiscounts_section" style={{display:'flex',marginBottom:'5px',flexWrap:'wrap'}}>                                    
                                      <Suspense fallback={<LoadingSpinner />}>
                                      {isLoading ? (
                                        <div className="d-flex justify-content-center  align-items-center ms-15">

                                          <LoadingSpinner />
                                        </div>
                                      ) : (
                                        <>
                                          {globalDiscountData.length>0 ? globalDiscountData.map((el,i)=>{
                                            
                                            return(                                              
                                              
                                              <div style={{display:'flex',flexDirection:'column',margin:'5px'}} key={i}>   
                                      <div className="third_column d-flex justify-content-center align-items-center">
                                        <div className="new_discount-box d-flex justify-content-center align-items-center">
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
                                  <div className="d-flex justify-content-center align-items-center gap-2 m-2">
                                  {!!superAdmin &&
                                    <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={(e) => handleCancelDiscount(el?.discountId)}
                                    >
                                      Չեղարկել
                                    </button>
                                          }
                                  </div>
                                  </div>
                                         ) }):'' }
                                        </>
                                        )}
                                        </Suspense>
                                        </div>   
                                    </div>
                                  </div>
                                </div>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FormProvider>
                  </div>
                </section>

              </main>
            )}
            {pageTab === "tab_researches" && (
              <main>
                <section className="discount-section">
                  {/* <Teeth/> */}
                </section>
              </main>
            )}
            {pageTab === "tab_patients" && (
              <main>
                <section className="discount-section">
                </section>
              </main>
            )}
          </div>
        </div>
      </div>
    </div>
            </>
  );
}
