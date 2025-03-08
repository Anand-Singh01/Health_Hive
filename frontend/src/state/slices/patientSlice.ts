import { createSlice } from "@reduxjs/toolkit";
import {
  checkPatientAuthAsync,
  loginPatientAsync,
  registerPatientAsync,
} from "../apiCommunicator/auth";

export interface IPatient {
  patientId: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  profile: IProfile;
}

export interface IProfile {
  profileId: string;
  profileName: string;
  profilePicture: string | null;
}
const initialState = {
  patientInfo: {
    patientId: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: new Date(),
    profile: {
      profileId: "",
      profileName: "",
      profilePicture: null,
    },
  } as IPatient,
  isAuthenticated: false,
  loaders: {
    loginLoader: false,
    registerLoader: false,
  },
};

type Res = {
  msg: string;
};

export type ExtendedRes<T = unknown> = Res & {
  data: T;
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkPatientAuthAsync.fulfilled, (state, action) => {
      state.patientInfo = action.payload.data;
      state.isAuthenticated = true;
    });

    builder.addCase(loginPatientAsync.fulfilled, (state, action) => {
      state.patientInfo = action.payload.data;
      state.isAuthenticated = true;
      state.loaders.loginLoader = false;
    });
    builder.addCase(loginPatientAsync.rejected, (state) => {
      state.loaders.loginLoader = false;
    });
    builder.addCase(loginPatientAsync.pending, (state) => {
      state.loaders.loginLoader = true;
    });

    builder.addCase(registerPatientAsync.fulfilled, (state, action) => {
      state.patientInfo = action.payload.data;
      state.isAuthenticated = true;
      state.loaders.registerLoader = false;
    });
    builder.addCase(registerPatientAsync.rejected, (state) => {
      state.loaders.registerLoader = false;
    });
    builder.addCase(registerPatientAsync.pending, (state) => {
      state.loaders.registerLoader = true;
    });
  },
});

export const { updateAuth } = patientSlice.actions;

export default patientSlice.reducer;
