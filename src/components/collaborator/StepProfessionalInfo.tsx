import { Box, MenuItem, TextField, Typography } from "@mui/material";
import type { CollaboratorForm } from "../../pages/NewCollaborator";

interface Props {
  data: CollaboratorForm;
  onChange: <K extends keyof CollaboratorForm>(
    field: K,
    value: CollaboratorForm[K],
  ) => void;
}

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
          <MenuItem value="TI">TI</MenuItem>
          <MenuItem value="Design">Design</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
        </TextField>
      </Box>
    </Box>
  );
}
