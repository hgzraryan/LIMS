/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
//import emptyCard from "../../dist/img/discount-bg.png";
import emptyCard from "../../dist/img/discount_testImg.png";
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
  useEffect(() => {
    setResearchState(() => getResearchState);
  }, [getResearchState]);

  useEffect(() => {
    setDiscountValue(() => getDiscountValue);
  }, [getDiscountValue]);

  useEffect(() => {
    setDiscountUniqValue(() => getUniqDiscountValue);
  }, [getUniqDiscountValue]);
  /*------------------------------------------------------------------Get Researches----------------------------------------------------*/
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getResearches = async () => {
      try {
        const response = await axiosPrivate.post(GET_RESEARCHES, {
          signal: controller.signal,
        });

        isMounted && dispatch(reserchesList(response.data.jsonString));
      } catch (err) {
        console.error(err);
        Navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getResearches();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
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
      notify(
        `Դուք ստեղծել եք ${discount}% զեղչ`
      );
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
      notify(
        `Դուք ստեղծել եք ${customUniqDisRef.current}% զեղչ`
      );
    }
  };
  const deleteCommonDiscount = () => {
    formRef.current.reset();
    customDisRef.current = 0;
    dispatch(createDiscount(0));
    dispatch(deleteDisValue());
    multiselectRef.current.resetSelectedValues();
    notify(
      `Դուք ջնջել եք  զեղչը`
    );
  };
  const deleteUniqDiscount = () => {
    formRefInd.current.reset();
    customUniqDisRef.current = 0;
    setResearchesArray(() => []);
    dispatch(createDiscount(0));
    dispatch(deleteDisUniqValue());
    multiselectRef.current.resetSelectedValues();
    notify(
      `Դուք ջնջել եք  զեղչը`
    );
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
    <section className="discount-section">
      <div className="d-flex align-center justify-content-center">
        <h1>Զեղչի Քարտեր</h1>
      </div>
      <div className="discount-section_container">
        <button className="discount-section_box" onClick={() => createNew("3")}>
          <img src={emptyCard} className="section_box-image " alt="emptyCard" />
          <h1 className="section_box-content">3 % Զեղչ</h1>
        </button>
        <button className="discount-section_box" onClick={() => createNew("5")}>
          <img src={emptyCard} className="section_box-image " alt="emptyCard" />
          <h1 className="section_box-content">5 % Զեղչ</h1>
        </button>
        <button className="discount-section_box" onClick={() => createNew("7")}>
          <img src={emptyCard} className="section_box-image " alt="emptyCard" />
          <h1 className="section_box-content">7 % Զեղչ</h1>
        </button>
        <button
          className="discount-section_box"
          onClick={() => createNew("10")}
        >
          <img src={emptyCard} className="section_box-image " alt="emptyCard" />
          <h1 className="section_box-content">10 % Զեղչ</h1>
        </button>
      </div>

      <div className="custom_discount-container d-flex flex-column me-30 ms-30">
        <div className="common ">
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
              <Button onClick={() => deleteCommonDiscount()}>ՋՆՋԵԼ</Button>
            </div>
          </form>

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
            <Multiselect
              options={researchState} // Options to display in the dropdown
              displayValue="research" // Property name to display in the dropdown options
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
      </div>
    </section>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
