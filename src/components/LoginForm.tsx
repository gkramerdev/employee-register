import { Alert, Box, Button, TextField, CircularProgress } from "@mui/material";
import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!values.email || !values.password) {
      setError("Email e senha são obrigatórios");
      return;
    }

    setError(null);
    onSubmit(values);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      <TextField
        label="Email"
        name="email"
        type="email"
        size="small"
        value={values.email}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Senha"
        name="password"
        type="password"
        size="small"
        value={values.password}
        onChange={handleChange}
        fullWidth
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          backgroundColor: "#00E676",
          color: "#ffffff",
          fontWeight: 600,
          textTransform: "none",
          height: 48,
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "#00C853",
          },
        }}
      >
        {isLoading ? (
          <CircularProgress size={22} sx={{ color: "#ffffff" }} />
        ) : (
          "Entrar"
        )}
      </Button>
    </Box>
  );
}
