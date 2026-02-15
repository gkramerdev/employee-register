import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CollaboratorsTable from "../components/CollaboratorsTable";
import { deleteCollaborator } from "../services/collaboratorService";
import DeactivateCollaboratorDialog from "../components/collaborator/DeactivateCollaboratorDialog";

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
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [data, setData] = useState<Collaborator[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [loadingList, setLoadingList] = useState(true);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar({
        open: true,
        message: location.state.snackbar.message,
        severity: location.state.snackbar.severity,
      });

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
      setLoadingList(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((collaborator) =>
      collaborator.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  function handleOpenDialog(id: string) {
    setSelectedId(id);
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setSelectedId(null);
    setOpenDialog(false);
  }

  async function handleConfirmDelete() {
    if (!selectedId) return;

    setDeleting(true);

    const result = await deleteCollaborator(selectedId);

    setDeleting(false);
    handleCloseDialog();

    if (result.success) {
      setSnackbar({
        open: true,
        message: "Colaborador inativado com sucesso!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Erro ao inativar colaborador.",
        severity: "error",
      });
    }
  }

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

      {loadingList ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={200}
        >
          <CircularProgress />
        </Box>
      ) : (
        <CollaboratorsTable
          data={filteredData}
          onEdit={(id) => navigate(`/collaborators/${id}`)}
          onDeactivate={handleOpenDialog}
        />
      )}

      <DeactivateCollaboratorDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={1500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
