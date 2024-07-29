/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useMemo } from 'react'
import CustomTable from '../CustomTable'
import moment from 'moment';
import successSvg from '../../dist/svg/success.svg'
import cancellSvg from '../../dist/svg/cancelled.svg'
import smsSvg from '../../dist/svg/sms.svg'
import emailSvg from '../../dist/svg/email.svg'
function NotificationsTable({notifications}) {
    const columns = useMemo(
        () => [
          {
            Header: (event) => (
              <>
                
                <div  className="columnHeader">ID</div>
              </>
            ),
            accessor: "notificationId",
            sortable: true,
            width: 80,
            
          },
          {
            Header: (event) => (
              <>
                
                <div  className="columnHeader">Մեթոդ</div>
              </>
            ),
            accessor: "method",
            sortable: true,
            width: 100,
            Cell: ({ row }) => (
                <div className="d-flex align-items-center justify-content-center">
                   {row.original?.method==="sms"?<img width={25} src={smsSvg} alt='icon'/>:<img width={20}src={emailSvg} alt='icon'/>}
                </div>
              ),
          },
          {
            Header: (event) => (
              <>
                <div>Հաճախորդի ID
                </div>
              </>
            ),
            accessor: "clientId",
            width: 150,
          
            
          },
          {
            Header: (event) => (
              <>
                <div>Հաճախորդի ԱԱՀ</div>
              </>
            ),
            accessor: "mobile",
            width: 400,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
                {row.original?.clientFirstName+" "+row.original?.clientLastName+" " + row.original?.clientMidName}
              </div>
            ),
            
          },
          {
            Header: (event) => (
              <>
               
                <div  className="columnHeader">Կարգավիճակ</div>
              </>
            ),
            accessor: "status",
            style: {
               // Custom style for the 'description' column
            },
            width: 150,
            Cell: ({ row }) => (
                <div className="d-flex align-items-center justify-content-center">
                   {row.original?.status==="Success"?<img width={20} src={successSvg} alt='icon'/>:<img width={20}src={cancellSvg} alt='icon'/>}
                </div>
              ),
          },
          {
            Header: (event) => (
              <>
               
                <div  className="columnHeader">Միավորի գինը</div>
              </>
            ),
            accessor: "averagePrice",
            width: 150,
          },
          {
            Header: (event) => (
              <>
               
                <div  className="columnHeader">Արժեքը</div>
              </>
            ),
            accessor: "totalPrice",
            width: 150,
          },
          {
            Header: (event) => (
              <>
               
                <div  className="columnHeader">Ուղարկման ամսաթիվ</div>
              </>
            ),
            accessor: "createdAt",
            width: 300,
            Cell: ({ row }) => (
                <div className="d-flex align-items-center">
                   {row.original?.createdAt && moment.utc(row.original?.createdAt).format('DD-MM-YYYY HH:mm')}
                </div>
              ),
          },
        //   {
        //     Header: (event) => (
        //       <>
        //         <div className="columnHeader">Գործողություններ</div>
        //       </>
        //     ),
        //     accessor: "actions",
        //     width: 300,
        //     Cell: ({ row }) => (
        //       <div className="d-flex align-items-center">
        //         <div className="d-flex">
        //           <BiSolidInfoCircle
        //           cursor={"pointer"}
        //           size={"1.5rem"}
        //           onClick={() => handleOpenInfoModal(row.original)}
        //         />
        //         </div>
        //         <div className="d-flex">
        //           <a
        //             className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
        //             data-bs-toggle="tooltip"
        //             data-placement="top"
        //             title="Edit"
        //             href="#"
        //             onClick={() => handleOpenEditModal(row.original)}
    
        //           >
        //             <span className="icon">
        //               <span className="feather-icon">
        //                 <FeatherIcon icon="edit" />
        //               </span>
        //             </span>
        //           </a>
        //           <a
        //             className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
        //             data-bs-toggle="tooltip"
        //             onClick={() => handleOpenModal(row.original)}
        //             data-placement="top"
        //             title=""
        //             data-bs-original-title="Delete"
        //             href="#"
        //           >
        //             <span className="icon">
        //               <span className="feather-icon">
        //                 <FeatherIcon icon="trash" />
        //               </span>
        //             </span>
        //           </a>
        //         </div>
        //       </div>
        //     ),
        //     disableSortBy: true,
            
        //   },
        ],
        []
      );
  return (
    <>
      <CustomTable data={notifications} column={columns}/>
    </>
  )
}

export default NotificationsTable
