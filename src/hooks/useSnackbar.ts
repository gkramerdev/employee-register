import { useState } from "react";

type Severity = "success" | "error" | "warning" | "info";

export function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<Severity>("success");

  function showSnackbar(msg: string, sev: Severity = "success") {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return {
    open,
    message,
    severity,
    showSnackbar,
    handleClose,
  };
}
