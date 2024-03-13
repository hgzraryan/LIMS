import Button from "react-bootstrap/Button";
import React, { useState, forwardRef, useRef, useEffect } from "react";
import Table from "react-bootstrap/Container";
import { useTable } from "react-table";
// import Barcode from "react-barcode";
import mainLogo from "../dist/img/main-logo.jpg";
import {
  BiSolidHome,
  BiSolidPhoneCall,
  BiGlobe,
  BiMailSend,
} from "react-icons/bi";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { connect, useSelector } from "react-redux";
import { selectResearches } from "../redux/features/researches/researchesSlice";
import BarcodeComp from "./BarcodeComp";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const data = [
  {
  researchName: "Լեյկոցիտների ընդհանուր քանակ",
  price:14000,
  },
  {
    researchName: "Էրիթրոցիտների ընդհանուր քանակ",
    price:8000,
  },
  {
    researchName: "Էրիթրոցիտի միջին ծավալը փորձանմուշի  ընդհանուր ծավալում",
    price:25000,
  }
]
export const ComponentToPrint = forwardRef(({ value,currentPatient }, ref) => {
  const axiosPrivate = useAxiosPrivate()
  const researchState = useSelector(selectResearches);
  //const {clientId} = value
 

      console.log('value',value)
      console.log('ref',ref)
      console.log('currentPatient',currentPatient)
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      // {
      //   Header: "Հետազոտություն",
      //   accessor: "research",
      // },
      {
        Header: "Հետազոտություն",
        accessor: "researchName",
      },
      {
        Header: "Արժեք",
        accessor: "price",
      },
    ],
    []
  );


  //-----------------------barcode ------------------
  /*
const [barcode, setBarcode] = useState('lintangwisesa');
const handleChange = (event) => {
	setBarcode(event.target.value ? event.target.value : '');
};
const { inputRef } = Barcode({
	value: barcode,
	options: {
	  background: '#ffffff',
	}
});
*/
  //-----------------------barcode ------------------

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data || [],
    });
  return (
    <div className="wrapper m-4" ref={ref}>
      <header className="header">
                <div className="" style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div className="header__infoL " style={{ flex: '1' }}>
                        <h3 style={{ fontWeight: "bold", color: "#01903e" }}>ԵՎԱ ԼԱԲ</h3>
                        <h6>www.evalab.am</h6>
                    </div>
                    <div className="header__logo" style={{ flex: '1', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <img
                            width={"136px"}
                            height={"136px"}
                            src={mainLogo}
                            alt="Logo"
                            style={{ margin: 0 }}
                        />
                    </div>
                    <div className="header__infoR"
                        style={{ flex: '1', display: 'flex', justifyContent: "center",  flexWrap: 'wrap' }}>
                        <div style={{ maxWidth: "300px", fontSize: "14px" }}>
                            <div className="info-element" style={{ display: 'flex', justifyContent: 'end' }}>
                                <p>Ք․Վանաձոր, Բաբայան 5/8,4548</p>
                            </div>
                            <div className="info-element" style={{ display: 'flex', justifyContent: 'end' }}>
                                <p>+374 99 942-200, +374 32 242-200</p>
                            </div>
                            <div className="info-element" style={{ display: 'flex', justifyContent: 'end' }}>
                                <p>Երկ. - Ուրբ. 08:00-18:00</p>
                            </div>
                            <div className="info-element" style={{ display: 'flex', justifyContent: 'end' }}>
                                <p>Շաբ․ 08:00-13:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div
            className="d-flex justify-content-center align-center"
            style={{
              background: "#01903e",
              color: "white",
              borderRadius: "5px",
              margin: "10px 0",
            }}
          >
             <p style={{ padding: "5px", fontSize: "20px", fontWeight: "bold" }}>
              Նմուշառման թերթիկ
               </p>
             </div>
      <main>
      <section className="container">
          <div className="Requisites d-flex flex-column justify-content-center align-items-center">
            <p style={{fontSize:'18px' }}>ՀՎՀՀ 12457888</p>
            <p style={{fontSize:'18px' }}>h/h 220090120845000 ACBA բանկ</p>
          </div>
        </section>
        <section style={{display:"flex",justifyContent:'space-around',margin:'2rem 0 2rem 0'}} className="containerr ">
        <BarcodeComp data={value.diagnosticsId}  /> 

          <div className=" mb-3r">
            <ul>
              <li >Անվանում/Անուն Ազգանուն: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{currentPatient?.firstName+" "+ currentPatient?.lastName}</span>
              </li>
              <li >Տարիք: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{currentPatient?.age}</span></li>
              <li >Հեռախոս: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{currentPatient?.contact?.phone}</span></li>
              <li >Տրման ամսաթիվ: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{value?.createdAt}</span></li>
              {/* <li>
                Անուն Ազգանուն: `${value.firstName} ${value.lastName} `
              </li>
              <li>Տարիք: {value.age}</li>
              <li>Հեռախոս: {value.mobile}</li>
              <li>Տրման ամսաթիվ: {value.date}</li> */}
            </ul>
          </div>
        </section>
        <section className="container "></section>
        <section className="container">
          <div className="container">
            <table
              className="table table-striped"
              style={{ border: "1px solid black" }}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        style={{ border: "1px solid black" }}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {data?.length && (
           
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr key={i} {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                          {...cell.getCellProps()}
                          style={{ border: "1px solid black" }}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
                )}
            </table>
          </div>
        </section>
        <section className="container">
          <div className="total d-flex flex-column align-items-end">
            <p style={{marginRight:'6px'}}>Զեղչ 0</p>
            <p>Ընդհանուր արժեք 
              {/* {value.totalPrice} */}
              47000 դր․</p>
          </div>
        </section>
      </main>
    </div>
  );
});
