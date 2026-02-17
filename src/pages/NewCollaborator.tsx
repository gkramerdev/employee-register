import {
  Box,
  Button,
  LinearProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CollaboratorStepper from "../components/collaborator/CollaboratorStepper";
import StepBasicInfo from "../components/collaborator/StepBasicInfo";
import StepProfessionalInfo from "../components/collaborator/StepProfessionalInfo";
import { createCollaborator } from "../services/collaboratorService";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "../hooks/useSnackbar";

export interface CollaboratorForm {
  name: string;
  email: string;
  department: string;
  status: "active" | "inactive";
}

const TOTAL_STEPS = 2;

export default function NewCollaborator() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();

  const [formData, setFormData] = useState<CollaboratorForm>({
    name: "",
    email: "",
    department: "",
    status: "active",
  });

  const handleChange = <K extends keyof CollaboratorForm>(
    field: K,
    value: CollaboratorForm[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isStepValid = () => {
    if (activeStep === 0) {
      const isValidEmail = /\S+@\S+\.\S+/.test(formData.email);
      return formData.name.trim() !== "" && isValidEmail;
    }

    if (activeStep === 1) {
      return formData.department.trim() !== "";
    }

    return false;
  };

  const handleNext = () => {
    if (!isStepValid()) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!isStepValid() || loading) return;

    setLoading(true);

    const result = await createCollaborator(formData);

    if (!result.success) {
      setLoading(false);
      showSnackbar("Erro ao criar colaborador.", "error");
      return;
    }

    navigate("/collaborators", {
      state: {
        snackbar: {
          message: "Colaborador criado com sucesso!",
          severity: "success",
        },
      },
    });
  };

  const progress = ((activeStep + 1) / TOTAL_STEPS) * 100;

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Cadastrar Colaborador
      </Typography>

      <LinearProgress variant="determinate" value={progress} sx={{ mb: 4 }} />

      <Box sx={{ display: "flex", gap: 6 }}>
        <CollaboratorStepper activeStep={activeStep} />

        <Box sx={{ flex: 1 }}>
          {activeStep === 0 && (
            <StepBasicInfo data={formData} onChange={handleChange} />
          )}

          {activeStep === 1 && (
            <StepProfessionalInfo data={formData} onChange={handleChange} />
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 6,
              alignItems: "flex-start",
            }}
          >
            <Button disabled={activeStep === 0 || loading} onClick={handleBack}>
              Voltar
            </Button>

            <Button
              variant="contained"
              color="success"
              sx={{ backgroundColor: "#00E676" }}
              disabled={!isStepValid() || loading}
              startIcon={
                loading ? <CircularProgress size={18} color="inherit" /> : null
              }
              onClick={
                activeStep === TOTAL_STEPS - 1 ? handleSubmit : handleNext
              }
            >
              {activeStep === TOTAL_STEPS - 1 ? "Salvar" : "Próximo"}
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
