import { Box, Switch, TextField, Typography } from "@mui/material";
import type { CollaboratorForm } from "../../pages/NewCollaborator";

interface Props {
  data: CollaboratorForm;
  onChange: <K extends keyof CollaboratorForm>(
    field: K,
    value: CollaboratorForm[K],
  ) => void;
}

export default function StepBasicInfo({ data, onChange }: Props) {
  return (
    <Box>
      <Typography variant="h6" mb={3}>
        Informações Básicas
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="Nome completo"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
        />

        <TextField
          label="E-mail"
          type="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          required
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Switch
            checked={data.status === "active"}
            onChange={(e) =>
              onChange("status", e.target.checked ? "active" : "inactive")
            }
          />
          <Typography>Ativar ao criar</Typography>
        </Box>
      </Box>
    </Box>
  );
}
