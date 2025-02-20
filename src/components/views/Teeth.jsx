import AdultTeeth from './AdultTeeth'
import '../../dist/css/tooth.scss';
const views = [
    { id: 'AdultTeeth', title: 'permanent_teeth' },
    { id: 'BabyTeeth', title: 'baby_teeth' },
    { id: 'Jaws', title: 'jaws' },
  ]
const additionalSelectZones= [
    { id: "В", title: "top_jaw" },
    { id: "Н", title: "bottom_jaw" },
    { id: "Р", title: "oral_cavity" },
  ]
function Teeth() {
  return (
    <div className="formula-wrapper">
    <div className="text-center" 
    //v-if="!imageMaking"
    >
    {
            views.map((v)=>(
                <a href = "#" key={`view-toggler-${v.id}`}
                className={"teeth-toggler pointer"}>
               {v.title}
             </a>
            ))
        }
     
    </div>
    <div className="mt-5 text-center" >
      <div 
      //v-if="mode == 'select'" 
      className="mb-4">
        {additionalSelectZones?.map((z)=>(
            <div className="d-inline-block align-middle" key={`zone-${z.id}`}>
          <div className="checkbox sm form-group">
            <input type="checkbox"
                   
                   checked="recordTeeth.includes(z.id)"
                   id={`zone-${z.id}`}
                   value={z.id}/>
            <label >
              {z.title}
            </label>
          </div>
        </div>
        ))}
        
      </div>
      {/* <component :is="view"
                 :disabled="disabled"
                 id="patientFormulaSelectedView"
                 :mode="mode"/> */}
    </div>
    <AdultTeeth/>
    {/* <ToothStatusModal v-if="statuses"/> */}
  </div>
  )
}

export default Teeth
