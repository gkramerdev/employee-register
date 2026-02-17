import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { LoginForm } from "../components/LoginForm";
import { signIn } from "../services/auth";
import logo from "../assets/logo.png"; // sua logo
import logoIcon from "../assets/logo_icon.png"; // imagem direita

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    setIsLoading(true);

    const result = await signIn(values.email, values.password);

    if (result.success) {
      navigate("/");
      return;
    }

    if (result.error === "USER_DISABLED") {
      setError("Usuário desativado.");
    }

    if (result.error === "INVALID_CREDENTIALS") {
      setError("Credenciais inválidas.");
    }

    setIsLoading(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", backgroundColor: "#fff" }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 6,
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ mb: 5 }}>
            <img src={logo} alt="Logo" style={{ height: 40 }} />
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 5,
              border: "1px solid #f1f1f1",
            }}
          >
            <Typography variant="h5" fontWeight="600" mb={1}>
              Login
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Insira seu e-mail abaixo
            </Typography>

            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          </Paper>
        </Container>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          px: 8,
        }}
      >
        <img
          src={logoIcon}
          alt="Logo Icon"
          style={{ maxWidth: "40%", marginBottom: 32 }}
        />

        <Typography variant="h5" fontWeight={500} sx={{ lineHeight: 1.4 }}>
          Sua plataforma de gestão
          <br />
          <Box component="span" sx={{ color: "#00E676", fontWeight: 600 }}>
            de colaboradores.
          </Box>
        </Typography>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
