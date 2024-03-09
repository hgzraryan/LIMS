import React, { Suspense, useEffect, useRef, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner';
import ResearchesPrintWrapper from '../ResearchesPrintWrapper';
import BarcodeComp from '../BarcodeComp';
import mainLogo from "../../dist/img/main-logo.jpg";
import { useTable } from 'react-table';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
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
function ResearchesPrint({modalPrint,setModalPrint}){
    const axiosPrivate = useAxiosPrivate()
    const [isLoading, setIsLoading] = useState(true);  
    const [currentClient, setCurrentClient] = useState({}); 
    const {clientId} = modalPrint
    const {clientType} = modalPrint

    const componentRef = useRef(); 
    
      const getPatientData = async () => {
        try {
          const response = await axiosPrivate.get(`/patients/${clientId}`);
          setIsLoading(false);
          setCurrentClient((prevUsers) => response.data.jsonString);
          console.log(response.data.jsonString)

              } catch (err) {
                console.error(err);
                //navigate("/login", { state: { from: location }, replace: true });
              }
            };
      const getOrganizationData = async () => {
        try {
          const response = await axiosPrivate.get(`/organizations`);
          setIsLoading(false);
          setCurrentClient((prevUsers) => response.data.jsonString[0]);
          console.log(response.data.jsonString)

              } catch (err) {
                console.error(err);
                //navigate("/login", { state: { from: location }, replace: true });
              }
            };
    useEffect(()=>{
      if(clientType && clientType=== 'patient'){
        getPatientData()
      }else if(clientType && clientType=== 'organization'){
        getOrganizationData()
      }
    },[])
          


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
          const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
            useTable({
              columns,
              data: data || [],
            });
  return (
    <>
    <div
      className="resultTable"
      style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          margin: "4px",
          fontFamily:'arnamu'
      }}
      id='resultData'
      ref={componentRef}
  >
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
               className="result title"
               style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                 background: "#01903e",
                 color: "white",
                 borderRadius: "5px",
                 margin: "10px 0",
                 height:'10px'
               }}
             >
             </div>
             {clientType && clientType==='patient'
             ?<main>
      <Suspense fallback={<LoadingSpinner />}>
           {isLoading ? (
             <LoadingSpinner />
           ) : (
             <>
        <section className="container">
          <div className="Requisites d-flex flex-column justify-content-center align-items-center">
            <p style={{fontSize:'18px' }}>ՀՎՀՀ 12457888</p>
            <p style={{fontSize:'18px' }}>h/h 220090120845000 ACBA բանկ</p>
          </div>
        </section>
        <section style={{display:"flex",justifyContent:'space-around',margin:'2rem 0 2rem 0'}} className="container ">
        <BarcodeComp data={modalPrint.diagnosticsId}  /> 

          <div className=" mb-3r">
            <ul>
              <li >Անուն Ազգանուն: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{currentClient?.firstName+" "+ currentClient?.lastName}</span>
              </li>
              <li >Տարիք: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{currentClient?.age}</span></li>
              <li >Հեռախոս: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{currentClient?.contact?.phone}</span></li>
              <li >Տրման ամսաթիվ: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{modalPrint?.createdAt}</span></li>
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

        </>)}
      </Suspense>
              </main>
             :clientType && clientType === 'organization' &&
             <main>
      <Suspense fallback={<LoadingSpinner />}>
           {isLoading ? (
             <LoadingSpinner />
           ) : (
             <>
        <section className="container">
          <div className="Requisites d-flex flex-column justify-content-center align-items-center">
            <p style={{fontSize:'18px' }}>ՀՎՀՀ 12457888</p>
            <p style={{fontSize:'18px' }}>h/h 220090120845000 ACBA բանկ</p>
          </div>
        </section>
        <section style={{display:"flex",justifyContent:'space-around',margin:'2rem 0 2rem 0'}} className="container ">
        <BarcodeComp data={modalPrint.diagnosticsId}  /> 

          <div className=" mb-3r">
            <ul>
              <li >Անվանում: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{currentClient?.name}</span></li>
              <li >Հեռախոս: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{currentClient?.phone}</span></li>
              <li >Տրման ամսաթիվ: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{modalPrint?.createdAt}</span></li>
             
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
               {/* {value.totalPrice}  */}
              47000 դր․</p>
          </div>
        </section>

        </>)}
      </Suspense>
              </main>}
   <footer style={{ marginTop: "auto" }}>
     <div>
     </div>
   </footer>
<footer style={{display:'flex', justifyContent:'end',gap:'5px',marginTop:'2rem'}}>

     <ResearchesPrintWrapper value={modalPrint} currentClient={currentClient}/>
     <button
              type="button"
            className="btn btn-secondary"
            onClick={() =>setModalPrint(false)}
            >
             Փակել
            </button>
          </footer>
          
</div>
          
          
 
 </>
  )
}

export default ResearchesPrint
