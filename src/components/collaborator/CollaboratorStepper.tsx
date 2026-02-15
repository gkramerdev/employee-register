import { Box, Typography } from "@mui/material";

interface Props {
  activeStep: number;
}

const steps = ["Infos Básicas", "Infos Profissionais"];

export default function CollaboratorStepper({ activeStep }: Props) {
  return (
    <Box sx={{ minWidth: 200 }}>
      {steps.map((label, index) => (
        <Box
          key={label}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            color: activeStep === index ? "green" : "#9ca3af",
            fontWeight: activeStep === index ? 600 : 400,
          }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: activeStep === index ? "green" : "#e5e7eb",
              color: activeStep === index ? "#fff" : "#6b7280",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            {index + 1}
          </Box>

          <Typography>{label}</Typography>
        </Box>
      ))}
    </Box>
  );
}
