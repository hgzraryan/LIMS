import React, { useEffect, useState } from "react";  
import emptyCard from "../../dist/img/discount-bg.png";
import { Button } from "react-bootstrap";
import { useRef } from "react";
import {
  createDiscount,
  clearDiscounts,
  selectResearches,
} from "../../redux/features/researches/researchesSlice";
import {
  disValue,
  deleteDisValue,
  selectdiscountValue,
} from "../../redux/features/discounts/discountValueSlice";
import "../../dist/css/style.css"

import { useDispatch, useSelector } from "react-redux";

export default function DiscountCards() {
  const customDisRef = useRef(0);
  const formRef = useRef("");
  const dispatch = useDispatch();
  const getResearchState = useSelector(selectResearches);
  const [researchState, setResearchState] = useState(null);
  useEffect(() => {
    setResearchState(() => getResearchState);
  }, [getResearchState]);

  const getDiscountValue = useSelector(selectdiscountValue);
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    setDiscountValue(() => getDiscountValue);
  }, [getDiscountValue]);

  const createNew = (discount) => {
    dispatch(clearDiscounts());

    if (parseInt(discount) > 0) {
      setDiscountValue(() => discount);
      // formRef.current.reset();
      dispatch(createDiscount(parseInt(discount)));
      dispatch(disValue(discount));
    }
  };
  const deleteCard = () => {
    formRef.current.reset();
    customDisRef.current = 0;
    dispatch(clearDiscounts());
    dispatch(deleteDisValue());
  };

  return (
    <section className="discount-section">
      <h2 className="discount-section_title"> Զեղչի քարտեր</h2>
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
        <button className="discount-section_box" onClick={() => createNew("10")}>
          <img src={emptyCard} className="section_box-image " alt="emptyCard" />
          <h1 className="section_box-content">10 % Զեղչ</h1>
        </button>
      </div>
      <div className="custom_discount">
        <form ref={formRef} className="custom_discount-form">
          <input
          className="custom_discount_form-input"
            type="number"
            ref={customDisRef}
            onChange={(e) => (customDisRef.current = e.target.value)}
          />
          <div className="d-flex justify-content-between">
            <Button onClick={() => createNew(customDisRef.current)}>
              Create Discount
            </Button>
            <Button onClick={deleteCard}>Delete Discount</Button>
          </div>
        </form>
        {discountValue?.length && (
          <div className="new_discount-container">
            <h1>Դուք ստեղծել եք զեղչի քարտ</h1>
            <div className="new_discount-box">
              <img src={emptyCard} className="new_box-image" alt="emptyCard" />
              <h1 className="new_box-content">{discountValue} % Զեղչ</h1>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
