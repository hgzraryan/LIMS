import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import Table from "react-bootstrap/Container";
import { useTable } from "react-table";
import Barcode from "react-barcode";

export const ComponentToPrint = React.forwardRef(({ value }, ref) => {
  const generateData = (start, length = 1) =>
    Array.from({ length }).map((_, i) => ({
      id: "1",
      testName: "Progresteron",
      testSubstance: "Shijuk",
      price: "1000",
    }));

  const [items, setItems] = useState(generateData(0));
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Test Name",
        accessor: "testName",
      },
      {
        Header: "Test substance",
        accessor: "testSubstance",
      },
      {
        Header: "Price",
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
    useTable({ columns, data: items });

  return (
    <div className="wrapper" ref={ref}>
      <header className="header">
        <div className="container d-flex justify-content-between mt-3">
          <div className="header__logo d-flex">
            <img
              width={"120px"}
              src="./../dist/img/avatar1.jpg"
              alt="Logo"
              style={{ marginRight: "10px" }}
            />
            <div>
              <h1>Prom-test</h1>
              <h4>Laboratories</h4>
            </div>
          </div>
          <div className="header__info">
            <div>
              <ul>
                Country
                <li>address</li>
                <li>address</li>
                <li>address</li>
                <li>address</li>
                <li>Phone Number</li>
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
        <article className="container">
          <div className="Requisites d-flex flex-column justify-content-center align-items-center">
            <p>Prom-test</p>
            <p>hvhh12457888</p>
            <p>h/h 220090120845000 ACBA bank</p>
          </div>
        </article>
        <article className="container ">
          <div className="qr-code d-flex justify-content-between mb-3">
            <Barcode value="barcode-example" />;
            <img width={"120px"} src="./../dist/img/avatar1.jpg" alt="Logo" />
          </div>
        </article>
        <article className="container">
          <div className="mb-3r">
            <ul>
              <li>Order: {}</li>
              <li>Fullname: {value.firstname} {value.lastname}</li>
              <li>Phone number: </li>
              <li>Date: </li>
              <li>ID: </li>
            </ul>
          </div>
        </article>
        <article className="container">
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
                    <tr {...row.getRowProps()}>
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
        </article>
        <article className="container">
          <div className="total d-flex flex-column align-items-end">
            <p>total amount {}</p>
            <p>total debth {}</p>
          </div>
        </article>
        <article className="container">
          <div className="substances d-flex">
            <Button style={{ margin: "0 10px" }}>Barikor</Button>
            <Button>Citrat</Button>
          </div>
        </article>
      </main>
    </div>
  );
});
