import { Box, MenuItem, TextField, Typography } from "@mui/material";
import type { CollaboratorForm } from "../../pages/NewCollaborator";

interface Props {
  data: CollaboratorForm;
  onChange: <K extends keyof CollaboratorForm>(
    field: K,
    value: CollaboratorForm[K],
  ) => void;
}
const DEPARTMENTS = [
  "TI",
  "Design",
  "Marketing",
  "Produto",
  "Vendas",
  "Recursos Humanos",
];

export default function StepProfessionalInfo({ data, onChange }: Props) {
  return (
    <Box>
      <Typography variant="h6" mb={3}>
        Informações Profissionais
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          select
          label="Departamento"
          value={data.department}
          onChange={(e) => onChange("department", e.target.value)}
          required
        >
          {DEPARTMENTS.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}
