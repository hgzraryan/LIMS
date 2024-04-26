import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import BarcodeComp from "../components/BarcodeComp";
import mainLogo from "../dist/img/main-logo.png";
import { useTable } from "react-table";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import moment from "moment";
export const ComponentToPrintVisit = forwardRef(
  ({ value }, ref) => {
    const {
      originalPrice,
      totalPrice,
      visitDate,
      doctorsVisitId,
      mServices,
      doctorName,
      clientAge,
      clientDob,
      clientGender,
      clientTel,
      clientFirstName,
      clientLastName,
      clientMidName
    } = value;
    //   const componentRef = useRef();

    const columns = React.useMemo(
      () => [
        {
          Header: "ID",
          accessor: "medServiceId",
        },
        {
          Header: "Ծառայության անվանում",
          accessor: "serviceName",
        },
        {
          Header: "Արժեք",
          accessor: "price",
        },
      ],
      []
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
        columns,
        data: mServices,
      });
    return (
      <div className="wrapper m-4" ref={ref}>
        <header
          className="header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "2.5rem",
                  color: "#4eafcb",
                  letterSpacing: "5px",
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                }}
              >
                ԷՎԱ
              </p>
              <img
                width={"40px"}
                height={"40px"}
                src={mainLogo}
                alt="Logo"
                style={{ marginLeft: "1rem", marginRight: "1rem" }}
              />
              <p
                style={{
                  fontSize: "2.5rem",
                  color: "#4eafcb",
                  letterSpacing: "5px",
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                }}
              >
                ԼԱԲ
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <p
                style={{
                  fontSize: "1.3rem",
                  color: "#4eafcb",
                  textTransform: "uppercase",
                  fontWeight: "bolder",
                }}
              >
                ԱԽտորոշման կենտրոն
              </p>
            </div>
          </div>
          <div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "2.5rem",
                    color: "#4eafcb",
                    letterSpacing: "5px",
                    fontWeight: "bolder",
                    textTransform: "uppercase",
                  }}
                >
                  Eva
                </p>
                <img
                  width={"40px"}
                  height={"40px"}
                  src={mainLogo}
                  alt="Logo"
                  style={{ marginLeft: "1rem", marginRight: "1rem" }}
                />
                <p
                  style={{
                    fontSize: "2.5rem",
                    color: "#4eafcb",
                    letterSpacing: "5px",
                    fontWeight: "bolder",
                    textTransform: "uppercase",
                  }}
                >
                  Lab
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <p
                  style={{
                    fontSize: "2.3rem",
                    color: "#4eafcb",
                    textTransform: "uppercase",
                    fontWeight: "bolder",
                    marginTop: "-10px",
                  }}
                >
                  Laboratory
                </p>
              </div>
            </div>
          </div>
        </header>
        <div
          style={{
            width: "100%",
            height: "3px",
            borderRadius: ".3rem",
            background: "linear-gradient(to right, #4eafcb 65%, transparent)",
          }}
        ></div>
        <div
          className="d-flex justify-content-center align-center"
          style={{
            background: "#4eafcb",
            color: "white",
            borderRadius: "5px",
            margin: "10px 0",
          }}
        >
          <p style={{ padding: "5px", fontSize: "20px", fontWeight: "bold" }}>
            Բժշկի այցելության թերթիկ
          </p>
        </div>
        <main>
      <section className="container">
          <div className="Requisites d-flex flex-column justify-content-center align-items-center">
          <p style={{ fontSize: "18px" }}>ՀՎՀՀ 06962789</p>
          <p style={{ fontSize: "18px" }}>h/h 1570084220480100 Ամերիաբանկ ՓԲԸ</p>
          </div>
        </section>
        <section style={{display:"flex",justifyContent:'space-around',margin:'2rem 0 2rem 0'}} className="containerr ">
        <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <BarcodeComp data={doctorsVisitId} />
                    </div>
          <div className=" mb-3r">
            <ul>
              <li >ԱԱՀ: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{" "+clientFirstName+" "+ clientLastName +" " +clientMidName}</span>
              </li>
              <li >Սեռ: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{(clientGender==='Male')?' Արական':(clientGender==='Female')?' Իգական':''}</span></li>
              <li >Ծննդյան ամսաթիվ: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{" "+moment.utc(clientDob).format('DD-MM-YYYY')}</span></li>
              <li >Տարիք: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{" "+clientAge}</span></li>
              <li >Հեռախոս: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{" "+clientTel}</span></li>
              <li >Այցի ամսաթիվ: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{" "+moment.utc(visitDate).format('DD-MM-YYYY HH:mm')}</span></li>
              <li>
                              Բժիշկ:
                              <span
                                style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                              >
                                {doctorName}
                              </span>
                            </li>
              {/* <li>
                Անուն Ազգանուն: `${value.firstName} ${value.lastName} `
              </li>
              <li>Տարիք: {value.age}</li>
              <li>Հեռախոս: {value.mobile}</li>
              <li>Տրման ամսաթիվ: {value.date}</li> */}
            </ul>
          </div>
        </section>
        <section className="research_container">
          <div className="research_container">
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
              {mServices.length ? (
           
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
                ):''}
            </table>
          </div>
        </section>
        <section className="research_container">
        <div className="total d-flex flex-column align-items-end">
                      {totalPrice < originalPrice ?(
                          <p style={{ marginRight: "6px" }}>Զեղչ {originalPrice-totalPrice}դր․</p>

                        ):''
                      }
                      <p>
                        Ընդհանուր արժեք
                        {" " + totalPrice}դր
                      </p>
                    </div>
        </section>
      </main>
      </div>
    );
  }
);
