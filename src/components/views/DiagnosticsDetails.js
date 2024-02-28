import React, { Suspense, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner';
import diagnosticsSvg from '../../dist/svg/diagnosticsSvg.svg'
import {
    useBlockLayout,
    useFilters,
    useResizeColumns,
    useRowSelect,
    useSortBy,
    useTable,
  } from "react-table";
const customData = [
    {
      date: "15.06.2021",
      researches: [
        {
          researchName: "Կրեատինինկինազա",
          analysisResult: 8.88,
          referenceRange: "4.0-10.0",
          units: "10^9/L",
          shortName: "WBC",
        },
        {
          shortName: "RBC",
          researchName: "Էրիթրոցիտների ընդհանուր քանակ",
          analysisResult: 6.09,
          referenceRange: ["men 4.0-10.0", "women 4,6-6,2"],
          units: "10^9/L",
        },
      ],
    },
    {
      date: "04.11.2023",
      researches: [
        {
          shortName: "WBC",
          researchName: "Լեյկոցիտների ընդհանուր քանակ",
          analysisResult: 8.88,
          referenceRange: "4.0-10.0",
          units: "10^9/L",
        },
        {
          shortName: "RBC",
          researchName: "Էրիթրոցիտների ընդհանուր քանակ",
          analysisResult: 6.09,
          referenceRange: ["men 4.0-10.0", "women 4,6-6,2"],
          units: "10^9/L",
        },
        {
          shortName: "MCV ",
          researchName: "Էրիթրոցիտի միջին ծավալը փորձանմուշի  ընդհանուր ծավալում",
          analysisResult: 83.7,
          referenceRange: "80-100",
          units: "fl",
        },
        {
          shortName: "WBC",
          researchName: "Լեյկոցիտների ընդհանուր քանակ",
          analysisResult: 8.88,
          referenceRange: "4.0-10.0",
          units: "10^9/L",
        },
        {
          shortName: "WBC",
          researchName: "Լեյկոցիտների ընդհանուր քանակ",
          analysisResult: 8.88,
          referenceRange: "4.0-10.0",
          units: "10^9/L",
        },
        {
          shortName: "WBC",
          researchName: "Լեյկոցիտների ընդհանուր քանակ",
          analysisResult: 8.88,
          referenceRange: "4.0-10.0",
          units: "10^9/L",
        },
      ],
    },
  ];
  const customReseraches =  [
        {
          shortName: "WBC",
          researchName: "Լեյկոցիտների ընդհանուր քանակ",
          analysisResult: 8.88,
          referenceRange: "4.0-10.0",
          units: "10^9/L",
        },
        {
          shortName: "RBC",
          researchName: "Էրիթրոցիտների ընդհանուր քանակ",
          analysisResult: 6.09,
          referenceRange: ["men 4.0-10.0", "women 4,6-6,2"],
          units: "10^9/L",
        },
        {
          shortName: "MCV ",
          researchName: "Էրիթրոցիտի միջին ծավալը փորձանմուշի  ընդհանուր ծավալում",
          analysisResult: 83.7,
          referenceRange: "80-100",
          units: "fl",
        },
        {
          shortName: "WBC",
          researchName: "Լեյկոցիտների ընդհանուր քանակ",
          analysisResult: 8.88,
          referenceRange: "4.0-10.0",
          units: "10^9/L",
        },
        {
          shortName: "WBC",
          researchName: "Լեյկոցիտների ընդհանուր քանակ",
          analysisResult: 8.88,
          referenceRange: "4.0-10.0",
          units: "10^9/L",
        },
        {
          shortName: "WBC",
          researchName: "Լեյկոցիտների ընդհանուր քանակ",
          analysisResult: 8.88,
          referenceRange: "4.0-10.0",
          units: "10^9/L",
        },
      
    ]
function DiagnosticsDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const columns1 = React.useMemo(
        () => [
          {
            Header: "",
            accessor: "shortName",
          },
          {
            Header: "Անվանում",
            accessor: "researchName",
          },
          {
            Header: "Արդյունք",
            accessor: "analysisResult",
          },
          {
            Header: "նորմա",
            accessor: "referenceRange",
          },
          {
            Header: "չ/մ",
            accessor: "units",
          },
        ],
        []
      );
      const {
        getTableProps: getTableProps1,
        getTableBodyProps: getTableBodyProps1,
        headerGroups: headerGroups1,
        rows: rows1,
        prepareRow: prepareRow1,
      } = useTable({
        columns: columns1,
        data: customReseraches,
      });
    return (
        <>
        {/* <Suspense fallback={<LoadingSpinner />}>
          {isLoading ? (
            <LoadingSpinner />
          ) : ( */}
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#dae4ed",  }}
          >
            <section
              style={{
                backgroundColor: "white",
                margin: "50px",
                width: "100%",
                borderRadius:'10px'
              }}
            >
              <div className="d-flex m-2 flex-column">
                <div className='d-flex justify-content-end w-100'>
                  <img
                    src={diagnosticsSvg}
                    alt="diagnosticsSvg"
                    style={{
                      borderRadius: "0 20px 0 20px",
                      height: "100px",
                      width: "50px",
                    }}
                  />
                </div>
              
              </div>
              <div className="d-flex m-5 justify-content-around align-items-center">
                <div className="d-flex " style={{ fontSize: "1.3rem" }}>
                  <div className="d-flex flex-column justify-content-end" >
                    <p>Նույնականացման համար:</p>
                    <div className="separator-full m-0"></div>                  
    
                    <p>Ախտորոշման ամսաթիվ:</p>
                    <div className="separator-full m-0"></div> 

                    <p>Ախտորոշման տեսակ:</p>
                    <div className="separator-full m-0"></div>                  
    
                    <p>Ախտորոշման բժիշկ:</p>
                    <div className="separator-full m-0"></div>                  
    
                    <p>Հաճախորդի անուն:</p>
                    <div className="separator-full m-0"></div>                  
    
                    <p>Լրացուցիչ տվյալներ:</p>
                    <div className="separator-full m-0"></div>                  
    
                    
                  </div>
                   <div className="ms-3 ">
                    <p>
                        {/* {diagnosticsDetails.doctorId} */} 46
                        </p>
                    <div className="separator-full m-0"></div>                  
    
                    <p>
                        {/* {diagnosticsDetails.licenseNumber} */}2024-02-16
                        </p>
                    <div className="separator-full m-0"></div>                  
    
                    <p>
                        {/* {diagnosticsDetails.createdAt} */}Ներքին
                        </p>
                    <div className="separator-full m-0"></div>                  
    
                    <p>
                        {/* {diagnosticsDetails.dateOfBirth} */}Աննա Կարապետյան
                        </p>
                    <div className="separator-full m-0"></div>                  
    
                    <p>
                        {/* {diagnosticsDetails.gender} */}Մարտին Գրիգորյան
                        </p>
                    <div className="separator-full m-0"></div>                  
                    <p>
                        {/* {diagnosticsDetails.gender} */}չկա
                        </p>
                        <div className="separator-full m-0"></div>                  

                  </div> 
                  
                  
                </div>
              </div>
              
          <div className='d-flex justify-content-center align-items-center ms-10 me-10'>
         <table
                  className="table"
                  style={{
                    border: "1px solid black",
                    fontSize: "12px",
                    color: "#000",
                    marginTop: "10px",
                  }}
                >
                  <thead>
                    {headerGroups1.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps1()}>
                    {rows1.map((row, i) => {
                      prepareRow1(row);
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
           
          </div>      
        {/* )}
        </Suspense> */}
        </>
      );
}

export default DiagnosticsDetails
