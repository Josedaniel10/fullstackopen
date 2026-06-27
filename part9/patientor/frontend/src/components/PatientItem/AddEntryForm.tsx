import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  FormLabel,
} from "@mui/material";
import patientService from "../../services/patients";
import { Entry, EntryWithoutId, Patient } from "../../types";
import AlertError from "../AlertError";

interface AddEntryFormProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const DIAGNOSIS_OPTIONS = [
  "M24.2",
  "M51.2",
  "S03.5",
  "J10.1",
  "J06.9",
  "Z57.1",
  "N30.0",
  "H54.7",
  "J03.0",
  "L60.1",
  "Z74.3",
  "L20",
  "F43.2",
  "S62.5",
  "H35.29",
];

const AddEntryForm = ({
  isOpen,
  onClose,
  patientId,
  setPatient,
}: AddEntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [isOpenAlert, setIsopenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [typeEntry, setTypeEntry] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const onCloseAlert = () => {
    setIsopenAlert(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    let newEntry: EntryWithoutId;

    switch (typeEntry) {
      case "HealthCheck":
        newEntry = {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating,
        };
        break;

      case "OccupationalHealthcare":
        newEntry = {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName,
          ...(sickLeaveStart && sickLeaveEnd
            ? {
                sickLeave: {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                },
              }
            : {}),
        };
        break;

      case "Hospital":
        newEntry = {
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;

      default:
        throw new Error(`Invalid entry type: ${typeEntry}`);
    }

    try {
      const entry = (await patientService.createEntry(
        newEntry,
        patientId,
      )) as Entry;
      setPatient((patient) => {
        if (!patient) return patient;
        return {
          ...patient,
          entries: [...(patient.entries || []), entry],
        };
      });
    } catch (error) {
      if (error instanceof Error) {
        setIsopenAlert(true);
        setMessageAlert(error.message);
      }
      return;
    }

    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthCheckRating(0);
    setTypeEntry("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
    setDischargeDate("");
    setDischargeCriteria("");
    onClose();
  };

  const handleDiagnosisChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <AlertError
        isOpen={isOpenAlert}
        message={messageAlert}
        onClose={onCloseAlert}
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          mx: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Add New Entry
        </Typography>

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <TextField
          label="Date"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <TextField
          label="Specialist"
          variant="outlined"
          fullWidth
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          required
        />

        <TextField
          select
          label="Diagnosis Codes"
          variant="outlined"
          fullWidth
          value={diagnosisCodes}
          onChange={handleDiagnosisChange}
          SelectProps={{
            multiple: true,
          }}
        >
          {DIAGNOSIS_OPTIONS.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Type entry"
          value={typeEntry}
          onChange={(ev) => setTypeEntry(ev.target.value)}
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </TextField>

        {typeEntry === "HealthCheck" ? (
          <TextField
            fullWidth
            label="Health Check Rating (0-3)"
            type="number"
            value={healthCheckRating}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 0 && val <= 3) setHealthCheckRating(val);
            }}
            margin="normal"
            slotProps={{
              htmlInput: { min: 0, max: 3 },
            }}
            required
          />
        ) : null}

        {typeEntry === "OccupationalHealthcare" ? (
          <div>
            <TextField
              label="EmployerName"
              variant="outlined"
              fullWidth
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              required
            />

            <Box sx={{ mt: 3, width: "100%" }}>
              {" "}
              <FormControl component="fieldset" fullWidth>
                <FormLabel
                  component="legend"
                  sx={{ mb: 2, fontWeight: "medium" }}
                >
                  SickLeave
                </FormLabel>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  <TextField
                    label="Start"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={sickLeaveStart}
                    onChange={(e) => setSickLeaveStart(e.target.value)}
                  />

                  <TextField
                    label="End"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={sickLeaveEnd}
                    onChange={(e) => setSickLeaveEnd(e.target.value)}
                  />
                </Box>
              </FormControl>
            </Box>
          </div>
        ) : null}

        {typeEntry === "Hospital" ? (
          <Box sx={{ mt: 2, width: "100%" }}>
            {" "}
            <FormControl component="fieldset" fullWidth>
              <FormLabel
                component="legend"
                sx={{ mb: 2, fontWeight: "medium" }}
              >
                Discharge
              </FormLabel>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                  label="Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  value={dischargeDate}
                  onChange={(e) => setDischargeDate(e.target.value)}
                />

                <TextField
                  label="Criteria"
                  variant="outlined"
                  fullWidth
                  value={dischargeCriteria}
                  onChange={(e) => setDischargeCriteria(e.target.value)}
                  required
                />
              </Box>
            </FormControl>
          </Box>
        ) : null}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          Save Entry
        </Button>
      </Box>
    </div>
  );
};

export default AddEntryForm;
