import {configureStore} from '@reduxjs/toolkit'
import usersCountReducer from './features/users/usersCountSlice'
import patiensCountReducer from './features/patients/patientsCountSlice'
import researchesReducer from './features/researches/researchesSlice'
import discountValueReducer from './features/discounts/discountValueSlice'
import agentsCountReducer from './features/agents/agentsCountSlice'
import doctorCountReducer from './features/doctor/doctorCountSlice'
import equipmentCountReducer from './features/equipment/equipmentCountSlice'
import organisationCountReducer from './features/organisation/organisationCountSlice'
import reagentsCountReducer from './features/reagents/reagentsCountSlice'
import researchCountReducer from './features/researches/researchCountSlice'
export default configureStore({
    reducer:{
        agentsCount:agentsCountReducer,
        doctorCount:doctorCountReducer,
        equipmentCount:equipmentCountReducer,
        organisationCount:organisationCountReducer,
        patientsCount:patiensCountReducer,
        reagentsCount:reagentsCountReducer,
        researchCount:researchCountReducer,
        usersCount:usersCountReducer,
        researches:researchesReducer,
        discountValue:discountValueReducer
    }
})