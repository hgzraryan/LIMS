import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React from 'react'
import researches  from '../../dist/svg/researches.svg'
import radiologyServices  from '../../dist/svg/radiologyServices.svg'
import settings  from '../../dist/svg/settings.svg'
import discount  from '../../dist/svg/discount.svg'
import info  from '../../dist/svg/info.svg'
import equipments  from '../../dist/svg/equipments.svg'
import reagent  from '../../dist/svg/reagent.svg'
import notifications  from '../../dist/svg/notifications.svg'
import medicalServices  from '../../dist/svg/medicalServices.svg'
import Packages  from '../../dist/svg/packages.svg'
import tube  from '../../dist/svg/tube.svg'
import { useNavigate } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const setupData = [
    {
        name:'Կարգավորումներ',
        icon:settings,
        pathname:''

    },
    {
        name:'Զեղչի քարտեր',
        icon:discount,
        pathname:'setup/discountCards'
    },
    {
        name:'Ծանուցումներ',
        icon:notifications,
        pathname:'setup/notifications/page/1'

    },
    {
        name:'Հետազոտություններ',
        icon:researches,
        pathname:'setup/researchlists/page/1'
    },
    {
        name:'Բուժծառայություններ',
        icon:medicalServices,
        pathname:'setup/medicalServices/page/1'
    },
    {
        name:'Ռադիոլոգիական ծառայություններ',
        icon:radiologyServices,
        pathname:'setup/radiologyServices/page/1'
    },
    {
        name:'Սրվակներ',
        icon:tube,
        pathname:''
    },
    {
        name:'Ռեագենտներ',
        icon:reagent,
        pathname:'setup/reagents/page/1'
    },
    {
        name:'Սարքավորումներ',
        icon:equipments,
        pathname:'setup/equipments/page/1'
    },
    {
        name:'Լաբորատորիայի մասին',
        icon:info,
        pathname:''
    },
    {
        name:'Փաթեթներ',
        icon:Packages,
        pathname:'setup/packages/page/1'
    },
]
function Setup() {
    const navigate = useNavigate();

    const handleSetupPathClick = async (data) => {
        navigate(`/${data}`);
      };
  return (
    <HelmetProvider>
    <div>
      <div>
     <Helmet>
    <meta charSet="utf-8" />
    <title>Vteam LIMS | Setup</title>
    <link rel="icon" type="image/x-icon" href="../dist/img/favicon.ico"></link>
    </Helmet>
      </div>
    <div className="contactapp-wrap" style={{height:'100%'}}>
    <div className="contactapp-content">
      <div className="contactapp-detail-wrap w-100  ">
        <header className="contact-header">
          <div className="d-flex align-items-center justify-content-center w-100">
           
                <h1 style={{fontStyle:'italic', color:'#4eafcb'}}>Կարգաբերումներ</h1>
          
          </div>
          <div className="contact-options-wrap">
            <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret d-sm-inline-block d-none"
              href="#"
              data-bs-toggle="tooltip"
              data-placement="top"
             // onClick={refreshPage}
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
        <div className=" w-100 d-flex justify-content-center mt-2" >
        <div className="d-flex justify-content-center "style={{maxWidth:'1200px',flexWrap:'wrap', gap:'30px'}}>
    {setupData.map((el,id)=>{
            return(

                <div key ={id} style={{border:'1px solid #4eafcb', display:'flex',alignItems:'center',padding:'20px',borderRadius:'10px',minWidth:'350px'}}>
                    <div className="avatar avatar-icon avatar-soft-info avatar-sm me-2">
                 <span className="initial-wrap">
                   <img src={el.icon} alt='setupItem' width={'25px'} height={'25px'}/>
                 </span>
               </div>
                 <div className="d-flex justify-content-center align-items-center h-100">
                 <p
                   style={{ cursor: "pointer", fontSize:'1.2rem',fontStyle:'italic' }}
                   onClick={(e) => handleSetupPathClick(el?.pathname)}
                   >
                   {el.name}
                 </p>
               </div>
                </div>
)
    })}
    </div>
        </div>
      </div>
    </div>
  </div>
  </div>
    </HelmetProvider>   
  )
}

export default Setup
