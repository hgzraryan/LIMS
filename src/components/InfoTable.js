import React, { useEffect, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";

function InfoTable() {
  const [data, setData] = useState([]);

 // const [tutorials, setTutorials] = useState([]);


  const tutorials = useMemo(
    () => [
        {
            researches: "Biopsy",
            done: "500",
            pending: "120",
          },
          {
            researches: "Genetic tests",
            done: "722",
            pending: "50",
          },
          {
            researches: "Pap smear",
            done: "125",
            pending: "42",
          },
          {
            researches: "Imagiing tests",
            done: "689",
            pending: "140",
          },
          {
            researches: "Blood tests",
            done: "1526",
            pending: "836",
          },
          {
            researches: "Stool tests",
            done: "1523",
            pending: "256",
          },
          {
            researches: "Urine tests",
            done: "2547",
            pending: "458",
          },
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "researches",
      },
      {
        Header: "Done",
        accessor: "done",
      },
      {
        Header: "Pending",
        accessor: "pending",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data:tutorials,
      },
      useSortBy
    );
  return (
    <>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"30px"}}><h3>Researches</h3></div>
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
                        {tutorials?.length && (
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
                          </tbody>
                        )}{" "}
                      </table>
    </>
  );
}

export default InfoTable;
