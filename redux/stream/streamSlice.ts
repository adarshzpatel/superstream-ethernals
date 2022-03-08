import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface StreamState {
  playbackId:string
  streamIsActive:boolean
  streamKey:string
}

// Define the initial state using that type
const initialState: StreamState = {
  playbackId:'',
  streamIsActive:false,
  streamKey:'',
}

export const streamSlice = createSlice({
  name: 'stream',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateStream : (state,action) => {
      state.playbackId = action.payload.playbackId;
      state.streamIsActive = action.payload.streamIsActive;
      state.streamKey = action.payload.streamKey;
    }
  },
})

export const {updateStream } = streamSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
export const selectStreamState = (state:RootState) => state.stream;

export default streamSlice.reducer;