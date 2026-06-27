import {
  NewPatientEntry,
  Gender,
  Entry,
  EntryWithoutId,
  DiagnoseEntry,
  HealthCheckRating,
} from "./src/types";

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateofBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing dateofBirth: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const entries =
      "entries" in object ? (object.entries as Entry[]) : undefined;

    const patientEntry = entries
      ? {
          name: parseName(object.name),
          dateOfBirth: parseDateofBirth(object.dateOfBirth),
          ssn: parseSsn(object.ssn),
          gender: parseGender(object.gender),
          occupation: parseOccupation(object.occupation),
          entries,
        }
      : {
          name: parseName(object.name),
          dateOfBirth: parseDateofBirth(object.dateOfBirth),
          ssn: parseSsn(object.ssn),
          gender: parseGender(object.gender),
          occupation: parseOccupation(object.occupation),
          entries: [],
        };

    return patientEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry["code"]>;
  }

  return object.diagnosisCodes as Array<DiagnoseEntry["code"]>;
};

const parseDescription = (descp: unknown): string => {
  if (!isString(descp) || !descp.trim()) {
    throw new Error("Incorrect or missing description");
  }
  return descp;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSpecialist = (spe: unknown): string => {
  if (!isString(spe) || !spe.trim()) {
    throw new Error("Incorrect or missing specialist");
  }
  return spe;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((g) => Number(g))
    .includes(param);
};

const parseHealthCheckRating = (hcr: unknown): HealthCheckRating => {
  if (
    hcr === undefined ||
    hcr === null ||
    isNaN(Number(hcr)) ||
    !isHealthCheckRating(Number(hcr))
  ) {
    throw new Error("Incorrect or missing health check rating: " + hcr);
  }
  return Number(hcr);
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }
  return employerName;
};

const parseSickLeave = (
  sickLeave: unknown,
): { startDate: string; endDate: string } => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect sickLeave");
  }
  if (!("startDate" in sickLeave) || !("endDate" in sickLeave)) {
    throw new Error("Missing startDate or endDate in sickLeave");
  }
  if (!isString(sickLeave.startDate) || !isDate(sickLeave.startDate)) {
    throw new Error(
      "Incorrect or missing startDate in sickLeave: " + sickLeave.startDate,
    );
  }
  if (!isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
    throw new Error(
      "Incorrect or missing endDate in sickLeave: " + sickLeave.endDate,
    );
  }
  return {
    startDate: sickLeave.startDate,
    endDate: sickLeave.endDate,
  };
};

const parseDischarge = (
  discharge: unknown,
): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect discharge");
  }
  if (!("date" in discharge) || !("criteria" in discharge)) {
    throw new Error("Missing date or criteria in discharge");
  }
  if (!isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error(
      "Incorrect or missing date in discharge: " + discharge.date,
    );
  }
  if (!isString(discharge.criteria)) {
    throw new Error("Incorrect or missing criteria in discharge");
  }
  return {
    date: discharge.date,
    criteria: discharge.criteria,
  };
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const diagnosisCodes =
      "diagnosisCodes" in object ? parseDiagnosisCodes(object) : undefined;

    const baseEntry = diagnosisCodes
      ? {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes,
        }
      : {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
        };

    switch (object.type) {
      case "HealthCheck":
        if (!("healthCheckRating" in object)) {
          throw new Error("Missing healthCheckRating");
        }
        return {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
      case "OccupationalHealthcare": {
        if (!("employerName" in object)) {
          throw new Error("Missing employerName");
        }
        const employerName = parseEmployerName(object.employerName);
        const sickLeave =
          "sickLeave" in object && object.sickLeave
            ? parseSickLeave(object.sickLeave)
            : undefined;
        return sickLeave
          ? {
              ...baseEntry,
              type: "OccupationalHealthcare",
              employerName,
              sickLeave,
            }
          : {
              ...baseEntry,
              type: "OccupationalHealthcare",
              employerName,
            };
      }
      case "Hospital":
        if (!("discharge" in object)) {
          throw new Error("Missing discharge");
        }
        return {
          ...baseEntry,
          type: "Hospital",
          discharge: parseDischarge(object.discharge),
        };
      default:
        throw new Error(
          "Incorrect or missing entry type: " + String(object.type),
        );
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};
