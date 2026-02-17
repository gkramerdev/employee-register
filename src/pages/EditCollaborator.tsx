import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CollaboratorStepper from "../components/collaborator/CollaboratorStepper";
import StepBasicInfo from "../components/collaborator/StepBasicInfo";
import StepProfessionalInfo from "../components/collaborator/StepProfessionalInfo";
import {
  getCollaboratorById,
  updateCollaborator,
} from "../services/collaboratorService";
import type { CollaboratorForm } from "./NewCollaborator";
import { useSnackbar } from "../hooks/useSnackbar";

const TOTAL_STEPS = 2;

export default function EditCollaborator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState<CollaboratorForm | null>(null);

  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();

  useEffect(() => {
    async function loadCollaborator() {
      if (!id) return;

      const data = await getCollaboratorById(id);

      if (!data) {
        navigate("/collaborators");
        return;
      }

      setFormData(data as CollaboratorForm);
      setInitialLoading(false);
    }

    loadCollaborator();
  }, [id, navigate]);

  function handleChange<K extends keyof CollaboratorForm>(
    field: K,
    value: CollaboratorForm[K],
  ) {
    if (!formData) return;

    setFormData({
      ...formData,
      [field]: value,
    });
  }

  function isStepValid() {
    if (!formData) return false;

    if (activeStep === 0) {
      const isValidEmail = /\S+@\S+\.\S+/.test(formData.email);
      return formData.name.trim() !== "" && isValidEmail;
    }

    if (activeStep === 1) {
      return formData.department.trim() !== "";
    }

    return false;
  }

  function handleNext() {
    if (!isStepValid()) return;
    setActiveStep((prev) => prev + 1);
  }

  function handleBack() {
    setActiveStep((prev) => prev - 1);
  }

  async function handleSave() {
    if (!id || !formData || loading) return;

    setLoading(true);

    const result = await updateCollaborator(id, formData);

    if (!result.success) {
      setLoading(false);
      showSnackbar("Erro ao atualizar colaborador.", "error"); // 👈
      return;
    }

    navigate("/collaborators", {
      state: {
        snackbar: {
          message: "Colaborador atualizado com sucesso!",
          severity: "success",
        },
      },
    });
  }

  const progress = ((activeStep + 1) / TOTAL_STEPS) * 100;

  if (initialLoading || !formData) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Editar Colaborador
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
              sx={{ backgroundColor: "#00E676" }}
              color="success"
              disabled={!isStepValid() || loading}
              onClick={activeStep === TOTAL_STEPS - 1 ? handleSave : handleNext}
            >
              {loading
                ? "Salvando..."
                : activeStep === TOTAL_STEPS - 1
                  ? "Salvar"
                  : "Próximo"}
            </Button>
          </Box>
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
  );
}
