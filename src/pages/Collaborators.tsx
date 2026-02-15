import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CollaboratorsTable from "../components/CollaboratorsTable";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  department: string;
  status: "active" | "inactive";
  createdAt?: any;
}

export default function Collaborators() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [data, setData] = useState<Collaborator[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "collaborators"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const collaborators = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Collaborator, "id">),
      }));

      setData(collaborators);
    });

    return () => unsubscribe();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((collaborator) =>
      collaborator.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

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

        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/collaborators/new")}
        >
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

      {/* Tabela */}
      <CollaboratorsTable data={filteredData} />
    </Box>
  );
}
