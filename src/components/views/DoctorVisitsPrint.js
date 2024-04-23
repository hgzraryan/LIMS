import React, { Suspense, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import BarcodeComp from "../BarcodeComp";
import mainLogo from "../../dist/img/main-logo.png";
import { useTable } from "react-table";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";
import ResearchesPrintWrapper from "../ResearchesPrintWrapper";
function DoctorVisitsPrint({ modalPrint, setModalPrint }) {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentClient, setCurrentClient] = useState([]);
  const {
    clientId,
    createdAt,
    doctorName,
    originalPrice,
    totalPayed,
    totalPrice,
    visitDate,
    doctorsVisitId,
    medicalServices
  } = modalPrint;

  const componentRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      axiosPrivate
        .get(`/patients/${clientId}`)
        .then((resp) => {
          console.log(resp);
          setCurrentClient(resp?.data?.jsonString);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "medServiceId",
      },
      // {
      //   Header: "Հետազոտություն",
      //   accessor: "research",
      // },
      {
        Header: "Բուժծառայություն",
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
      data: medicalServices,
    });
  return (
    <>
      <div
        className="resultTable"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          margin: "4px",
          fontFamily: "arnamu",
        }}
        id="resultData"
        ref={componentRef}
      >
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
            Բուժծառայության թերթիկ
          </p>
        </div>
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <section className="container">
                  <div className="Requisites d-flex flex-column justify-content-center align-items-center">
                    <p style={{ fontSize: "18px" }}>ՀՎՀՀ 06962789</p>
                    <p style={{ fontSize: "18px" }}>
                      h/h 1570084220480100 Ամերիաբանկ ՓԲԸ
                    </p>
                  </div>
                </section>
                <section
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "2rem 0 2rem 0",
                  }}
                  className="container "
                >
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
                      <li>
                        Անուն Ազգանուն:
                        <span
                          style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                        >
                          {currentClient.firstName +
                            " " +
                            currentClient.lastName}
                        </span>
                      </li>
                      <li>
                        Սեռ:
                        <span
                          style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                        >
                          {currentClient?.gender === "Male"
                            ? "Արական"
                            : "Իգական"}
                        </span>
                      </li>
                      <li>
                        Ծննդյան ամսաթիվ:
                        <span
                          style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                        >
                          {moment
                            .utc(currentClient?.dateOfBirth)
                            .format("DD-MM-YYYY")}
                        </span>
                      </li>
                      <li>
                        Տարիք:
                        <span
                          style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                        >
                          {currentClient?.age}
                        </span>
                      </li>
                      <li>
                        Հեռախոս:
                        <span
                          style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                        >
                          {currentClient?.contact?.phone}
                        </span>
                      </li>
                      <li>
                        Տրման ամսաթիվ:
                        <span
                          style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                        >
                          {moment
                            .utc(visitDate)
                            .format("DD-MM-YYYY HH:mm")}
                        </span>
                      </li>
                      <li>
                        Բժիշկ:
                        <span
                          style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                        >
                          {doctorName}
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
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
                      {medicalServices.researches?.length && (
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
                    {totalPrice < originalPrice ? (
                      <p style={{ marginRight: "6px" }}>
                        Զեղչ{" "}
                        {originalPrice - totalPrice}դր․
                      </p>
                    ) : (
                      ""
                    )}
                    <p>
                      Ընդհանուր արժեք
                      {" " + totalPrice}դր
                    </p>
                  </div>
                </section>
              </>
            )}
          </Suspense>
        </main>
        <footer style={{ marginTop: "auto" }}>
          <div></div>
        </footer>
        <footer
          style={{
            display: "flex",
            justifyContent: "end",
            gap: "5px",
            marginTop: "2rem",
          }}
        >
          <ResearchesPrintWrapper
            value={modalPrint}
            currentClient={currentClient}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setModalPrint(false)}
          >
            Փակել
          </button>
        </footer>
      </div>
    </>
  );
}

export default DoctorVisitsPrint;
