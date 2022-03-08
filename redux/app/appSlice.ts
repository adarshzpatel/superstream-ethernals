import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface AppState {
  currentAccount: string
  loading:boolean
  isLive:boolean
  error:string
}

// Define the initial state using that type
const initialState: AppState = {
  currentAccount:'',
  loading:false,
  isLive:false,
  error:''
}

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    walletConnected:(state,action:PayloadAction<string>) => {
      state.currentAccount = action.payload;
    },
    walletDisconneted:(state)=>{
      state.currentAccount = ''
    },
    setLoading:(state,action:PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError:(state,action:PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
})

export const { walletConnected,walletDisconneted,setLoading,setError } = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
export const selectCurrentAccount = (state:RootState) => state.app.currentAccount;
export const selectLoadingState = (state:RootState) => state.app.loading;
export const selectError = (state:RootState) => state.app.error;

export default appSlice.reducer;