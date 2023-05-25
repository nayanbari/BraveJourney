import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  selectedRoute: null
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action)  => {
        state.origin = action.payload
    },
    setDestination: (state, action)  => {
        state.destination = action.payload
    },
    setTravelTimeInformation: (state, action)  => {
        state.travelTimeInformation = action.payload
    },
    setSelectedRoute: (state, action) => {
        state.selectedRoute = action.payload
    }
  },
})

export const { setOrigin, setDestination, setTravelTimeInformation, setSelectedRoute } = navSlice.actions

export const selectOrigin = (state) => state.nav.origin
export const selectDestination = (state) => state.nav.destination
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation
export const selectSelectedRoute = (state) => state.nav.selectedRoute

export default navSlice.reducer