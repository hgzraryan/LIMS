import React, { forwardRef } from "react";
import Table from "react-bootstrap/Container";
import { useTable } from "react-table";
// import Barcode from "react-barcode";
import mainLogo from "../dist/img/main-logo.png";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { connect, useSelector } from "react-redux";
import { selectResearches } from "../redux/features/researches/researchesSlice";
import BarcodeComp from "./BarcodeComp";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const ComponentToPrint = forwardRef(({ value,currentClient }, ref) => {

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Հետազոտություն",
        accessor: "name",
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
      data: value.statusBoard[1].researches || [],
    });
  return (
    <div className="wrapper m-4" ref={ref}>
       <header className="header" style={{display:'flex', justifyContent:'space-between'}}>
              <div>
               <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                <p style={{fontSize:'2.5rem',color:'#4eafcb', letterSpacing:'5px',fontWeight:'bolder',textTransform:'uppercase'}}>ԷՎԱ</p>
                <img
                            width={"40px"}
                            height={"40px"}
                            src={mainLogo}
                            alt="Logo"
                            style={{ marginLeft: '1rem',marginRight:'1rem'}}
                        />
                <p style={{fontSize:'2.5rem',color:'#4eafcb', letterSpacing:'5px',fontWeight:'bolder',textTransform:'uppercase'}}>ԼԱԲ</p>
               </div>
               <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}> <p style={{fontSize:'1.3rem',color:'#4eafcb',textTransform:'uppercase',fontWeight:'bolder'}}>ԱԽտորոշման կենտրոն</p></div>
              
               </div>
               <div>
               <div>
               <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                <p style={{fontSize:'2.5rem',color:'#4eafcb', letterSpacing:'5px',fontWeight:'bolder',textTransform:'uppercase'}}>Eva</p>
                <img
                            width={"40px"}
                            height={"40px"}
                            src={mainLogo}
                            alt="Logo"
                            style={{ marginLeft: '1rem',marginRight:'1rem'}}
                        />
                <p style={{fontSize:'2.5rem',color:'#4eafcb', letterSpacing:'5px',fontWeight:'bolder',textTransform:'uppercase'}}>Lab</p>
               </div>
               <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}> <p style={{fontSize:'2.3rem',color:'#4eafcb',textTransform:'uppercase',fontWeight:'bolder',marginTop:'-10px'}}>Laboratory</p></div>
              
               </div>
               </div>

            </header>
            <div
      style={{
        width: "100%",
        height: "3px",
        borderRadius:'.3rem',
        background: 'linear-gradient(to right, #4eafcb 65%, transparent)',
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
              Նմուշառման թերթիկ
               </p>
             </div>
      <main>
      <section className="container">
          <div className="Requisites d-flex flex-column justify-content-center align-items-center">
            <p style={{fontSize:'18px' }}>ՀՎՀՀ 00000</p>
            <p style={{fontSize:'18px' }}>h/h 000000000000  բանկ</p>
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
                      <BarcodeComp data={value.diagnosticsId} />
                    </div>
          <div className=" mb-3r">
            <ul>
              <li >Անուն Ազգանուն: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{currentClient?.firstName+" "+ currentClient?.lastName}</span>
              </li>
              <li >Սեռ: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{(currentClient?.gender==='Male')?'Արական':'Իգական'}</span></li>
              <li >Ծննդյան ամսաթիվ: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{currentClient?.dateOfBirth}</span></li>
              <li >Տարիք: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{currentClient?.age}</span></li>
              <li >Հեռախոս: <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{currentClient?.contact?.phone}</span></li>
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
              {value.statusBoard[1].researches?.length && (
           
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
        <section className="research_container">
          <div className="total d-flex flex-column align-items-end">
            <p style={{marginRight:'6px'}}>Զեղչ 0</p>
            <p>Ընդհանուր արժեք   
              {" " +value.totalPrice}դր
              </p>
          </div>
        </section>
      </main>
    </div>
  );
});
