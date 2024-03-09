
import React, {  forwardRef } from "react";
import { useTable } from "react-table";
// import Barcode from "react-barcode";
import mainLogo from "../dist/img/main-logo.jpg";
import BarcodeComp from "./BarcodeComp";
const data = [
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
      analysisResult: 83.7 ,
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
  
  ];
export const ResultToPrintComponent = forwardRef(({ value,patient }, ref) => {
   

  
    const columns = React.useMemo(
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
    data: data,
  });
return (
    <>
  <div
    className="wrapper m-4 d-flex flex-column"
    style={{ minHeight: "95vh", position: "relative" }}
    ref={ref}
  >
 <header className="header">
        <div className=" d-flex justify-content-between">
          <div className="header__infoL flex-1">
            <h3 style={{ fontWeight: "bold", color: "#01903e" }}>ԵՎԱ ԼԱԲ</h3>
            <h6>www.evalab.am</h6>
          </div>
          <div className="header__logo flex-1 d-flex justify-content-center align-items-center">
            <img
              className="m-0"
              width={"136px"}
              height={"136px"}
              src={mainLogo}
              alt="Logo"
            />
          </div>
          <div className="header__infoR flex-1 d-flex justify-content-end align-content-start flex-wrap">
            <div style={{ maxWidth: "300px", fontSize: "14px" }}>
              <div className="d-flex justify-content-end">
                <p>Ք․Վանաձոր, Բաբայան 5/8,4548</p>
              </div>
              <div className="d-flex justify-content-end">
                <p>+374 99 942-200, +374 32 242-200</p>
              </div>
              <div className="d-flex justify-content-end">
                <p>Երկ. - Ուրբ. 08:00-18:00</p>
              </div>
              <div className="d-flex justify-content-end">
                <p>Շաբ․ 08:00-13:00</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main style={{ flex: "1 1 auto" }}>
        <section>
          <div
            className="d-flex justify-content-center align-center"
            style={{
              background: "#01903e",
              color: "white",
              borderRadius: "5px",
              margin: "10px 0",
            }}
          >
            <p style={{ padding: "5px", fontSize: "20px", fontWeight: "bold" }}>
              ՀԵՏԱԶՈՏՈՒԹՅՈՒՆՆԵՐԻ ԱՐԴՅՈՒՆՔՆԵՐ
            </p>
          </div>
        </section>
        <section className="containerr">
          <div className="d-flex">
            <div className="flex-1">
              <div className="d-flex justify-content-between align-items-center ">
                <div className="d-flex ">
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title />
                    <g id="Complete">
                      <g id="user">
                        <g>
                          <path
                            d="M20,21V19a4,4,0,0,0-4-4H8a4,4,0,0,0-4,4v2"
                            fill="#000000"
                            stroke="#000000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                          <circle
                            cx="12"
                            cy="7"
                            fill="none"
                            r="4"
                            stroke="#000000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>

                  <p className="ms-2 fw-bold">{ patient[0]?.lastName + " " + patient[0]?.firstName + " " + patient[0]?.midName}</p>
                </div>

                <div className="d-flex ">
                  <p className="ms-2 fw-bold">{patient[0]?.gender==='Male' ? 'Ար․':'Իգ'}</p>
                  <p className="ms-2 fw-bold">{value.birthDay || '01․08․85'}</p>
                  <p className="ms-2 fw-bold">{value.age || '39տ․'}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center ">
                <div className="d-flex ">
                  <p className="ms-2 me-4 fw-bold">{value.phone || '033071007'}</p>
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m 8 0 c -3.3125 0 -6 2.6875 -6 6 c 0.007812 0.710938 0.136719 1.414062 0.386719 2.078125 l -0.015625 -0.003906 c 0.636718 1.988281 3.78125 5.082031 5.625 6.929687 h 0.003906 v -0.003906 c 1.507812 -1.507812 3.878906 -3.925781 5.046875 -5.753906 c 0.261719 -0.414063 0.46875 -0.808594 0.585937 -1.171875 l -0.019531 0.003906 c 0.25 -0.664063 0.382813 -1.367187 0.386719 -2.078125 c 0 -3.3125 -2.683594 -6 -6 -6 z m 0 3.691406 c 1.273438 0 2.308594 1.035156 2.308594 2.308594 s -1.035156 2.308594 -2.308594 2.308594 c -1.273438 -0.003906 -2.304688 -1.035156 -2.304688 -2.308594 c -0.003906 -1.273438 1.03125 -2.304688 2.304688 -2.308594 z m 0 0"
                      fill="#2e3436"
                    />
                  </svg>
                  <p className="ms-2"> ք. {value?.contact?.address?.city } </p>
                </div>

                <div className="d-flex justify-content-center align-items-center ">
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 -4 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-2"
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Icon-Set"
                        transform="translate(-412.000000, -259.000000)"
                        fill="#000000"
                      >
                        <path
                          d="M442,279 C442,279.203 441.961,279.395 441.905,279.578 L433,270 L442,263 L442,279 L442,279 Z M415.556,280.946 L424.58,271.33 L428,273.915 L431.272,271.314 L440.444,280.946 C440.301,280.979 415.699,280.979 415.556,280.946 L415.556,280.946 Z M414,279 L414,263 L423,270 L414.095,279.578 C414.039,279.395 414,279.203 414,279 L414,279 Z M441,261 L428,271 L415,261 L441,261 L441,261 Z M440,259 L416,259 C413.791,259 412,260.791 412,263 L412,279 C412,281.209 413.791,283 416,283 L440,283 C442.209,283 444,281.209 444,279 L444,263 C444,260.791 442.209,259 440,259 L440,259 Z"
                          id="mail"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <a href="mailto:someone@example.com">{value.contact?.email || 'someone@example.com'}</a>
                </div>
              </div>
            </div>

            <div className="ms-4 flex-2">
              <div className="d-flex">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <rect
                    x="6"
                    y="12"
                    width="3"
                    height="3"
                    rx="0.5"
                    fill="#000000"
                  />
                  <rect
                    x="10.5"
                    y="12"
                    width="3"
                    height="3"
                    rx="0.5"
                    fill="#000000"
                  />
                  <rect
                    x="15"
                    y="12"
                    width="3"
                    height="3"
                    rx="0.5"
                    fill="#000000"
                  />
                </svg>
                <p>{value.samplingDate }</p>
              </div>
              <div className="d-flex">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <rect
                    x="6"
                    y="12"
                    width="3"
                    height="3"
                    rx="0.5"
                    fill="#000000"
                  />
                  <rect
                    x="10.5"
                    y="12"
                    width="3"
                    height="3"
                    rx="0.5"
                    fill="#000000"
                  />
                  <rect
                    x="15"
                    y="12"
                    width="3"
                    height="3"
                    rx="0.5"
                    fill="#000000"
                  />
                </svg>
                <p>{value.resultDate || '22.01.24 15:08'}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="containerr d-flex justify-content-between mb-2">
          <BarcodeComp data={value.diagnosticsId}/>
        </section>
        <section>
          <div>
            <div className="d-flex justify-content-center align-items-center mt-2">
              <b>{value.title || 'Արյան կլինիկական հետազոտություններ'}</b>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2">
              <p>
                
                Նմուշառված է՝ {value.samplingDate || '22․01․24 10։08'}
                {/* <span className="ps-8"> Արտաքին նմուշ [] </span> */}
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p> Կենսանյութ՝ {value.biomass || 'Արյուն'}</p>
              <p style={{ fontSize: "13px" }}>
                Հետազոտությունը կատարվել է {value.device || 'Sysmex XN 550'} ավտոմատ վերլուծիչով
              </p>
            </div>
          </div>
        </section>
        <section className="containerr">
          <div>
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
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
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
            </table>
          </div>
        </section>
      </main>
      <footer style={{ marginTop: "auto" }}>
        <div>
          <p>Լիցենզիա Կ-ԲՕ-145847 տրվ. ԱՆ 24.07.2013թ</p>
        </div>
      </footer>
  </div>
  
  </>
);
});