import {configureStore} from '@reduxjs/toolkit'
import usersCountReduser from './features/users/usersCountSlice'
import patiensCountReduser from './features/patients/patientsCountSlice'

export default configureStore({
    reducer:{
        usersCount:usersCountReduser,
        patientsCount:patiensCountReduser
    }
})