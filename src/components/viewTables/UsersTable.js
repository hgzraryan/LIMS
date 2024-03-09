/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
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
import { ColumnFilter } from "../ColumnFilter";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import useDebounce from "../../hooks/useDebounce";
import DefaultProfileImage from "../../../src/dist/img/Missing.svg";
import "../../dist/css/data-table.css";
import { useNavigate } from "react-router-dom";

function UsersTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  users,
  setUsers,
}) {
const navigate = useNavigate()
  const setUserTypeStyle = (userType) => {
    switch (userType) {
      case "Admin":
        return "badge badge-soft-success  my-1  me-2";
      case "Editor":
        return "badge badge-soft-violet my-1  me-2";
      case "User":
        return "badge badge-soft-danger my-1  me-2";
      case "Approver":
        return "badge badge-soft-light my-1  me-2";
      case "Sampler":
        return "badge badge-soft-yellow my-1  me-2";

      default:
        break;
    }
  };

  const setUserActiveState = (activeState) => {
    switch (activeState) {
      case 0:
        return ["badge badge-soft-danger  my-1  me-2", "Ոչ ակտիվ"];
      case 1:
        return ["badge badge-soft-success my-1  me-2  my-1  me-2", "Ակտիվ"];
      default:
        break;
    }
  };
  const handleColumnToggle = (columnId) => {
    toggleHideColumn(columnId);
  };
  const handleUserPage = async(userId) =>{
    try {
     // const response = await axiosPrivate.get(`/patients/${userId}`, );
      //console.log(response.data); 
      navigate(`/users/${userId}`)
      
    } catch (err) {
      console.log(err)
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 409) {
      //   setErrMsg("Username Taken");
      // } else {
      //   setErrMsg(" Failed");
      // }
    }
  }
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
        Header: "",
        accessor: "photo", 
        Cell: ({ row }) => (
          <img
            src={row.original.photo || DefaultProfileImage}
            alt="User Photo"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        ),
        width: 65,
        disableSortBy: true,
        Filter: ({ column: { id } }) => <></>,
      },
      {
        Header: "ID",
        accessor: "userId",
        disableSortBy: true,
        filterable: false,
        show: false,
        width: 60,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setUsers}
            placeholder={'ID'}

          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div>Ծածկանուն</div>
          </>
        ),
        accessor: "username",
        sortable: true,
        width: 190,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setUsers}
            placeholder={'Ծածկանուն'}

          />
        ),
        Cell:({row})=>(
          <div  
          style={{ cursor: 'pointer', textDecoration:'underline'}}
        onClick={()=>handleUserPage(row.original?.userId)} >{row.original?.username}</div>
        )
      },
      {
        Header: (event) => (
          <>
            <div>Անուն</div>
          </>
        ),
        accessor: "firstname",
        width: 190,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setUsers}
            placeholder={'Անուն'}

          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div>Ազգանուն</div>
          </>
        ),
        accessor: "lastname",
        sortable: true,
        width: 190,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setUsers}
            placeholder={'Ազգանուն'}

          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div>Էլ․ հասցե</div>
          </>
        ),
        accessor: "email",
        width: 190,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setUsers}
            placeholder={'Էլ․ հասցե'}

          />
        ),
      },
      {
        Header: "Դերեր",
        accessor: "roles",
        filterable: false,
        Cell: ({ value }) =>
          Object.keys(value).map((role) => (
            <span className={setUserTypeStyle(role)} key={role}>
              {role}
            </span>
          )),
        width: 190,
        Filter: ({ column: { id } }) => <></>,
      },
      {
        Header: "Պաշտոն",
        accessor: "position",
        width: 190,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setUsers}
            placeholder={'Պաշտոն'}

          />
        ),
      },
      {
        Header: "Կարգավիճակ",
        accessor: "isActive",
        Cell: ({ value }) => (
          <span className={setUserActiveState(value)[0]}>
            {setUserActiveState(value)[1]}
          </span>
        ),
        width: 150,
        Filter: ({ column: { id } }) => <></>,
      },
      {
        Header: "Գործողություններ",
        accessor: "actions",
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
        width: 160,
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
      data: users,
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
  return (
    <>
      <table
        {...getTableProps()}
        className="table nowrap w-100 mb-5 dataTable no-footer"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                      <th  {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <div>
                        {column.id !== "selection" && (
                          <>
                          <div>
                            {column.canFilter ? column.render("Filter") : null}
                          </div>
                        
                        <div  style={{
                          marginTop: "2px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}>
                          <div>{column.render("Header")}</div>
                          
                            <div style={{paddingTop:'20px'}} >
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
                       className={`resizer ${
                         column.isResizing ? "isResizing" : ""
                       }`}
                       />
                    </th>
              ))}
            </tr>
          ))}
        </thead>
        {users?.length && (
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
              keyName={selectedItem.username}
              delId={selectedItem.userId}
            />
          </tbody>
        )}{" "}
      </table>
    </>
  );
}

export default UsersTable;
