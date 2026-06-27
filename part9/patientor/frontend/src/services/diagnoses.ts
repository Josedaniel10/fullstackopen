import api from "./api";
import type { Diagnosis } from "../types";

const getAll = async () => {
    const { data } = await api.get<Diagnosis[]>(
        "/diagnoses"
    );
    return data;
};

export default {
    getAll
}