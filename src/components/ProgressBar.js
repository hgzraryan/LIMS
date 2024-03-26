import React, { useState } from 'react'
function ProgressBar({progress}) {
    //const [progress,setProgress] = useState(56)
    const getColor = () =>{
        if(progress<100){
            return'rgb(255, 98, 28,.7)'
        }else if(progress === 100){
            return "rgb(126, 224, 152,.7)"
        }
    }
  return (
    <div className='progress-bar-container'>
    <div className='progress-bar'>
          <div className='progress-bar-fill d-flex justify-content-center align-items-center' 
          style={{
              width:`${progress}%`,
              backgroundColor:getColor()}}></div>
             <p>
               {progress}%                
              </p>
    </div>
  </div>
  )
}

export default ProgressBar
