// store/slices/providersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProvidersState = {
  selectedProviderId: string | null
}

const initialState: ProvidersState = {
  selectedProviderId: null
}

const providersSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    setSelectedProvider: (state, action: PayloadAction<string | null>) => {
      state.selectedProviderId = action.payload
    }
  }
})

export const { setSelectedProvider } = providersSlice.actions
export default providersSlice.reducer
