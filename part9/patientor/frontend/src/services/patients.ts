import api from "./api";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";
import axios from "axios";

const getAll = async () => {
  const { data } = await api.get<Patient[]>(
    `/patients`
  );

  return data;
};

const getOne = async (id: string) => {
  const { data } = await api.get<Patient>(
    `/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await api.post<Patient>(
    `/patients`,
    object
  );

  return data;
};

const createEntry = async (object: EntryWithoutId, patientId: string) => {
  try {
    const { data } = await api.post<Entry>(
      `/patients/${patientId}/entries`,
      object
    );
    return data;
  } catch (error) {
    if(axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
  }
};

export default {
  getAll, create, getOne, createEntry
};

