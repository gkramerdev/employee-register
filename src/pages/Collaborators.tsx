import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CollaboratorsTable from "../components/CollaboratorsTable";

const MOCK_DATA = [
  {
    id: 1,
    name: "Fernanda Torres",
    email: "fernanda@flugo.com",
    department: "Design",
    status: "active" as const,
  },
  {
    id: 2,
    name: "Carlos Silva",
    email: "carlos@flugo.com",
    department: "TI",
    status: "inactive" as const,
  },
  {
    id: 3,
    name: "Marina Souza",
    email: "marina@flugo.com",
    department: "Marketing",
    status: "active" as const,
  },
];

export default function Collaborators() {
  const [search, setSearch] = useState("");

  const filteredData = MOCK_DATA.filter((collaborator) =>
    collaborator.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Colaboradores
        </Typography>

        <Button variant="contained" color="success">
          Novo Colaborador
        </Button>
      </Box>

      <TextField
        label="Buscar colaborador"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <CollaboratorsTable data={filteredData} />
    </Box>
  );
}
