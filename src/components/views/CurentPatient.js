import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSortBy, useTable } from 'react-table'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import { BiSolidInfoCircle } from 'react-icons/bi'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const CurentPatient = () => {
    const [data, setData] = useState({info: []})
    const {id} = useParams()
    const axiosPrivate = useAxiosPrivate();  

    useEffect(() => {
        let  isMounted = true;
        const controller = new AbortController();
    
        const getData = async () => {
            try {
              const response = await axiosPrivate.get(id);
              setTimeout(() => {             
                
                setData((data => setData(data)));
                
              }, 500);
            } catch (err) {
              console.error(err);
              //navigate("/login", { state: { from: location }, replace: true });
            }
          };
    
        getData();
    
        return () => {
          isMounted = false;
          controller.abort();
        };
    }, [])
    const handleOpenModal = (user) => {
        //setSelectedItem((prev) => user);
      };
      
    const generateData = (start, length = 6) =>
  Array.from({ length }).map((_, i) => ({
      firstName: '33e3e3',
      lastName: 'wewewewew',
      midName: 'wewewew@as.as',
      email: 'email',
      age: '84',
      researchList: ["asd","dsa","qwe","ewq"],
      date: '12/06/2023',
  }));
  const [items, setItems] = useState(generateData(0));

  const columns = useMemo(
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
        Header: "Անուն",
        accessor: "firstName",
        sortable: true,
      },
      {
        Header: "Ազգանուն",
        accessor: "lastName",
        sortable: true,
      },
      {
        Header: "Հայրանուն",
        accessor: "midName",
        sortable: true,
      },
      {
        Header: "Էլ․ հասցե",
        accessor: "email",
        sortable: true,
      },
      {
        Header: "Տարիք",
        accessor: "age",
        sortable: true,
      },
      {
        Header: "Հետազոտություններ",
        accessor: "researchList",
        Cell: ({ row }) => (
          <div className="d-flex">
            <div className="pe-2">{row.values.researchList.length}</div>
            <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenModal(row.values)}
            />
          </div>
        ),
      },
      {
        Header: "Ամսաթիվ",
        accessor: "date",
        //Cell: ({ row }) => <div>{row.values.totalPrice}</div>,
      },
     
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: items,
      },
      useSortBy
    );
    return (
        <table className="table nowrap w-100 mb-5 dataTable no-footer">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th //className="sorting"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span className="sorting_asc"></span>
                      ) : (
                        <span className="sorting_desc"></span>
                      )
                    ) : (
                      <span className="sorting"></span>
                    )}
    
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {items.length && (
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
              
            </tbody>
          )}{" "}
        </table>
    );
}

export default CurentPatient
