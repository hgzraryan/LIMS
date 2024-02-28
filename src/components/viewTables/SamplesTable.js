import React, { useMemo, useState } from "react";
import { useBlockLayout, useFilters, useResizeColumns, useRowSelect, useSortBy, useTable } from "react-table";
import { Checkbox } from "../Checkbox";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { ColumnFilter } from "../ColumnFilter";
import "../../dist/css/data-table.css";

function SamplesTable() {
  // const [currentPage, setCurrentPage] = useState(0);  
  // const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100) * 1.5));
  // const pageCount = Math.ceil(patientsCount/usersPerPage)
  
  //   const {
  //     data: patients,
  //     setData: setPatients,
  //     getData: getPatients,  
  //   } = useGetData(PATIENTS_URL,currentPage,usersPerPage);
  const [samples,setSamples]=useState([
    {
      sampleId:101000,
      bgkCode:303014,
      localCode:303014,
      labService:"Բջջագենետիկայի լաբորատորիա",
      category:"Քաղցկեղի մոլեկուլային հետազոտություն",
      name:'Սուր Միելոբլաստային Լեյկոզի և ՄԴՍ Միելոդիսպլազիայի  (FISH) 1 վերակառուցում',
      price:35000,
      purchasePrice:35000,
      serveDate:'3-4 աշխ. օր',
      biomass:'Ոսկրածուծ/  արյուն ',
      vial:' Heparin',
      sampleTime:'Երկ-Ուրբ 08։30-17։00 Շաբաթ 09։30-13։00',
      prepare:"Ոսկրածուծի ախտաբան. / արյան ընդհ. Վերլուծության պատասխան պահանջվում է"
    }])
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 600
    }),
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: (event) => (
          <>
            
            <div  className="columnHeader">ID</div>
          </>
        ),
        accessor: "sampleId",
        sortable: true,
        width: 60,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
          setData={setSamples}
          placeholder={'ID'}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            
            <div  className="columnHeader">Անվանում</div>
          </>
        ),
        accessor: "name",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
          setData={setSamples}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div>Ոլորտ</div>
          </>
        ),
        accessor: "category",
        width: 200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setSamples}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div>Լաբ․/Ծառայություն</div>
          </>
        ),
        accessor: "labService",
        width: 200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setSamples}
          />
        ),
      },
      {
        Header: (event) => (
          <>
           
            <div  className="columnHeader">Մատուցման Ժամկետ</div>
          </>
        ),
        accessor: "serveDate",
        style: {
           // Custom style for the 'description' column
        },
        width: 200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setSamples}
          />
        ),
      },
      {
        Header: (event) => (
          <>
           
            <div  className="columnHeader">Կենսանյութ</div>
          </>
        ),
        accessor: "biomass",
        style: {
           // Custom style for the 'description' column
        },
        width: 200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setSamples}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Գործողություններ</div>
          </>
        ),
        accessor: "actions",
        width: 200,
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Edit"
                href="edit-contact.html"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="edit" />
                  </span>
                </span>
              </a>
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                data-bs-toggle="tooltip"
             //   onClick={() => handleOpenModal(row.original)}
                data-placement="top"
                title=""
                data-bs-original-title="Delete"
                href="#"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="trash" />
                  </span>
                </span>
              </a>
            </div>
          </div>
        ),
        disableSortBy: true,
        Filter: ({ column: { id } })=>(
          <></>
        ),
      },
    ],
    []
  );
 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,    
    toggleHideColumn,
  } = useTable(
    {
      columns,
      data: samples, 
      defaultColumn      
    },
    useFilters,useBlockLayout,useResizeColumns,useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()}  />,
        },
        ...columns,
      ]);
    }
  );
  return (
    <table
    className="table nowrap w-100 mb-5 dataTable no-footer"
    {...getTableProps()}
  >
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
              <div>
                {column.id !== "selection" && (
                  <>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>

                    <div
                      style={{
                        marginTop: "2px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>{column.render("Header")}</div>

                      <div style={{ paddingTop: "20px" }}>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <span className="sorting_asc"></span>
                          ) : (
                            <span className="sorting_desc"></span>
                          )
                        ) : (
                          <span className="sorting"></span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div
                {...column.getResizerProps()}
                className={`resizer ${column.isResizing ? "isResizing" : ""}`}
              />
            </th>
          ))}
        </tr>
      ))}
    </thead>
    {samples?.length && (
      <tbody {...getTableBodyProps()} style={{fontSize:'14px'}}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} >
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} >{cell.render("Cell")}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    )}{" "}
  </table>
  );
}

export default SamplesTable
