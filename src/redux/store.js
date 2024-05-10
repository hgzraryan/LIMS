import {configureStore} from '@reduxjs/toolkit'
import usersCountReducer from './features/users/usersCountSlice'
import userLoginDataReducer from './features/users/userLoginDataSlice'
import patiensCountReducer from './features/patients/patientsCountSlice'
import researchesReducer from './features/researches/researchesSlice'
import discountValueReducer from './features/discounts/discountValueSlice'
import agentsCountReducer from './features/agents/agentsCountSlice'
import doctorCountReducer from './features/doctor/doctorCountSlice'
import refDoctorsCountReducer from './features/refDoctors/refDoctorsCountSlice'
import equipmentCountReducer from './features/equipment/equipmentCountSlice'
import organisationCountReducer from './features/organisation/organisationCountSlice'
import reagentsCountReducer from './features/reagents/reagentsCountSlice'
import diagnosticsCountReducer from './features/diagnostics/diagnosticsCountSlice'
import researchListCountReducer from './features/researches/researchListCountSlice'
import doctorsReducer from './features/doctor/doctorsSlice'
import refDoctorsReducer from './features/refDoctors/refDoctorsSlice'
import medicalServicesCountReducer from './features/medicalServices/medicalServicesSlice'
import DoctorsVisitCountReducer from './features/DoctorsVisit/DoctorsVisitSlice'
export default configureStore({
    reducer:{
        agentsCount:agentsCountReducer,
        doctorCount:doctorCountReducer,
        equipmentCount:equipmentCountReducer,
        organisationCount:organisationCountReducer,
        patientsCount:patiensCountReducer,
        reagentsCount:reagentsCountReducer,
        usersCount:usersCountReducer,
        userLoginData:userLoginDataReducer,
        diagnosticsCount:diagnosticsCountReducer,
        researches:researchesReducer,
        discountValue:discountValueReducer,
        researchListCount:researchListCountReducer,
        medicalServicesCount:medicalServicesCountReducer,
        DoctorsVisitCount:DoctorsVisitCountReducer,
        doctors:doctorsReducer,
        refDoctors:refDoctorsReducer,
        refDoctorsCount:refDoctorsCountReducer,
    }
})