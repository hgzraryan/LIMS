/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef, Suspense } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
//import emptyCard from "../../dist/img/discount-bg.png";
import emptyCard from "../../dist/img/discount_testImg.png";
import emptydiscountBG from "../../dist/img/discountBgC.jpg";
import { Button } from "react-bootstrap";
import {
  createDiscount,
  selectUniqResearches,
  selectResearches,
  savedUniqDiscounts,
  reserchesList,
} from "../../redux/features/researches/researchesSlice";
import {
  disValue,
  disUniqValue,
  deleteDisValue,
  deleteDisUniqValue,
  selectdiscountValue,
  selectdiscounUniqValue,
} from "../../redux/features/discounts/discountValueSlice";
import "../../dist/css/style.css";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { toast } from "react-toastify";
import ErrorSvg from "../../dist/svg/error.svg";

import { Form, FormProvider, useForm, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  desc_validation,
  discount_validation,
  name_validation,
} from "../../utils/inputValidations";
import { Input } from "../Input";
import CustomDateTimeComponent from "../CustomDateTimeComponent";
import { DISCOUNTS_URL, REGISTER_DISCOUNT } from "../../utils/constants";
import LoadingSpinner from "../LoadingSpinner";

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
  const getResearchState = useSelector(selectResearches);
  const getDiscountValue = useSelector(selectdiscountValue);
  const getUniqDiscountValue = useSelector(selectdiscounUniqValue);
  const getUniqDiscountResearches = useSelector(selectUniqResearches);
  const animatedComponents = makeAnimated();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [globalDiscountData, setGlobalDiscountData] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [activeLink, setActiveLink] = useState("tab_global");
  const [pageTab, setPageTab] = useState("tab_global");
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
            console.log(resp)
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
          ? new Date(
              startDate.getTime() - startDate.getTimezoneOffset() * 60000
            )
              .toISOString()
              .replace("T", " ")
              .replace(/\.\d{3}Z/, "")
              .split(":")
              .slice(0, -1)
              .join(":")
          : null,

        discountEnd: endDate
          ? new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000)
              .toISOString()
              .replace("T", " ")
              .replace(/\.\d{3}Z/, "")
              .split(":")
              .slice(0, -1)
              .join(":")
          : null,
      };

      console.log(newDiscountData);
      axiosPrivate
      .post(REGISTER_DISCOUNT, newDiscountData, {
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
    // <div>
    //   <div className="contactapp-wrap">
    //     <div className="contactapp-content">
    //       <div className="contactapp-detail-wrap">
    //         <header className="contact-header">
    //           <div className="d-flex align-items-center">
    //             <div className="dropdown">
    //               <a
    //                 className="contactapp-title link-dark"
    //                 data-bs-toggle="dropdown"
    //                 href="#"
    //                 role="button"
    //                 aria-haspopup="true"
    //                 aria-expanded="false"
    //               >
    //                 <h1>Զեղչի քարտեր</h1>
    //               </a>
    //               {/*
    // 			<div className={showUserMenu ? 'dropdown-menu show' : 'dropdown-menu'} >
    // 				<a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="users" /></span><span>Users1</span></a>
    // 				<a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="star" /></span><span>Users2</span></a>
    // 				<a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="archive" /></span><span>Users3</span></a>
    // 				<a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="edit" /></span><span>Users4</span></a>
    // 			</div>
    // 			*/}
    //             </div>
    //           </div>
    //           <div className="contact-options-wrap">
    //             <a
    //               className="btn btn-icon btn-flush-dark flush-soft-hover dropdown-toggle no-caret active"
    //               href="#"
    //               data-bs-toggle="dropdown"
    //             >
    //               <span className="icon">
    //                 <span className="feather-icon">
    //                   <FeatherIcon icon="list" />
    //                 </span>
    //               </span>
    //             </a>
    //             <div className="dropdown-menu dropdown-menu-end">
    //               <a className="dropdown-item active" href="contact.html">
    //                 <span className="feather-icon dropdown-icon">
    //                   <FeatherIcon icon="list" />
    //                 </span>
    //                 <span>List View</span>
    //               </a>
    //               <a className="dropdown-item" href="contact-cards.html">
    //                 <span className="feather-icon dropdown-icon">
    //                   <FeatherIcon icon="grid" />
    //                 </span>
    //                 <span>Grid View</span>
    //               </a>
    //               <a className="dropdown-item" href="#">
    //                 <span className="feather-icon dropdown-icon">
    //                   <FeatherIcon icon="server" />
    //                 </span>
    //                 <span>Compact View</span>
    //               </a>
    //             </div>
    //             <a
    //               className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret d-sm-inline-block d-none"
    //               href="#"
    //               data-bs-toggle="tooltip"
    //               data-placement="top"
    //               onClick={refreshPage}
    //               title=""
    //               data-bs-original-title="Refresh"
    //             >
    //               <span className="icon">
    //                 <span className="feather-icon">
    //                   <FeatherIcon icon="refresh-cw" />
    //                 </span>
    //               </span>
    //             </a>
    //             <div className="v-separator d-lg-block d-none"></div>
    //             <a
    //               className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret  d-lg-inline-block d-none  ms-sm-0"
    //               href="#"
    //               data-bs-toggle="dropdown"
    //             >
    //               <span
    //                 className="icon"
    //                 data-bs-toggle="tooltip"
    //                 data-placement="top"
    //                 title=""
    //                 data-bs-original-title="Manage Contact"
    //               >
    //                 <span className="feather-icon">
    //                   <FeatherIcon icon="settings" />
    //                 </span>
    //               </span>
    //             </a>
    //             <div className="dropdown-menu dropdown-menu-end">
    //               <a className="dropdown-item" href="#">
    //                 Manage User
    //               </a>
    //               <a className="dropdown-item" href="#">
    //                 Import
    //               </a>
    //               <a className="dropdown-item" href="#">
    //                 Export
    //               </a>
    //               <div className="dropdown-divider"></div>
    //               <a className="dropdown-item" href="#">
    //                 Send Messages
    //               </a>
    //               <a className="dropdown-item" href="#">
    //                 Delegate Access
    //               </a>
    //             </div>
    //             <a
    //               className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret d-lg-inline-block d-none"
    //               href="#"
    //               data-bs-toggle="dropdown"
    //             >
    //               <span
    //                 className="icon"
    //                 data-bs-toggle="tooltip"
    //                 data-placement="top"
    //                 title=""
    //                 data-bs-original-title="More"
    //               >
    //                 <span className="feather-icon">
    //                   <FeatherIcon icon="more-vertical" />
    //                 </span>
    //               </span>
    //             </a>
    //             <div className="dropdown-menu dropdown-menu-end">
    //               <a className="dropdown-item" href="profile.html">
    //                 <span className="feather-icon dropdown-icon">
    //                   <FeatherIcon icon="star" />
    //                   <i data-feather="star"></i>
    //                 </span>
    //                 <span>Stared Contacts</span>
    //               </a>
    //               <a className="dropdown-item" href="#">
    //                 <span className="feather-icon dropdown-icon">
    //                   <FeatherIcon icon="archive" />
    //                   <i data-feather="archive"></i>
    //                 </span>
    //                 <span>Archive Contacts</span>
    //               </a>
    //               <div className="dropdown-divider"></div>
    //               <a className="dropdown-item" href="email.html">
    //                 <span className="feather-icon dropdown-icon">
    //                   <FeatherIcon icon="slash" />
    //                   <i data-feather="slash"></i>
    //                 </span>
    //                 <span>Block Content</span>
    //               </a>
    //               <a className="dropdown-item" href="email.html">
    //                 <span className="feather-icon dropdown-icon">
    //                   <FeatherIcon icon="external-link" />
    //                   <i data-feather="external-link"></i>
    //                 </span>
    //                 <span>Feedback</span>
    //               </a>
    //             </div>
    //             <a
    //               className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable d-sm-inline-block d-none"
    //               href="#"
    //               data-bs-toggle="tooltip"
    //               data-placement="top"
    //               title=""
    //               data-bs-original-title="Collapse"
    //             >
    //               <span className="icon">
    //                 <span className="feather-icon">
    //                   <FeatherIcon icon="list" />
    //                   <i data-feather="chevron-up"></i>
    //                 </span>
    //                 <span className="feather-icon d-none">
    //                   <FeatherIcon icon="list" />
    //                   <i data-feather="chevron-down"></i>
    //                 </span>
    //               </span>
    //             </a>
    //           </div>
    //         </header>
    //         <div className="contact-body">
    // <section className="discount-section">
    //   <div className="d-flex align-center justify-content-center">
    //     <h1>Զեղչի Քարտեր</h1>
    //   </div>
    //   <div className="discount-section_container">
    //     <button className="discount-section_box" onClick={() => createNew("3")}>
    //       <img src={emptyCard} className="section_box-image " alt="emptyCard" />
    //       <h1 className="section_box-content">3 % Զեղչ</h1>
    //     </button>
    //     <button className="discount-section_box" onClick={() => createNew("5")}>
    //       <img src={emptyCard} className="section_box-image " alt="emptyCard" />
    //       <h1 className="section_box-content">5 % Զեղչ</h1>
    //     </button>
    //     <button className="discount-section_box" onClick={() => createNew("7")}>
    //       <img src={emptyCard} className="section_box-image " alt="emptyCard" />
    //       <h1 className="section_box-content">7 % Զեղչ</h1>
    //     </button>
    //     <button
    //       className="discount-section_box"
    //       onClick={() => createNew("10")}
    //     >
    //       <img src={emptyCard} className="section_box-image " alt="emptyCard" />
    //       <h1 className="section_box-content">10 % Զեղչ</h1>
    //     </button>
    //   </div>

    //   <div className="custom_discount-container d-flex flex-column me-30 ms-30">
    //     <div className="common ">
    //       <form ref={formRef} className="custom_discount-form">
    //         <input
    //           className="custom_discount_form-input"
    //           type="number"
    //           placeholder="ԳՐԵՔ ԶԵՂՉԻ ՉԱՓԸ"
    //           ref={customDisRef}
    //           onChange={(e) => (customDisRef.current = e.target.value)}
    //         />
    //         <div className="d-flex justify-content-end">
    //           <Button
    //             className="me-2"
    //             onClick={() => createNew(customDisRef.current)}
    //           >
    //             ՍՏԵՂԾԵԼ
    //           </Button>
    //           <Button onClick={() => deleteCommonDiscount()}>ՋՆՋԵԼ</Button>
    //         </div>
    //       </form>

    //       <div className="new_discount-container">
    //         <h1>
    //           {discountValue?.length
    //             ? "Դուք ստեղծել եք զեղչի քարտ"
    //             : "Ստեղծեք զեղչի քարտ"}
    //         </h1>
    //         <div className="new_discount-box">
    //           <img src={emptyCard} className="new_box-image" alt="emptyCard" />
    //           <h1 className="new_box-content">{discountValue} % Զեղչ</h1>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="individual">
    //       <form ref={formRefInd} className="custom_discount-form">
    //         <input
    //           className="custom_discount_form-input"
    //           type="number"
    //           ref={customUniqDisRef}
    //           placeholder="ԳՐԵՔ ԶԵՂՉԻ ՉԱՓԸ"
    //           required
    //           onChange={(e) => (customUniqDisRef.current = e.target.value)}
    //         />
    //         <div className="d-flex justify-content-end mb-2">
    //           <Button
    //             className="me-2"
    //             onClick={() => createNew(customUniqDisRef.current)}
    //           >
    //             ՍՏԵՂԾԵԼ
    //           </Button>
    //           <Button onClick={() => deleteUniqDiscount()}>ՋՆՋԵԼ</Button>
    //         </div>
    //         <div className="col-sm-12">
    //                               <div className="d-flex justify-content-between me-2">
    //                                 <label
    //                                   className="form-label"
    //                                   htmlFor="research"
    //                                   placeholder={"Ընտրել"}
    //                                 >
    //                                   Ընտրել հետազոտություն
    //                                 </label>
    //                                 {methods.formState.errors.research && (
    //                                   <span className="error text-red">
    //                                     <span>
    //                                       <img src={ErrorSvg} alt="errorSvg" />
    //                                     </span>{" "}
    //                                     պարտադիր
    //                                   </span>
    //                                 )}
    //                               </div>
    //                               <div className="form-control">
    //                                 <Controller
    //                                   name="research"
    //                                   control={methods.control}
    //                                   isClearable={true}
    //                                   defaultValue={null}
    //                                   rules={{ required: true }}
    //                                   render={({ field }) => (
    //                                     <Select
    //                                       {...field}
    //                                       isMulti
    //                                       closeMenuOnSelect={false}
    //                                       components={animatedComponents}
    //                                       options={researchState.map((res) => ({
    //                                         value: res.researchListId,
    //                                         label: `${res?.researchName}`,
    //                                       }))}
    //                                       styles={colourStyles}
    //                                       placeholder={"Հետազոտություններ"}
    //                                       menuPlacement="top"

    //                                     />
    //                                   )}
    //                                 />
    //                               </div>
    //                             </div>
    //         <Multiselect
    //           options={researchState} // Options to display in the dropdown
    //           displayValue="researchName" // Property name to display in the dropdown options
    //           onSelect={onResearchSelect} // Function will trigger on select event
    //           onRemove={onResearchDelete} // Function will trigger on remove event
    //           closeOnSelect={true}
    //           id="input_tags_3"
    //           className="form-control "
    //           ref={multiselectRef}
    //           hidePlaceholder={true}
    //           placeholder="Հետազոտություններ"
    //           groupBy="category_name"
    //           emptyRecordMsg="Ընտրեք հետազոտության տեսակը"

    //           style={{
    //             height: "10rem",
    //             overflow: "hidden",
    //           }}
    //         />
    //       </form>
    //       {discountUniqValue?.length && (
    //         <div>
    //           <h3>
    //             Դուք ավելացրել եք {discountUniqValue} % զեղչ հետևյալ
    //             հետազոտությունների համար
    //           </h3>
    //           <ul>
    //             {getUniqDiscountResearches.map((el, index) => (
    //               <li key={index}>
    //                 {index + 1}.{el}
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </section>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="hk-pg-body py-0">
      <div className="taskboardapp-wrap">
        <div className="taskboardapp-content p-2">
          <div className="taskboardapp-detail-wrap">
          <div className="d-flex justify-content-center align-items-center"><h2>Զեղչային համակարգ</h2></div>
            <header className="taskboard-header d-flex flex-column">
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
               
                
                <section className="discount-section">
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
                                <div className="card">
                                  <div className="card-body">
                                    <div className="d-flex justify-content-between flex-column">
                                      <div className="d-flex gap-5 mb-3">
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
                                              {methods.formState.errors
                                                .startDate && (
                                                <span className="error text-red">
                                                  <span>
                                                    <img
                                                      src={ErrorSvg}
                                                      alt="errorSvg"
                                                    />
                                                  </span>{" "}
                                                  պարտադիր
                                                </span>
                                              )}
                                            </div>
                                            <div>
                                              <CustomDateTimeComponent
                                                name="startDate"
                                                control={methods.control}
                                                required={true}
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
                                              {methods.formState.errors
                                                .endDate && (
                                                <span className="error text-red">
                                                  <span>
                                                    <img
                                                      src={ErrorSvg}
                                                      alt="errorSvg"
                                                    />
                                                  </span>{" "}
                                                  պարտադիր
                                                </span>
                                              )}
                                            </div>
                                            <div>
                                              <CustomDateTimeComponent
                                                name="endDate"
                                                control={methods.control}
                                                required={true}
                                              />
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
                                        <div style={{display:'flex',marginBottom:'5px',flexWrap:'wrap'}}>                                    
                                      <Suspense fallback={<LoadingSpinner />}>
                                      {isLoading ? (
                                        <div className="d-flex justify-content-center  align-items-center ms-15">

                                          <LoadingSpinner />
                                        </div>
                                      ) : (
                                        <>
                                          {globalDiscountData.length>0 ? globalDiscountData.map((el)=>{
                                            
                                            return(                                              
                                              
                                              <div style={{display:'flex',flexDirection:'column',margin:'5px'}}>   
                                      <div className="third_column d-flex justify-content-center align-items-center">
                                        <div className="new_discount-box d-flex justify-content-center align-items-center">
                                          <img
                                            src={emptydiscountBG}
                                            className="new_box-image"
                                            alt="emptyCard"
                                            style={{objectFit:'cover'}}
                                            />
                                          <div className="new_box-content">
                                            <p style={{ fontSize: "1rem" }}>
                                              {" "}
                                              Ակտիվ զեղչ : {el?.percentage} %
                                            </p>
                                            <p style={{ fontSize: "1rem" }}>
                                              Սկիզբ : {el.discountStart}
                                            </p>
                                            <p style={{ fontSize: "1rem" }}>
                                              Ավարտ : {el.discountEnd}
                                            </p>
                                            <p style={{ fontSize: "1rem" }}>
                                              {" "}
                                              Նկարագիր : {el.description}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                  <div className="d-flex justify-content-center align-items-center gap-2 m-2">
                                    
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={(e) => handleCancelDiscount(el?.discountId)}
                                      >
                                      Չեղարկել
                                    </button>
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
                  {/* <div
     className="common_discount_container "
     style={{ border: "1px solid black", padding: "1rem" }}
   >
     <div className="d-flex align-center justify-content-center">
       <div className="new_discount-container">
         <h1>
           {discountValue?.length
             ? "Դուք ստեղծել եք զեղչի քարտ"
             : "Ստեղծեք զեղչի քարտ"}
         </h1>
         <div className="new_discount-box">
           <img
             src={emptyCard}
             className="new_box-image"
             alt="emptyCard"
           />
           <h1 className="new_box-content">
             {discountValue} % Զեղչ
           </h1>
         </div>
       </div>
     </div>
     <form ref={formRef} className="custom_discount-form">
       <input
         className="custom_discount_form-input"
         type="number"
         placeholder="ԳՐԵՔ ԶԵՂՉԻ ՉԱՓԸ"
         ref={customDisRef}
         onChange={(e) => (customDisRef.current = e.target.value)}
       />
       <div className="d-flex justify-content-end">
         <Button
           className="me-2"
           onClick={() => createNew(customDisRef.current)}
         >
           ՍՏԵՂԾԵԼ
         </Button>
         <Button onClick={() => deleteCommonDiscount()}>
           ՋՆՋԵԼ
         </Button>
       </div>
     </form>
   </div> */}
                  {/* <div
                    className="common_discount_container "
                    style={{ padding: "1rem" }}
                  >
                    <FormProvider {...methods}>
                      <div className="contact-body contact-detail-body">
                        <div data-simplebar className="nicescroll-bar">
                          <div className="d-flex flex-xxl-nowrap flex-wrap">
                            <div className="contact-info w-100">
                              <Form
                                onSubmit={(e) => e.preventDefault()}
                                noValidate
                                autoComplete="off"
                                className="containern"
                              >
                                <div className="card">
                                  <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                      <div className="d-flex gap-5">
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
                                              {methods.formState.errors
                                                .startDate && (
                                                <span className="error text-red">
                                                  <span>
                                                    <img
                                                      src={ErrorSvg}
                                                      alt="errorSvg"
                                                    />
                                                  </span>{" "}
                                                  պարտադիր
                                                </span>
                                              )}
                                            </div>
                                            <div>
                                              <CustomDateTimeComponent
                                                name="startDate"
                                                control={methods.control}
                                                required={true}
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
                                              {methods.formState.errors
                                                .endDate && (
                                                <span className="error text-red">
                                                  <span>
                                                    <img
                                                      src={ErrorSvg}
                                                      alt="errorSvg"
                                                    />
                                                  </span>{" "}
                                                  պարտադիր
                                                </span>
                                              )}
                                            </div>
                                            <div>
                                              <CustomDateTimeComponent
                                                name="endDate"
                                                control={methods.control}
                                                required={true}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="third_column d-flex justify-content-center align-items-center">
                                        <div className="new_discount-box">
                                          <img
                                            src={emptydiscountBG}
                                            className="new_box-image"
                                            alt="emptyCard"
                                          />
                                          <div className="new_box-content">
                                            <p style={{ fontSize: "1.2rem" }}>
                                              {" "}
                                              Ակտիվ զեղչ :{discountValue} %
                                            </p>
                                            <p style={{ fontSize: "1.2rem" }}>
                                              Սկիզբ :{discountValue}
                                            </p>
                                            <p style={{ fontSize: "1.2rem" }}>
                                              Ավարտ :{discountValue}
                                            </p>
                                            <p style={{ fontSize: "1.2rem" }}>
                                              {" "}
                                              Նկարագիր :{discountValue}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-row-reverse align-items-center">
                                    <button
                                      type="button"
                                      onClick={onSubmit}
                                      className="btn btn-primary"
                                      data-bs-dismiss="modal"
                                    >
                                      Ավելացնել
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      // onClick={() => handleToggleCreateModal(false)}
                                    >
                                      Չեղարկել
                                    </button>
                                  </div>
                                </div>

                                {/* <div className="modal-footer align-items-center">
         <button
           type="button"
           //onClick={onSubmit}
           className="btn btn-primary"
           data-bs-dismiss="modal"
         >
           Ավելացնել
         </button>
         <button
           type="button"
           className="btn btn-secondary"
           //onClick={() => handleToggleCreateModal(false)}
         >
           Չեղարկել
         </button>
       </div>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FormProvider>
                  </div> */}

                  {/* <div className="custom_discount_container d-flex flex-column me-30 ms-30">
<div className="common ">


<div className="new_discount-container">
<h1>
 {discountValue?.length
   ? "Դուք ստեղծել եք զեղչի քարտ"
   : "Ստեղծեք զեղչի քարտ"}
</h1>
<div className="new_discount-box">
 <img src={emptyCard} className="new_box-image" alt="emptyCard" />
 <h1 className="new_box-content">{discountValue} % Զեղչ</h1>
</div>
</div>
</div>
<div className="individual">
<form ref={formRefInd} className="custom_discount-form">
<input
 className="custom_discount_form-input"
 type="number"
 ref={customUniqDisRef}
 placeholder="ԳՐԵՔ ԶԵՂՉԻ ՉԱՓԸ"
 required
 onChange={(e) => (customUniqDisRef.current = e.target.value)}
/>
<div className="d-flex justify-content-end mb-2">
 <Button
   className="me-2"
   onClick={() => createNew(customUniqDisRef.current)}
 >
   ՍՏԵՂԾԵԼ
 </Button>
 <Button onClick={() => deleteUniqDiscount()}>ՋՆՋԵԼ</Button>
</div>
<div className="col-sm-12">
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
                             isMulti
                             closeMenuOnSelect={false}
                             components={animatedComponents}
                             options={researchState.map((res) => ({
                               value: res.researchListId,
                               label: `${res?.researchName}`,
                             }))}
                             styles={colourStyles}
                             placeholder={"Հետազոտություններ"}
                             menuPlacement="top"

                           />
                         )}
                       />
                     </div>
                   </div>
<Multiselect
 options={researchState} // Options to display in the dropdown
 displayValue="researchName" // Property name to display in the dropdown options
 onSelect={onResearchSelect} // Function will trigger on select event
 onRemove={onResearchDelete} // Function will trigger on remove event
 closeOnSelect={true}
 id="input_tags_3"
 className="form-control "
 ref={multiselectRef}
 hidePlaceholder={true}
 placeholder="Հետազոտություններ"
 groupBy="category_name"
 emptyRecordMsg="Ընտրեք հետազոտության տեսակը"

 style={{
   height: "10rem",
   overflow: "hidden",
 }}
/>
</form>
{discountUniqValue?.length && (
<div>
 <h3>
   Դուք ավելացրել եք {discountUniqValue} % զեղչ հետևյալ
   հետազոտությունների համար
 </h3>
 <ul>
   {getUniqDiscountResearches.map((el, index) => (
     <li key={index}>
       {index + 1}.{el}
     </li>
   ))}
 </ul>
</div>
)}
</div>
</div> */}
                </section>
              </main>
            )}
            {pageTab === "tab_patients" && (
              <main>
                <section className="discount-section">
                  {/* <div
     className="common_discount_container "
     style={{ border: "1px solid black", padding: "1rem" }}
   >
     <div className="d-flex align-center justify-content-center">
       <div className="new_discount-container">
         <h1>
           {discountValue?.length
             ? "Դուք ստեղծել եք զեղչի քարտ"
             : "Ստեղծեք զեղչի քարտ"}
         </h1>
         <div className="new_discount-box">
           <img
             src={emptyCard}
             className="new_box-image"
             alt="emptyCard"
           />
           <h1 className="new_box-content">
             {discountValue} % Զեղչ
           </h1>
         </div>
       </div>
     </div>
     <form ref={formRef} className="custom_discount-form">
       <input
         className="custom_discount_form-input"
         type="number"
         placeholder="ԳՐԵՔ ԶԵՂՉԻ ՉԱՓԸ"
         ref={customDisRef}
         onChange={(e) => (customDisRef.current = e.target.value)}
       />
       <div className="d-flex justify-content-end">
         <Button
           className="me-2"
           onClick={() => createNew(customDisRef.current)}
         >
           ՍՏԵՂԾԵԼ
         </Button>
         <Button onClick={() => deleteCommonDiscount()}>
           ՋՆՋԵԼ
         </Button>
       </div>
     </form>
   </div> 
                  <div
                    className="common_discount_container "
                    style={{ padding: "1rem" }}
                  >
                    <FormProvider {...methods}>
                      <div className="contact-body contact-detail-body">
                        <div data-simplebar className="nicescroll-bar">
                          <div className="d-flex flex-xxl-nowrap flex-wrap">
                            <div className="contact-info w-100">
                              <Form
                                onSubmit={(e) => e.preventDefault()}
                                noValidate
                                autoComplete="off"
                                className="containern"
                              >
                                <div className="card">
                                  <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                      <div className="d-flex gap-5">
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
                                              {methods.formState.errors
                                                .startDate && (
                                                <span className="error text-red">
                                                  <span>
                                                    <img
                                                      src={ErrorSvg}
                                                      alt="errorSvg"
                                                    />
                                                  </span>{" "}
                                                  պարտադիր
                                                </span>
                                              )}
                                            </div>
                                            <div>
                                              <CustomDateTimeComponent
                                                name="startDate"
                                                control={methods.control}
                                                required={true}
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
                                              {methods.formState.errors
                                                .endDate && (
                                                <span className="error text-red">
                                                  <span>
                                                    <img
                                                      src={ErrorSvg}
                                                      alt="errorSvg"
                                                    />
                                                  </span>{" "}
                                                  պարտադիր
                                                </span>
                                              )}
                                            </div>
                                            <div>
                                              <CustomDateTimeComponent
                                                name="endDate"
                                                control={methods.control}
                                                required={true}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="third_column d-flex justify-content-center align-items-center">
                                        <div className="new_discount-box">
                                          <img
                                            src={emptydiscountBG}
                                            className="new_box-image"
                                            alt="emptyCard"
                                          />
                                          <div className="new_box-content">
                                            <p style={{ fontSize: "1.2rem" }}>
                                              {" "}
                                              Ակտիվ զեղչ :{discountValue} %
                                            </p>
                                            <p style={{ fontSize: "1.2rem" }}>
                                              Սկիզբ :{discountValue}
                                            </p>
                                            <p style={{ fontSize: "1.2rem" }}>
                                              Ավարտ :{discountValue}
                                            </p>
                                            <p style={{ fontSize: "1.2rem" }}>
                                              {" "}
                                              Նկարագիր :{discountValue}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-row-reverse align-items-center">
                                    <button
                                      type="button"
                                      onClick={onSubmit}
                                      className="btn btn-primary"
                                      data-bs-dismiss="modal"
                                    >
                                      Ավելացնել
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      // onClick={() => handleToggleCreateModal(false)}
                                    >
                                      Չեղարկել
                                    </button>
                                  </div>
                                </div>

                                {/* <div className="modal-footer align-items-center">
         <button
           type="button"
           //onClick={onSubmit}
           className="btn btn-primary"
           data-bs-dismiss="modal"
         >
           Ավելացնել
         </button>
         <button
           type="button"
           className="btn btn-secondary"
           //onClick={() => handleToggleCreateModal(false)}
         >
           Չեղարկել
         </button>
       </div> 
                              </Form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FormProvider>
                  </div>

                   <div className="custom_discount_container d-flex flex-column me-30 ms-30">
<div className="common ">


<div className="new_discount-container">
<h1>
 {discountValue?.length
   ? "Դուք ստեղծել եք զեղչի քարտ"
   : "Ստեղծեք զեղչի քարտ"}
</h1>
<div className="new_discount-box">
 <img src={emptyCard} className="new_box-image" alt="emptyCard" />
 <h1 className="new_box-content">{discountValue} % Զեղչ</h1>
</div>
</div>
</div>
<div className="individual">
<form ref={formRefInd} className="custom_discount-form">
<input
 className="custom_discount_form-input"
 type="number"
 ref={customUniqDisRef}
 placeholder="ԳՐԵՔ ԶԵՂՉԻ ՉԱՓԸ"
 required
 onChange={(e) => (customUniqDisRef.current = e.target.value)}
/>
<div className="d-flex justify-content-end mb-2">
 <Button
   className="me-2"
   onClick={() => createNew(customUniqDisRef.current)}
 >
   ՍՏԵՂԾԵԼ
 </Button>
 <Button onClick={() => deleteUniqDiscount()}>ՋՆՋԵԼ</Button>
</div>
<div className="col-sm-12">
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
                             isMulti
                             closeMenuOnSelect={false}
                             components={animatedComponents}
                             options={researchState.map((res) => ({
                               value: res.researchListId,
                               label: `${res?.researchName}`,
                             }))}
                             styles={colourStyles}
                             placeholder={"Հետազոտություններ"}
                             menuPlacement="top"

                           />
                         )}
                       />
                     </div>
                   </div>
<Multiselect
 options={researchState} // Options to display in the dropdown
 displayValue="researchName" // Property name to display in the dropdown options
 onSelect={onResearchSelect} // Function will trigger on select event
 onRemove={onResearchDelete} // Function will trigger on remove event
 closeOnSelect={true}
 id="input_tags_3"
 className="form-control "
 ref={multiselectRef}
 hidePlaceholder={true}
 placeholder="Հետազոտություններ"
 groupBy="category_name"
 emptyRecordMsg="Ընտրեք հետազոտության տեսակը"

 style={{
   height: "10rem",
   overflow: "hidden",
 }}
/>
</form>
{discountUniqValue?.length && (
<div>
 <h3>
   Դուք ավելացրել եք {discountUniqValue} % զեղչ հետևյալ
   հետազոտությունների համար
 </h3>
 <ul>
   {getUniqDiscountResearches.map((el, index) => (
     <li key={index}>
       {index + 1}.{el}
     </li>
   ))}
 </ul>
</div>
)}
</div>
</div> */}
                </section>
              </main>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
