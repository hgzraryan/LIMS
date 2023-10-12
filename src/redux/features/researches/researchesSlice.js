import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  options: [
    {
      name: "Կարիոտիպի հետազոտում պերիֆերիկ արյան լիմֆոցիտներում (քանակական և որակական փոփոխություններ) ",
      id: 1,
      category: "Գենետիկա ",
      price: 5000,
    },
    {
      name: "Կարիոտիպի հետազոտում պերիֆերիկ արյան լիմֆոցիտներում (քանակական և որակական փոփոխություններ) / զույգ",
      id: 2,
      category: "Գենետիկա ",
      price: 5000,
    },
    {
      name: "Պտղի կարիոտիպի հետազոտում (քանակական և որակական փոփոխություններ) շուրջպտղային հեղուկում",
      id: 3,
      category: "Գենետիկա ",
      price: 5000,
    },
    {
      name: "Կարիոտիպի հետազոտում պերիֆերիկ արյան լիմֆոցիտներում (քանակական և որակական փոփոխություններ)",
      id: 4,
      category: "Գենետիկա ",
      price: 5000,
    },
    {
      name: "Անեուպլոիդիաների (13, 18, 21, X/Y) ախտորոշում պտղի մոտ FISH մեթոդով",
      id: 5,
      category: "Գենետիկա ",
      price: 5000,
    },
    {
      name: "Վիլյամս, Պրադեր-Վիլլի, Անգելման, Դի-Ջորջ միկրոդելեցիոն սինդրոմների ախտորոշում FISH մեթոդով, յուրաքանչյուրը",
      id: 6,
      category: "Գենետիկա ",
      price: 5000,
    },
    {
      name: "Արյան ընդհանուր հետազոտություն",
      id: 7,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Արյան խումբ/ռեզուս, ABO/Rh",
      id: 8,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Մեզի ընդհանուր հետազոտություն",
      id: 9,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Մեզի երկբաժին հետազոտություն",
      id: 10,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Միզասեռական քսուկների մանրադիտակային հետազոտություն",
      id: 11,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Սպերմոգրամմա",
      id: 12,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "MAR-թեստ, IgG+Սպերմոգրամմա",
      id: 13,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "MAR-թեստ, IgG/IgA+Սպերմոգրամմա",
      id: 14,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Բջջաբանական հետազոտություն (Հեղուկային)",
      id: 15,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Բջջաբանական հետազոտություն+ՄՊՎ ԴՆԹ",
      id: 16,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Շագանակագեղձի հյութի մանրադիտակային հետազոտություն",
      id: 17,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Եղունգների մանրէաբանական հետազոտություն (սնկեր)",
      id: 18,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Դեմոդեկոզ (Հրաչյա Քոչար մ/ճ)",
      id: 19,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    { name: "Սրատուտ", id: 20, category: "Ընդհանուր կլինիկական քննություն " },
    {
      name: "Կոպրոգրամմա",
      id: 21,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Հելմինթների ձվեր",
      id: 22,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Հելմինթների ձվեր (10)",
      id: 23,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Կղանքի թաքնված արյան թեստ",
      id: 24,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Պրոկալցիտոնին",
      id: 25,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Ինտերլեյկին-6",
      id: 26,
      category: "Ընդհանուր կլինիկական քննություն ",
      price: 5000,
    },
    {
      name: "Մասնակի ակտիվացված տրոմբոպլասթինային ժամանակ",
      id: 27,
      category: "Կոագուլոգրամմա",
      price: 5000,
    },
    {
      name: "MHO Պրոտրոմբին/ ինդեքս/ INR",
      id: 28,
      category: "Կոագուլոգրամմա",
      price: 5000,
    },
    {
      name: "Պրոտրոմբինային ժամանակ",
      id: 29,
      category: "Կոագուլոգրամմա",
      price: 8000,
    },
    { name: "Ֆիբրինոգեն", id: 30, category: "Կոագուլոգրամմա", price: 8000 },
    { name: "D - Դիմեր", id: 31, category: "Կոագուլոգրամմա", price: 8000 },
    {
      name: "Գայլախտային հակամակարդիչ",
      id: 32,
      category: "Կոագուլոգրամմա",
      price: 8000,
    },
    { name: "Պրոտեին С", id: 33, category: "Կոագուլոգրամմա", price: 8000 },
    { name: "Պրոտեին S", id: 34, category: "Կոագուլոգրամմա", price: 8000 },
    {
      name: "Հակաթրոմբին III",
      id: 35,
      category: "Կոագուլոգրամմա",
      price: 8000,
    },
  ],
};
export const researchesSlice = createSlice({
  name: "researches",
  initialState,
  reducers: {
    reserchesList: (state, action) => state,
    createDiscount: (state, action) => {
      state.options = state.options.map((el) => {
        return {
          ...el,
          price: Math.ceil(el.price - el.price /100 * action.payload),
        };
      });
     // console.log(current(state));
    },
    clearDiscounts:(state)=>initialState

  },
});
export const { createDiscount, reserchesList,clearDiscounts} = researchesSlice.actions;
export const selectResearches = (state) => state.researches;

export default researchesSlice.reducer;
