import diagnosesData from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getDiagnoses = (): DiagnoseEntry[] => {
    return diagnosesData;
};

export default { getDiagnoses };