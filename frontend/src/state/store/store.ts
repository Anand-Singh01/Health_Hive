import { configureStore } from "@reduxjs/toolkit";
import patientSlice from "../slices/patientSlice";
const store = configureStore({
  reducer: {
    patientSlice: patientSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;