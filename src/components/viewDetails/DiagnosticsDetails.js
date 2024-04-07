import React, { Suspense, useEffect, useState,useRef } from 'react'
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
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@coreui/coreui';
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
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [research, setResearch] = useState([]);
  const [diagnosticsDetails, setDiagnosticsDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [fileName, setFileName] = useState(""); // State to hold the file name
  const fileInputRef = useRef(null); // Reference to the file input element
  const fileReader = new FileReader();
  const formData = new FormData();
  const fileMimeType = /file\/(pdf|txt)/i;
  const intupAvatarRef = useRef(null);

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
      useEffect(() => {
        const getData = async () => {
          try {
            const response = await axiosPrivate.get(`/diagnostics/${id}`);
            console.log(response)
            setIsLoading(false);
            setDiagnosticsDetails((prevUsers) => response.data);
            // setCurrentPage((prev) => prev = 1);
          } catch (err) {
            console.error(err);
            //navigate("/login", { state: { from: location }, replace: true });
          }
        };
        getData();
      }, []);
     /*----------------ADD diagnostics data by file upload---------------------*/


     const handleChangeFile = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        // Check if the file type is PDF or TXT
        if (selectedFile.type === 'application/pdf' || selectedFile.type === 'text/plain') {
          setFile(selectedFile);
          setFileName(selectedFile.name); // Update file name
        } else {
          alert('Please select a PDF or TXT file.');
        }
      }
    };
  
    // Function to handle file drop
    const handleDrop = (event) => {
      event.preventDefault();
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile) {
        // Check if the file type is PDF or TXT
        if (droppedFile.type === 'application/pdf' || droppedFile.type === 'text/plain') {
          setFile(droppedFile);
          setFileName(droppedFile.name); // Update file name
        } else {
          alert('Please drop a PDF or TXT file.');
        }
      }
    };
  
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
      if (file) {
        const formData = new FormData();
        formData.append('fileName', file);
        try {
          await axiosPrivate.post('/uploadExtResult', formData,{headers: {
            "Content-Type": "multipart/form-data",
          },}); 
          // File uploaded successfully
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      } else {
        alert('Please select a file to upload.');
      }
    };
  
    return (
        <>
        <Suspense fallback={<LoadingSpinner />}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
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
              <div className="d-flex m-5 justify-content-around align-items-center flex-column">
                <div className="d-flex flex-column" style={{ fontSize: "1.3rem" }}>
<div className="d-flex ">


                  <div className="d-flex flex-column justify-content-end" >
                    <p>Նույնականացման համար:</p>
                                        {/* <div className="separator-full m-0"></div>      */}
                 
    
                    <p>Ախտորոշման ամսաթիվ:</p>
                                        {/* <div className="separator-full m-0"></div>      */}


                    <p>Ախտորոշման տեսակ:</p>
                                        {/* <div className="separator-full m-0"></div>      */}
                 
    
                    <p>Ախտորոշման բժիշկ:</p>
                                        {/* <div className="separator-full m-0"></div>      */}
                 
    
                    <p>Հաճախորդի անուն:</p>
                                        {/* <div className="separator-full m-0"></div>      */}
                 
    
                    <p>Լրացուցիչ տվյալներ:</p>
                                        {/* <div className="separator-full m-0"></div>      */}
                 
                                        {/* <button className="btn btn-secondary" onClick={handleSubmit}>
                        Upload!
                    </button> */}
                    
                  </div>

                   <div className="ms-3 ">
                    <p>
                        {/* {diagnosticsDetails.doctorId}  */}46
                        </p>
                                        {/* <div className="separator-full m-0"></div>      */}
                 
    
                    <p>
                         {diagnosticsDetails?.createdAt} 
                        </p>
                                        {/* <div className="separator-full m-0"></div>      */}
                 
    
                    <p>
                         {diagnosticsDetails.class === "Internal"? 'Ներքին':'Արտաքին'}
                        </p>
                                        {/* <div className="separator-full m-0"></div>      */}
                 
    
                    <p>
                        {/* {diagnosticsDetails.dateOfBirth} */}Աննա Կարապետյան
                        </p>
                                        {/* <div className="separator-full m-0"></div>      */}
                 
    
                    <p>
                        {/* {diagnosticsDetails.gender} */}Մարտին Գրիգորյան
                        </p>
                    <p>
                        {/* {diagnosticsDetails.gender} */}չկա
                        </p>
                                        {/* <div className="separator-full m-0"></div>      */}
    
                    <div className="dropify-circle edit-img">
                        
                
                      </div>   
                            
                   
                     
                  </div> 
                  </div>
                  <div className='d-flex'>
                  <form onSubmit={(e)=>handleSubmit(e)}>
                    <input
              type="file"
              ref={fileInputRef}
              onChange={handleChangeFile}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
               style={{ display: 'none' }}
            />
            <button className="btn btn-secondary" type='submit'>
                        Upload!
                    </button>
            </form>
            {/* Button to trigger file input */}
            <button className="btn btn-primary" onClick={() => fileInputRef.current.click()}>Choose File</button>
            {/* Display file name */}
            {fileName && <span>{" "+fileName}</span>}
            {/* Button to submit form */}
                        
                                            {/* <div className="separator-full m-0"></div>      */}
                 

                  </div>
                </div>

                  <div>
                 
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
         )}
        </Suspense> 
        </>
      );
}

export default DiagnosticsDetails
