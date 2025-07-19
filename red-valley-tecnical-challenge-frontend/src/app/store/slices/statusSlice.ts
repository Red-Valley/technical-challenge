// store/slices/statusSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StatusState = {
  selectedStatusId: string | null
}

const initialState: StatusState = {
  selectedStatusId: null
}

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setSelectedStatus: (state, action: PayloadAction<string | null>) => {
      state.selectedStatusId = action.payload
    }
  }
})

export const { setSelectedStatus } = statusSlice.actions
export default statusSlice.reducer
