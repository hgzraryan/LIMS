/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
import React, { useState, useEffect, useRef, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import LoadingSpinner from "../LoadingSpinner";
import ReactPaginate from "react-paginate";
import MissingAvatar from "../../dist/img/Missing.svg";
import axios from "./../../api/axios";
import Loading from "../Loading";
import { useSortBy, useTable } from "react-table";
import ComponentToConfirm from "../ComponentToConfirm";
import CreateUser from "../views/CreateUser";

const REGISTER_URL = "/register";

const Reagents = () => {
  const [users, setUsers] = useState([]);
  const [rolesArray, setRolesArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(MissingAvatar);
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const fileReader = new FileReader();
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  /*----------------ADD USER---------------------*/
  const errRef = useRef("");
  const user = useRef("");
  const firstname = useRef("");
  const lastname = useRef("");
  const pwd = useRef("");
  const roles = useRef("");
  const confirmUserRef = useRef("");
  const emailRef = useRef("")
  const phoneRef = useRef("")

  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const formData = new FormData();



  /*------------------ Delete Component --------------------*/
  const handleDeleteItem = async () => {
    if (selectedItem?.username.trim() === confirmUserRef.current?.trim()) {
      try {
        const response = await axiosPrivate.post("/prices", {
          message: "delete",
          userId: selectedItem.id,
        });
        setTimeout(() => {
          setUsers((prev) => response.data.jsonString);
          setSelectedItemId(null); // Close the modal after deletion
        }, 500);
      } catch (err) {
        console.error(err);
        //navigate('/login', { state: { from: location }, replace: true });
      }
    }
  };
  const handleOpenModal = (user) => {
    setSelectedItemId(true);
    setSelectedItem((prev) => user);
  };
  const handleCloseModal = () => {
    setSelectedItemId(null);
  };
  /*------------------------------------------------*/
  /*------------------ Create user Component --------------------*/
  const handleToggleCreateModal = (value) => {
    setIsOpen(prev => value);
  };
  /*------------------------------------------------*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    //if button enabled with JS hack
    // const checkUsername = USER_REGEX.test(user.current);
    // const checkPassword = PWD_REGEX.test(pwd.current);
    // const checkPhone = PWD_REGEX.test(phoneRef.current);
    // const checkEmail = PWD_REGEX.test(emailRef.current);
    // if (!checkUsername || !checkPassword || !checkPhone || !checkEmail) {
    // 	setErrMsg("Invalid Entry");
    // 	return;
    // }

    const newUser = {
      user: user.current,
      pwd: pwd.current,
      firstname: firstname.current,
      lastname: lastname.current,
      roles: roles.current,
    };

    formData.append("text", JSON.stringify(newUser));
    formData.append("image", image);
    try {
      await axios.post(REGISTER_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      //console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      navigate("/users", { state: { from: location }, replace: true });      
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg(" Failed");
      }
    }
  };
  const onRoleSelect = (data) => {
    let rolesArr = [];
    for (let role of data) {
      rolesArr.push(Object.values(role)[0]);
    }
    setRolesArray((prev) => (prev = rolesArr));
  };
  const onRoleDelete = (data) => {
    let rolesArr = [];
    for (let role of data) {
      rolesArr.push(Object.values(role)[0]);
    }
    setRolesArray((prev) => (prev = rolesArr));

    //reset selected options colors
    const elems = document.querySelectorAll(".chips");
    elems.forEach((element) => {
      element.classList.remove("chips");
    });
  };
  const onAdd = (e) => {
    roles.current = rolesArray;
    //multiselectRef.current.resetSelectedValues()
    const elems = document.querySelectorAll(".chip");
    elems.forEach((element) => {
      element.classList.add("chips");
    });
  };
  /*----------------ADD USER END---------------------*/
  fileReader.onloadend = () => {
    setImageUrl(fileReader.result);
  };

  const handleChangeFile = async (event) => {
    const image = event.target.files[0];
    if (!image.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setImage(image);
    try {
      formData.append("image", event.target.files[0]);
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setImageUrl(result);
        }
      };
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [image]);
  const handleDrop = (event) => {
    event.preventDefault();
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (event.dataTransfer.files && event.dataTransfer.files.length) {
      setImage(event.dataTransfer.files[0]);
      fileReader.readAsDataURL(event.dataTransfer.files[0]);
    }
  };
  const handleDragEmpty = (event) => {
    event.preventDefault();
    if (event.stopPropagation) {
      event.stopPropagation();
    }
  };

  const pagesVisited = currentPage * usersPerPage;
  const currentUsers = users.slice(pagesVisited, pagesVisited + usersPerPage);
  const pageCount = Math.ceil(users.length / usersPerPage);

 useEffect(() => {
	let isMounted = true;
	const controller = new AbortController();

	const getUsers = async () => {
		try {
			const response = await axiosPrivate.post('/reagentList', {
				signal: controller.signal,
				page:currentPage,
				onPage:14
			});
			
			console.log("-------");
			console.log(response);
			console.log("+++++++");
			
			setTimeout(() => {
				if(response.data.jsonString.length === 0 || response.data.jsonString.length < 12){
					setHasMore(false)
				}
				setUsers(prevUsers => [...prevUsers,...response.data.jsonString]);
				setCurrentPage(prev => prev+1)
			}, 500);
		} catch (err) {
			console.error(err);
			navigate('/login', { state: { from: location }, replace: true });
		}
	}

	getUsers();

	return () => {
		isMounted = false;
		controller.abort();
	}
}, [])

  const getUsers = async () => {
		try {
			const response = await axiosPrivate.post('/reagentList', {
				page:currentPage,
				onPage:usersPerPage
			});
			setTimeout(() => {
				if(response.data.jsonString.length === 0 || response.data.jsonString.length < 12){
					setHasMore(false)
				}
				setUsers(prevUsers => [...prevUsers,...response.data.jsonString]);
				setCurrentPage(prev => prev+1)
			}, 500);
		} catch (err) {
			console.error(err);
			navigate('/login', { state: { from: location }, replace: true });
		}
	}

  //-------------------------

  const refreshPage = () => {
    let paglink = document.querySelectorAll(".page-item");
    paglink[0].firstChild.click();
  };
  //-------------------

  //-------------------
  const [showCreateNew, setIsActive] = useState(false);
  const CreateNew = (event) => {
    setIsActive((current) => !current);
  };

  //-------------------

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
  const columns = React.useMemo(
    () => [
      {
        Header: () => (
          <input
            type="checkbox"
            className="form-check-input check-select-all"
          />
        ),
        Cell: () => (
          <input
            type="checkbox"
            className="form-check-input check-select-all"
          />
        ),
        accessor: "select",
        disableSortBy: true,
      },
      {
        Header: "Անվանում",
        accessor: "product_name",
        sortable: true,
      },
      {
        Header: "Արժեք",
        accessor: "price",
      },
      {
        Header: "Չափման միավոր",
        accessor: "quantity_unit",
        sortable: true,
      },
	  {
        Header: "Չափման միավոր",
        accessor: "unit",
        sortable: true,
      },
	   {
        Header: "Կիրառություն",
        accessor: "used_for",
        sortable: true,
      },
      {
        Header: "Արժույթ",
        accessor: "currency",
      },
      {
        Header: "Նկարագիր",
        accessor: "description",
      },
	  {
        Header: "Թողարկող",
        accessor: "vendor",
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
                onClick={() => handleOpenModal(row.values)}
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
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: users,
      },
      useSortBy
    );

  // const [items, setItems] = useState(generateData(0));



  return (
    <div>
      <div className="contactapp-wrap">
        <div className="contactapp-content">
          <div className="contactapp-detail-wrap">
            <header className="contact-header">
              <div className="d-flex align-items-center">
                <div className="dropdown">
                  <a
                    className="contactapp-title link-dark"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <h1>Գնացուցակներ</h1>
                  </a>
                </div>
                <div className="dropdown ms-3">
                  <button
                    className="btn btn-sm btn-outline-secondary flex-shrink-0 dropdown-toggle d-lg-inline-block d-none"
                    data-bs-toggle="dropdown"
                    onClick={CreateNew}
                  >
                    Ավելացնել նոր
                  </button>
                  <div
                    className={
                      showCreateNew ? "dropdown-menu show" : "dropdown-menu"
                    }
                    data-popper-placement="bottom"
                  >
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => setIsOpen(true)}
                    >
                      <span className="feather-icon dropdown-icon"></span>
                      <span>Գնառաջարկ</span>
                    </a>
                    {
                    isOpen &&
                    <CreateUser                      
                      handleSubmit = {handleSubmit}
                      onRoleSelect = {onRoleSelect}
                      onRoleDelete = {onRoleDelete}
                      onAdd = {onAdd}
                      handleChangeFile = {handleChangeFile}
                      handleDrop = {handleDrop}
                      handleDragEmpty = {handleDragEmpty}
                      handleToggleCreateModal = {handleToggleCreateModal}
                      imageUrl = {imageUrl}
                      user = {user}
                      firstname = {firstname}
                      lastname = {lastname}
                      pwd = {pwd}
                      roles = {roles}
                    />
                    }
                    
                  </div>
                </div>
              </div>
              <div className="contact-options-wrap">
               
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item active" href="contact.html">
                    <span className="feather-icon dropdown-icon">
                      <FeatherIcon icon="list" />
                    </span>
                    <span>List View</span>
                  </a>
                  <a className="dropdown-item" href="contact-cards.html">
                    <span className="feather-icon dropdown-icon">
                      <FeatherIcon icon="grid" />
                    </span>
                    <span>Grid View</span>
                  </a>
                  <a className="dropdown-item" href="#">
                    <span className="feather-icon dropdown-icon">
                      <FeatherIcon icon="server" />
                    </span>
                    <span>Compact View</span>
                  </a>
                </div>

                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret d-sm-inline-block d-none"
                  href="#"
                  data-bs-toggle="tooltip"
                  data-placement="top"
                  onClick={refreshPage}
                  title=""
                  data-bs-original-title="Refresh"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <FeatherIcon icon="refresh-cw" />
                    </span>
                  </span>
                </a>

              </div>
            </header>
            <div className="contact-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="contact-list-view">
                  <div
                    id="scrollableDiv"
                    style={{ height: "80vh", overflow: "auto" }}
                  >
                    <InfiniteScroll
                      dataLength={users.length}
                      next={getUsers}
                      hasMore={hasMore}
                      loader={<Loading />}
                      scrollableTarget="scrollableDiv"
                      endMessage={
                        <p>Տվյալներ չեն հայտնաբերվել բեռնելու համար:</p>
                      }
                    >
                      <table className="table nowrap w-100 mb-5 dataTable no-footer">
                        <thead>
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th
                                  //className="sorting"
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                >
                                 
                                    {column.isSorted
                                      ? column.isSortedDesc
                                        ? <span className="sorting_asc" ></span>
                                        : <span className="sorting_desc" ></span>
                                      : <span className="sorting" ></span>}
                                  
                                      {column.render("Header")}
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
                                      <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                      </td>
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
                                    confirmUserRef={confirmUserRef}
									userName = {selectedItem.username}
                            />
                          </tbody>
                        )}{" "}
                      </table>
                    </InfiniteScroll>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Reagents;
