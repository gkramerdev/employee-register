import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { Container, Box, Paper, Snackbar } from "@mui/material";
import { signIn } from "../services/auth";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: { email: string; password: string }) => {
    setIsLoading(true);

    const result = await signIn(values.email, values.password);
    if (result.success) {
      navigate("/dashboard");
      return;
    }

    if (result.error === "USER_DISABLED") {
      setError("Usuário desativado. Entre em contato com o administrador.");
    }

    if (result.error === "INVALID_CREDENTIALS") {
      setError("Credenciais inválidas. Verifique seu email e senha.");
    }

    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
          }}
        >
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </Paper>
      </Container>

      <Snackbar
        open={!!error}
        message={error}
        autoHideDuration={3000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
