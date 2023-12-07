import {configureStore} from '@reduxjs/toolkit'
import usersCountReducer from './features/users/usersCountSlice'
import patiensCountReducer from './features/patients/patientsCountSlice'
import researchesReducer from './features/researches/researchesSlice'
import discountValueReducer from './features/discounts/discountValueSlice'
export default configureStore({
    reducer:{
        usersCount:usersCountReducer,
        patientsCount:patiensCountReducer,
        researches:researchesReducer,
        discountValue:discountValueReducer
    }
})