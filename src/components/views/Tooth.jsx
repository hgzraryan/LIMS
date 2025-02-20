import {  useMemo, useState } from 'react'

function Tooth({ position, mode, toothNumber, disabled }) {
    const [teethComponents, setTeethComponents] = useState({});

    const status=1
    const areaClicked = (area, type = "status") => {
        // if (disabled || isPatient) return;
        // dispatch({
        //   type: "SET_SELECTED_TOOTH",
        //   payload: { tooth: toothNumber, area, type },
        // });
        console.log(area)
      };
      const innerOneSide = useMemo(() => {
        return [13, 12, 11, 21, 22, 23, 43, 42, 41, 31, 32, 33].includes(toothNumber);
      }, [toothNumber]);

    //   useEffect(() => {
    //     const loadTeethComponents = async () => {
    //       const components = require.context(`@/assets/svg-vue/teeth/teeth/`, true, /\.vue/i)
    //   let arr = {}
    //   components.keys().map(x => {
    //     arr[x.split('/').pop().split('.')[0]] = components(x).default
    //   })
      
    //       setTeethComponents(arr);
    //     };
      
    //     loadTeethComponents();
    // }, []);
  return (
    
    <div 
    className={`tooth tooth-${toothNumber} tooth-position-${position} tooth-mode-${mode}`}>
    {mode === "select" && (
      <div className="checkbox sm">
        <input
          type="checkbox"
          id={`chk-tooth-${toothNumber}`}
          disabled={disabled}
          value={toothNumber}
        />
      </div>
    )}
  <div 
  //no-gutters
  >
  <div className={`${ position === 'top'?'order-0':position === 'bottom'? 'order-2':''  }`}>
        <div className="tooth-content">
          <svg x="0px" y="0px" viewBox="0 0 55 100" width="55">
            <rect fill='rgba(255, 222, 232, 0.5)'
            //"status && status.gum != 0 && statuses.gum[status.gum] ? statuses.gum[status.gum].color : 'rgba(255, 222, 232, 0.5)'"
                  className="gum"
                  onClick="areaClicked('gum')"
                  rx="5"
                  ry="5"
                  width="55" height="70">
            </rect>
            <component className="tooth-wrap"
                       //v-b-tooltip.hover
                       //title={toothStatus ? toothStatus.title : ''}
                       status="toothStatus"
                       onClick={() => areaClicked('tooth', 'status')}
                       is={teethComponents[`Tooth${toothNumber}`]}/>
          </svg>
        </div>
      </div>

   <div  className=" 12 order-1">
     <div className="tooth-name">
       { toothNumber }
     </div>
   </div>
  
    <div className={`${position === "top" ? "order-2" : "order-0"}`}>
     <div>

       <svg width="36" height="36" viewBox="0 0 36 36" className="inner-svg">

         <g className="tooth_inner" onClick={() => areaClicked("tooth_right")}>
         <path
    d={
      innerOneSide
        ? "M34.9998 17.9234C35.0052 20.2453 34.5328 22.5434 33.612 24.6748C32.6911 26.8063 31.3415 28.7256 29.6471 30.3132L22.1936 22.4994C24.8699 21.6163 26.7835 19.9036 26.7835 17.9368C26.7835 15.9699 25.1643 14.4714 22.769 13.5616L30.2092 6.04205C33.3025 9.22117 35.0229 13.4881 34.9998 17.9234Z"
        : "M35.0155 17.8872C35.0167 20.1345 34.5681 22.3594 33.6964 24.4307C32.8246 26.5021 31.5471 28.378 29.9393 29.9482L22.6099 22.3007C23.1938 21.7126 23.655 21.0144 23.9667 20.2466C24.2785 19.4788 24.4346 18.6567 24.4259 17.828C24.4173 16.9994 24.2441 16.1807 23.9164 15.4196C23.5888 14.6584 23.1131 13.9699 22.5172 13.3941L29.9393 5.85272C31.5476 7.417 32.8255 9.28814 33.6975 11.3553C34.5694 13.4225 35.0176 15.6436 35.0155 17.8872Z"
    }
    fill={
    //   status && status.tooth_right > 0 && statuses.tooth_circle[status.tooth_right]
    //     ? statuses.tooth_circle[status.tooth_right].color
    //     : 
        "white"
    }
    stroke="#ADAFB8"
    strokeMiterlimit="10"
  />
         </g>
          <g className="tooth_inner" onClick={() => areaClicked('tooth_bottom')}>
           <path d={innerOneSide 
           ? 'M29.6333 30.3131C26.4815 33.2873 22.3117 34.9441 17.9779 34.9441C13.6441 34.9441 9.47434 33.2873 6.32257 30.3131L13.7493 22.4859C15.1159 22.9226 16.5433 23.1394 17.9779 23.1281C19.3982 23.136 20.8111 22.9238 22.1664 22.4993V22.4993L29.6333 30.3131Z' 
           : 'M29.9035 29.999C26.7516 33.0777 22.5203 34.8013 18.1143 34.8013C13.7082 34.8013 9.47698 33.0777 6.32501 29.999L13.6411 22.3383C14.2244 22.9306 14.9197 23.4009 15.6865 23.722C16.4533 24.043 17.2763 24.2084 18.1076 24.2084C18.939 24.2084 19.762 24.043 20.5288 23.722C21.2956 23.4009 21.9909 22.9306 22.5742 22.3383L29.9035 29.999Z'}
            fill='white'
            //"status && status.tooth_bottom > 0 && statuses.tooth_circle[status.tooth_bottom] ? statuses.tooth_circle[status.tooth_bottom].color : 'white'"
                 stroke="#ADAFB8" 
                 //stroke-miterlimit="10"
                 />
         </g>
          <g className="tooth_inner" onClick={() => areaClicked('tooth_left')}>
            <path d={innerOneSide ? 'M13.7495 22.486L6.32275 30.3132C4.68078 28.763 3.36455 26.9009 2.45111 24.8358C1.53767 22.7707 1.04536 20.5442 1.00299 18.2866C0.960622 16.029 1.36905 13.7856 2.20437 11.6877C3.03969 9.58981 4.28512 7.6796 5.86778 6.06885L13.3213 13.5482C10.8725 14.4714 9.23993 16.0904 9.23993 17.9368C9.23993 19.7833 11.0331 21.6029 13.7495 22.486Z' 
            : 'M11.8094 17.9137C11.8033 19.5549 12.4465 21.1319 13.5987 22.3007L6.28258 29.9216C4.68523 28.3535 3.41643 26.4828 2.55028 24.4188C1.68414 22.3548 1.23804 20.1388 1.23804 17.9004C1.23804 15.662 1.68414 13.4461 2.55028 11.382C3.41643 9.31801 4.68523 7.4473 6.28258 5.87921L13.7312 13.3809C13.1197 13.9662 12.6339 14.67 12.3035 15.4493C11.9731 16.2287 11.805 17.0672 11.8094 17.9137Z'}
                  fill='white'
                  //"status && status.tooth_left > 0 && statuses.tooth_circle[status.tooth_left] ? statuses.tooth_circle[status.tooth_left].color : 'white'"
                  stroke="#ADAFB8" 
                  //stroke-miterlimit="10"
                  />
          </g>
          <g className="tooth_inner" onClick={() => areaClicked('tooth_top')}>
            <path d={innerOneSide 
            ? 'M30.142 6.0421L22.7018 13.5616C21.1892 13.0075 19.589 12.731 17.9781 12.7454C16.373 12.7335 14.7783 13.0052 13.2678 13.5482L5.8678 6.06887C5.9411 5.97777 6.02165 5.89275 6.10867 5.81465V5.81465C9.28664 2.69311 13.5634 0.944092 18.0183 0.944092C22.4732 0.944092 26.7499 2.69311 29.9279 5.81465L30.142 6.0421Z' 
            : 'M29.9567 5.78489L22.4815 13.3263C21.3122 12.1943 19.7485 11.5614 18.121 11.5614C16.4935 11.5614 14.9298 12.1943 13.7605 13.3263L6.31189 5.82465C9.45952 2.73254 13.6954 1 18.1078 1C22.5201 1 26.756 2.73254 29.9037 5.82465L29.9567 5.78489Z'}
                  fill='white'
                  //"status && status.tooth_top > 0 && statuses.tooth_circle[status.tooth_top] ? statuses.tooth_circle[status.tooth_top].color : 'white'"
                  stroke="#ADAFB8" 
                  //stroke-miterlimit="10"
                  />
          </g>
          {
!innerOneSide &&
              <g className="tooth_inner" onClick={() => areaClicked('tooth_inner_left')}>
            <path d="M18.2785 11.638V24.1628C17.4319 24.2018 16.5862 24.0687 15.7924 23.7715C14.9987 23.4744 14.2735 23.0194 13.6606 22.434C13.0476 21.8487 12.5598 21.1451 12.2265 20.3659C11.8932 19.5867 11.7213 18.7479 11.7213 17.9004C11.7213 17.0529 11.8932 16.2141 12.2265 15.4349C12.5598 14.6557 13.0476 13.9521 13.6606 13.3668C14.2735 12.7814 14.9987 12.3264 15.7924 12.0293C16.5862 11.7321 17.4319 11.599 18.2785 11.638Z"
                  fill='white'
                  //"status && status.tooth_inner_left > 0 && statuses.tooth_circle[status.tooth_inner_left] ? statuses.tooth_circle[status.tooth_inner_left].color : 'white'"
                  stroke="#ADAFB8" //stroke-miterlimit="10"
                  />
          </g>
                }
                {
                    !innerOneSide &&
                    <g className="tooth_inner"onClick={() => areaClicked('tooth_inner_right')} >
            <path d="M24.5475 17.9004C24.5475 19.5631 23.887 21.1577 22.7113 22.3333C21.5357 23.509 19.9411 24.1695 18.2784 24.1695V11.6447C19.9388 11.6446 21.5314 12.3033 22.7066 13.4761C23.8819 14.6489 24.544 16.2401 24.5475 17.9004Z"
                  fill='white'
                  //"status && status.tooth_inner_right > 0 && statuses.tooth_circle[status.tooth_inner_right] ? statuses.tooth_circle[status.tooth_inner_right].color : 'white'"
                  stroke="#ADAFB8"
                   //stroke-miterlimit="10"
                   />
          </g>
                }
                {
                    innerOneSide &&
                    <g className="tooth_inner" onClick={() => areaClicked('tooth_inner')} >
            <path d="M26.7701 17.9367C26.7701 19.9035 24.9101 21.6162 22.1803 22.4992C20.825 22.9238 19.4121 23.1359 17.9918 23.1281C16.5572 23.1393 15.1299 22.9226 13.7633 22.4859C11.0869 21.6028 9.20013 19.9035 9.20013 17.9367C9.20013 15.9698 10.8327 14.4713 13.2815 13.5481C14.7921 13.0051 16.3867 12.7333 17.9918 12.7453C19.6027 12.7308 21.2029 13.0073 22.7155 13.5615C25.151 14.4713 26.7701 16.0903 26.7701 17.9367Z"
                  fill='white'
                  //"status && status.tooth_inner > 0 && statuses.tooth_circle[status.tooth_inner] ? statuses.tooth_circle[status.tooth_inner].color : 'white'"
                  stroke="#ADAFB8" 
                  //stroke-miterlimit="10"
                  />
          </g> 
                }
       </svg>

     </div>
   </div> 

 </div>
</div>
  )
}

export default Tooth
