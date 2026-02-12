import { Alert, Box, Button, TextField, Typography } from "@mui/material";
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

    //TODO TOAST
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
        gap: 2,
        width: "100%",
      }}
    >
      <Typography variant="h5" align="center">
        Login
      </Typography>

      <TextField
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Senha"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        fullWidth
        required
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </Box>
  );
}
