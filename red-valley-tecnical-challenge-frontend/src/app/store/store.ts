import { configureStore } from '@reduxjs/toolkit'
import patientsReducer from './slices/patientsSlice'
import providersReducer from './slices/providersSlice'
import statusesReducer from './slices/statusSlice'


export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    providers: providersReducer,
    statuses: statusesReducer

  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
