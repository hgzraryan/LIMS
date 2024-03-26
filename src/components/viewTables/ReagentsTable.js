/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import ComponentToConfirm from "../ComponentToConfirm";
import {
  useBlockLayout,
  useFilters,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { Checkbox } from "../Checkbox";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { ColumnFilter } from "../ColumnFilter";
import { BiSolidInfoCircle } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import reagentSvg from "../../../src/dist/img/reagent.svg";
import "../../dist/css/data-table.css";

const customReagentsData = [
  {
    name:"Arginine",
    price:265000,
    currency:'AMD',
    unit:1,
    unit_type:'Box',
    vendor:'DDD',
    usage:'Body build protein',
    expdate:'2027-06-15',
    description:'can be used orally and topically',
    norma_female:'72.4 ± 6.7 μmol/L  ',
    norma_male:'81.6 ± 7.3 mmol/L',
    norma_both:'113.7 ± 19.8 μmol/L',
  }
]
function ReagentsTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  reagents,
  setReagents,
  getReagents,
}) {
  const [modalInfo, setModalInfo] = useState("");
  const handleOpenInfoModal = (user) => {
    
    setModalInfo((prev) => user);
  };
  const defaultColumn = useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 600,
    }),
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: (event) => (
          <>
            <div className="columnHeader">ID</div>
          </>
        ),
        accessor: "reagentId",
        sortable: true,
        width: 60,
        Filter: ({ column: { id } }) =>  <ColumnFilter
        id={id}
        setData={setReagents}
        placeholder={'ID'}
      />,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Անվանում</div>
          </>
        ),
        accessor: "name",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setReagents}
          placeholder={'Անվանում'}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Արժեք</div>
          </>
        ),
        accessor: "price",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setReagents} 
          placeholder={'Արժեք'}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Արժույթ</div>
          </>
        ),
        accessor: "currency",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setReagents}
          placeholder={'Արժույթ'}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Չափման միավոր</div>
          </>
        ),
        accessor: "unit",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} 
          setData={setReagents}          
           placeholder={'Չափման միավոր'} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Չափման տեսակ</div>
          </>
        ),
        accessor: "unitType",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setReagents}
          placeholder={'Չափման տեսակ'}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Թողարկող</div>
          </>
        ),
        accessor: "vendor",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setReagents}
          placeholder={'Թողարկող'}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Կիրառություն</div>
          </>
        ),
        accessor: "usage",
        sortable: true,
        width: 250,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setReagents}
          placeholder={'Կիրառություն'}
           />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Ժամկետ</div>
          </>
        ),
        accessor: "expdate",
        sortable: true,
        width: 250,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setReagents} 
          placeholder={'Ժամկետ'}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Նկարագիր</div>
          </>
        ),
        accessor: "description",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setReagents}
          placeholder={'Նկարագիր'}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Կին նորմա</div>
          </>
        ),
        accessor: "normaFemale",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setReagents}
          placeholder={'Կին նորմա'}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Տղ․ նորմա</div>
          </>
        ),
        accessor: "normaMale",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setReagents}
          placeholder={'Տղ․ նորմա'}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Նորմա</div>
          </>
        ),
        accessor: "normaBoth",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setReagents}
          placeholder={'Նորմա'}
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
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenInfoModal(row.original)}
            />
            </div>
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
                onClick={() => handleOpenModal(row.original)}
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
        width: 200,
        Filter: ({ column: { id } }) => <></>,
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
      // data: reagents,
      data: customReagentsData,
      defaultColumn,
    },
    useFilters,
    useBlockLayout,
    useResizeColumns,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );
  // console.log(selectedFlatRows);
  return (
    <>
    {
      modalInfo && (
        <Modal
      show={() => true}
      size="md"
      onHide={() => setModalInfo(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
        {modalInfo.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>        
          <div className="contact-body contact-detail-body">
            <div data-simplebar className="nicescroll-bar">
              <div className="d-flex flex-xxl-nowrap flex-wrap">
                <div className="contact-info w-100">
                  <div className="d-flex justify-content-center align-items-center">
                    
                    <img
                          width={"150px"}
                          height={"200px"}
                          style={{
                            borderRadius: "5px",
                          }}
                          src={reagentSvg}
                          className="avatar_upload_preview"
                          alt="preview"
                        />
                  </div>
                  <div className="w-100">
                       <div className="d-flex justify-content-between">  <span> ID </span> <span>{modalInfo.reagentId}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span> Անվանում </span> <span>{modalInfo.name}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Չափման միավոր </span> <span>{modalInfo.unit}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Չափման տեսակ </span> <span>{modalInfo.unitType}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Արժույթ</span> <span>{modalInfo.currency}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Արժեք</span> <span>{modalInfo.price}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Կիրառություն</span> <span>{modalInfo.usage}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Արտադրող </span> <span>{modalInfo.producer}</span></div>
                       <div className="separator-full m-0"></div>                  
                       <div className="d-flex justify-content-between">  <span>Նկարագրություն </span> <span>{modalInfo.description}</span></div>
                       <div className="separator-full m-0"></div>                  
                       <div className="d-flex justify-content-between">  <span>Այլ </span> <span>{modalInfo.additional}</span></div>
                       <div className="separator-full m-0"></div>                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        
                  <div className="modal-footer ">                   
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setModalInfo(false)}
                    >
                      Փակել
                    </button>
                  </div>
      </Modal.Body>
    </Modal>
      )
    }
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
      {reagents?.length && (
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          <ComponentToConfirm
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            handleDeleteItem={handleDeleteItem}
            selectedItemId={selectedItemId}
            confirmUserRef={confirmRef}
            keyName={selectedItem.name}
            delId={selectedItem.reagentId}
          />
        </tbody>
      )}{" "}
    </table>
    </>

  );
}

export default ReagentsTable;
