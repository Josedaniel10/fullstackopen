import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Diagnosis, Entry, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { assertNever } from "../../utils";
import { Button } from "@mui/material";
import AddEntryForm from "./AddEntryForm";

const PatientItem = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [openEntryForm, setOpenEntryForm] = useState(false);
  const id = useParams().id as string;

  useEffect(() => {
    const getPatientAndDiagnoses = async () => {
      const [patient, diagnoses] = await Promise.all([
        patientService.getOne(id),
        diagnosesService.getAll(),
      ]);

      return [patient, diagnoses];
    };

    getPatientAndDiagnoses().then(([patient, diagnoses]) => {
      setPatient(patient as Patient);
      setDiagnoses(diagnoses as Diagnosis[]);
    });
  }, []);

  return (
    <>
      <Typography gutterBottom variant="h4" component="div">
        {patient?.name}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Gender: {patient?.gender}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        SSN: {patient?.ssn}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Occupation: {patient?.occupation}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Gender: {patient?.gender}
      </Typography>
      <Box m={4} />
      <AddEntryForm
        isOpen={openEntryForm}
        onClose={() => setOpenEntryForm(false)}
        patientId={id}
        setPatient={setPatient}
      />
      <Button
        onClick={() => setOpenEntryForm((value) => !value)}
        variant="contained"
      >
        {openEntryForm ? "cancel" : "New entry"}
      </Button>
      <Box m={4} />
      <Typography gutterBottom variant="h5" component="div">
        Entries
      </Typography>
      <Box m={2} />
      <EntriesList entries={patient?.entries || []} diagnoses={diagnoses} />
    </>
  );
};

interface EntriesListProps {
  entries: Entry[];
  diagnoses: Diagnosis[] | null;
}

const EntriesList = ({ entries, diagnoses }: EntriesListProps) => {
  if (entries.length < 1) return <div>There are no patient entries yet</div>;
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
        gap: 2,
      }}
    >
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </Box>
  );
};

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[] | null;
}

const Entry = ({ entry, diagnoses }: EntryProps) => {
  const iconOfEntry = {
    HealthCheck: <MedicalServicesIcon />,
    OccupationalHealthcare: <WorkIcon />,
    Hospital: <LocalHospitalIcon />,
  };

  const diagnosisForCode = (code: string) => {
    return diagnoses?.find((diagnosis) => diagnosis.code === code);
  };

  let returnedEntry: JSX.Element | null = null;

  switch (entry.type) {
    case "HealthCheck":
      returnedEntry = <p>Rating: {entry.healthCheckRating}</p>;
      break;
    case "OccupationalHealthcare":
      returnedEntry = (
        <>
          <p>Employer name: {entry.employerName}</p>
          {entry.sickLeave &&
          entry.sickLeave.startDate &&
          entry.sickLeave.endDate ? (
            <p>
              Sick Leave: {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </p>
          ) : null}
        </>
      );
      break;
    case "Hospital":
      returnedEntry = (
        <p>
          Medical discharge: {entry?.discharge?.date}{" "}
          {entry?.discharge?.criteria}
        </p>
      );
      break;
    default:
      return assertNever(entry);
      break;
  }

  return (
    <Card>
      <CardContent>
        <p>
          {entry.date} {iconOfEntry[entry.type]}
        </p>
        <p>{entry.description}</p>
        {entry.diagnosisCodes && entry?.diagnosisCodes.length > 0 ? (
          <List sx={{ width: "100%" }}>
            {entry.diagnosisCodes?.map((diagnosis) => (
              <ListItem key={diagnosis}>
                <ListItemAvatar>
                  <Avatar>
                    <LabelImportantIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${diagnosis} - ${diagnosisForCode(diagnosis)?.name}`}
                />
              </ListItem>
            ))}
          </List>
        ) : null}
        {returnedEntry}
        <p>diagnose by {entry.specialist}</p>
      </CardContent>
    </Card>
  );
};

export default PatientItem;
