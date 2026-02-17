import { Stepper, Step, StepLabel, Box } from "@mui/material";

interface Props {
  activeStep: number;
}

const steps = ["Infos Básicas", "Infos Profissionais"];

export default function CollaboratorStepper({ activeStep }: Props) {
  return (
    <Box sx={{ pt: 1 }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          "& .MuiStepLabel-label": {
            fontSize: 14,
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
