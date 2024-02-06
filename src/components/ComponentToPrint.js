import Button from "react-bootstrap/Button";
import React, { useState, forwardRef, useRef } from "react";
import Table from "react-bootstrap/Container";
import { useTable } from "react-table";
import Barcode from "react-barcode";
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

export const ComponentToPrint = forwardRef(({ value }, ref) => {
  const researchState = useSelector(selectResearches);

  const currentResearches = value?.researchList
    ?.map(
      (mapEl) => (mapEl = researchState.filter((el) => el.research === mapEl))
    )
    .flat(1);

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
        Header: "Նյութեր",
        accessor: "testSubstance",
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
      data: currentResearches || [],
    });
  return (
    <div className="wrapper m-1" ref={ref}>
      <header className="header">
        <div className="container d-flex justify-content-between mt-0 ">
          <div className="header__logo d-flex">
            <img className="m-0" width={"136px"} height={"136px"} src={mainLogo} alt="Logo" />
          </div>
          <div className="header__info mt-1">
            <div>
              <ul>
                <li>
                  <BiSolidHome /> Ք․Վանաձոր, Բաբայան 5/8,4548
                </li>
                <li>
                  <BiSolidPhoneCall /> +374 99 942-200, +374 32 242-200
                </li>
                <li>
                  <HiMiniCalendarDays /> Երկ. - Ուրբ. 08:00-18:00, Շաբ․ 08:00-13:00
                </li>
                <li>
                  <BiGlobe /> www.evalab.am
                </li>
                <li>
                  <BiMailSend /> info@evaLab.am
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <hr
        style={{
          background: "black",
          color: "black",
          borderColor: "black",
          height: "2px",
          margin: "5px 20px",
        }}
      />
      <main>
        <section className="container">
          <div className="Requisites d-flex flex-column justify-content-center align-items-center">
            <p>Եվալաբ</p>
            <p>ՀՎՀՀ 12457888</p>
            <p>h/h 220090120845000 ACBA բանկ</p>
          </div>
        </section>
        <section className="container d-flex justify-content-between mb-2">
          <div className=" mb-3r">
            <ul>
              <li>
                Անուն Ազգանուն: {value.firstName} {value.lastName}
              </li>
              <li>Տարիք: {value.age}</li>
              <li>Հեռախոս: {value.mobile}</li>
              <li>Տրման ամսաթիվ: {value.date}</li>
            </ul>
          </div>
          <Barcode value="298875855" width={1} />;
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
            </table>
          </div>
        </section>
        <section className="container">
          <div className="total d-flex flex-column align-items-end">
            <p>Ընդհանուր արժեք {value.totalPrice}10000 դր․</p>
          </div>
        </section>
      </main>
    </div>
  );
});
