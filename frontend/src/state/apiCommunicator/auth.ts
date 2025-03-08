import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILoginPatient, IRegisterPatient } from "../../util/interfaces";
import { ExtendedRes, IPatient } from "../slices/patientSlice";

export const checkPatientAuthAsync = createAsyncThunk<
  ExtendedRes<IPatient>,
  void,
  { rejectValue: { msg: string | null } }
>("checkPatientAuthAsync", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("patient/verify", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
    return rejectWithValue({ msg: "An unknown error occurred" });
  }
});

export const loginPatientAsync = createAsyncThunk<
  ExtendedRes<IPatient>,
  ILoginPatient,
  { rejectValue: { msg: string | null } }
>("loginPatientAsync", async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post("patient/login-patient", payload, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
    return rejectWithValue({ msg: "An unknown error occurred" });
  }
});

export const registerPatientAsync = createAsyncThunk<
  ExtendedRes<IPatient>,
  IRegisterPatient,
  { rejectValue: { msg: string | null } }
>("registerPatientAsync", async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post("patient/register-patient", payload, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
    return rejectWithValue({ msg: "An unknown error occurred" });
  }
});