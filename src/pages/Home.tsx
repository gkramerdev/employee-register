import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#6b7280",
      }}
    >
      <Typography variant="h5" fontWeight={500} gutterBottom>
        Bem-vindo ao sistema de cadastro da Flugo
      </Typography>

      <Typography variant="body1">
        Selecione uma opção no menu ao lado para começar
      </Typography>
    </Box>
  );
}
