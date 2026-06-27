import { Alert, AlertTitle } from "@mui/material";

interface AlertProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const AlertError = ({
  isOpen,
  message,
  onClose,
}: AlertProps): JSX.Element | null => {
  if (!isOpen) {
    return null;
  } else {
    setTimeout(() => {
      onClose();
    }, 3000);
  }

  return (
    <Alert
      severity="error"
      variant="filled"
      onClose={onClose}
      sx={{ width: "100%" }}
    >
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};
export default AlertError;
