// store/slices/patientsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PatientsState = {
  selectedPatientId: string | null
}

const initialState: PatientsState = {
  selectedPatientId: null
}

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setSelectedPatient: (state, action: PayloadAction<string | null>) => {
      state.selectedPatientId = action.payload
    }
  }
})

export const { setSelectedPatient } = patientsSlice.actions
export default patientsSlice.reducer
