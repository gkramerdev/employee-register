import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CollaboratorStepper from "../components/collaborator/CollaboratorStepper";
import StepBasicInfo from "../components/collaborator/StepBasicInfo";
import StepProfessionalInfo from "../components/collaborator/StepProfessionalInfo";
import { createCollaborator } from "../services/collaboratorService";

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
      return;
    }

    navigate("/collaborators");
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
            }}
          >
            <Button disabled={activeStep === 0 || loading} onClick={handleBack}>
              Voltar
            </Button>

            <Button
              variant="contained"
              color="success"
              disabled={!isStepValid() || loading}
              onClick={
                activeStep === TOTAL_STEPS - 1 ? handleSubmit : handleNext
              }
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
    </Box>
  );
}
